/**
 * /api/lead — endpoint server para captura de leads.
 * P13 / Fase 15. Spec: PLAN_IMPLEMENTACION_NEXTSWIFT_CONDENSADO.md §P13.
 *
 * Maneja dos sources:
 *   - 'quiz'             -> upsert Contact (no Deal). Llamado desde /diagnostico (P11).
 *   - 'form_auditoria'   -> upsert Contact + create Deal + CAPI CompleteRegistration.
 *
 * Token HubSpot SOLO en server. NUNCA al cliente.
 */
import type { APIRoute } from 'astro';
import { upsertContact, createDeal, HubSpotError, type HubSpotContactProps } from '../../lib/hubspot';

export const prerender = false;

const HUBSPOT_TOKEN = import.meta.env.HUBSPOT_TOKEN as string | undefined;
const HUBSPOT_PIPELINE_ID = import.meta.env.HUBSPOT_PIPELINE_ID as string | undefined;
const HUBSPOT_STAGE_NEW_ID = import.meta.env.HUBSPOT_STAGE_NEW_ID as string | undefined;

const SALES_RANGES = ['<300k', '300k-500k', '500k-1M', '1M-2M', '>2M'] as const;
const PAINS = ['utilidad', 'ventas-delivery', 'autonomia', 'personal', 'metricas-control', 'crecimiento-controlado'] as const;
const ROLES = ['dueno', 'socio', 'gerente_operativo', 'otro'] as const;
const TIMINGS = ['inmediata', '60d', '90d', 'explorando'] as const;

interface LeadPayload {
  source: 'quiz' | 'form_auditoria';
  email?: string;
  whatsapp?: string;
  firstname?: string;
  salesrange?: string;
  painprimary?: string;
  units?: string | number;
  decisor_role?: string;
  timing?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_landing?: string;
  event_id?: string;
  quiz_event_id?: string;
  // Campos legacy del quiz (P11) — aceptados pero no requeridos para form_auditoria.
  inputs?: unknown;
  result?: unknown;
  ts?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WA_RE = /^\+52\d{10}$/;

function normalizeWhatsApp(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return `+52${digits}`;
  if (digits.length === 12 && digits.startsWith('52')) return `+${digits}`;
  if (digits.length === 13 && digits.startsWith('521')) return `+52${digits.slice(3)}`;
  return raw.trim();
}

function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  if (!HUBSPOT_TOKEN) {
    console.error('[lead] HUBSPOT_TOKEN missing in env');
    return jsonResponse(500, { success: false, error: 'Server misconfiguration' });
  }

  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return jsonResponse(400, { success: false, error: 'Invalid JSON body' });
  }

  const source = body.source ?? 'form_auditoria';
  if (source !== 'quiz' && source !== 'form_auditoria') {
    return jsonResponse(400, { success: false, error: 'Invalid source' });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return jsonResponse(400, { success: false, error: 'Email inválido' });
  }

  // M13: WA obligatorio en auditoría (BOFU), opcional en quiz (TOFU).
  // stripEmpty() en hubspot.ts omite campos vacíos al hacer upsert — phone '' no llega a la API.
  const rawWa = (body.whatsapp ?? '').trim();
  const whatsapp = rawWa ? normalizeWhatsApp(rawWa) : '';
  if (source === 'form_auditoria') {
    if (!whatsapp || !WA_RE.test(whatsapp)) {
      return jsonResponse(400, { success: false, error: 'WhatsApp inválido (formato esperado: +52 + 10 dígitos)' });
    }
  } else if (whatsapp && !WA_RE.test(whatsapp)) {
    return jsonResponse(400, { success: false, error: 'WhatsApp inválido (formato esperado: +52 + 10 dígitos)' });
  }

  // Validación dura del form de auditoría
  if (source === 'form_auditoria') {
    if (!body.salesrange || !(SALES_RANGES as readonly string[]).includes(body.salesrange)) {
      return jsonResponse(400, { success: false, error: 'salesrange inválido' });
    }
    if (!body.painprimary || !(PAINS as readonly string[]).includes(body.painprimary)) {
      return jsonResponse(400, { success: false, error: 'painprimary inválido' });
    }
    if (!body.decisor_role || !(ROLES as readonly string[]).includes(body.decisor_role)) {
      return jsonResponse(400, { success: false, error: 'decisor_role inválido' });
    }
    if (!body.timing || !(TIMINGS as readonly string[]).includes(body.timing)) {
      return jsonResponse(400, { success: false, error: 'timing inválido' });
    }
    const unitsNum = Number(body.units);
    if (!Number.isFinite(unitsNum) || unitsNum < 1 || unitsNum > 999) {
      return jsonResponse(400, { success: false, error: 'units inválido' });
    }
  }

  const contactProps: HubSpotContactProps = {
    email,
    phone: whatsapp,
    firstname: body.firstname?.trim(),
    salesrange: body.salesrange ?? '',
    painprimary: body.painprimary ?? '',
    units: body.units != null ? String(body.units) : '',
    decisor_role: body.decisor_role ?? '',
    timing: body.timing ?? '',
    utm_source: body.utm_source,
    utm_medium: body.utm_medium,
    utm_campaign: body.utm_campaign,
    utm_landing: body.utm_landing,
    quiz_event_id: body.quiz_event_id,
  };

  let contactId: string;
  try {
    contactId = await upsertContact(HUBSPOT_TOKEN, contactProps);
  } catch (err) {
    if (err instanceof HubSpotError) {
      console.error('[lead] HubSpot upsertContact failed', { status: err.status, body: err.body });
      return jsonResponse(502, { success: false, error: 'HubSpot upsert failed' });
    }
    console.error('[lead] upsertContact unexpected error', err);
    return jsonResponse(502, { success: false, error: 'Network error reaching HubSpot' });
  }

  let dealId: string | null = null;
  if (source === 'form_auditoria') {
    if (!HUBSPOT_PIPELINE_ID || !HUBSPOT_STAGE_NEW_ID) {
      console.warn('[lead] HUBSPOT_PIPELINE_ID/HUBSPOT_STAGE_NEW_ID missing — Contact created without Deal');
    } else {
      try {
        dealId = await createDeal(HUBSPOT_TOKEN, {
          contactId,
          pipelineId: HUBSPOT_PIPELINE_ID,
          stageId: HUBSPOT_STAGE_NEW_ID,
          dealname: `Auditoría — ${email}`,
          utm_source: body.utm_source,
          utm_campaign: body.utm_campaign,
        });
      } catch (err) {
        if (err instanceof HubSpotError) {
          console.error('[lead] HubSpot createDeal failed', { status: err.status, body: err.body });
        } else {
          console.error('[lead] createDeal unexpected error', err);
        }
        // El Contact ya quedó. NO regresamos 502 — el lead ya está capturado.
        // Efer puede crear el Deal manual si el endpoint falló.
      }
    }
  }

  // CAPI CompleteRegistration — reusa /api/capi para no duplicar lógica.
  if (source === 'form_auditoria' && body.event_id) {
    try {
      const capiUrl = new URL('/api/capi', request.url).toString();
      await fetch(capiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'CompleteRegistration',
          event_id: body.event_id,
          url: request.headers.get('referer') ?? 'https://www.nextswift.mx/auditoria',
          user_data: {
            em: email,
            ph: whatsapp,
          },
          custom_data: {
            content_name: 'form_auditoria',
            salesrange: body.salesrange,
            painprimary: body.painprimary,
          },
        }),
      });
    } catch (err) {
      console.warn('[lead] CAPI relay failed (no afecta éxito del lead)', err);
    }
  }

  const redirect = source === 'form_auditoria' ? '/gracias-auditoria' : null;
  return jsonResponse(200, { success: true, contactId, dealId, redirect });
};

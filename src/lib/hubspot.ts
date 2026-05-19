/**
 * HubSpot CRM Starter — helpers de Contacts + Deals.
 * P13 / Fase 15. Spec: PLAN_IMPLEMENTACION_NEXTSWIFT_CONDENSADO.md §P13.
 *
 * Pipeline mínimo (DH-NEW-03 placeholder):
 *   "Auditoría solicitada" -> "Auditoría agendada" -> "Diagnóstico entregado"
 *   -> "Propuesta enviada" -> "Cerrado ganado" / "Cerrado perdido".
 * Stage de entrada al crear Deal: "Auditoría solicitada / Nueva".
 *
 * Custom properties que Efer DEBE crear en HubSpot antes del go-live:
 *   - salesrange       (dropdown: "<300k", "300k-500k", "500k-1M", "1M-2M", ">2M")
 *   - painprimary      (dropdown: utilidad / ventas-delivery / autonomia / personal /
 *                                 metricas-control / crecimiento-controlado)
 *   - units            (number)
 *   - decisor_role     (dropdown: dueno / socio / gerente_operativo / otro)
 *   - timing           (dropdown: inmediata / 60d / 90d / explorando)
 *   - utm_source / utm_medium / utm_campaign / utm_landing   (single-line text)
 *   - quiz_event_id    (single-line text — attribution si llega desde /diagnostico)
 *
 * Env vars (Cloudflare Pages):
 *   - HUBSPOT_TOKEN              (Private App, scopes: crm.objects.contacts.write,
 *                                                       crm.objects.deals.write)
 *   - HUBSPOT_PIPELINE_ID        (opcional — si falta, no crea Deal, solo Contact)
 *   - HUBSPOT_STAGE_NEW_ID       (opcional — id de "Auditoría solicitada / Nueva")
 */

const HUBSPOT_API_BASE = 'https://api.hubapi.com';

export interface HubSpotContactProps {
  email: string;
  phone: string;
  firstname?: string;
  salesrange: string;
  painprimary: string;
  units: string;
  decisor_role: string;
  timing: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_landing?: string;
  quiz_event_id?: string;
}

interface HubSpotErrorBody {
  status?: string;
  message?: string;
  correlationId?: string;
  category?: string;
}

export class HubSpotError extends Error {
  status: number;
  body: HubSpotErrorBody | string;
  constructor(status: number, body: HubSpotErrorBody | string, message?: string) {
    super(message ?? `HubSpot API error ${status}`);
    this.name = 'HubSpotError';
    this.status = status;
    this.body = body;
  }
}

async function hubspotFetch(
  token: string,
  method: 'GET' | 'POST' | 'PATCH',
  path: string,
  body?: unknown,
): Promise<unknown> {
  const res = await fetch(`${HUBSPOT_API_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let parsed: unknown = text;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    // body no es JSON — dejamos como string para diagnóstico
  }

  if (!res.ok) {
    throw new HubSpotError(res.status, parsed as HubSpotErrorBody | string);
  }

  return parsed;
}

/**
 * Upsert Contact por email (PATCH si existe, POST si no).
 * Devuelve el `id` del contacto.
 */
export async function upsertContact(token: string, props: HubSpotContactProps): Promise<string> {
  // Endpoint nativo de upsert: usar idProperty=email en POST falla en algunas
  // configuraciones del Starter. Estrategia robusta: PATCH-by-email; si 404,
  // POST. Suficiente para volumen B2B bajo (decenas/mes).
  const propsPayload = stripEmpty(props);

  try {
    const updated = await hubspotFetch(
      token,
      'PATCH',
      `/crm/v3/objects/contacts/${encodeURIComponent(props.email)}?idProperty=email`,
      { properties: propsPayload },
    );
    return (updated as { id: string }).id;
  } catch (err) {
    if (err instanceof HubSpotError && err.status === 404) {
      const created = await hubspotFetch(token, 'POST', '/crm/v3/objects/contacts', {
        properties: propsPayload,
      });
      return (created as { id: string }).id;
    }
    throw err;
  }
}

export interface CreateDealOpts {
  contactId: string;
  pipelineId: string;
  stageId: string;
  dealname: string;
  utm_source?: string;
  utm_campaign?: string;
}

/**
 * Crea Deal y lo asocia al Contact. Asociación inline (associations API v3).
 * dealtype "newbusiness" por default.
 */
export async function createDeal(token: string, opts: CreateDealOpts): Promise<string> {
  const properties = stripEmpty({
    dealname: opts.dealname,
    pipeline: opts.pipelineId,
    dealstage: opts.stageId,
    dealtype: 'newbusiness',
    hs_deal_stage_probability: '0.1',
    utm_source: opts.utm_source ?? '',
    utm_campaign: opts.utm_campaign ?? '',
  });

  const payload = {
    properties,
    associations: [
      {
        to: { id: opts.contactId },
        types: [
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 3, // Deal -> Contact (HubSpot canónico)
          },
        ],
      },
    ],
  };

  const created = await hubspotFetch(token, 'POST', '/crm/v3/objects/deals', payload);
  return (created as { id: string }).id;
}

function stripEmpty(obj: object): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const s = String(v).trim();
    if (s === '') continue;
    out[k] = s;
  }
  return out;
}

/**
 * /api/capi — Meta Conversions API relay. P2 + P21 / Fase 26.
 *
 * Hash server-side de PII (em/ph/fn/ln) con SHA-256 antes de enviar a Meta.
 * Si el campo ya viene hasheado (64 hex chars), no se re-hashea.
 *
 * Consent: este endpoint NO consume `cookieConsent` directamente. La fuente
 * de los eventos garantiza base jurídica:
 *   - Eventos de browsing (PageView, ViewContent): cliente solo relaya si
 *     consent='all' (ver src/lib/tracking.ts).
 *   - Eventos de acción explícita (Lead, CompleteRegistration, Contact):
 *     base jurídica de ejecución de contrato (P22 Risk 1 / DH-09).
 *
 * Dedup Pixel ↔ CAPI: shared `event_id`; Meta deduplica en Events Manager.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const PIXEL_ID = import.meta.env.META_PIXEL_ID;
const CAPI_TOKEN = import.meta.env.META_CAPI_TOKEN;
const GRAPH_API_VERSION = 'v19.0';

interface UserData {
  client_ip_address?: string;
  client_user_agent?: string;
  em?: string;
  ph?: string;
  fn?: string;
  ln?: string;
}

interface CustomData {
  content_name?: string;
  [key: string]: unknown;
}

interface CAPIPayload {
  event_name: string;
  event_id: string;
  url?: string;
  user_data?: UserData;
  custom_data?: CustomData;
}

const SHA256_RE = /^[a-f0-9]{64}$/i;

async function sha256Hex(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function normalizeForHash(field: 'em' | 'ph' | 'fn' | 'ln', raw: string): string {
  const trimmed = raw.trim().toLowerCase();
  if (field === 'ph') return trimmed.replace(/\D/g, '');
  return trimmed;
}

async function hashIfNeeded(field: 'em' | 'ph' | 'fn' | 'ln', raw: string | undefined): Promise<string | undefined> {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  if (SHA256_RE.test(trimmed)) return trimmed.toLowerCase();
  return sha256Hex(normalizeForHash(field, trimmed));
}

export const POST: APIRoute = async ({ request }) => {
  if (!PIXEL_ID || !CAPI_TOKEN) {
    console.error('[CAPI] Missing META_PIXEL_ID or META_CAPI_TOKEN env vars');
    return new Response(
      JSON.stringify({ success: false, error: 'Server misconfiguration' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: Partial<CAPIPayload>;
  try {
    body = (await request.json()) as Partial<CAPIPayload>;
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { event_name, event_id, url, user_data = {}, custom_data = {} } = body;

  if (!event_name || !event_id) {
    return new Response(
      JSON.stringify({ success: false, error: 'event_name and event_id are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const clientIp = request.headers.get('cf-connecting-ip')
    ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? user_data.client_ip_address
    ?? '';

  const clientUserAgent = request.headers.get('user-agent') ?? user_data.client_user_agent ?? '';

  const eventSourceUrl = url ?? request.headers.get('referer') ?? 'https://www.nextswift.mx';

  // Hash PII server-side (idempotente: si ya viene hasheado, se preserva).
  const [em, ph, fn, ln] = await Promise.all([
    hashIfNeeded('em', user_data.em),
    hashIfNeeded('ph', user_data.ph),
    hashIfNeeded('fn', user_data.fn),
    hashIfNeeded('ln', user_data.ln),
  ]);

  const hashedUserData: Record<string, string> = {
    client_ip_address: clientIp,
    client_user_agent: clientUserAgent,
  };
  if (em) hashedUserData.em = em;
  if (ph) hashedUserData.ph = ph;
  if (fn) hashedUserData.fn = fn;
  if (ln) hashedUserData.ln = ln;

  const payload = {
    data: [
      {
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id,
        event_source_url: eventSourceUrl,
        action_source: 'website',
        user_data: hashedUserData,
        custom_data: {
          content_name: 'WhatsApp General',
          ...custom_data,
        },
      },
    ],
  };

  const graphUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`;

  try {
    const metaRes = await fetch(graphUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const metaJson = await metaRes.json() as {
      events_received?: number;
      fbtrace_id?: string;
      messages?: unknown;
      error?: unknown;
    };

    if (!metaRes.ok) {
      // No logueamos el body Meta crudo si trae detalle PII; solo metadatos.
      console.error('[CAPI] Meta API error', {
        status: metaRes.status,
        event_name,
        event_id,
        fbtrace_id: metaJson.fbtrace_id,
      });
      return new Response(
        JSON.stringify({ success: false, error: 'Meta API error', fbtrace_id: metaJson.fbtrace_id }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(
      `[CAPI] ${event_name} sent — id: ${event_id} — received: ${metaJson.events_received ?? 0} — fbtrace: ${metaJson.fbtrace_id ?? 'n/a'}`
    );

    return new Response(
      JSON.stringify({
        success: true,
        fbtrace_id: metaJson.fbtrace_id,
        events_received: metaJson.events_received ?? 0,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[CAPI] Fetch error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Network error reaching Meta API' }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

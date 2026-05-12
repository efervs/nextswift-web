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
    body = await request.json() as Partial<CAPIPayload>;
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

  const payload = {
    data: [
      {
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id,
        event_source_url: eventSourceUrl,
        action_source: 'website',
        user_data: {
          client_ip_address: clientIp,
          client_user_agent: clientUserAgent,
          ...user_data,
        },
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

    const metaJson = await metaRes.json() as { events_received?: number; fbtrace_id?: string; error?: unknown };

    if (!metaRes.ok) {
      console.error('[CAPI] Meta API error:', JSON.stringify(metaJson));
      return new Response(
        JSON.stringify({ success: false, error: 'Meta API error', detail: metaJson }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[CAPI] ${event_name} sent — id: ${event_id} — fbtrace: ${metaJson.fbtrace_id ?? 'n/a'}`);

    return new Response(
      JSON.stringify({ success: true, fbtrace_id: metaJson.fbtrace_id }),
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

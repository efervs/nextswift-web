/**
 * Tracking client — Pixel + CAPI dedup por event_id + GA4 dataLayer.
 * P21 / Fase 26. Spec: PLAN_IMPLEMENTACION_NEXTSWIFT_CONDENSADO.md §P21.
 *
 * Consent contract (P22 / Fase 27):
 *   localStorage['cookieConsent'] === 'all'  → Pixel + CAPI + GA4 todo.
 *   'necessary' o null                       → solo eventos de acción
 *     explícita (Lead / CompleteRegistration / Contact) relayan a CAPI
 *     (base jurídica: ejecución de contrato). PageView / ViewContent
 *     quedan inhibidos.
 *
 * Dedupe Pixel ↔ CAPI: shared `event_id` (UUID v4) por evento. Meta deduplica
 * automático en Events Manager si llegan ambos con mismo id en ≤ 60 min.
 *
 * Se expone vía Base.astro como `window.nxTrack` para que componentes
 * pre-hidratados (StickyCTAMobile, CookieBanner) o handlers inline puedan
 * disparar eventos sin reimport.
 */

import { readUTMFromSessionStorage } from './utm';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    nxTrack?: typeof import('./tracking');
  }
}

export type EventName =
  | 'PageView'
  | 'ViewContent'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact';

export interface UserData {
  em?: string;
  ph?: string;
  fn?: string;
  ln?: string;
}

export type CustomData = Record<string, unknown>;

export interface TrackOptions {
  event_id?: string;
  user_data?: UserData;
  custom_data?: CustomData;
}

const EXPLICIT_ACTION_EVENTS: ReadonlySet<EventName> = new Set([
  'Lead',
  'CompleteRegistration',
  'Contact',
]);

function uuidv4(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function hasMarketingConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem('cookieConsent') === 'all';
  } catch {
    return false;
  }
}

function gaEvent(name: string, params: CustomData): void {
  if (typeof window === 'undefined') return;
  const w = window;
  if (typeof w.gtag === 'function') {
    w.gtag('event', name, params);
    return;
  }
  // dataLayer push siempre — si GTM/GA4 carga después, replay.
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name, ...params });
}

async function relayCAPI(
  event_name: EventName,
  event_id: string,
  user_data: UserData | undefined,
  custom_data: CustomData,
): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    await fetch('/api/capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name,
        event_id,
        url: window.location.href,
        user_data,
        custom_data,
      }),
      keepalive: true,
    });
  } catch {
    // Silent: el evento ya disparó client-side; el dedup no llega pero
    // no rompemos el flujo del usuario.
  }
}

async function track(event_name: EventName, opts: TrackOptions = {}): Promise<string> {
  const event_id = opts.event_id ?? uuidv4();
  const utm = typeof window !== 'undefined' ? readUTMFromSessionStorage() : null;
  const custom_data: CustomData = { ...opts.custom_data };
  if (utm) {
    if (utm.source) custom_data.utm_source = utm.source;
    if (utm.medium) custom_data.utm_medium = utm.medium;
    if (utm.campaign) custom_data.utm_campaign = utm.campaign;
    if (utm.landing) custom_data.utm_landing = utm.landing;
    if (utm.content) custom_data.utm_content = utm.content;
    if (utm.term) custom_data.utm_term = utm.term;
  }

  const consent = hasMarketingConsent();
  const isExplicit = EXPLICIT_ACTION_EVENTS.has(event_name);

  // 1. GA4 / dataLayer — sin PII; ok aunque consent=false (P22 Risk 2: GA4
  //    slot ya considerado; sin embargo, gtag solo está cargado si consent
  //    se otorga, así que sin consent esto cae a dataLayer.push (inerte)).
  gaEvent(event_name.toLowerCase(), { event_id, ...custom_data });

  // 2. Meta Pixel client-side — requiere consent y SDK cargado.
  if (consent && typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', event_name, custom_data, { eventID: event_id });
    } catch {
      /* fbq queued antes de init — tolera */
    }
  }

  // 3. CAPI server-side — todos con consent; sin consent solo eventos de
  //    acción explícita (Lead/CompleteRegistration/Contact) bajo base
  //    jurídica de ejecución de contrato.
  if (consent || isExplicit) {
    await relayCAPI(event_name, event_id, opts.user_data, custom_data);
  }

  return event_id;
}

export function pageView(): Promise<string> {
  return track('PageView');
}

export function viewContent(name: string): Promise<string> {
  return track('ViewContent', { custom_data: { content_name: name } });
}

export interface QuizResultSummary {
  pain?: string;
  salesrange?: string;
  units?: number | string;
}

export function lead(quizResult: QuizResultSummary = {}): Promise<string> {
  return track('Lead', {
    custom_data: {
      content_name: 'quiz_complete',
      currency: 'MXN',
      ...quizResult,
    },
  });
}

export interface FormDataSummary {
  email?: string;
  whatsapp?: string;
  salesrange?: string;
  painprimary?: string;
}

export function completeRegistration(formData: FormDataSummary = {}): Promise<string> {
  return track('CompleteRegistration', {
    user_data: { em: formData.email, ph: formData.whatsapp },
    custom_data: {
      content_name: 'form_auditoria',
      currency: 'MXN',
      salesrange: formData.salesrange,
      painprimary: formData.painprimary,
    },
  });
}

export function contact(channel: 'whatsapp'): Promise<string> {
  return track('Contact', {
    custom_data: { content_name: `contact_${channel}` },
  });
}

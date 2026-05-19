/**
 * Conversion tag mapping para las 3 páginas /gracias-* (Fase 16).
 *
 * - `meta_event`: evento refinado de Pixel — se dispara con `event_id` leído de `?eid=`
 *    en la URL para dedup contra el evento ORIGINAL emitido por F13/F14/F15.
 *    Si `?eid=` está ausente (acceso directo a /gracias-*), NO se dispara nada (evita inflado).
 * - `google_label`: conversion label de Google Ads. Se concatena con `GOOGLE_ADS_ACCOUNT_ID`
 *    para formar `send_to`. Si los env vars faltan, el gtag se omite silenciosamente.
 *
 * DH-NEW-09 pendiente: valores monetarios v1 conservadores; Efer ajusta post-launch
 * con CPA real de Meta Ads + Google Ads.
 *
 * Env vars esperados en Cloudflare Pages (prefix PUBLIC_ para uso client-side):
 *   PUBLIC_GOOGLE_ADS_ACCOUNT_ID    (ej. "AW-1234567890")
 *   PUBLIC_GOOGLE_ADS_LABEL_QUIZ
 *   PUBLIC_GOOGLE_ADS_LABEL_AUDITORIA
 *   PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP
 */

export type ConversionType = 'quiz' | 'auditoria' | 'whatsapp';

export type MetaEventName = 'Lead' | 'CompleteRegistration' | 'Contact';

export interface ConversionMapping {
  meta_event: MetaEventName;
  google_label_env: string; // nombre del env var (resolución client-side)
  value: number;
  currency: 'MXN';
}

export const CONVERSION_MAP: Record<ConversionType, ConversionMapping> = {
  quiz: {
    meta_event: 'Lead',
    google_label_env: 'PUBLIC_GOOGLE_ADS_LABEL_QUIZ',
    value: 0,
    currency: 'MXN',
  },
  auditoria: {
    meta_event: 'CompleteRegistration',
    google_label_env: 'PUBLIC_GOOGLE_ADS_LABEL_AUDITORIA',
    value: 1500,
    currency: 'MXN',
  },
  whatsapp: {
    meta_event: 'Contact',
    google_label_env: 'PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP',
    value: 0,
    currency: 'MXN',
  },
};

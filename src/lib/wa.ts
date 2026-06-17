/**
 * WhatsApp URL builder — P12 / Fase 14.
 *
 * Construye `wa.me/5218110425674?text=...` con UTM legibles en el prefilled
 * text. El bloque `[ref: src=... camp=... land=...]` se mantiene VISIBLE en
 * el mensaje: es atribución que Efer lee al recibir el WhatsApp. Feature, no bug.
 *
 * Cloud API NO se usa (DH-06 resuelto: descartado por conflicto irresoluble
 * con ManyChat en Meta). Atribución suficiente vía prefilled text + CAPI Contact.
 *
 * Spec: PLAN_IMPLEMENTACION_NEXTSWIFT_CONDENSADO.md §P12.
 */

import { readUTMFromSessionStorage, type UTM } from './utm';
import { WHATSAPP_PHONE as PHONE } from './whatsapp-phone';

export interface BuildWaOpts {
  /** Fuente declarada por el componente que dispara el CTA (ej. 'site', 'landing-utilidad'). */
  source: string;
  /** Campaña — opcional, suele venir de sessionStorage UTM. */
  campaign?: string;
  /** Slug de landing — ej. 'utilidad', 'home'. Default si no hay UTM. */
  landing?: string;
  /** Override completo del mensaje prefilled. Si se provee, sustituye el default. */
  messageTemplate?: string;
}

/**
 * Construye la URL de wa.me con prefilled text + bloque `[ref: ...]` de atribución.
 *
 * Resolución de UTM (en orden de prioridad):
 *   1. sessionStorage `utm` (capturado por captureUTMFromURL en Base.astro)
 *   2. opts (source/campaign/landing pasados explícitamente)
 *
 * Ejecutar en cliente (sessionStorage). En SSR (sin window), cae al opts.
 */
export function buildWaUrl(opts: BuildWaOpts): string {
  const stored = readUTMFromSessionStorage();
  // Fusion: opts es el fallback; storage gana cuando existe.
  const utm: Pick<UTM, 'source' | 'campaign' | 'landing'> = {
    source: stored?.source || opts.source,
    campaign: stored?.campaign || opts.campaign || '',
    landing: stored?.landing || opts.landing || 'home',
  };

  const msg =
    opts.messageTemplate ??
    `Hola Efer, vengo de ${utm.source}/${utm.landing} y quiero...`;

  const ref = `[ref: src=${utm.source} camp=${utm.campaign} land=${utm.landing}]`;
  const text = encodeURIComponent(`${msg}\n\n${ref}`);

  return `https://wa.me/${PHONE}?text=${text}`;
}

/**
 * Teléfono WhatsApp de NextSwift — ÚNICA fuente de verdad (M19/H-F).
 *
 * Formato MX moderno: `52` + 10 dígitos (sin el `1` legacy de móvil). wa.me resuelve
 * el mismo chat con o sin el `1`; se estandariza en `52…` porque es el formato que ya
 * usaban footer, legales, diagnóstico y los 6 builders de páginas vía `whatsapp-url.ts`.
 * Antes coexistían dos constantes divergentes (`wa.ts` = `5218110425674` vs
 * `whatsapp-url.ts` = `528110425674`) → violaba "una verdad por tema".
 */
export const WHATSAPP_PHONE = '528110425674';

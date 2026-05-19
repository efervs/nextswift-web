/**
 * Esquema UTM canónico de NextSwift.
 * Todo CTA del sitio importa de aquí — prohibido hardcodear UTM en otros archivos.
 * Referencia: PLAN_IMPLEMENTACION_NEXTSWIFT.md §FASE 4 PASO 3.
 */

export type UtmSource = 'site' | 'ads-meta' | 'ads-google' | 'organic';
export type UtmMedium = 'wa' | 'form' | 'cpc' | 'cpm' | 'email';
export type UtmCampaign =
  | 'home'
  | 'pain'
  | 'cases'
  | 'about'
  | 'guarantee'
  | 'quiz'
  | 'oferta'
  | 'auditoria';

export interface UtmSet {
  source: UtmSource;
  medium: UtmMedium;
  campaign: UtmCampaign;
  content: string; // ej. 'hero_wa', 'utilidad_card'
  term?: string;   // contexto adicional, ej. 'pain:utilidad'
}

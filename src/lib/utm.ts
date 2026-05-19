/**
 * UTM capture & retrieval — P12 / Fase 14.
 *
 * Modelo first-touch dentro de la sesión: la primera visita con UTMs queda
 * congelada en sessionStorage; visitas internas sin UTMs NO sobrescriben.
 * Si el usuario regresa con UTMs nuevos en la misma sesión (raro), se
 * sobrescribe para reflejar la fuente real más reciente.
 *
 * Persistencia: sessionStorage (no localStorage). Vive lo que dura la pestaña.
 * Razón: evita atribuir conversiones de hoy a campañas viejas de hace semanas.
 *
 * Spec: PLAN_IMPLEMENTACION_NEXTSWIFT_CONDENSADO.md §P12.
 */

export interface UTM {
  source: string;
  medium: string;
  campaign: string;
  landing: string;
  /** utm_content — opcional, agregado en P21. */
  content?: string;
  /** utm_term — opcional, agregado en P21. */
  term?: string;
  capturedAt: string;
}

const STORAGE_KEY = 'utm';

/**
 * Lee `?utm_source=&utm_medium=&utm_campaign=&utm_landing=` del URL actual
 * y guarda en sessionStorage. Se invoca desde Base.astro antes de cualquier CTA.
 * No-op en SSR / sin window.
 */
export function captureUTMFromURL(): void {
  if (typeof window === 'undefined') return;

  let params: URLSearchParams;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    return;
  }

  const source = params.get('utm_source');
  const medium = params.get('utm_medium');
  const campaign = params.get('utm_campaign');
  const landing = params.get('utm_landing');
  const content = params.get('utm_content');
  const term = params.get('utm_term');

  // Si ningún UTM está presente, no tocamos el storage existente.
  if (!source && !medium && !campaign && !landing && !content && !term) return;

  const utm: UTM = {
    source: source ?? '',
    medium: medium ?? '',
    campaign: campaign ?? '',
    landing: landing ?? '',
    capturedAt: new Date().toISOString(),
  };
  if (content) utm.content = content;
  if (term) utm.term = term;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  } catch {
    // Modo privado iOS u otros bloqueos: seguimos sin persistir.
  }
}

/**
 * Devuelve el UTM congelado en la sesión, o null si no hay.
 */
export function readUTMFromSessionStorage(): UTM | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<UTM>;
    if (typeof parsed !== 'object' || parsed === null) return null;
    const out: UTM = {
      source: parsed.source ?? '',
      medium: parsed.medium ?? '',
      campaign: parsed.campaign ?? '',
      landing: parsed.landing ?? '',
      capturedAt: parsed.capturedAt ?? '',
    };
    if (parsed.content) out.content = parsed.content;
    if (parsed.term) out.term = parsed.term;
    return out;
  } catch {
    return null;
  }
}

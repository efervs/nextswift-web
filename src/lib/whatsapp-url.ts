import type { UtmSet } from './utm-schema';

const PHONE = '528110425674';
const BASE_TEXT = 'Hola, vi su sitio y quiero hablar sobre';

export interface BuildWaParams {
  source: UtmSet['campaign'];
  content: string;
  context?: string;
  customMessage?: string;
}

export function buildWaUrl(p: BuildWaParams): string {
  const utms = new URLSearchParams({
    utm_source: 'site',
    utm_medium: 'wa',
    utm_campaign: p.source,
    utm_content: p.content,
    ...(p.context ? { utm_term: p.context } : {}),
  }).toString();

  const message = `${p.customMessage ?? BASE_TEXT} [${p.source}/${p.content}]`;
  const text = encodeURIComponent(`${message}\n${utms}`);

  return `https://wa.me/${PHONE}?text=${text}`;
}

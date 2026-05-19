/**
 * blog-pillars — metadata por pillar para listados, badges y CTAs contextuales.
 *
 * `transversal` es un pillar editorial que NO mapea a landing; sus CTAs van
 * a /diagnostico. Orden por poder comercial (nav-orden-dolores.md).
 */
import type { Pillar } from '../content.config';

export interface PillarMeta {
  id: Pillar;
  label: string;
  short: string;
  description: string;
  landingPath: string;
  ctaCopy: string;
  ctaTarget: string;
}

export const PILLARS: PillarMeta[] = [
  {
    id: 'utilidad',
    label: 'Utilidad y margen',
    short: 'Utilidad',
    description: 'Vendo pero no gano dinero. El dolor más profundo y universal: fuga de margen, costeo descalibrado, menú sin ingeniería.',
    landingPath: '/utilidad',
    ctaCopy: 'Encontramos la fuga de margen en 10 días. Mira cómo lo hicimos en restaurantes reales.',
    ctaTarget: '/utilidad?utm_source=blog&utm_medium=cta_contextual&utm_content=pillar_utilidad',
  },
  {
    id: 'ventas-delivery',
    label: 'Ventas y delivery',
    short: 'Ventas',
    description: 'Las ventas están flojas. Síntoma visible, urgencia inmediata. Ingeniería de canal, no campañas a ciegas.',
    landingPath: '/ventas-delivery',
    ctaCopy: 'Las ventas no se arreglan con más anuncios. Mira el plan operativo que sí mueve la aguja.',
    ctaTarget: '/ventas-delivery?utm_source=blog&utm_medium=cta_contextual&utm_content=pillar_ventas',
  },
  {
    id: 'autonomia',
    label: 'Autonomía del dueño',
    short: 'Autonomía',
    description: 'El negocio depende demasiado de mí. Liberar al dueño sin perder control: roles, procesos, indicadores.',
    landingPath: '/autonomia',
    ctaCopy: 'Sin volverte dispensable, no hay descanso ni venta del negocio. Aquí está el camino.',
    ctaTarget: '/autonomia?utm_source=blog&utm_medium=cta_contextual&utm_content=pillar_autonomia',
  },
  {
    id: 'personal',
    label: 'Personal y operación',
    short: 'Personal',
    description: 'Mi personal es un desmadre. Selección, capacitación, retención y operación estándar — sin reinventar cada día.',
    landingPath: '/personal',
    ctaCopy: 'Tu personal no es el problema; lo es la falta de sistema. Mira el rediseño en 4 semanas.',
    ctaTarget: '/personal?utm_source=blog&utm_medium=cta_contextual&utm_content=pillar_personal',
  },
  {
    id: 'metricas-control',
    label: 'Métricas y control',
    short: 'Métricas',
    description: 'No tengo claridad real de números. Del Excel sucio a un tablero semanal que decide por ti.',
    landingPath: '/metricas-control',
    ctaCopy: 'Sin tablero, decides con corazonadas. Mira cómo armamos el tuyo en 14 días.',
    ctaTarget: '/metricas-control?utm_source=blog&utm_medium=cta_contextual&utm_content=pillar_metricas',
  },
  {
    id: 'crecimiento-controlado',
    label: 'Crecimiento controlado',
    short: 'Crecimiento',
    description: 'Quiero crecer sin caos. Sucursal 2, franquicia o expansión solo después de estabilizar la unidad madre.',
    landingPath: '/crecimiento-controlado',
    ctaCopy: 'Crecer mal es peor que no crecer. Mira el filtro previo a abrir sucursal 2.',
    ctaTarget: '/crecimiento-controlado?utm_source=blog&utm_medium=cta_contextual&utm_content=pillar_crecimiento',
  },
  {
    id: 'transversal',
    label: 'Transversal',
    short: 'Transversal',
    description: 'Temas que cruzan los 6 dolores: filosofía operativa, marcos de decisión, errores comunes del dueño.',
    landingPath: '/diagnostico',
    ctaCopy: '¿No sabes por dónde empieza tu fuga? Solicita el diagnóstico forense gratuito.',
    ctaTarget: '/diagnostico?utm_source=blog&utm_medium=cta_contextual&utm_content=pillar_transversal',
  },
];

export const PILLAR_MAP: Record<Pillar, PillarMeta> = Object.fromEntries(
  PILLARS.map((p) => [p.id, p])
) as Record<Pillar, PillarMeta>;

export function getPillarMeta(id: Pillar): PillarMeta {
  return PILLAR_MAP[id];
}

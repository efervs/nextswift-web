/**
 * Testimonios contextuales para SocialProof variant="testimonios".
 *
 * Reglas no negociables (CLAUDE.md §10 + memory/project_casos_prueba_social.md):
 *  - NO inventar quotes. Solo se publican entradas con `autorizado: true` Y quote/métrica reales.
 *  - Si `autorizado: false`, se renderiza placeholder visible "PENDIENTE DH-NEW-01" en dev/preview
 *    y se OMITE en producción (NO publicar).
 *  - Cada testimonio ancla UNA objeción específica del pipeline real.
 *  - NO video (DH-05, decisión humana vigente — minuta §DH-05).
 *  - Foto/avatar del cliente: SOLO con autorización escrita (DH-NEW-01). Mientras no haya
 *    foto autorizada entregada por Efer, el componente pinta un placeholder de iniciales.
 *    NUNCA stock, NUNCA inventar una cara. (Evolución habilitada en M10 plan_de_mejoras_v1;
 *    pendiente ratificación de Efer — ver reporte M10.)
 *  - Base mínima publicable: métrica + texto + nombre/contexto + objeción anclada.
 *
 * Fuente: memory/project_casos_prueba_social.md (validado con Efer 2026-05-12, logos 2026-05-14).
 */

export type Objecion =
  | 'teoria-vs-implementacion'
  | 'aplicabilidad-tipo-negocio'
  | 'intrusion-cocina'
  | 'contrato-eterno'
  | 'tamano-no-aplica'
  | 'agencia-de-marketing';

export interface Testimonio {
  id: string;
  cliente: string;          // 'Exdueña — Temaky Sushi'
  restaurante: string;      // 'Temaky Sushi · Monterrey'
  cita?: string;            // Quote ≤3 líneas. Opcional: hay casos solo-métrica.
  metrica: string;          // "+42% margen delivery en 90 días"
  contexto: string;         // 1 línea de qué se hizo, sin floritura
  objecionAnclada: Objecion;
  objecionLabel: string;    // Texto humano de la objeción que desmantela
  roleLabel?: string;       // 'Dueño' | 'Operador' | 'Exdueña'… badge bajo el nombre. Opcional: NO inventar rol.
  avatar?: string;          // '/images/testimonios/<slug>.webp'. SOLO foto autorizada (DH-NEW-01).
                            // Sin avatar => placeholder de iniciales (ver SocialProof.astro). NUNCA stock.
  autorizado: boolean;      // false => placeholder, NO publica en prod
}

export const TESTIMONIOS: Testimonio[] = [
  {
    id: 'temaky-exduena',
    cliente: 'Exdueña de restaurante de sushi',
    restaurante: 'Restaurante de sushi · Monterrey',
    cita: 'Hubiera querido que llegaran 15, o mejor 20 años antes para arreglar todo.',
    metrica: '+42% margen delivery (neto) · negocio vendido >$1.6M MXN',
    contexto:
      'Diagnóstico financiero + rediseño de menú por rentabilidad + dashboard semanal hasta convertir la operación en activo vendible.',
    objecionAnclada: 'teoria-vs-implementacion',
    objecionLabel: 'Sobre "esto es teoría o ustedes operan"',
    roleLabel: 'Exdueña',
    autorizado: true,
  },
  {
    id: 'pangas-metrica',
    cliente: 'Restaurante de mariscos',
    restaurante: 'Pangas Sabores del Mar · Monterrey',
    metrica: '4.4★/490 reseñas → 4.6★/646 reseñas en menos de 2 meses',
    contexto:
      'Sistema de captura de reseñas en mesa + Meta Ads atadas a tráfico directo — activo reputacional documentado.',
    objecionAnclada: 'aplicabilidad-tipo-negocio',
    objecionLabel: 'Sobre "esto no aplica a mi tipo de negocio"',
    autorizado: true,
  },
  {
    id: 'oita-arranque',
    cliente: 'Raúl García, fundador',
    restaurante: 'Oita Fresh · Monterrey',
    metrica: '$0 → $300,000 MXN/mes en arranque desde cero',
    contexto:
      'Operación ejecutiva embebida desde el día cero — Efer dentro de cabina hasta dejar el sistema operando solo.',
    objecionAnclada: 'tamano-no-aplica',
    objecionLabel: 'Sobre "mi restaurante es muy chico / muy nuevo"',
    roleLabel: 'Fundador',
    autorizado: false, // quote textual de Raúl pendiente DH-NEW-01; avatar también pendiente
  },
  {
    id: 'placeholder-intrusion',
    cliente: '— PENDIENTE —',
    restaurante: '— PENDIENTE —',
    metrica: '— PENDIENTE DH-NEW-01 —',
    contexto: 'Testimonio que desmantela objeción "intrusión en cocina" — pendiente autorización por escrito.',
    objecionAnclada: 'intrusion-cocina',
    objecionLabel: 'Sobre "no quiero a alguien metiéndose en mi cocina"',
    autorizado: false,
  },
];

export function testimoniosPublicables(): Testimonio[] {
  return TESTIMONIOS.filter((t) => t.autorizado);
}

export function testimonioByObjecion(obj: Objecion): Testimonio | undefined {
  return TESTIMONIOS.find((t) => t.objecionAnclada === obj && t.autorizado);
}

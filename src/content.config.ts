/**
 * Content Collections — fuente de verdad para prueba social y contenido editorial.
 *
 * Colecciones:
 *  - `cases` (Fase 10): casos de cliente publicables. Validación estricta para
 *    impedir publicar sin autorización. Métricas defendibles, sin video (DH-05).
 *
 * Fuente de validación: project_casos_prueba_social.md (auto-memory) +
 * confirmación de Efer 2026-05-14 (logos autorizados de los 4 casos publicables).
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const PAIN_VALUES = [
  'utilidad',
  'autonomia',
  'ventas-delivery',
  'personal',
  'metricas-control',
  'crecimiento-controlado',
] as const;

export type Pain = (typeof PAIN_VALUES)[number];

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    slug: z.string(),
    client: z.string(),
    sector: z.string(),
    pain: z.enum(PAIN_VALUES),
    before: z.string(),
    intervention: z.string(),
    result: z
      .object({
        metric: z.string(),
        value: z.string(),
        period: z.string(),
      })
      .array()
      .min(1),
    logo: z.string(),
    authorized: z.boolean(),
    publishDate: z.coerce.date(),
    /** Caso vigente sin métrica financiera cerrada — render como "en proceso". */
    inProgress: z.boolean().default(false),
    /** Cita opcional (anónima permitida). Si existe `quote`, debe venir con `quoteAttribution`. */
    quote: z.string().optional(),
    quoteAttribution: z.string().optional(),
  }),
});

export const collections = { cases };

/**
 * blog-helpers — utilidades de consulta y formateo para el Bloque E (Fase 19).
 *
 * Convenciones:
 *  - Las fechas se formatean en es-MX ("11 mayo 2026").
 *  - El TOC se deriva de los headings H2/H3 emitidos por Astro al renderizar.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Pillar } from '../content.config';

export type BlogEntry = CollectionEntry<'blog'>;

const DATE_FMT = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDate(date: Date): string {
  return DATE_FMT.format(date);
}

export async function getAllPosts(): Promise<BlogEntry[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPostsByPillar(pillar: Pillar): Promise<BlogEntry[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.data.pillar === pillar);
}

export async function getRelatedPosts(current: BlogEntry, count = 3): Promise<BlogEntry[]> {
  const all = await getAllPosts();
  const samePillar = all.filter(
    (p) => p.id !== current.id && p.data.pillar === current.data.pillar
  );
  if (samePillar.length >= count) return samePillar.slice(0, count);
  const others = all.filter((p) => p.id !== current.id && p.data.pillar !== current.data.pillar);
  return [...samePillar, ...others].slice(0, count);
}

export interface TocHeading {
  depth: number;
  slug: string;
  text: string;
}

/**
 * Filtra los headings emitidos por Astro al H2/H3 y los devuelve listos para
 * renderizar como TOC. Devuelve [] si no hay al menos 2 H2.
 */
export function buildToc(
  headings: { depth: number; slug: string; text: string }[]
): TocHeading[] {
  const filtered = headings.filter((h) => h.depth === 2 || h.depth === 3);
  const h2Count = filtered.filter((h) => h.depth === 2).length;
  if (h2Count < 2) return [];
  return filtered;
}

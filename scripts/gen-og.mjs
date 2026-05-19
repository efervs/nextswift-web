/**
 * gen-og.mjs — Genera imágenes OG (1200×630) para todas las páginas NextSwift.
 *
 * Requiere instalar una vez:
 *   npm install -D @resvg/resvg-js
 *
 * Uso:
 *   node scripts/gen-og.mjs
 *
 * Salida: public/images/og/*.png
 *
 * Diseño: fondo azul marino (#003366), logo texto "NextSwift" en blanco,
 * titular de página, eyebrow de palanca.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../public/images/og');

mkdirSync(OUT_DIR, { recursive: true });

const PAGES = [
  {
    slug: 'default',
    title: 'Consultoría B2B para restaurantes en México',
    eyebrow: 'NEXTSWIFT',
    subtitle: 'Diagnóstico, plan y ejecución en 10 días hábiles.',
  },
  {
    slug: 'home',
    title: 'Rehabilitamos restaurantes\nque venden pero no ganan dinero',
    eyebrow: 'CONSULTORÍA B2B · MONTERREY, MX',
    subtitle: '11 garantías formales. Dueño dentro de la cabina.',
  },
  {
    slug: 'utilidad',
    title: 'Vendo pero\nno gano dinero',
    eyebrow: 'PALANCA FINANCIERA',
    subtitle: 'Diagnóstico de margen en 10 días hábiles.',
  },
  {
    slug: 'autonomia',
    title: 'El negocio depende\ndemasiado de mí',
    eyebrow: 'PALANCA OPERATIVA',
    subtitle: 'Operación autónoma en 10 días hábiles.',
  },
  {
    slug: 'ventas-delivery',
    title: 'Las ventas\nestán flojas',
    eyebrow: 'PALANCA COMERCIAL',
    subtitle: 'Tráfico recurrente en 60-90 días.',
  },
  {
    slug: 'personal',
    title: 'Mi personal\nes un desmadre',
    eyebrow: 'PALANCA OPERATIVA',
    subtitle: 'Estructura de personal en 10 días hábiles.',
  },
  {
    slug: 'metricas-control',
    title: 'No tengo claridad\nreal de números',
    eyebrow: 'PALANCA FINANCIERA',
    subtitle: 'Dashboard de 10 KPIs en 21 días.',
  },
  {
    slug: 'crecimiento-controlado',
    title: 'Quiero crecer\nsin caos',
    eyebrow: 'PALANCA DE EXPANSIÓN',
    subtitle: 'Modelo replicable en 10 días hábiles.',
  },
  {
    slug: 'acelerador',
    title: 'Acelerador\n3 Palancas',
    eyebrow: 'PROGRAMA INTENSIVO · 10 DÍAS HÁBILES',
    subtitle: 'Implementación operativa. 11 garantías formales.',
  },
];

function buildSvg({ title, eyebrow, subtitle }) {
  const lines = title.split('\n');
  const titleY1 = 280;
  const titleY2 = 360;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#001f4d"/>
      <stop offset="100%" stop-color="#003366"/>
    </linearGradient>
  </defs>

  <!-- Fondo -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Acento izquierdo -->
  <rect x="0" y="0" width="8" height="630" fill="#f0b429"/>

  <!-- Logo NextSwift -->
  <text x="80" y="100"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="36" font-weight="700" fill="#ffffff" letter-spacing="2">
    NextSwift
  </text>

  <!-- Eyebrow -->
  <text x="80" y="200"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="22" font-weight="600" fill="#f0b429" letter-spacing="3"
    text-transform="uppercase">
    ${eyebrow}
  </text>

  <!-- Título línea 1 -->
  <text x="80" y="${titleY1}"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="72" font-weight="800" fill="#ffffff" letter-spacing="-1">
    ${lines[0]}
  </text>

  ${lines[1] ? `<!-- Título línea 2 -->
  <text x="80" y="${titleY2}"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="72" font-weight="800" fill="#ffffff" letter-spacing="-1">
    ${lines[1]}
  </text>` : ''}

  <!-- Subtitle -->
  <text x="80" y="490"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="30" font-weight="400" fill="rgba(255,255,255,0.75)">
    ${subtitle}
  </text>

  <!-- URL footer -->
  <text x="80" y="590"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="22" font-weight="400" fill="rgba(255,255,255,0.45)">
    www.nextswift.mx
  </text>
</svg>`;
}

// Intentar usar @resvg/resvg-js si está instalado; si no, guardar SVG como fallback.
let Resvg;
try {
  ({ Resvg } = await import('@resvg/resvg-js'));
} catch {
  console.warn('[gen-og] @resvg/resvg-js no instalado — guardando SVG (instalar con: npm i -D @resvg/resvg-js)');
}

for (const page of PAGES) {
  const svg = buildSvg(page);

  if (Resvg) {
    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: 1200 },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    const outPath = join(OUT_DIR, `${page.slug}.png`);
    writeFileSync(outPath, pngBuffer);
    console.log(`[gen-og] ✓ ${page.slug}.png`);
  } else {
    const outPath = join(OUT_DIR, `${page.slug}.svg`);
    writeFileSync(outPath, svg, 'utf-8');
    console.log(`[gen-og] ✓ ${page.slug}.svg (PNG pendiente — instalar @resvg/resvg-js)`);
  }
}

console.log(`\n[gen-og] Listo. Archivos en public/images/og/`);

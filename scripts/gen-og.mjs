/**
 * gen-og.mjs — Genera imágenes OG (1200×630) para todas las páginas NextSwift.
 *
 * M17 (plan_de_mejoras_v1.md): logo real, headline en Oswald, foto Efer recortada
 * a la derecha, footer "nextswift.mx · Partner operativo B2B" + ícono WhatsApp,
 * fondo navy (--color-dark-1 #003366) con gradiente sutil y acento cyan #3EEAF3.
 *
 * Render vía Chromium (Playwright) en lugar de resvg: resvg-js no embebe WebP ni
 * carga Oswald de forma fiable; Chromium renderiza WebP + woff2 + foto nativamente.
 * No agrega dependencia nueva: usa @playwright/test (ya en devDependencies).
 *
 * Requiere (en la máquina de build, NO en G:\ donde node_modules es online-only):
 *   npm install            # trae @playwright/test
 *   npx playwright install chromium
 *
 * Uso:
 *   node scripts/gen-og.mjs            # genera las 12
 *   node scripts/gen-og.mjs home       # genera solo home.png (uno o varios slugs)
 *
 * Salida: public/images/og/<slug>.png   (1200×630, PNG)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'public/images/og');
const IMG_DIR = join(ROOT, 'public/images');

mkdirSync(OUT_DIR, { recursive: true });

// ── Copy por página. Todo VERBATIM del copy del sitio (regla M17). ───────────
// eyebrow → se renderiza en mayúsculas vía text-transform.
const PAGES = [
  {
    slug: 'default',
    eyebrow: 'NextSwift',
    title: 'Consultoría B2B para restaurantes en México',
    subtitle: 'Diagnóstico, plan y ejecución en 10 días hábiles.',
  },
  {
    slug: 'home',
    eyebrow: 'Consultoría B2B · Monterrey, MX',
    title: 'Rehabilitamos restaurantes que venden pero no ganan dinero',
    subtitle: '11 garantías formales. Dueño dentro de la cabina.',
  },
  {
    slug: 'utilidad',
    eyebrow: 'Palanca financiera',
    title: 'Vendo pero no gano dinero',
    subtitle: 'Diagnóstico de margen en 10 días hábiles.',
  },
  {
    slug: 'autonomia',
    eyebrow: 'Palanca operativa',
    title: 'El negocio depende demasiado de mí',
    subtitle: 'Operación autónoma en 10 días hábiles.',
  },
  {
    slug: 'ventas-delivery',
    eyebrow: 'Palanca comercial',
    title: 'Las ventas están flojas',
    subtitle: 'Tráfico recurrente en 60-90 días.',
  },
  {
    slug: 'personal',
    eyebrow: 'Palanca operativa',
    title: 'Mi personal es un desmadre',
    subtitle: 'Estructura de personal en 10 días hábiles.',
  },
  {
    slug: 'metricas-control',
    eyebrow: 'Palanca financiera',
    title: 'No tengo claridad real de números',
    subtitle: 'Dashboard de 10 KPIs en 21 días.',
  },
  {
    slug: 'crecimiento-controlado',
    eyebrow: 'Palanca de expansión',
    title: 'Quiero crecer sin caos',
    subtitle: 'Modelo replicable en 10 días hábiles.',
  },
  {
    slug: 'acelerador',
    eyebrow: 'Programa intensivo · 10 días hábiles',
    title: 'Acelerador 3 Palancas',
    subtitle: 'Implementación operativa. 11 garantías formales.',
  },
  // ── Nuevas (M17): H1 verbatim de cada página. ──
  {
    slug: 'sobre-efer',
    eyebrow: 'Operador antes que consultor',
    title: 'Partner operativo. Estratega del P&L. Junto al dueño, no en su lugar.',
    subtitle: 'Entra a la cabina junto al dueño, con el P&L abierto.',
  },
  {
    slug: 'garantia',
    eyebrow: '11 garantías formales',
    title: 'El riesgo no debería ser suyo.',
    subtitle: 'Las firmamos antes de empezar.',
  },
  {
    slug: 'casos-de-exito',
    eyebrow: 'Casos reales · Métricas autorizadas',
    title: 'Restaurantes que rehabilitamos operativamente.',
    subtitle: 'Cuatro casos verificables con cifras autorizadas.',
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function dataUri(absPath, mime) {
  if (!existsSync(absPath)) return null;
  return `data:${mime};base64,${readFileSync(absPath).toString('base64')}`;
}

function fontFace(family, relFile, weight) {
  const abs = join(ROOT, relFile);
  if (!existsSync(abs)) {
    console.warn(`[gen-og] ⚠ fuente no encontrada (fallback a system): ${relFile}`);
    return '';
  }
  const b64 = readFileSync(abs).toString('base64');
  return `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
}

// Fuentes self-host (mismas que el sitio): Oswald variable (headline),
// Source Sans Pro 600 (eyebrow), Lato 400 (subtítulo/footer).
const FONT_FACES = [
  fontFace('Oswald', 'node_modules/@fontsource-variable/oswald/files/oswald-latin-wght-normal.woff2', '200 700'),
  fontFace('Source Sans Pro', 'node_modules/@fontsource/source-sans-pro/files/source-sans-pro-latin-600-normal.woff2', '600'),
  fontFace('Lato', 'node_modules/@fontsource/lato/files/lato-latin-400-normal.woff2', '400'),
].join('\n');

const LOGO_URI = dataUri(join(IMG_DIR, 'logo-nextswift.webp'), 'image/webp');
const FOTO_URI = dataUri(join(IMG_DIR, 'foto-efer.webp'), 'image/webp');

if (!LOGO_URI) console.warn('[gen-og] ⚠ logo-nextswift.webp no encontrado.');
if (!FOTO_URI) console.warn('[gen-og] ⚠ foto-efer.webp no encontrado — OG sin foto.');

// Glifo WhatsApp (verde oficial #25D366 solo en el ícono — coherente con M5).
const WA_SVG = `<svg viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg"><path d="M19.05 4.94A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.19h-.003a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.196-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.248-.124-1.47-.726-1.696-.808-.227-.083-.393-.124-.559.124-.165.248-.64.807-.785.973-.144.165-.289.186-.537.062-.248-.124-1.047-.386-1.995-1.231-.737-.657-1.235-1.469-1.38-1.717-.144-.248-.015-.382.109-.505.111-.111.248-.289.372-.434.124-.145.165-.248.248-.413.083-.165.041-.31-.021-.434-.062-.124-.559-1.347-.766-1.844-.202-.484-.406-.418-.559-.426l-.476-.008a.916.916 0 0 0-.662.31c-.227.248-.869.849-.869 2.07 0 1.222.89 2.403 1.014 2.568.124.165 1.752 2.674 4.245 3.749.593.256 1.056.409 1.417.523.595.189 1.137.162 1.565.098.477-.071 1.47-.601 1.677-1.181.207-.58.207-1.078.145-1.181-.062-.103-.227-.165-.475-.289z"/></svg>`;

function buildHtml({ eyebrow, title, subtitle }) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
${FONT_FACES}
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:1200px;height:630px;}
body{position:relative;overflow:hidden;color:#fff;
  font-family:'Lato','Source Sans Pro',system-ui,sans-serif;
  background:
    radial-gradient(120% 120% at 88% -12%, rgba(62,234,243,0.12), rgba(62,234,243,0) 55%),
    linear-gradient(135deg,#002a55 0%,#003366 100%);}
.accent{position:absolute;top:0;left:0;width:8px;height:630px;background:#3EEAF3;z-index:3;}
.photo{position:absolute;top:0;right:0;width:472px;height:630px;z-index:1;
  object-fit:cover;object-position:center top;
  -webkit-mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,.55) 28%,#000 62%);
          mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,.55) 28%,#000 62%);}
.photo-tint{position:absolute;top:0;right:0;width:472px;height:630px;z-index:1;
  background:linear-gradient(to right,#003366 0%,rgba(0,51,102,.20) 46%,rgba(0,51,102,0) 100%);}
.frame{position:absolute;inset:0;padding:62px 72px 118px;z-index:2;display:flex;flex-direction:column;}
.logo-chip{align-self:flex-start;display:inline-flex;align-items:center;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.10);
  border-radius:12px;padding:10px 16px;}
.logo{height:46px;width:auto;display:block;}
.col{margin-top:auto;margin-bottom:auto;max-width:660px;}
.eyebrow{font-family:'Source Sans Pro','Lato',sans-serif;font-weight:600;font-size:24px;
  letter-spacing:3px;text-transform:uppercase;color:#3EEAF3;margin-bottom:22px;}
.headline{font-family:'Oswald','Oswald Variable',sans-serif;font-weight:700;
  font-size:82px;line-height:1.02;letter-spacing:-.5px;color:#fff;}
.subtitle{margin-top:26px;font-size:30px;font-weight:400;color:rgba(255,255,255,.78);max-width:600px;}
.footer{position:absolute;left:72px;bottom:50px;z-index:3;display:flex;align-items:center;gap:12px;
  font-size:23px;color:rgba(255,255,255,.62);}
.footer svg{width:30px;height:30px;flex:0 0 auto;}
</style></head><body>
<div class="accent"></div>
${FOTO_URI ? `<img class="photo" src="${FOTO_URI}" alt=""><div class="photo-tint"></div>` : ''}
<div class="frame">
  ${LOGO_URI ? `<span class="logo-chip"><img class="logo" src="${LOGO_URI}" alt="NextSwift"></span>` : `<span class="logo-chip"><span style="font-family:'Oswald',sans-serif;font-weight:700;font-size:30px;color:#fff;letter-spacing:1px;">NextSwift</span></span>`}
  <div class="col">
    <div class="eyebrow">${esc(eyebrow)}</div>
    <div class="headline" id="hl">${esc(title)}</div>
    ${subtitle ? `<div class="subtitle">${esc(subtitle)}</div>` : ''}
  </div>
</div>
<div class="footer">${WA_SVG}<span>nextswift.mx · Partner operativo B2B</span></div>
</body></html>`;
}

// Reduce el tamaño del headline hasta que entre en su caja (anti-desbordamiento).
function fitScript() {
  const hl = document.getElementById('hl');
  if (!hl) return;
  const MAX_H = 250; // px disponibles para el headline (~3 líneas)
  let size = 78;
  hl.style.fontSize = size + 'px';
  while ((hl.scrollHeight > MAX_H || hl.scrollWidth > hl.clientWidth) && size > 38) {
    size -= 2;
    hl.style.fontSize = size + 'px';
  }
}

// ── Render ────────────────────────────────────────────────────────────────────
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  try {
    ({ chromium } = await import('@playwright/test'));
  } catch {
    console.error(
      '[gen-og] ✗ No se pudo importar Chromium. Ejecuta en la máquina de build:\n' +
        '         npm install && npx playwright install chromium',
    );
    process.exit(1);
  }
}

const only = process.argv.slice(2);
const pages = only.length ? PAGES.filter((p) => only.includes(p.slug)) : PAGES;
if (only.length && pages.length !== only.length) {
  const missing = only.filter((s) => !PAGES.some((p) => p.slug === s));
  console.warn(`[gen-og] ⚠ slugs desconocidos ignorados: ${missing.join(', ')}`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

for (const p of pages) {
  await page.setContent(buildHtml(p), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready.then(() => true));
  await page.evaluate(fitScript);
  const outPath = join(OUT_DIR, `${p.slug}.png`);
  await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log(`[gen-og] ✓ ${p.slug}.png`);
}

await browser.close();
console.log(`\n[gen-og] Listo (${pages.length} imágenes). Archivos en public/images/og/`);

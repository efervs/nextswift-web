/**
 * gen-favicon.mjs — Favicon derivado del logo real (M17).
 *
 * Recorta el isotipo (ave/swift) de la mitad izquierda de
 * `public/images/logo-nextswift.webp` (vía background-size, letterbox navy) y
 * produce el set sobre fondo navy #003366:
 *   favicon-32.png · favicon-192.png · favicon-512.png · apple-touch-icon.png (180)
 *   favicon.svg  (contenedor SVG que embebe el recorte 192 → la pestaña usa el ave)
 *
 * Sustituye al isotipo "N" genérico de M1 (decisión de Efer: derivar del logo
 * real; calidad raster limitada a 16/32px aceptada).
 *
 * Render vía Chromium (Playwright, ya en devDependencies):
 *   npm install && npx playwright install chromium
 *
 * Uso:  node scripts/gen-favicon.mjs            (fracción 0.40 = la enviada)
 *       node scripts/gen-favicon.mjs 0.34        (ajusta el ancho del ave)
 *
 * TUNING: BIRD_FRACTION = ancho del logo (desde la izquierda) que se muestra.
 *   0.40 captura la marca completa centrada (validado). Bájala si entra parte
 *   del wordmark "NextSwift"; súbela si el ave se ve demasiado grande/cortada.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');
const LOGO = join(PUBLIC, 'images/logo-nextswift.webp');

const BIRD_FRACTION = Number(process.argv[2]) || 0.4;
const NAVY = '#003366';

if (!existsSync(LOGO)) {
  console.error(`[gen-favicon] ✗ no existe ${LOGO}`);
  process.exit(1);
}

const logoUri = `data:image/webp;base64,${readFileSync(LOGO).toString('base64')}`;
const bgSize = (100 / BIRD_FRACTION).toFixed(1);
const favHtml = `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:100vw;height:100vh;overflow:hidden;background:${NAVY}}
.f{width:100vw;height:100vh;background:${NAVY} url('${logoUri}') no-repeat;background-size:${bgSize}% auto;background-position:left center}
</style></head><body><div class="f"></div></body></html>`;

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  try {
    ({ chromium } = await import('@playwright/test'));
  } catch {
    console.error('[gen-favicon] ✗ Chromium no disponible. Ejecuta: npm install && npx playwright install chromium');
    process.exit(1);
  }
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(favHtml, { waitUntil: 'load' });

const SIZES = [
  ['favicon-512.png', 512],
  ['favicon-192.png', 192],
  ['apple-touch-icon.png', 180],
  ['favicon-32.png', 32],
];
for (const [name, s] of SIZES) {
  await page.setViewportSize({ width: s, height: s });
  await page.screenshot({ path: join(PUBLIC, name), clip: { x: 0, y: 0, width: s, height: s } });
  console.log(`[gen-favicon] ✓ ${name}`);
}

await browser.close();

// favicon.svg: contenedor escalable que embebe el recorte 192 (la pestaña usa el ave).
const b64 = readFileSync(join(PUBLIC, 'favicon-192.png')).toString('base64');
writeFileSync(
  join(PUBLIC, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192"><image width="192" height="192" href="data:image/png;base64,${b64}"/></svg>\n`,
  'utf-8',
);
console.log(`[gen-favicon] ✓ favicon.svg\n[gen-favicon] Listo (fracción ${BIRD_FRACTION}). Revisa favicon-32.png a tamaño real.`);

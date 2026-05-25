# QA Pre-launch NextSwift — 2026-05-19

> **Fase 28 / P23** del `PLAN_IMPLEMENTACION_NEXTSWIFT_CONDENSADO.md`. Compuerta de
> go-live (Fase 29). No se cierra hasta tener:
> 1. 0 bugs **P0** abiertos.
> 2. Firma de Efer en `§7 Sign-off`.
> 3. Lighthouse CI verde en las 7 rutas críticas (§4).
> 4. `astro check` + `npm run build` + `pagefind` limpios (§1).

---

## 1. Build determinista — checks automáticos

| Check | Comando | Resultado | Fecha |
| --- | --- | --- | --- |
| `astro check` | `npm run check` | ✅ 0 errors / 0 warnings / 42 hints pre-existentes | 2026-05-19 |
| `astro build` | `npm run build` | ✅ 31 HTML emitidos, 0 warnings nuevos | 2026-05-19 |
| `pagefind` index | `postbuild` | ✅ 1 idioma (es-mx) · 8 páginas indexadas · 879 palabras | 2026-05-19 |
| Type-safety tracking lib | `npm run check` | ✅ `tracking.ts`, `consent.ts`, `wa.ts` sin diagnostics | 2026-05-19 |

Los 42 hints son `interface Props {…}` no usados en `ui/*.astro` y dos `Property '_fbq'` en `Base.astro` (inline Pixel stub) — pre-existentes a P23, no bloquean go-live.

---

## 2. Matriz cross-browser × dispositivo (24 combos mínimos)

> **Cómo se llena:** Efer corre los flujos críticos de §3 contra BrowserStack
> (o LambdaTest / Sauce / dispositivo físico) y marca cada celda:
> `✅` pass · `⚠️` warning (P1/P2) · `❌` fail (P0) · `—` no aplica.
>
> Mínimo aceptable para go-live: todos los **flujos críticos** marcados
> ✅ o ⚠️ con bug catalogado en §5. Cualquier ❌ es P0 y bloquea.

### 2.1 Desktop (1920×1080)

| Browser | Flujo 1 lectura | Flujo 2 quiz | Flujo 3 form | Flujo 4 WA | Flujo 5 blog | Flujo 6 cookies |
| --- | --- | --- | --- | --- | --- | --- |
| Chrome 130+ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Safari 17+  | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Firefox 130+ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Edge 130+   | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

### 2.2 Desktop (1366×768)

| Browser | Flujo 1 lectura | Flujo 2 quiz | Flujo 3 form | Flujo 4 WA | Flujo 5 blog | Flujo 6 cookies |
| --- | --- | --- | --- | --- | --- | --- |
| Chrome 130+ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Safari 17+  | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Firefox 130+ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Edge 130+   | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

### 2.3 Tablet (iPad 768×1024 portrait)

| Browser | Flujo 1 lectura | Flujo 2 quiz | Flujo 3 form | Flujo 4 WA | Flujo 5 blog | Flujo 6 cookies |
| --- | --- | --- | --- | --- | --- | --- |
| Safari iPadOS 17+ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Chrome iPadOS    | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

### 2.4 Mobile

| Device / Browser | Flujo 1 lectura | Flujo 2 quiz | Flujo 3 form | Flujo 4 WA | Flujo 5 blog | Flujo 6 cookies |
| --- | --- | --- | --- | --- | --- | --- |
| iPhone 14 (390×844) / Safari iOS 17+ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| iPhone 14 (390×844) / Chrome iOS    | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Pixel 7 (360×800) / Chrome Android  | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Pixel 7 (360×800) / Firefox Android | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

**Total mínimo:** 24 combos device × browser × flujo crítico.
**Prioridad si tiempo es corto:** Mobile Safari + Mobile Chrome (>70% del tráfico esperado MX) → Desktop Chrome → resto.

---

## 3. Flujos críticos E2E

> Cada flujo lleva los **pasos exactos**, el **selector clave** y el
> **resultado esperado deterministico**. Si un paso falla, abrir bug en §5
> con la severidad correspondiente.

### Flujo 1 — Lectura (home → /utilidad)
1. Visitar `/`.
2. Verificar hero H1 = `Vendo pero no gano dinero`, eyebrow visible, foto Efer cargada (`loading=eager`, `fetchpriority=high`).
3. Scroll completo (0 → 100%). Sin reflow visible, sin `overflow-x` horizontal.
4. Abrir dropdown **Servicios ▾** (desktop) o drawer mobile.
5. Click en **Utilidad**.
6. Verificar URL = `/utilidad`, H1 de landing visible.
7. Scroll completo.

**Expected:** sin errores en console, LCP < 2.5s en 3G, sticky CTA mobile aparece tras scrollear el hero fuera de viewport.

### Flujo 2 — Quiz (home → /diagnostico → resultado)
1. `/` → CTA ghost (`[data-cta="diagnostico"]`) — texto: `Diagnostique gratis su fuga de margen`.
2. URL = `/diagnostico`. `#quiz` visible. Pregunta 1 de N visible.
3. Responder N preguntas (8-12 según `QUESTIONS` en `src/lib/quiz.ts`).
4. Paso captura: `firstname`, `email`, `whatsapp` + `privacy_accepted` checkbox.
5. Submit → `/gracias-quiz?eid=...`.
6. Verificar **Test Events** (Meta Events Manager): evento `Lead` con `event_id` deduplicado client + server.
7. Verificar HubSpot contact creado con `utm_*` populados desde `sessionStorage`.

**Expected:** dedup % ≥ 95% en últimas 24h. GA4 DebugView: evento `lead` con `event_id` como param.

### Flujo 3 — Form auditoría (/utilidad → /auditoria → /gracias-auditoria)
1. `/utilidad` → CTA primario (`[data-cta-primary]`) — texto: `Verificar si su restaurante califica`.
2. URL = `/auditoria`. `#audit-step-label` = `Paso 1 de 6`.
3. Completar 6 pasos: sales range → pain primary → units → decisor → timing → identidad + checkbox privacidad.
4. Submit → `/gracias-auditoria?eid=...`.
5. Verificar HubSpot: contact creado con `pipeline_id` correcto, stage = `New`, propiedades `painprimary`, `salesrange`, `units`, etc.
6. Verificar Test Events: `CompleteRegistration` con `event_id`.

**Expected:** form validation client-side bloquea avance sin selección. Mensaje `JavaScript requerido` si JS off (fallback documentado).

### Flujo 4 — WhatsApp (Hero → wa.me con UTMs)
1. `/` con `?utm_source=meta&utm_medium=paid&utm_campaign=utilidad-test`.
2. Verificar `sessionStorage['nx_utm']` populado.
3. Click `[data-wa-cta]` del hero — texto: `Hablar con Efer ahora`.
4. Verificar URL del popup wa.me contiene `utm_source=meta&utm_medium=paid&utm_campaign=utilidad-test`.
5. Verificar **Test Events**: evento `Contact` con `event_id` único, deduplicado client (Pixel) + server (CAPI).
6. Mensaje prefilled visible en WhatsApp.

**Expected:** `keepalive: true` en fetch a `/api/capi` → evento llega aunque la pestaña haya navegado.

### Flujo 5 — Blog (/blog → post → CTA contextual)
1. Footer `/` → link **Blog**.
2. `/blog` con buscador Pagefind + chips de filtro.
3. Click chip pillar `utilidad` → solo se muestran posts con `data-pillar="utilidad"`.
4. Click primer post visible → URL `/blog/<slug>`.
5. Verificar breadcrumb, TOC sticky desktop (>=1024px), CTA contextual a `/utilidad` o `/auditoria` o `/diagnostico`.
6. Verificar JSON-LD `BlogPosting` + `BreadcrumbList` válidos en Rich Results Test.

**Expected:** filtrado client-side instantáneo, sin recarga. Pagefind UI sin errores en console.

### Flujo 6 — Cookies (LFPDPPP opt-in real)
1. Primera visita (clear `localStorage`).
2. Banner inferior visible con 3 botones: `Solo necesarias`, `Configurar`, `Aceptar todas`.
3. Click `Solo necesarias`.
4. Banner desaparece. `localStorage['cookieConsent'] = 'necessary'`.
5. Verificar Network: **0 requests** a `facebook.com/tr`, `connect.facebook.net`, `google-analytics.com`, `googletagmanager.com`.
6. Reload → banner NO reaparece, tracking sigue bloqueado.
7. Variante: nueva sesión incógnita → click `Aceptar todas` → Pixel + GA4 cargan, PageView dispara con `event_id`.

**Expected:** dedup PageView 100% en Test Events tras "Aceptar todas". Pre-consent = 0 tracking requests (compliance LFPDPPP).

---

## 4. Lighthouse CI — rutas críticas

> Comando: `npx lhci autorun --config=lighthouserc.json` (config existente en repo,
> targets perf ≥0.9 / a11y ≥0.95 / seo ≥0.95 / LCP ≤2s / CLS ≤0.05).

| Ruta | Perf | A11y | SEO | BP | LCP | CLS | Fecha |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| `/utilidad` | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| `/acelerador` | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| `/diagnostico` | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| `/auditoria` | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| `/blog` | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| `/gracias-auditoria` | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | — |

**Threshold para go-live:** las 7 rutas con perf ≥90, a11y ≥95, seo ≥95, BP ≥90.
Regresión > 5 pts vs baseline F23 → bug P1.

---

## 5. Catálogo de bugs

> **P0** = bloqueante go-live. Abrir Fase 28.X específica.
> **P1** = ship con tracking; fix antes de activar campañas pagadas.
> **P2** = backlog post-launch.

| # | Severidad | Origen | Issue | Responsable | ETA | Status |
| --- | --- | --- | --- | --- | --- | --- |
| _vacío_ | — | — | _Sin bugs detectados al cierre de §1 (build determinista). Esperando QA cross-device de Efer._ | — | — | — |

> Tabla a llenar tras corrida BrowserStack. Convención de origen:
> `F22-mobile`, `F23-perf`, `F24-a11y`, `F25-seo`, `F26-tracking`, `F27-compliance`,
> `F28-flow-N` (N = 1-6).

---

## 6. Tests automatizados (Playwright)

> Smoke harness opcional v1. Cubre los 6 flujos en `desktop-chromium`,
> `mobile-iphone-14`, `tablet-ipad`. NO sustituye BrowserStack — sirve para
> regresión local rápida.

### 6.1 Instalación (primera vez)

```powershell
cd C:\Users\Eferi\NextSwift\Web\astro-nextswift
npm install
npx playwright install
```

### 6.2 Comandos

```powershell
# Build + smoke en 3 proyectos
npm run build
npm run test:e2e

# Solo desktop (smoke rápido pre-commit)
npm run test:e2e:smoke

# Modo UI interactivo (debug)
npm run test:e2e:ui

# Contra preview Cloudflare en vez de localhost
$env:E2E_BASE_URL = "https://preview-XXXX.nextswift.pages.dev"
npm run test:e2e
```

### 6.3 Especificaciones

| Spec | Flujo | Notas |
| --- | --- | --- |
| `tests/e2e/flow-1-lectura.spec.ts` | 1 | Home scroll + dropdown → /utilidad. |
| `tests/e2e/flow-2-quiz.spec.ts` | 2 | Quiz UI (no submit real — requiere HUBSPOT_TOKEN). |
| `tests/e2e/flow-3-form.spec.ts` | 3 | Form UI + validación step 1 (no submit real). |
| `tests/e2e/flow-4-whatsapp.spec.ts` | 4 | wa.me URL con UTMs frescos desde sessionStorage. |
| `tests/e2e/flow-5-blog.spec.ts` | 5 | Filtro pillar + primer post + CTA contextual. |
| `tests/e2e/flow-6-cookies.spec.ts` | 6 | "Solo necesarias" → 0 requests Pixel + persistencia. |

**Limitación deliberada:** los submits reales (HubSpot + CAPI) se validan
manualmente en BrowserStack vs preview Cloudflare — requieren tokens en
runtime y crean contactos reales que ensucian el pipeline.

---

## 7. Sign-off de Efer

```
☐ §1 Build determinista limpio                    (verificado por agente)
☐ §2 Matriz 24 combos completada                  (Efer / BrowserStack)
☐ §3 Flujos 1-6 ejecutados E2E en preview         (Efer)
☐ §4 Lighthouse CI verde en 7 rutas               (Efer / `npm run lhci`)
☐ §5 0 bugs P0 abiertos                           (Efer)
☐ §6 Smoke Playwright local verde                 (Efer opcional)
☐ DH-03 (clientes destacados) — revisado / aceptado pendiente
☐ DH-09 (legal LFPDPPP) — revisado / aceptado pendiente con copy provisional

DECISIÓN FINAL — marca uno:
☐ GO              — lanzar a producción.
☐ CONDITIONAL GO  — lanzar con bugs P1 documentados en §5.
☐ NO-GO           — bloqueado, bugs P0 listados en §5.

Firmado: _____________________
Fecha:   _____________________
```

> Mientras `§7` no esté firmado y todos los ☐ marcados, **Fase 29 (go-live)
> queda bloqueada** por dependencia explícita del `PLAN_IMPLEMENTACION_NEXTSWIFT_INDEX.md`
> línea 290.

---

## 8. Bloque PowerShell — handoff a Efer

```powershell
# ─────────────────────────────────────────────────────────────
# Fase 28 / P23 — QA pre-launch NextSwift
# Working dir: C:\Users\Eferi\NextSwift\Web\astro-nextswift
# ─────────────────────────────────────────────────────────────

# 1. Build determinista (re-correr si tocaste código tras P22).
cd C:\Users\Eferi\NextSwift\Web\astro-nextswift
npm run check
npm run build
# Esperado: 0 errors / 0 warnings. dist/client con 31 HTML + _pagefind/.

# 2. Lighthouse CI en las 7 rutas críticas.
npm install --save-dev @lhci/cli   # primera vez
npm run lhci
# Output: reportes en .lighthouseci/. Threshold perf ≥0.9 / a11y ≥0.95 / seo ≥0.95.

# 3. Playwright smoke local (opcional pero recomendado).
npm install                         # instala @playwright/test del package.json
npx playwright install              # descarga browsers (~300MB primera vez)
npm run test:e2e
# Output: 6 specs × 3 proyectos = 18 tests. Reporte HTML en playwright-report/.

# 4. Preview Cloudflare (para QA manual cross-device en BrowserStack).
npx wrangler pages deploy dist/client --project-name=nextswift --branch=qa-fase28
# Toma la preview URL emitida y pégala en BrowserStack.

# 5. Manual cross-browser en BrowserStack (24 combos mínimos).
#    - Login: https://www.browserstack.com/users/sign_in
#    - Live: device × browser × Flujo 1-6 según §2.
#    - Marca cada celda en este archivo (qa_nextswift.md §2).
#    - Si un flujo falla: registra bug en §5 con severidad P0/P1/P2.

# 6. Test Events Meta Events Manager.
#    - https://business.facebook.com/events_manager2/list/pixel/1545738293336210/test_events
#    - Disparar Flujo 2 (Lead), Flujo 3 (CompleteRegistration), Flujo 4 (Contact)
#      desde el preview URL.
#    - Verificar dedup % ≥ 95% últimas 24h.

# 7. Firmar §7 cuando todos los ☐ estén marcados.
git add astro-nextswift/qa_nextswift.md astro-nextswift/playwright.config.ts `
        astro-nextswift/tests/ astro-nextswift/package.json astro-nextswift/.gitignore
git commit -m "P23: QA pre-launch checklist + Playwright smoke harness (Fase 28)"
```

---

## 9. Notas y deuda viva tras P23

- **DH-09 (legal LFPDPPP):** sigue pendiente revisión por abogado mexicano antes de Fase 29. P27 entregó páginas legales y banner consent — funcional pero con disclaimer "preliminar".
- **DH-03 (clientes destacados):** sigue pendiente confirmación si los 5 casos de prueba social pueden citarse con métricas literales en `/casos-de-exito` o solo agregadas.
- **`PUBLIC_GA4_MEASUREMENT_ID`** opcional — sin cargar no rompe, pero GA4 DebugView queda offline. Decidir antes de campañas pagadas.
- **`META_CAPI_TOKEN`** debe estar cargado en Cloudflare Pages env. Sin él, eventos server-side fallan silentes y dedup % cae.
- **Smoke Playwright** no valida submits reales (HubSpot + CAPI) — se delega a BrowserStack manual contra preview con tokens reales.
- **Mobile Safari** es históricamente fuente de bugs (`100dvh`, `position: sticky` en `overflow-x: hidden` body, safe-area-inset). Priorizar en §2.

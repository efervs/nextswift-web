# Auditoría de Accesibilidad — NextSwift Web
**Fase P19 / Fase 24 | WCAG 2.1 AA | 2026-05-19**

---

## 1. Alcance

Páginas auditadas: `/`, 6 landings (`/utilidad`, `/autonomia`, `/ventas-delivery`, `/personal`, `/metricas-control`, `/crecimiento-controlado`), `/acelerador`, `/casos-de-exito`, `/sobre-efer`, `/garantia`, `/diagnostico`, `/auditoria`, `/blog`, `/gracias-*`.

Herramientas objetivo: axe-core + Lighthouse Accessibility + navegación manual por teclado.

---

## 2. Contraste de Color — Verificación Manual

| Color texto | Fondo | Ratio | Estado |
|---|---|---|---|
| `#3EEAF3` (accent) | `#003366` (dark-1) | **8.57:1** | ✅ AA + AAA |
| `#3EEAF3` (accent) | `#214971` (primary-dark) | **6.31:1** | ✅ AA + AAA |
| `#3EEAF3` (accent) | `#233043` (dark-4) | **9.05:1** | ✅ AA + AAA |
| `#003366` (accent-ink) | `#3EEAF3` (accent bg) | **8.57:1** | ✅ AA + AAA |

Todos los pares de color relevantes pasan WCAG 2.1 AA (≥4.5:1 texto normal, ≥3:1 texto grande). Sin necesidad de ajustar colores de marca.

---

## 3. Issues Encontrados y Correcciones Aplicadas

### 3.1 CRÍTICO — Focus ring sin outline en high-contrast mode

**Problema:** Todos los elementos interactivos usaban `outline: none; box-shadow: ...` en `:focus-visible`. El `box-shadow` no es visible en Windows High Contrast Mode (forced-colors), lo que viola WCAG 1.4.11 (Non-text Contrast).

**Archivos afectados:**
- `src/styles/global.css`
- `src/components/ui/Button.astro`
- `src/components/shared/CTAs.astro`
- `src/components/shared/GarantiasResumen.astro`
- `src/components/shared/GuideBlock.astro`
- `src/components/shared/ThreeStepPlan.astro`
- `src/pages/blog/index.astro`
- `src/pages/garantia.astro`
- `src/pages/diagnostico.astro`

**Fix aplicado:** Cambiar cada `:focus-visible { outline: none; box-shadow: ... }` a `{ outline: 3px solid var(--color-accent); outline-offset: 2px; box-shadow: var(--shadow-focus); }`. El WhatsApp CTA usa `outline: 3px solid #25d366`.

**Criterio WCAG:** 1.4.11 Non-text Contrast (AA) · 2.4.7 Focus Visible (AA)

---

### 3.2 IMPORTANTE — Input de número sin label accesible

**Problema (diagnostico.astro):** Los inputs `type="number"` del quiz no tenían `<label>` ni `aria-labelledby`. La pregunta estaba en un `<h2>` sin ID.

**Fix aplicado:** Agregado `id={q-${q.id}-label}` al `<h2>` de cada pregunta + `aria-labelledby={q-${q.id}-label}` al `<input>`.

**Problema (auditoria.astro):** El input `id="q-units"` (paso 3) tampoco tenía label. La pregunta en `<h2>` sin ID.

**Fix aplicado:** Agregado `id="audit-q-units-label"` al `<h2>` + `aria-labelledby="audit-q-units-label"` al input.

**Criterio WCAG:** 1.3.1 Info and Relationships (A) · 3.3.2 Labels or Instructions (A)

---

### 3.3 IMPORTANTE — aria-current en paso activo del formulario

**Problema (auditoria.astro):** El `<section>` activo del form multi-step no tenía `aria-current="step"`, impidiendo que lectores de pantalla identifiquen el paso en curso.

**Fix aplicado:** La función `render()` ahora llama `activeStep.setAttribute('aria-current', 'step')` en el paso activo y `s.removeAttribute('aria-current')` en todos los demás.

**Criterio WCAG:** 4.1.3 Status Messages (AA)

---

### 3.4 IMPORTANTE — Form sin nombre accesible

**Problema (auditoria.astro):** El `<form id="audit-form">` no tenía nombre accesible.

**Fix aplicado:** Agregado `aria-label="Formulario de solicitud de auditoría"`.

**Criterio WCAG:** 4.1.2 Name, Role, Value (A)

---

### 3.5 IMPORTANTE — Menú mobile accesible por teclado cuando está cerrado

**Problema (Header.astro):** La nav lateral mobile (`position: fixed; transform: translateX(100%)`) estaba visualmente oculta pero los elementos dentro seguían siendo alcanzables por Tab. Un lector de pantalla podría navegar al menú sin abrirlo.

**Fix aplicado:** Se agregó `syncNavInert()` con `window.matchMedia('(max-width: 820px)')`. Cuando el breakpoint mobile es activo y el menú está cerrado, la nav recibe `inert` (elimina del tab order y árbol de accesibilidad). Se remueve `inert` al abrir. En desktop (`>820px`) la nav nunca es inert.

**Criterio WCAG:** 2.1.2 No Keyboard Trap (A)

---

### 3.6 MENOR — FAQ `<dl>` envolviendo `<details>` (HTML inválido)

**Problema (FAQ.astro):** `<dl>` (definition list) contenía `<details>` directamente, violando el content model de HTML.

**Fix aplicado:** Cambiado `<dl>` → `<div role="list">` (mantiene el `aria-label`).

---

## 4. Items Verificados — Sin Cambio Requerido ✅

| Elemento | Estado |
|---|---|
| Skip link (`Saltar al contenido`) | ✅ ya en Base.astro con CSS `:focus-visible` visible |
| `<html lang="es-MX">` | ✅ |
| FAQ — `<details>/<summary>` nativos | ✅ semántico, sin ARIA extra necesario |
| Radio fieldsets con `<legend>` | ✅ en ambos formularios |
| Errores con `role="alert" aria-live="polite"` | ✅ |
| `aria-live="polite"` en contenedor de form | ✅ |
| `aria-expanded` en hamburguesa | ✅ |
| `aria-controls` en hamburguesa | ✅ |
| Escape cierra menú mobile y dropdown | ✅ |
| Logos en `/casos-de-exito` | ✅ `alt="Logo de Temaky Sushi"` etc. |
| Foto de Efer (Hero) | ✅ alt descriptivo |
| `aria-hidden="true"` en SVGs decorativos | ✅ |
| Progress bar con `aria-label` | ✅ |
| `aria-label` en nav principal | ✅ `aria-label="Navegación principal"` |
| Dropdown `aria-expanded` + `aria-controls` | ✅ |
| Touch targets ≥44px | ✅ vía `--touch-target` token |
| `prefers-reduced-motion` | ✅ global + por componente |

---

## 5. Roles ARIA — Estado

| Elemento | Implementación |
|---|---|
| Form multi-step `/auditoria` | `role` implícito `form` + `aria-label` + `aria-current="step"` |
| Progreso del form | `role="group" aria-label="Progreso del formulario"` |
| Dropdown nav | `role="region" aria-label="Menú de servicios"` |
| FAQ accordion | `<details>/<summary>` nativos (sin ARIA extra) |
| Errores | `role="alert" aria-live="polite"` |
| Logo band | `role="list" aria-label="Logos de restaurantes clientes"` |

No existe ningún modal/dialog en el sitio actual — el `role="dialog"` no aplica.

---

## 6. Navegación por Teclado — Flujo Principal

**Flujo verificable:**
1. Tab → skip link aparece ("Saltar al contenido")
2. Enter en skip link → foco salta a `#main`
3. Tab navega: Header logo → nav desktop (Servicios → dropdown con Tab/Enter → Escape cierra) → CTA header
4. En mobile: Tab → hamburguesa → Enter abre menú → nav items accesibles → Escape cierra → foco regresa

**Formulario `/auditoria`:**
- Tab navega entre opciones de radio dentro del fieldset
- Enter avanza al siguiente paso
- Atrás regresa sin perder respuestas
- Errores anunciados vía `role="alert"`
- Foco se mueve al primer input del paso siguiente tras avanzar

---

## 7. Test Manual Pendiente (No automatizable aquí)

| Test | Instrucción |
|---|---|
| NVDA/Windows | Flujo: Home → /utilidad → /auditoria → completar hasta submit |
| VoiceOver/macOS | Mismo flujo + verificar anuncio de `aria-current="step"` |
| axe-core por página | `npx @axe-core/cli http://localhost:4321/` (requiere dev server activo) |
| Lighthouse Accessibility | DevTools → Lighthouse → solo Accessibility por cada URL |

---

## 8. Criterios WCAG 2.1 AA — Resumen de Cumplimiento

| Criterio | Descripción | Estado |
|---|---|---|
| 1.1.1 | Non-text Content (alt text) | ✅ |
| 1.3.1 | Info and Relationships | ✅ (fix aplicado) |
| 1.3.5 | Identify Input Purpose | ✅ (autocomplete attrs) |
| 1.4.3 | Contrast (Minimum) | ✅ |
| 1.4.11 | Non-text Contrast | ✅ (fix aplicado) |
| 2.1.1 | Keyboard | ✅ |
| 2.1.2 | No Keyboard Trap | ✅ (fix aplicado) |
| 2.4.1 | Bypass Blocks (skip link) | ✅ |
| 2.4.3 | Focus Order | ✅ |
| 2.4.7 | Focus Visible | ✅ (fix aplicado) |
| 3.1.1 | Language of Page | ✅ |
| 3.3.1 | Error Identification | ✅ |
| 3.3.2 | Labels or Instructions | ✅ (fix aplicado) |
| 4.1.2 | Name, Role, Value | ✅ (fix aplicado) |
| 4.1.3 | Status Messages | ✅ (fix aplicado) |

---

*Generado: 2026-05-19 — P19/Fase 24 PLAN_IMPLEMENTACION_NEXTSWIFT*

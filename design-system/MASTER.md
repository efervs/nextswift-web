# Design System Master File — NextSwift

> **LOGIC:** Cuando construyas una página específica, primero revisa `design-system/pages/[page-name].md`.
> Si ese archivo existe, sus reglas **sobrescriben** este Master.
> Si no existe, sigue estrictamente las reglas de abajo — **con la sección "NextSwift Brand Overrides" como capa final**.

---

**Project:** NextSwift
**Generated:** 2026-05-12 16:24:25 (skill `ui-ux-pro-max`, query "B2B consultoría restaurantes operaciones rentabilidad partner operativo")
**Category:** B2B Service · Trust & Authority
**Last updated:** 2026-05-12 (Fase 3, override de marca aplicado)

---

## 🔒 NextSwift Brand Overrides (autoridad final)

> Las recomendaciones institucionales abajo provienen del skill. **NextSwift las sobrescribe** en color y tipografía con tokens declarados por Efer y verificados en `Web/PLAN_IMPLEMENTACION_NEXTSWIFT_INDEX.md` líneas 87-99. Implementadas como CSS vars en `src/styles/tokens.css`.

### Paleta canónica (sobrescribe la sección "Color Palette" más abajo)

| Rol | Hex | Token CSS | Uso |
|---|---|---|---|
| **Accent crítico** | `#3EEAF3` | `--color-accent` | CTAs primarias, eyebrow on-dark, badges accent, focus ring |
| Accent ink (texto sobre accent) | `#003366` | `--color-accent-ink` | texto sobre accent — contraste 7.3:1 ✓ AAA |
| Primary | `#4A90E2` | `--color-primary` | hover de CTA, links |
| Primary dark | `#214971` | `--color-primary-dark` | eyebrow accent, links default |
| Blue light | `#93C4FF` | `--color-blue-light` | acentos suaves en superficies dark |
| Neutral 700 | `#5C7A96` | `--color-neutral-700` | texto muted, borders strong |
| Neutral 300 | `#B3BEC9` | `--color-neutral-300` | borders default |
| Background | `#FFFFFF` | `--color-bg` | superficie default |
| Surface alt | `#F6F8FB` | `--color-surface-alt` | superficies alternas |
| **Dark 1** | `#003366` | `--color-dark-1` | navy institucional, fondo dark mode |
| Dark 2 | `#2B6095` | `--color-dark-2` | hover sobre dark, accent secundario |
| Dark 3 | `#404F61` | `--color-dark-3` | borders en dark |
| Dark 4 | `#233043` | `--color-dark-4` | surface alt en dark |
| Muted | `#959595` | `--color-muted` | texto deshabilitado |
| Soft | `#D3D3D3` | `--color-soft` | divisores suaves |

### Tipografía canónica (sobrescribe la sección "Typography" más abajo)

| Rol | Familia | Uso | Carga |
|---|---|---|---|
| Heading | **Oswald Variable** | H1, H2, H3 — voz consultoría densa | `@fontsource-variable/oswald` |
| Subheading | **Source Sans Pro** | Eyebrow, botones, etiquetas | `@fontsource/source-sans-pro` (400, 600) |
| Body | **Lato** | Párrafos, listas, microcopy | `@fontsource/lato` (400, 700) |

- Self-host vía `@fontsource*` (no CDN). `font-display: swap` por defecto del paquete.
- Escala tipográfica fluida vía `clamp()` declarada en `tokens.css` (`--fs-h1` … `--fs-eyebrow`).
- Plus Jakarta Sans (sugerido por skill) **no se usa** — fuera de identidad de marca.

### Patrón de página (alineado al brief)

- **Pattern:** Hospitality-First Bento Grid (Kuzma) sobre la pattern institucional "Feature-Rich Showcase + Trust" del skill.
- **CTA above fold:** dual — primary "Agenda diagnóstico" + ghost "WhatsApp con Efer" (Ciancio).
- **Stakes / Wall of Proof / Garantías** son secciones núcleo, no opcionales.

### Reglas no negociables (cumplen ambos: skill + CLAUDE.md §10)

- Cero hex literales fuera de `tokens.css` y este MASTER.md (verificable con grep en componentes).
- Cero emojis como íconos. SVG (Heroicons/Lucide) o nada.
- Focus ring único: `box-shadow: var(--shadow-focus)` (cyan).
- Touch target mínimo 44×44 px (Button md/lg cumplen).
- `prefers-reduced-motion` respetado globalmente (ver `global.css`).
- Contraste WCAG AA mínimo, AAA en accent+ink.

### Anti-patrones de marca (suma a los del skill)

- Glamour stock ("transformación digital", "soluciones 360", "engagement"): vetados (CLAUDE.md §10).
- Carruseles automáticos en hero (Kuzma).
- Testimonial sin métrica + plazo + autorización (Beaudoin / DH-NEW-01).

---

## Global Rules

> Lo de aquí abajo es la salida cruda del skill. **Solo aplica donde NO entra en conflicto con la sección de overrides**. Cuando haya conflicto, ganan los tokens NextSwift.

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#0F172A` | `--color-primary` |
| Secondary | `#334155` | `--color-secondary` |
| CTA/Accent | `#0369A1` | `--color-cta` |
| Background | `#F8FAFC` | `--color-background` |
| Text | `#020617` | `--color-text` |

**Color Notes:** Professional navy + blue CTA

### Typography

- **Heading Font:** Plus Jakarta Sans
- **Body Font:** Plus Jakarta Sans
- **Mood:** friendly, modern, saas, clean, approachable, professional
- **Google Fonts:** [Plus Jakarta Sans + Plus Jakarta Sans](https://fonts.google.com/share?selection.family=Plus+Jakarta+Sans:wght@300;400;500;600;700)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #0369A1;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #0F172A;
  border: 2px solid #0F172A;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #0F172A;
  outline: none;
  box-shadow: 0 0 0 3px #0F172A20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Trust & Authority

**Keywords:** Certificates/badges displayed, expert credentials, case studies with metrics, before/after comparisons, industry recognition, security badges

**Best For:** Healthcare/medical landing pages, financial services, enterprise software, premium/luxury products, legal services

**Key Effects:** Badge hover effects, metric pulse animations, certificate carousel, smooth stat reveal

### Page Pattern

**Pattern Name:** Feature-Rich Showcase + Trust

- **CTA Placement:** Above fold
- **Section Order:** Hero > Features > CTA

---

## Anti-Patterns (Do NOT Use)

- ❌ Playful design
- ❌ Hidden credentials
- ❌ AI purple/pink gradients

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile

# NextSwift — Home page overrides

> **LOGIC:** Esta página override gana sobre `design-system/MASTER.md` para la home.
> Generado por skill `ui-ux-pro-max` 2026-05-12 + ajustes manuales por conflicto con tokens.css de Fase 3.

---

## 1. Decisión maestra: tokens.css gana

El skill `ui-ux-pro-max --page home` propuso una paleta y tipografía que **chocan con tokens.css de Fase 3**.
Plan extendido §FASE 4 PASO 5: *"Si el skill propone paleta/estilo que conflictúa con tokens.css de Fase 3, GANA tokens.css."*

Por lo tanto, los valores reales que se aplican en producción son los de `src/styles/tokens.css` y `src/styles/global.css`, no los del skill.

### Conflictos detectados

| Aspecto | Skill propuso | tokens.css impone (FUENTE DE VERDAD) |
|---|---|---|
| Color primario | `#0F172A` (slate-900) | `--color-dark-1: #003366` (navy NextSwift) |
| Color secundario | `#334155` | `--color-primary: #4A90E2` |
| Color CTA / accent | `#0369A1` | `--color-accent: #3EEAF3` (cyan) |
| Fondo | `#F8FAFC` | `--color-bg: #FFFFFF` + `--color-surface-alt: #F6F8FB` |
| Texto | `#020617` | `--color-text: var(--color-dark-1)` (#003366) |
| Tipografía heading | Plus Jakarta Sans | Oswald Variable |
| Tipografía body | Plus Jakarta Sans | Lato |
| Tipografía subheading | — | Source Sans Pro |
| Espaciado | `--space-xs..3xl` (4–64px lineal) | Escala fluida `--space-1..12` con `clamp()` |
| Radios | `8/12/16px` planos | `--radius-1..5` (4/8/12/16/24) + `--radius-pill` |

### Patrón del skill que SÍ se respeta

- **Style:** Trust & Authority (alineado al ICP B2B-restaurantes premium del brief §2).
- **Pattern:** Hero + Features + CTA (alineado con Bento Grid §6 del brief, aunque NextSwift lo refina con tiles fijos por palanca).
- **Anti-patterns globales** (incorporados al sitio entero):
  - No emojis como iconos — solo SVG Heroicons/Lucide.
  - No gradientes IA-purple/pink.
  - Sin "playful design".
  - Sin hidden credentials.

---

## 2. Spec del Hero (P4 / Fase 4)

### Estructura

```
<section.hero>
  <div.hero__copy>
    <Eyebrow tone="accent">SISTEMAS OPERATIVOS Y RENTABILIDAD B2B PARA RESTAURANTES</Eyebrow>
    <Heading as="h1">Vendo pero no gano dinero</Heading>
    <Body size="lead" tone="muted">
      Rehabilitamos la economía y operación de tu restaurante en 10 días hábiles.
      Diagnóstico, plan, ejecución — con garantía operativa y dueño dentro de la cabina.
    </Body>
    <ul.hero__bullets>
      <li>Diagnóstico de fuga de margen en 10 días: mermas, costeo, mix, descuentos, ticket promedio.</li>
      <li>Operación que funciona cuando no estás: SOPs, encargado entrenado, dashboard semanal.</li>
      <li>Crecimiento que no te quiebra: paid media + canal directo + retención, en ese orden.</li>
    </ul>
    <div.hero__cta-stack>
      <Button variant="primary" size="lg" data-cta="hero-wa">Habla por WhatsApp con Efer</Button>
      <Button variant="ghost" size="lg" href="#oferta">Agenda diagnóstico de 30 min</Button>
    </div>
  </div>
  <div.hero__visual>
    <Image astro:assets src=src/assets/foto-efer.webp />
  </div>
</section>
```

### Reglas del hero

1. **Un solo `<h1>` por página** — vive en Hero, ningún otro h1 en `/`.
2. **Grunt Test ≤ 5s** — usuario externo debe responder en 5s: qué ofrecen, a quién, qué hacer.
3. **Touch target ≥ 44px** — ya cubierto por `Button size="lg"` (min-height: 3.5rem = 56px).
4. **LCP < 2.5s** — `<Image>` con `loading="eager"` + `fetchpriority="high"` + `widths=[400,800,1200]`.
5. **Focus ring visible** — heredado de `.btn:focus-visible { box-shadow: var(--shadow-focus); }`.
6. **`prefers-reduced-motion`** — sin transforms en hover si está activo (override CSS).
7. **CTA primario = vetting + WhatsApp** (dualidad operador-estratega Ciancio, brief §5).
8. **CTA secundario ghost** = `#oferta` (anchor a sección que monta P8).
9. **Tracking dual Pixel + CAPI** con `event_id` único, fire-and-forget vía `navigator.sendBeacon`.

### Copy semilla — fuente única

Brief §9.1 verbatim. Cualquier desviación se documenta aquí con OK explícito de Efer.

---

## 3. Spec del ProofBar (P4 / Fase 4)

### Datos autorizados (memory: project_casos_prueba_social.md 2026-05-12)

- Pangas: 4.4★/490 → 4.6★/646 en <2 meses.
- Temaky: +42% margen delivery.
- Oita Fresh: $0 → $300k/mes desde cero.
- Sr. Boneless: solo logo (familia).
- Hare Krishna: logo `data-pending-auth` hasta cierre formal de DH-NEW-01.

### Métrica agregada (validada con Efer 2026-05-12)

> "+42% margen delivery · $0 → $300k/mes en arranque · 4.4 → 4.6★ en <2 meses"
> — en 3 de 5 restaurantes acompañados por NextSwift

### Logos (orden visual)

Pangas · Temaky · Oita Fresh · Sr. Boneless · Hare Krishna(pending)

---

## 4. Anti-patrones específicos de la home

- Sin video en hero (DH-05).
- Sin countdowns, escasez falsa, "limited time".
- Sin la palabra "marketing", "publicidad" o "redes sociales" en hero (glosario anti-agencia, brief §10).
- Sin carruseles automáticos.
- Sin stock photos.

---

## 5. Checklist de cierre Hero (Fase 4)

- [ ] `document.querySelectorAll('h1').length === 1` en `/`.
- [ ] Lighthouse mobile LCP < 2.5s.
- [ ] axe-core hero: 0 violations.
- [ ] Botones primary + ghost con focus ring visible.
- [ ] `astro check` limpio.
- [ ] Grunt Test ≤ 5s validado con 1 persona externa.
- [ ] Capturas 1366×768 y 390×844.
- [ ] Pixel + CAPI dedup OK en Events Manager (BLOQUEADO hasta env `PUBLIC_META_PIXEL_ID` + `META_CAPI_TOKEN` en Cloudflare).

# NextSwift — `/utilidad` page overrides

> **LOGIC:** Esta página override gana sobre `design-system/MASTER.md`.
> Generado por skill `ui-ux-pro-max --page utilidad` 2026-05-14 + override manual por conflicto con tokens.css de Fase 3.
> Fuente del skill (referencia interna, no se aplica): `design-system/nextswift/pages/utilidad.md`.

---

## 1. Decisión maestra: tokens.css gana

El skill propuso un design system **incompatible** con NextSwift (style "Vibrant & Block-based" + paleta roja + Playfair Display SC + pattern "Pricing-Focused Landing"). Aplica la regla del Plan extendido §FASE 4 PASO 5: *"Si el skill propone paleta/estilo que conflictúa con tokens.css de Fase 3, GANA tokens.css."*

### Conflictos detectados

| Aspecto | Skill propuso | tokens.css impone (FUENTE DE VERDAD) |
|---|---|---|
| Style global | Vibrant & Block-based | Trust & Authority (brief §6 Hospitality-First) |
| Color primario | `#DC2626` (red) | `--color-dark-1: #003366` (navy) |
| Color CTA | `#CA8A04` (gold) | `--color-accent: #3EEAF3` (cyan) |
| Fondo | `#FEF2F2` (rojo pálido) | `--color-bg: #FFFFFF` + surface-alt `#F6F8FB` |
| Heading | Playfair Display SC | Oswald Variable |
| Body | Karla | Lato |
| Pattern | Pricing-Focused (3 tiers + price cards) | Pain-Anchored Landing (Hero pain → Stakes → Caso → Plan → Oferta resumida → CTAs → FAQ). **Pricing oculto, DH-04**. |

### Patrón del skill que SÍ se respeta

- Anti-emojis (SVG icons only).
- Touch target ≥ 44px.
- Transitions 150–300ms.
- `prefers-reduced-motion` respetado.
- Light mode contrast ≥ 4.5:1.

---

## 2. Spec del Hero `/utilidad`

### Estructura

```
<section.hero hero--landing>
  <div.hero__copy>
    <Eyebrow tone="accent">PALANCA FINANCIERA · EL DOLOR MÁS PROFUNDO Y UNIVERSAL</Eyebrow>
    <Heading as="h1">Vendo pero no gano dinero</Heading>
    <Body size="lead" tone="muted">
      Encontramos la fuga de margen en 10 días hábiles: mermas, costeo descalibrado,
      descuentos no autorizados, mix de menú equivocado. Recuperas 3-7 puntos en 90 días,
      con dashboard semanal que valida el avance.
    </Body>
    <ul.hero__bullets>
      <li>Auditoría forense de mermas, costo de platillos y ticket promedio real.</li>
      <li>Rediseño de menú por rentabilidad, no por gusto.</li>
      <li>Dashboard semanal con margen real, no estimado.</li>
    </ul>
    <div.hero__cta-stack>
      <Button variant="primary" size="lg" href={waUrl} data-cta="hero-wa-utilidad">Habla por WhatsApp con Efer</Button>
      <Button variant="ghost" size="lg" href="#oferta" data-cta="hero-ghost-utilidad">Agenda diagnóstico de 30 min</Button>
    </div>
  </div>
</section>
```

### Reglas

1. **Un solo `<h1>` por página** — vive en Hero.
2. **Eyebrow ancla la palanca** (Financiera). Diferencia este Hero del `/personal` y `/autonomia` (Operativa).
3. **Touch target ≥ 44px** — cubierto por `Button size="lg"`.
4. **CTAs bifurcados** (Ciancio): primario vetting + ghost transicional.
5. **wa.me con UTM prefilled** (`buildWaUrl` de `src/lib/whatsapp-url.ts`) con `utm_landing=utilidad`.

### Copy semilla — fuente

Brief §9.3 verbatim. Sin desviación sin OK explícito de Efer.

---

## 3. Caso ancla autorizado

**Temaky Sushi** (memory: project_casos_prueba_social.md 2026-05-12)
- Métricas publicables: **+42% margen general delivery (neto)**, **negocio vendido > $1.6M MXN**, ROAS rentable.
- Atribución: "exdueña de restaurante de sushi en Monterrey" (sin nombre).
- Logo: autorización pendiente — `data-pending-auth` hasta confirmar.
- Quote opcional: "Hubiera querido que llegaran 15, o mejor 20 años antes para arreglar todo."

---

## 4. Anti-patrones específicos de `/utilidad`

- Sin la palabra "marketing", "publicidad", "redes sociales" — glosario anti-agencia (brief §10).
- Sin gradientes IA-purple/pink.
- Sin emojis como íconos.
- Sin pricing visible (DH-04: pricing oculto).
- Sin testimonios sin métrica (brief §8 Wall of Proof exige 4 de 7 métricas mínimas).

---

## 5. Ad-to-page message match (paid media)

- **Primary keyword:** "margen restaurante" / "fuga de margen restaurante"
- **Variantes long-tail:** "por qué mi restaurante vende y no gana dinero", "auditoría de costos restaurante", "food cost restaurante México"
- **Ad headline canónico:** "Vendo pero no gano dinero — diagnóstico de fuga de margen en 10 días"
- **Ad message match en hero:** H1 = headline del anuncio (1:1).
- **UTM landing:** `utm_landing=utilidad`.
- **Pixel event al cargar:** `PageView` + `content_name=utilidad` + `content_category=palanca-financiera`.

---

## 6. Checklist de cierre

- [ ] `document.querySelectorAll('h1').length === 1` en `/utilidad`.
- [ ] Eyebrow + H1 + subhead + 3 bullets + 2 CTAs presentes.
- [ ] `Stakes variant="landing" painSlug="utilidad"` renderiza.
- [ ] `ThreeStepPlan variant="landing" painContext="utilidad"` renderiza.
- [ ] CasoAncla muestra métricas Temaky (sin nombre persona).
- [ ] Link a `/acelerador` presente en resumen de oferta.
- [ ] FAQ 3-5 preguntas específicas a margen/utilidad.
- [ ] `astro check` limpio.

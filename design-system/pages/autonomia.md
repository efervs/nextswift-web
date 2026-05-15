# NextSwift — `/autonomia` page overrides

> **LOGIC:** Esta página override gana sobre `design-system/MASTER.md`.
> Generado por skill `ui-ux-pro-max --page autonomia` 2026-05-14 + override manual.
> Fuente del skill (referencia): `design-system/nextswift/pages/autonomia.md`.

---

## 1. Decisión maestra: tokens.css gana

Misma regla que `/utilidad`: el skill propuso paleta/style incompatibles → ganan tokens.css + brief.

| Aspecto | tokens.css impone |
|---|---|
| Style | Trust & Authority |
| Primario | `#003366` navy |
| Accent | `#3EEAF3` cyan |
| Heading | Oswald Variable |
| Body | Lato |
| Pattern | Pain-Anchored Landing |

---

## 2. Spec del Hero `/autonomia`

```
<section.hero hero--landing>
  <Eyebrow tone="accent">PALANCA OPERATIVA · EL DOLOR MÁS EMOCIONAL</Eyebrow>
  <Heading as="h1">El negocio depende demasiado de mí</Heading>
  <Body size="lead" tone="muted">
    Construimos un restaurante que puede operar 72 horas sin ti — encargado entrenado,
    SOPs documentados, ritmo de junta semanal. Probamos la ausencia controlada en semana 12.
  </Body>
  <ul>
    <li>Encargado entrenado con rúbrica, no con intuición.</li>
    <li>SOPs documentados para apertura, cierre, compras y conflictos.</li>
    <li>Prueba de ausencia controlada en semana 12 — sin que caiga ticket promedio.</li>
  </ul>
  <Button primary>Habla por WhatsApp con Efer</Button>
  <Button ghost>Agenda diagnóstico de 30 min</Button>
</section>
```

### Reglas

1. Un solo `<h1>`.
2. Eyebrow ancla palanca **Operativa** (diferencia de `/personal` que también es Operativa pero anclada en compensación/rotación).
3. wa.me con `utm_landing=autonomia`.

### Copy semilla — fuente

Brief §9.5 verbatim.

---

## 3. Caso ancla autorizado

**Oita Fresh** (memory 2026-05-12)
- Métrica: **$0 → $300,000 ventas/mes** construido desde cero.
- Atribución: Efer Lara como **operador ejecutivo embedded** (CEO de arranque, a las órdenes de Raúl García, fundador).
- Logo + uso completo: autorizado por Raúl García.
- Encuadre: "Restaurante construyó su operación replicable desde día 1 con encargado capaz de sostenerla sin presencia del fundador."

---

## 4. Anti-patrones específicos

- Sin lenguaje de "transformación digital" o "soluciones a la medida" (brief §10).
- Sin métricas inventadas. Solo Oita Fresh tiene cifra publicable para autonomía.
- Sin íconos emoji.

---

## 5. Ad-to-page message match

- **Primary keyword:** "delegar restaurante" / "manuales operativos restaurante"
- **Long-tail:** "mi restaurante depende de mí", "cómo dejar de trabajar 80 horas restaurante", "SOPs restaurante"
- **Ad headline canónico:** "El negocio depende demasiado de mí — sistema operativo en 12 semanas"
- **UTM landing:** `utm_landing=autonomia`.
- **Pixel:** `content_name=autonomia` + `content_category=palanca-operativa`.

---

## 6. Checklist

- [ ] 1 H1.
- [ ] Eyebrow Operativa + copy §9.5 verbatim.
- [ ] `Stakes variant="landing" painSlug="autonomia"`.
- [ ] `ThreeStepPlan variant="landing" painContext="autonomia"`.
- [ ] CasoAncla Oita Fresh con métrica $300k/mes.
- [ ] Link a `/acelerador`.
- [ ] FAQ 3-5 sobre delegación / encargado / SOPs.
- [ ] `astro check` limpio.

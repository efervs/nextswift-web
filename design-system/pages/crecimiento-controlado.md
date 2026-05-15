# NextSwift — `/crecimiento-controlado` page overrides

> **LOGIC:** Override sobre `design-system/MASTER.md`.
> Generado por skill `ui-ux-pro-max --page crecimiento-controlado` 2026-05-14 + override manual.
> Fuente del skill (referencia): `design-system/nextswift/pages/crecimiento-controlado.md`.

---

## 1. Decisión maestra: tokens.css gana

Mismo principio. tokens.css + brief mandan.

---

## 2. Spec del Hero `/crecimiento-controlado`

```
<section.hero hero--landing>
  <Eyebrow tone="accent">PALANCA DE EXPANSIÓN · EL DOLOR MÁS PREMIUM</Eyebrow>
  <Heading as="h1">Quiero crecer sin caos</Heading>
  <Body size="lead" tone="muted">
    Convertimos tu restaurante en modelo replicable: manual operativo, economía unitaria
    documentada, plan de expansión por escenarios. En 90 días tienes lo que un inversionista
    o socio operativo necesita ver.
  </Body>
  <ul>
    <li>Manual operativo replicable (no genérico, sino el TUYO).</li>
    <li>Economía unitaria documentada — por platillo, por turno, por sucursal.</li>
    <li>Plan de expansión por escenarios — segunda sucursal, franquicia, o dark kitchen.</li>
  </ul>
  <Button primary>Habla por WhatsApp con Efer</Button>
  <Button ghost>Agenda diagnóstico de 30 min</Button>
</section>
```

### Reglas

1. Un solo `<h1>`.
2. Eyebrow ancla palanca **Expansión** (única landing con esta etiqueta).
3. Esta landing tiene tono ligeramente más premium — el ICP aquí ya tiene 1-2 unidades estables.
4. wa.me con `utm_landing=crecimiento-controlado`.

### Copy semilla — fuente

Brief §9.8 verbatim.

---

## 3. Caso ancla autorizado

**Oita Fresh** (memory 2026-05-12)
- Métrica publicable: **$0 → $300,000 ventas/mes desde cero**, sistema operativo construido replicable.
- Atribución: Efer Lara como **operador ejecutivo embedded** (CEO de arranque, autorizado por Raúl García).
- Logo + uso completo: autorizado.
- Encuadre: "Restaurante diseñó su economía unitaria y manual operativo desde el día 1 — lo que permitió escalar sin caos."
- Diferencia con uso en `/autonomia`: ahí se enfatiza encargado capaz; aquí se enfatiza replicabilidad y economía unitaria.

---

## 4. Anti-patrones específicos

- Sin lenguaje VC ("escalable", "moonshot", "unicornio") — brief §10.
- Sin promesa de "abre 10 sucursales" — la promesa es 1 modelo replicable en 90 días.
- Sin tono motivacional ("¡atrévete a crecer!").
- Sin íconos emoji.

---

## 5. Ad-to-page message match

- **Primary keyword:** "crecer restaurante" / "abrir segunda sucursal restaurante"
- **Long-tail:** "cómo franquiciar mi restaurante", "manual operativo restaurante para crecer", "economía unitaria restaurante"
- **Ad headline canónico:** "Quiero crecer sin caos — modelo replicable de tu restaurante en 90 días"
- **UTM landing:** `utm_landing=crecimiento-controlado`.
- **Pixel:** `content_name=crecimiento-controlado` + `content_category=palanca-expansion`.

---

## 6. Checklist

- [ ] 1 H1.
- [ ] Eyebrow Expansión + copy §9.8 verbatim.
- [ ] `Stakes variant="landing" painSlug="crecimiento-controlado"`.
- [ ] `ThreeStepPlan variant="landing" painContext="crecimiento-controlado"`.
- [ ] CasoAncla Oita Fresh enfocado en replicabilidad (no en encargado).
- [ ] Link a `/acelerador`.
- [ ] FAQ 3-5 sobre segunda sucursal / franquicia / manual / economía unitaria.
- [ ] `astro check` limpio.

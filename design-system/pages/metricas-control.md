# NextSwift — `/metricas-control` page overrides

> **LOGIC:** Override sobre `design-system/MASTER.md`.
> Generado por skill `ui-ux-pro-max --page metricas-control` 2026-05-14 + override manual.
> Fuente del skill (referencia): `design-system/nextswift/pages/metricas-control.md`.

---

## 1. Decisión maestra: tokens.css gana

Mismo principio. tokens.css + brief mandan.

---

## 2. Spec del Hero `/metricas-control`

```
<section.hero hero--landing>
  <Eyebrow tone="accent">PALANCA FINANCIERA · EL DOLOR MÁS SILENCIOSO</Eyebrow>
  <Heading as="h1">No tengo claridad real de números</Heading>
  <Body size="lead" tone="muted">
    Construimos tu dashboard semanal en 21 días: 10 KPIs operativos y financieros,
    integrados con tu POS, entregados cada lunes. Decides con datos, no con sensaciones.
  </Body>
  <ul>
    <li>10 KPIs semanales: margen, ticket, merma, rotación, costo de mano de obra.</li>
    <li>Integración con POS existente (no necesitas cambiar sistema).</li>
    <li>Revisión asistida los primeros 4 lunes — quedas autónomo al día 30.</li>
  </ul>
  <Button primary>Habla por WhatsApp con Efer</Button>
  <Button ghost>Agenda diagnóstico de 30 min</Button>
</section>
```

### Reglas

1. Un solo `<h1>`.
2. Eyebrow ancla palanca **Financiera** — diferencia de `/utilidad` que también es Financiera pero anclada en margen recuperado, no en visibilidad.
3. wa.me con `utm_landing=metricas-control`.

### Copy semilla — fuente

Brief §9.7 verbatim.

---

## 3. Caso ancla autorizado

**Temaky Sushi** (memory 2026-05-12)
- Métrica publicable: **+42% margen general delivery**, **dashboard + P&L documentado** permitió venta del negocio por **> $1.6M MXN**.
- Atribución: "exdueña de restaurante de sushi en Monterrey".
- Logo: autorización pendiente — `data-pending-auth`.
- Encuadre: "Dashboard semanal + P&L estructurado convirtió un restaurante opaco en un activo vendible."

---

## 4. Anti-patrones específicos

- Sin lenguaje BI corporativo ("data-driven", "business intelligence") — brief §10.
- Sin promesa de "dashboard mágico" — la promesa es 21 días + revisión asistida.
- Sin íconos emoji.
- Sin captura mockup de dashboard genérico — si hay imagen, debe ser dashboard real (anonimizado).

---

## 5. Ad-to-page message match

- **Primary keyword:** "dashboard restaurante" / "KPIs restaurante"
- **Long-tail:** "no entiendo los números de mi restaurante", "P&L restaurante México", "dashboard semanal restaurante POS"
- **Ad headline canónico:** "No tengo claridad real de números — dashboard semanal en 21 días"
- **UTM landing:** `utm_landing=metricas-control`.
- **Pixel:** `content_name=metricas-control` + `content_category=palanca-financiera`.

---

## 6. Checklist

- [ ] 1 H1.
- [ ] Eyebrow Financiera + copy §9.7 verbatim.
- [ ] `Stakes variant="landing" painSlug="metricas-control"`.
- [ ] `ThreeStepPlan variant="landing" painContext="metricas-control"`.
- [ ] CasoAncla Temaky con dashboard que permitió venta.
- [ ] Link a `/acelerador`.
- [ ] FAQ 3-5 sobre POS / dashboard / KPIs / autonomía en lectura.
- [ ] `astro check` limpio.

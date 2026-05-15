# NextSwift — `/personal` page overrides

> **LOGIC:** Override sobre `design-system/MASTER.md`.
> Generado por skill `ui-ux-pro-max --page personal` 2026-05-14 + override manual.
> Fuente del skill (referencia): `design-system/nextswift/pages/personal.md`.

---

## 1. Decisión maestra: tokens.css gana

Mismo principio. tokens.css + brief mandan.

---

## 2. Spec del Hero `/personal`

```
<section.hero hero--landing>
  <Eyebrow tone="accent">PALANCA OPERATIVA · EL DOLOR MÁS CONSTANTE</Eyebrow>
  <Heading as="h1">Mi personal es un desmadre</Heading>
  <Body size="lead" tone="muted">
    Instalamos estructura: escalafón claro, bonos por desempeño, propinas justas,
    política de retroalimentación. Bajamos rotación al menos 50% en 90 días, con
    encargado capacitado para sostenerlo.
  </Body>
  <ul>
    <li>Escalafón con bonos por ticket promedio, no por horas.</li>
    <li>Política de propinas y de retroalimentación documentada.</li>
    <li>Encargado formado para sostener el sistema, sin depender del dueño.</li>
  </ul>
  <Button primary>Habla por WhatsApp con Efer</Button>
  <Button ghost>Agenda diagnóstico de 30 min</Button>
</section>
```

### Reglas

1. Un solo `<h1>`.
2. Eyebrow ancla palanca **Operativa** — diferencia de `/autonomia` (delegación) por el ángulo: aquí compensación + rotación + cultura.
3. wa.me con `utm_landing=personal`.

### Copy semilla — fuente

Brief §9.6 verbatim.

---

## 3. Caso ancla autorizado

**Hare Krishna** (memory 2026-05-12)
- Estado: **caso activo / en proceso** — sin cifra financiera todavía.
- Logros publicables (cualitativos): sistematización de operación con personal complejo (voluntarios + remunerados), menú con precios inteligentes, control general.
- Logo: autorización **pendiente** — `data-pending-auth` hasta confirmar.
- Encuadre: caso activo, no debilidad. "Restaurante con dinámica de personal mixta convirtió operación informal en sistema documentado."
- Sin métrica numérica hasta cierre formal de DH-NEW-01.

---

## 4. Anti-patrones específicos

- Sin lenguaje RRHH corporativo ("clima laboral", "engagement del colaborador") — brief §10.
- Sin promesa de rotación cero (la promesa es "al menos 50% reducción en 90 días").
- Sin íconos emoji.
- No usar nombre de personas (solo restaurante).

---

## 5. Ad-to-page message match

- **Primary keyword:** "rotación personal restaurante"
- **Long-tail:** "personal de restaurante no dura", "bajar rotación cocina restaurante", "capacitar encargado restaurante"
- **Ad headline canónico:** "Mi personal es un desmadre — rotación −50% en 90 días con escalafón claro"
- **UTM landing:** `utm_landing=personal`.
- **Pixel:** `content_name=personal` + `content_category=palanca-operativa`.

---

## 6. Checklist

- [ ] 1 H1.
- [ ] Eyebrow Operativa + copy §9.6 verbatim.
- [ ] `Stakes variant="landing" painSlug="personal"`.
- [ ] `ThreeStepPlan variant="landing" painContext="personal"`.
- [ ] CasoAncla Hare Krishna como activo/cualitativo.
- [ ] Link a `/acelerador`.
- [ ] FAQ 3-5 sobre rotación / bonos / propinas / encargado.
- [ ] `astro check` limpio.

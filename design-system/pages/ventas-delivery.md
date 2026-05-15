# NextSwift — `/ventas-delivery` page overrides

> **LOGIC:** Override sobre `design-system/MASTER.md`.
> Generado por skill `ui-ux-pro-max --page ventas-delivery` 2026-05-14 + override manual.
> Fuente del skill (referencia): `design-system/nextswift/pages/ventas-delivery.md`.

---

## 1. Decisión maestra: tokens.css gana

Mismo principio que páginas anteriores. tokens.css + brief mandan.

---

## 2. Decisión arquitectónica: dark kitchens absorbidos aquí

Esta landing **incluye dark kitchens** en un bullet del Stakes y en una pregunta del FAQ — sin H1/H2 dedicados. Ver INDEX línea 52: el piso $300k MXN/mes filtra a la mayoría; los pocos que califican entran por delivery y reciben el mismo tratamiento.

---

## 3. Spec del Hero `/ventas-delivery`

```
<section.hero hero--landing>
  <Eyebrow tone="accent">PALANCA COMERCIAL · EL DOLOR MÁS FÁCIL DE VENDER</Eyebrow>
  <Heading as="h1">Las ventas están flojas</Heading>
  <Body size="lead" tone="muted">
    Reactivamos tráfico recurrente y reducimos dependencia de marketplaces en 60-90 días.
    Primero ordenamos cocina; después subimos volumen. Sin gasolina en motor fundido.
  </Body>
  <ul>
    <li>Paid media medido contra utilidad, no contra likes ni alcance.</li>
    <li>Migración de 15-20% de pedidos de marketplaces a canal directo.</li>
    <li>Plan de recurrencia con base de datos propia (no rentada).</li>
  </ul>
  <Button primary>Habla por WhatsApp con Efer</Button>
  <Button ghost>Agenda diagnóstico de 30 min</Button>
</section>
```

### Reglas

1. Un solo `<h1>`.
2. **Anti-agencia explícito:** la palabra "marketing" NO entra en hero. Se sustituye por "tráfico", "experimentos pagados medidos contra utilidad", "recurrencia".
3. Eyebrow ancla palanca **Comercial**.
4. wa.me con `utm_landing=ventas-delivery`.

### Copy semilla — fuente

Brief §9.4 verbatim.

---

## 4. Caso ancla autorizado

**Pangas Sabores del Mar** (memory 2026-05-12)
- Métrica: **4.4★/490 → 4.6★/646 reseñas en <2 meses**.
- Intervención publicable: "sistema de reseñas + experimentos pagados".
- Logo: autorizado por el dueño.
- Atribución: solo restaurante, sin nombre de persona (no disponible).
- Estado relación: inactivo desde mayo 2026 (presupuesto del cliente). El caso queda vigente.

---

## 5. Anti-patrones específicos

- Sin "Meta Ads" / "Google Ads" / "marketing digital" / "redes sociales" en hero o subhead. Permitidos en FAQ con contexto.
- Sin promesas de ROAS específico (DH-04 + glosario anti-agencia).
- Sin mención de "campaña creativa" o "creativos".

---

## 6. Ad-to-page message match

- **Primary keyword:** "ventas restaurante" / "ventas flojas restaurante"
- **Long-tail:** "cómo subir ventas restaurante Monterrey", "dependo de Rappi y Didi", "tráfico directo restaurante", "dark kitchen sin ventas"
- **Ad headline canónico:** "Las ventas están flojas — reactivamos tráfico recurrente en 60-90 días"
- **Variantes ad para dark kitchens:** "Dark kitchen sin ventas — diagnóstico de marketplace y canal directo"
- **UTM landing:** `utm_landing=ventas-delivery`.
- **Pixel:** `content_name=ventas-delivery` + `content_category=palanca-comercial`.

---

## 7. Checklist

- [ ] 1 H1 "Las ventas están flojas".
- [ ] Bullet del Stakes menciona dark kitchens.
- [ ] FAQ contiene 1 pregunta dark-kitchen-specific.
- [ ] `Stakes variant="landing" painSlug="ventas-delivery"`.
- [ ] `ThreeStepPlan variant="landing" painContext="ventas-delivery"`.
- [ ] CasoAncla Pangas con métrica reseñas + logo autorizado.
- [ ] Link a `/acelerador`.
- [ ] `astro check` limpio.

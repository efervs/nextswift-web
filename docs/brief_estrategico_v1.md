# BRIEF ESTRATÉGICO v1 — NextSwift.mx

**Fecha:** 2026-05-12
**Autoridad:** Efer Lara (Eferi). Síntesis ejecutada bajo P1 del PLAN_IMPLEMENTACION_NEXTSWIFT.
**Naturaleza:** documento fundacional. Alimenta las Fases 3 (sistema visual), 4-8 (home), 9 (6 landings), 10-12 (casos / sobre-efer / garantía), 13-18 (conversión), 19 (blog), 25-26 (SEO / tracking).
**Fuentes primarias:** investigación marketing-CRO de seis especialistas — Hormozi (Grand Slam Offer), Miller (StoryBrand SB7), Ciancio (BOFU restaurant), Kuzma (BentoBox Hospitality-First), Laja (CXL / CRAVENS), Beaudoin (Restaurant Rockstars). Archivos en `Investigaciones Webpages/`.
**Fuentes operativas:** `auditoria_nextswift_v1.md`, `nav-orden-dolores.md`, `minuta_de_cambios_nextswift.md`.

---

## §1 — MENSAJERÍA NÚCLEO

### Promesa central (una sola oración, Grunt Test SB7)

> **NextSwift es la consultoría B2B mexicana que rehabilita restaurantes que venden pero no ganan dinero: en 10 días hábiles diagnosticamos la fuga de margen, ordenamos la operación y reactivamos las ventas — con garantía operativa y dueño dentro de la cabina.**

Esta oración pasa los tres filtros del Grunt Test (Miller): qué ofrecemos (rehabilitación de margen y operación), cómo mejora la vida del dueño (deja de trabajar 14 horas para no llevarse dinero a casa), y qué tiene que hacer para comprarlo (10 días, plazo cerrado). Cumple también el principio de Laja: específica, medible y diferenciada del lugar común "marketing para restaurantes". Y respeta el principio de Beaudoin: cuantificable, no aspiracional.

### Tres sub-promesas por palanca

NextSwift opera bajo tres palancas que estructuran tanto el Acelerador 3 Palancas como las landings dependientes. Cada palanca tiene su propia sub-promesa de cabecera, derivada del mapeo dolor → palanca:

1. **Palanca Financiera — "Recupera tu margen antes que tus ventas."**
   Ataca el dolor 1 (utilidad) y el dolor 5 (métricas). La promesa subordinada es identificar la fuga de utilidad (mermas, costeo, mix, descuentos no autorizados, ticket promedio mal calibrado) y devolver al dueño un cuadro de mando que le diga, todos los lunes, cuánto dinero ganó la semana pasada.

2. **Palanca Operativa — "Construye un restaurante que funcione cuando no estás."**
   Ataca el dolor 3 (autonomía) y el dolor 4 (personal). La promesa subordinada es instalar SOPs, ritmos de junta, rúbricas de turno, escalafones, sistema de propinas/bonos y un encargado entrenado para que el dueño pueda salir del piso 3 días a la semana sin que se caiga el ticket promedio ni la merma.

3. **Palanca Comercial — "Vende más cuando tu cocina ya esté lista para soportarlo."**
   Ataca el dolor 2 (ventas-delivery) y el dolor 6 (crecimiento). La promesa subordinada es subir tráfico — orgánico, paid, delivery, walk-in, recurrencia — solo después de que la operación pueda absorber el volumen sin colapsar. Esta es la lección estructural de Ciancio: marketing en restaurantes mal operados es gasolina en motor fundido.

### Jerarquía de uso

- La promesa central es el H1 del hero del home y aparece literal en `<meta description>` y schema `Organization.description`.
- Las tres sub-promesas son los tres "tiles" superiores del Bento Grid de Kuzma en el ATF y a su vez los tres bloques del componente "Plan" SB7 (Sección §6).
- Cada landing de dolor toma su sub-promesa correspondiente como subhead bajo el H1 verbatim de `nav-orden-dolores.md`.

---

## §2 — TAXONOMÍA ICP (CLIENTE IDEAL)

### Definición operativa (firmográfica + psicográfica + de comportamiento)

**Capa firmográfica (filtros duros de calificación, vía formulario y quiz):**
- **Capacidad:** restaurante con 50-150 comensales sentados o equivalente — incluye dark kitchens, food halls y restaurantes con barra de delivery integrada.
- **Ventas mensuales:** mínimo $300,000 MXN brutos / mes. Por debajo de ese piso, el ROI de la consultoría no justifica el ticket — y aplicar Hormozi sin volumen suficiente sólo genera frustración mutua.
- **Antigüedad:** mínimo 12 meses de operación. Restaurantes en mes 0-12 viven una etapa de estabilización que requiere otra metodología (pre-apertura), fuera del ICP actual.
- **Geografía:** Monterrey, Ciudad de México, Guadalajara (núcleos primarios). Mérida, Querétaro, Tijuana y Puebla como núcleos secundarios. Operamos remoto + 1-2 visitas presenciales según paquete.
- **Estructura:** dueño-operador o sociedad ≤4 socios. Cadenas corporativas con >5 sucursales caen fuera del ICP por velocidad de decisión y formato de contrato.
- **Modelo:** casual dining, fast-casual, especialidades étnicas, delivery-first, brunch/cafetería, barra de tapas/mariscos. Excluido por ahora: fine dining alta gama, hoteles, banqueteros puros.

**Capa psicográfica (lo que duele por dentro — taxonomía de Miller, capa interna):**
- Siente que trabaja para el restaurante en vez de que el restaurante trabaje para él.
- Cree que el problema es "faltan clientes" pero la auditoría revela que el problema es margen, no tráfico (dolor 1 enmascarado de dolor 2).
- Tiene miedo de revisar los números a fondo porque sospecha lo que va a encontrar.
- Vive con culpa difusa: "soy mal jefe", "no sé delegar", "no descanso pero tampoco crezco".
- No confía en agencias por una mala experiencia previa (con razón — la mayoría de las agencias venden tráfico sin diagnosticar margen).

**Capa de comportamiento (cómo decide y compra):**
- Investiga en silencio 4-8 semanas antes de contactar. Visita la página varias veces. Lee testimonios cuantitativos. Pregunta a colegas.
- Activa el contacto cuando hay un evento detonante: un mes especialmente malo, una sorpresa de Hacienda, un encargado que renunció, una pelea con socio sobre números, o un susto de salud por horas excesivas.
- Quiere hablar con un humano que entienda restaurantes — no quiere ser tratado como ticket. Esto es lo que Kuzma llama "Hospitality-First" y lo que en el sitio se traduce en CTA dual: "Agenda diagnóstico (humano)" / "Habla por WhatsApp (humano más rápido)".

### Perfil de buyer-persona principal — "Carlos, operador-dueño de 42 años"

- 12 años en el negocio, dos sucursales (una propia, una rentada).
- $480k MXN/mes ventas brutas, ~9% margen real (cree que es 18% — diferencia: descuentos no autorizados y merma de barra).
- Trabaja 70-80 horas/semana, no toma vacaciones desde hace 3 años.
- 22 empleados, rotación 110% anual.
- Ha probado dos agencias de marketing antes; le subieron tráfico de Instagram pero no margen.
- Sospecha que "algo se está fugando" y quiere certeza antes de meter más dinero en publicidad.
- No quiere comprar un curso; quiere que entren, ordenen, y lo dejen con un sistema funcionando.

Carlos es el avatar único contra el que se redacta TODO el copy del sitio: H1, subheads, FAQ, testimonios seleccionados, garantía, formulario. Si una frase no resuena con Carlos, no entra. Si una palabra técnica no la usa Carlos, no entra (regla heredada de Laja: "el copy se calibra contra la voz del cliente, no contra la voz del marketer").

### Antagonistas del ICP (lo que NO somos)

- No somos agencia de redes sociales.
- No somos contadores.
- No somos coaches motivacionales.
- No somos plataforma SaaS.
- No somos consultora corporativa para cadenas grandes.

Definir el "no-ICP" es tan importante como definir el ICP — pieza de Ciancio: "el efecto halo se construye descalificando al ruido, no abrazándolo".

---

## §3 — MAPEO 6 DOLORES → STORYBRAND SB7

La taxonomía de problema de Miller distingue tres estratos: **externo** (la circunstancia visible), **interno** (lo que el héroe siente sobre sí mismo) y **filosófico** (por qué está mal en términos de justicia / dignidad / orden del mundo). Una marca premium ataca los tres; una marca floja ataca solo el externo. NextSwift ataca los tres en cada landing.

### Dolor 1 — `/utilidad` — "Vendo pero no gano dinero"

- **Problema externo:** los estados de resultados muestran ventas robustas pero margen real bajo o negativo. Fuga concreta: mermas, costeo descalibrado, descuentos no autorizados, mix de menú que prioriza platillos de bajo margen, sueldo del dueño no reflejado, gastos hormiga no rastreados.
- **Problema interno:** el dueño se siente estafado por su propio negocio. Vergüenza de admitirlo a socios o pareja. Sospecha que el equipo "le está viendo la cara". Dormir mal.
- **Problema filosófico:** un negocio que vende mucho debería pagar al dueño. Un dueño que trabaja 70 horas merece llevarse dinero a casa. Eso es justicia laboral básica — y un sistema que no lo garantiza está roto.

### Dolor 2 — `/ventas-delivery` — "Las ventas están flojas"

- **Problema externo:** tráfico inconsistente. Días buenos y días vacíos. Dependencia excesiva de Rappi/UberEats/DiDi con comisiones del 28-32%. CAC subiendo. Recurrencia en caída.
- **Problema interno:** el dueño se siente impotente frente a la competencia. Cree que "el mercado ya no compra" o que "los jóvenes ya no salen a comer". Empieza a improvisar promociones que dañan margen sin reactivar volumen.
- **Problema filosófico:** un buen producto, bien operado, merece llenarse. El marketing no debería ser un cuento de hadas — debería ser un sistema reproducible. Quien ofrece valor merece tráfico predecible, no rezos.

### Dolor 3 — `/autonomia` — "El negocio depende demasiado de mí"

- **Problema externo:** el dueño es indispensable para abrir, cerrar, comprar, contratar, cocinar las recetas críticas, mediar conflictos, atender quejas. Sin él, el restaurante se cae en 72 horas.
- **Problema interno:** culpa por no haber construido bien el sistema. Resentimiento contra el equipo (que se siente mediocre). Resentimiento contra la familia (que reclama tiempo). Imposibilidad de planear su propia vida.
- **Problema filosófico:** la propiedad de un negocio debería conferir libertad, no esclavitud. Un dueño-rehén no es dueño, es empleado con riesgo. El restaurante debe poder existir sin él 30 días seguidos sin que se rompa.

### Dolor 4 — `/personal` — "Mi personal es un desmadre"

- **Problema externo:** alta rotación, ausentismo, conflictos entre turnos, propinas mal repartidas, falta de capacitación, encargados débiles, robo hormiga, falta de SOPs.
- **Problema interno:** el dueño se siente mal jefe. No quiere ser el ogro pero tampoco sabe ser estructurado. Vive entre la indulgencia y la explosión.
- **Problema filosófico:** un trabajo bien diseñado dignifica. La gente trabaja mejor cuando sabe qué se espera de ella, cómo se mide, y cómo gana más. El desmadre no es flojera de los empleados — es ausencia de sistema.

### Dolor 5 — `/metricas-control` — "No tengo claridad real de números"

- **Problema externo:** el contador entrega estados financieros 30 días tarde. El POS y la contabilidad no cuadran. No hay reporte diario, no hay KPIs operativos en vivo. El dueño "siente" cómo va el negocio en vez de medirlo.
- **Problema interno:** miedo a ver los números. Sensación de operar con los ojos vendados. Decisiones basadas en intuición y luego segundo-adivinarse a sí mismo.
- **Problema filosófico:** un negocio sin métricas no es un negocio, es una apuesta. La data clara es lo que diferencia a un dueño profesional de uno aficionado. Ver los números es un acto de respeto al propio trabajo.

### Dolor 6 — `/crecimiento-controlado` — "Quiero crecer sin caos"

- **Problema externo:** el dueño quiere abrir segunda sucursal, lanzar línea de delivery, o franquiciar — pero teme replicar errores. Sospecha que su modelo no está listo para escalar. Falta manual operativo, falta documentación financiera unitaria, falta sistema replicable.
- **Problema interno:** miedo a "morir de éxito". Recuerda historias de colegas que abrieron segunda y se quebraron. Confianza estancada.
- **Problema filosófico:** crecer es un derecho de quien ya construyó algo que funciona. Pero crecer mal es traicionar lo que ya funciona. Hay un modo profesional de escalar — y debería estar al alcance del operador mexicano, no solo del corporativo.

### Cómo se traduce a producción

Cada landing tiene una sección específica titulada "Lo que duele por dentro" (problema interno) y un manifiesto corto al pie del hero titulado "Por qué nos importa" (problema filosófico). Este patrón está validado por la conversión que reporta Miller en B2B servicios (lift del 40% al mover problema interno al ATF). El problema externo va al H1 y a la lista de síntomas; el interno va al subhead y al cuerpo; el filosófico va al manifiesto y al componente "Sobre Efer".

---

## §4 — ECUACIÓN DE VALOR HORMOZI POR DOLOR

La Ecuación de Valor de Hormozi se expresa como:

> **Valor = (Resultado Deseado × Probabilidad Percibida de Logro) / (Tiempo a Resultado × Esfuerzo y Sacrificio)**

Una oferta gana cuando el numerador es grande y el denominador es pequeño. Aplicado a NextSwift, cada landing debe explicitar las cuatro variables — no de manera lírica sino con números, plazos y mecanismos concretos.

### Dolor 1 — `/utilidad` — "Vendo pero no gano dinero"

- **Resultado:** recuperar 3-7 puntos porcentuales de margen real en 90 días.
- **Probabilidad:** 11 garantías formales (Fase 12) + 5 casos cuantificados (Fase 10) + diagnóstico inicial documentado antes de cualquier ejecución.
- **Tiempo:** 10 días hábiles para diagnóstico y plan ejecutable; 60-90 días para impacto financiero medible.
- **Esfuerzo:** el dueño dedica 4-6 horas/semana las primeras 3 semanas y luego ~2 horas/semana. NextSwift entra a la operación; el dueño no carga la implementación.

### Dolor 2 — `/ventas-delivery` — "Las ventas están flojas"

- **Resultado:** subir tráfico recurrente, ticket promedio y/o canal directo en 60-90 días.
- **Probabilidad:** mismo paquete de garantías + paid media con presupuesto que el dueño controla + reducción de dependencia de marketplaces (15-20% migración a canal directo, marco Beaudoin).
- **Tiempo:** primer experimento pagado al aire en 10 días; primera métrica de retorno en 30 días.
- **Esfuerzo:** equipo NextSwift ejecuta. Dueño revisa reportes 1 vez por semana, 20 minutos.

### Dolor 3 — `/autonomia` — "El negocio depende demasiado de mí"

- **Resultado:** el dueño puede ausentarse 3 días seguidos sin que caiga ventas, ticket promedio ni satisfacción del cliente — en 90 días.
- **Probabilidad:** SOPs documentados, encargado entrenado, ritmo de junta semanal, dashboard remoto. Verificable con prueba viva (ausencia controlada del dueño durante el programa).
- **Tiempo:** primera prueba de ausencia de 24 horas en semana 6; prueba de 72 horas en semana 12.
- **Esfuerzo:** alto al principio (entrevistas, documentación, formación del encargado), bajo después. Esfuerzo concentrado para liberar el largo plazo.

### Dolor 4 — `/personal` — "Mi personal es un desmadre"

- **Resultado:** reducir rotación 50%+ y eliminar conflictos crónicos de turno en 60-90 días.
- **Probabilidad:** estructura clara (escalafón, bonos, propinas), entrevista 1:1 con cada miembro clave, encargado formado, política de retroalimentación.
- **Tiempo:** estructura aplicada en 30 días; primera medición de retención en 90 días.
- **Esfuerzo:** alto en setup, sostenible después. NextSwift acompaña la primera junta de equipo donde se anuncia el cambio.

### Dolor 5 — `/metricas-control` — "No tengo claridad real de números"

- **Resultado:** dashboard semanal con 10 KPIs operativos y financieros, entregado todos los lunes, en 30 días.
- **Probabilidad:** integración con POS existente + plantilla validada + revisión asistida los primeros 4 lunes.
- **Tiempo:** dashboard funcionando en 21 días.
- **Esfuerzo:** el dueño dedica 30 minutos los lunes a leer el reporte y tomar 1-3 decisiones de la semana.

### Dolor 6 — `/crecimiento-controlado` — "Quiero crecer sin caos"

- **Resultado:** manual operativo replicable + economía unitaria documentada + plan de expansión por escenarios, en 90 días.
- **Probabilidad:** entregables tangibles (PDF, hojas de cálculo, video-SOP), revisión con socio/inversionista si aplica.
- **Tiempo:** primera versión del manual en 45 días; plan financiero en 60.
- **Esfuerzo:** medio. Requiere participación activa del dueño en decisiones estratégicas; ejecución la lleva NextSwift.

### Regla de uso de la ecuación

Cada landing presenta las cuatro variables en un bloque visual cuadriculado (Bento de Kuzma, ver §6) titulado "Qué obtienes, en cuánto y qué pones de tu parte". Esta es la traducción operativa de Hormozi al formato de página: no se promete sin números, no se omite el esfuerzo del dueño, no se infla el plazo. La transparencia eleva la probabilidad percibida — efecto que Laja documenta como +12-18% en intent rate en B2B servicios premium.

---

## §5 — DUALIDAD OPERADOR-ESTRATEGA (CIANCIO)

Rev Ciancio construyó su autoridad a partir de un truco brillante: él **es** dueño-operador de restaurantes en Nueva York Y consultor estratega para marcas. Esta dualidad ataca el escepticismo nativo del ICP — "tú no entiendes mi negocio". Para NextSwift, esta dualidad se materializa en Efer, no como pose sino como prueba: Efer **ha operado restaurantes**, ha vivido turnos pesados, ha despedido empleados, ha cuadrado caja a las 2 a.m.

### Cómo se manifiesta en el hero del home

- El H1 habla en idioma de operador, no de marketer: "Vendo pero no gano dinero" — la voz del cliente, no de la consultora.
- El subhead introduce la palanca estratégica: "Rehabilitamos la economía y operación de tu restaurante en 10 días hábiles. Diagnóstico, plan, ejecución."
- A la derecha del hero (o debajo en mobile), el componente "El Guía" — foto de Efer + 3 credenciales operativas (no académicas): "Operador de restaurantes en Monterrey | Consultor para 30+ negocios | Ingeniero financiero por formación, restaurantero por elección".
- Botón principal: "Agenda diagnóstico de 30 min" (estratega). Botón secundario ghost: "Habla por WhatsApp con Efer" (operador, directo).

### Cómo se manifiesta en el cuerpo

- En cada landing de dolor: bloque "Lo que ya vivimos" — 2-3 párrafos en primera persona narrando cómo Efer enfrentó ese dolor en restaurantes operados por él o por clientes. Sin floritura. Con cifras.
- En `/casos-de-exito`: cada caso lleva la firma "Diagnosticado y ejecutado por Efer Lara — NextSwift". No equipo anónimo, no agencia faceless.
- En blog: la voz autoral declara "Yo, operador" antes de "Yo, estratega". Entradas mixtas donde se mezclan anécdotas de turno y frameworks (estilo Ciancio + estilo Beaudoin).

### CTAs bifurcados (la pieza central de Ciancio)

Inspirado en su patrón "Pitch Us / Partner With Us", NextSwift usa dos CTAs paralelos en TODO el sitio:

- **CTA primario (estratégico, formulario calificador):** "Agenda diagnóstico de 30 min". Lleva a quiz / formulario multi-paso → HubSpot → calendario. Pre-califica al lead.
- **CTA ghost (operativo, fricción mínima):** "Habla por WhatsApp con Efer" → `wa.me/528110425674` con UTM en prefilled text. Apunta a conversación inmediata, sin formulario.

Esta dualidad respeta a dos perfiles que coexisten en el ICP: el dueño que quiere "mostrar trabajo" y revisar antes de hablar (estratego cauteloso → formulario), y el dueño que ya tiene el cuchillo en el cuello y quiere hablar HOY (operador en emergencia → WhatsApp).

### Por qué importa

La mayoría de las consultoras suenan a corporativo MBA. Eso suena bonito pero no compra: el dueño-operador desconfía de quien nunca ha estado en piso. Ciancio resolvió esto siendo ambos. NextSwift resuelve esto siendo ambos, en la persona de Efer y en la voz del sitio. Toda página debe pasar la prueba: "¿Esto lo diría un dueño de restaurante, o esto suena a folleto de agencia?". Si suena a folleto, se reescribe.

---

## §6 — HOSPITALITY-FIRST + BENTO GRID (KUZMA)

Keri Kuzma y BentoBox definieron el patrón visual y discursivo de la página premium para restaurantes: **Hospitality-First** (la página se siente como entrar a un buen restaurante: caliente, bien iluminada, anticipa lo que necesitas) y **Bento Grid Design** (información estratificada en cuadrículas modulares que el ojo escanea como menú degustación).

### Principios Hospitality-First aplicados al sitio

1. **Bienvenida antes que venta.** El ATF no agrede con "compra ya"; saluda con un diagnóstico del dolor: "Si vendes bien pero no llevas dinero a casa, esto es para ti".
2. **El visitante es huésped, no lead.** El copy usa "usted/tú" y nombres propios, no "cliente potencial" o "usuario".
3. **Generosidad informativa antes que retención artificial.** El sitio entrega valor antes de pedir email: lectura, calculadora, mini-diagnóstico.
4. **Accesibilidad como cortesía.** Contraste WCAG AA, navegación por teclado, alt text descriptivo, idioma simple. No es solo cumplimiento — es buen trato (Fase 24).
5. **Sticky CTAs sin acoso.** Un botón siempre visible (WhatsApp en móvil, doble CTA en desktop) sin pop-ups intrusivos. El huésped sabe dónde está la puerta sin que se la cierren en la cara.

### Bento Grid en el home

El home se compone como un mosaico de tiles, no como un scroll lineal monolítico. Inspirado en la arquitectura visual de BentoBox.com, la estructura es:

- **Tile 1 (hero principal, full-width):** H1 + subhead + CTA dual. Ocupa 60% del fold inicial.
- **Tile 2 (tile derecho, 40% del fold):** "El Guía" — foto de Efer + 3 credenciales + frase ancla "Operador antes que consultor".
- **Tile 3-5 (tres tiles bajo el fold, paridad visual):** las tres palancas (Financiera / Operativa / Comercial). Cada uno con un ícono, una sub-promesa y un link a la landing de dolor más representativa.
- **Tile 6 (full-width):** Stakes — el costo de inacción ("Cada mes sin diagnosticar margen son 3-7 puntos perdidos").
- **Tile 7 (full-width):** El Plan en 3 pasos (Diagnóstico / Plan / Ejecución).
- **Tile 8-12:** Wall of Proof — 5 casos con métricas cuantificadas (ver §8).
- **Tile 13 (full-width):** Acelerador 3 Palancas como oferta núcleo.
- **Tile 14:** Garantías (11) y descalificación frontal ("Esto NO es para ti si...").
- **Tile 15:** FAQ proactivo + Junk Drawer footer.

### Bento Grid en las landings de dolor

Cada landing replica el patrón Bento pero con tiles más pequeños y específicos:
- Hero (dolor verbatim + descriptor + CTA dual).
- "Lo que duele por dentro" (problema interno SB7).
- "Por qué duele" (causa raíz operativa).
- "Cómo lo arreglamos" (ecuación de valor Hormozi en 4 cuadrantes).
- "Caso ancla" (un solo caso de los 5, el más relevante a ese dolor, ver §8).
- "Garantía aplicable" (subset de las 11).
- "Por qué nos importa" (problema filosófico SB7).
- CTA dual.

### Anti-patrones que Kuzma rechaza (y que aquí también)

- Carruseles automáticos en hero.
- Stock photos genéricas de gente sonriendo en oficinas.
- Lenguaje corporate ("soluciones integrales", "experiencia 360", "transformación digital").
- Formularios largos sin progressive disclosure.
- CTAs ambiguos ("Conoce más" / "Descubre").

Todos estos están explícitamente vetados por el glosario anti-agencia (§10).

---

## §7 — UVP CRAVENS (LAJA): CUATRO ELEMENTOS

La Unique Value Proposition según Peep Laja se construye con cuatro componentes que conviven en el ATF. CRAVENS es el acrónimo de los atributos que cada UVP debe cumplir: **Clear, Relevant, Anchored, Valuable, Easy to scan, No buzzwords, Specific**.

### Los cuatro elementos del UVP (Laja)

1. **Headline (H1):** una oración que comunica el beneficio principal. En NextSwift: el dolor verbatim ("Vendo pero no gano dinero" en home y `/utilidad`; el resto en su landing). El H1 NO vende — diagnostica.
2. **Subhead (1-2 líneas):** explica qué es exactamente, para quién, y qué hace.
3. **Bullets (3 puntos):** beneficios concretos en lenguaje del cliente, no del marketer.
4. **Hero shot / imagen-prueba:** visual que ancla. NO es stock; es Efer en cocina real, una hoja de costos abierta, un dashboard, una mesa llena. Visual que demuestra, no que decora.

### Verificación CRAVENS aplicada al UVP del home

- **C — Clear:** "Vendo pero no gano dinero" es la frase más clara del ICP. Pasa en 3 segundos.
- **R — Relevant:** habla del dolor 1, el más universal según `nav-orden-dolores.md`.
- **A — Anchored:** sub-promesa "Rehabilitamos margen y operación en 10 días hábiles" ancla en tiempo, palanca y mecanismo.
- **V — Valuable:** "recupera 3-7 puntos de margen" es valor cuantificado.
- **E — Easy to scan:** Bento Grid + jerarquía visual = escaneable en 5 segundos (test Grunt).
- **N — No buzzwords:** se evitan "transformación", "soluciones", "engagement", "growth".
- **S — Specific:** mecanismo (diagnóstico → plan → ejecución), plazo (10 días), precio (desde $24,000 MXN), garantía (11 formales).

### UVP por landing

Cada landing de dolor lleva su propio UVP CRAVENS:
- Headline = H1 verbatim de `nav-orden-dolores.md`.
- Subhead = sub-promesa de la palanca correspondiente (de §1).
- Bullets = los 3 entregables más representativos del Acelerador filtrados por el dolor.
- Hero shot = imagen específica al dolor (no se reutiliza la del home).

### Anti-blandvertising

Laja define blandvertising como copy que cualquier competidor podría firmar. Test: "¿Si pongo el logo de mi competencia, sigue funcionando?". Si sí, el copy es blando. Para NextSwift, todo H1, subhead y bullet debe pasar este test. La voz operador-estratega (Ciancio) + las cifras (Beaudoin) + el dolor verbatim + el lenguaje mexicano específico (mermas, comensales, ticket promedio, escalafón) son los blindajes contra blandvertising.

---

## §8 — WALL OF PROOF + HIPER-CUANTIFICACIÓN (BEAUDOIN)

Roger Beaudoin reformuló la prueba social en restaurantes con un patrón forense: cada caso debe entregar **cifras antes y después con contexto**, NO testimonios genéricos. La fórmula:

> "[Antes] $X / [Después] $Y / [Diferencia] $Z / [Plazo] T meses / [Mecanismo causal] M"

Aplicado a NextSwift, los 5 casos pendientes de la auditoría (Pangas, Temaky Sushi, Hare Krishna, Oita Fresh, Sr. Boneless — sujetos a DH-NEW-01 autorización por escrito) deben entregar al menos las siguientes métricas para entrar al sitio:

### Métricas exigidas por caso (Wall of Proof institucional)

Cada caso entra al sitio sólo si trae **al menos 4 de las siguientes 7 métricas**, cuantificadas y verificables, antes/después con plazo:

1. **Margen bruto operativo** (% antes / % después / plazo).
2. **Ticket promedio** ($ antes / $ después / plazo).
3. **Mermas como % de ventas** (% antes / % después).
4. **Rotación de personal** (% anual antes / % anual después).
5. **Recurrencia o frecuencia de visita** (visitas/mes/cliente antes / después).
6. **Ventas brutas mensuales** ($ antes / $ después).
7. **Horas/semana trabajadas por el dueño** (h antes / h después).

Las métricas se redactan en formato Beaudoin: número crudo + contexto causal. Ejemplo plantilla (sin valores reales, los entrega Efer en Fase 10):

> **Pangas — Restaurante de mariscos, MTY**
> Ventas: $X → $Y en 90 días. Margen real: A% → B%. Mecanismo: rediseño de mix de menú (eliminamos 3 platillos no rentables, subimos precio en 4, reagrupamos guarniciones), implementación de escalafón con bonos por ticket promedio, y dashboard semanal. Autorizado por [Nombre del dueño].

### Estructura visual del Wall of Proof

- Componente en home: 5 tiles del Bento con foto del lugar, métrica titular, y "Ver caso completo".
- Página `/casos-de-exito`: cada caso ocupa una sección con foto, narrativa de 200-300 palabras, tabla de métricas, comilla del dueño con autorización, y firma de Efer como ejecutor.
- En cada landing de dolor: 1 caso ancla seleccionado por relevancia al dolor (ej. dolor 1 → Pangas; dolor 4 → Temaky; mapping definitivo en Fase 9).

### Anti-patrones de testimonial rechazados

- Frases vagas ("Recomiendo mucho a NextSwift", "Cambió mi vida", "Son los mejores").
- Testimonios anónimos sin foto ni nombre real (el caso "Exdueña de sushi" del legacy NO entra al nuevo sitio — auditoría HC asociada).
- Métricas sin plazo ("Subimos ventas 30%" — ¿en cuánto tiempo? ¿desde qué base?).
- Estrellas o ratings genéricos sin texto.
- Logos de marcas sin caso documentado detrás (efecto halo falso).

### Verificación de prueba social como evento

Cada caso aprobado pasa por:
1. Llamada con el dueño para validar cifras.
2. Captura escrita de la cifra (foto del estado de resultados, screenshot del POS, etc.) en archivo privado de Efer.
3. Autorización firmada (DH-NEW-01 pendiente).
4. Aprobación final del dueño sobre el texto publicado.

Sin esos 4 pasos, el caso no se publica. Esta es la línea ética de Beaudoin: prueba social falsa daña más que la falta de prueba.

---

## §9 — COPY SEMILLA POR LANDING

Cada bloque entrega los 5 elementos del UVP CRAVENS (Laja) + dos CTAs bifurcados (Ciancio): eyebrow + H1 + subhead + 3 bullets + CTA primario + CTA ghost. Este copy es **semilla**, no final. La versión final se redacta en Fase 9 con OK explícito de Efer (regla CLAUDE.md §10).

---

### 9.1 — HOME

- **Eyebrow:** Consultoría B2B para dueños de restaurantes en México
- **H1:** Vendo pero no gano dinero
- **Subhead:** Rehabilitamos la economía y operación de tu restaurante en 10 días hábiles. Diagnóstico, plan, ejecución — con garantía operativa y dueño dentro de la cabina.
- **Bullets:**
  - Diagnóstico de fuga de margen en 10 días: mermas, costeo, mix, descuentos, ticket promedio.
  - Operación que funciona cuando no estás: SOPs, encargado entrenado, dashboard semanal.
  - Crecimiento que no te quiebra: paid media + canal directo + retención, en ese orden.
- **CTA primario:** Agenda diagnóstico de 30 min
- **CTA ghost:** Habla por WhatsApp con Efer

---

### 9.2 — `/acelerador` (Acelerador 3 Palancas — oferta núcleo)

- **Eyebrow:** Programa intensivo de 10 días hábiles · desde $24,000 MXN
- **H1:** El Acelerador 3 Palancas: financiera, operativa, comercial
- **Subhead:** Un solo paquete que ataca margen, autonomía y ventas al mismo tiempo. Diagnosticamos, planeamos y empezamos a ejecutar en menos de dos semanas. 11 garantías formales. Dueño dentro de la cabina.
- **Bullets:**
  - Palanca Financiera: recuperación de 3-7 puntos de margen en 90 días.
  - Palanca Operativa: SOPs, encargado entrenado, dashboard semanal — el restaurante funciona cuando no estás.
  - Palanca Comercial: tráfico directo, recurrencia y reducción de dependencia de marketplaces.
- **CTA primario:** Averigua si calificas (formulario)
- **CTA ghost:** Pregunta por WhatsApp

---

### 9.3 — `/utilidad` — Dolor 1

- **Eyebrow:** Palanca Financiera · El dolor más profundo y universal
- **H1:** Vendo pero no gano dinero
- **Subhead:** Encontramos la fuga de margen en 10 días hábiles: mermas, costeo descalibrado, descuentos no autorizados, mix de menú equivocado. Recuperas 3-7 puntos en 90 días, con dashboard semanal que valida el avance.
- **Bullets:**
  - Auditoría forense de mermas, costo de platillos y ticket promedio real.
  - Rediseño de menú por rentabilidad, no por gusto.
  - Dashboard semanal con margen real, no estimado.
- **CTA primario:** Agenda diagnóstico de 30 min
- **CTA ghost:** Habla por WhatsApp con Efer

---

### 9.4 — `/ventas-delivery` — Dolor 2

- **Eyebrow:** Palanca Comercial · El dolor más fácil de vender
- **H1:** Las ventas están flojas
- **Subhead:** Reactivamos tráfico recurrente y reducimos dependencia de marketplaces en 60-90 días. Primero ordenamos cocina; después subimos volumen. Sin gasolina en motor fundido.
- **Bullets:**
  - Paid media medido contra utilidad, no contra likes ni alcance.
  - Migración de 15-20% de pedidos de marketplaces a canal directo.
  - Plan de recurrencia con base de datos propia (no rentada).
- **CTA primario:** Agenda diagnóstico de 30 min
- **CTA ghost:** Habla por WhatsApp con Efer

---

### 9.5 — `/autonomia` — Dolor 3

- **Eyebrow:** Palanca Operativa · El dolor más emocional
- **H1:** El negocio depende demasiado de mí
- **Subhead:** Construimos un restaurante que puede operar 72 horas sin ti — encargado entrenado, SOPs documentados, ritmo de junta semanal. Probamos la ausencia controlada en semana 12.
- **Bullets:**
  - Encargado entrenado con rúbrica, no con intuición.
  - SOPs documentados para apertura, cierre, compras y conflictos.
  - Prueba de ausencia controlada en semana 12 — sin que caiga ticket promedio.
- **CTA primario:** Agenda diagnóstico de 30 min
- **CTA ghost:** Habla por WhatsApp con Efer

---

### 9.6 — `/personal` — Dolor 4

- **Eyebrow:** Palanca Operativa · El dolor más constante
- **H1:** Mi personal es un desmadre
- **Subhead:** Instalamos estructura: escalafón claro, bonos por desempeño, propinas justas, política de retroalimentación. Bajamos rotación al menos 50% en 90 días, con encargado capacitado para sostenerlo.
- **Bullets:**
  - Escalafón con bonos por ticket promedio, no por horas.
  - Política de propinas y de retroalimentación documentada.
  - Encargado formado para sostener el sistema, sin depender del dueño.
- **CTA primario:** Agenda diagnóstico de 30 min
- **CTA ghost:** Habla por WhatsApp con Efer

---

### 9.7 — `/metricas-control` — Dolor 5

- **Eyebrow:** Palanca Financiera · El dolor más silencioso
- **H1:** No tengo claridad real de números
- **Subhead:** Construimos tu dashboard semanal en 21 días: 10 KPIs operativos y financieros, integrados con tu POS, entregados cada lunes. Decides con datos, no con sensaciones.
- **Bullets:**
  - 10 KPIs semanales: margen, ticket, merma, rotación, costo de mano de obra.
  - Integración con POS existente (no necesitas cambiar sistema).
  - Revisión asistida los primeros 4 lunes — quedas autónomo al día 30.
- **CTA primario:** Agenda diagnóstico de 30 min
- **CTA ghost:** Habla por WhatsApp con Efer

---

### 9.8 — `/crecimiento-controlado` — Dolor 6

- **Eyebrow:** Palanca de expansión · El dolor más premium
- **H1:** Quiero crecer sin caos
- **Subhead:** Convertimos tu restaurante en modelo replicable: manual operativo, economía unitaria documentada, plan de expansión por escenarios. En 90 días tienes lo que un inversionista o socio operativo necesita ver.
- **Bullets:**
  - Manual operativo replicable (no genérico, sino el TUYO).
  - Economía unitaria documentada — por platillo, por turno, por sucursal.
  - Plan de expansión por escenarios — segunda sucursal, franquicia, o dark kitchen.
- **CTA primario:** Agenda diagnóstico de 30 min
- **CTA ghost:** Habla por WhatsApp con Efer

---

## §10 — GLOSARIO ANTI-AGENCIA

NextSwift compite contra dos categorías que el dueño-operador asocia con desperdicio: agencias de marketing genéricas que venden tráfico sin diagnóstico de margen, y consultorías corporativas que venden frameworks sin ejecución. El sitio entero debe sonar a la antítesis. Este glosario fija términos prohibidos, términos sustitutos y el porqué del cambio.

### Términos prohibidos (NO entran al sitio, excepto aquí como referencia de lo que evitamos)

- **"Posts"** → Evitado en todo el sitio. Connota frivolidad y desconexión de resultado financiero.
- **"Creatividades"** → Vocabulario interno de agencia. El dueño no compra creatividades, compra margen.
- **"Agencia de marketing"** → Categoría que el ICP asocia con experiencias previas frustrantes.
- **"Campañas bonitas"** → Estética sin función. NextSwift entrega función, la estética es resultado.
- **"Estrategia 360"** / **"Solución integral"** / **"Experiencia omnicanal"** → Buzzwords prohibidos por Laja.
- **"Transformación digital"** → Cliché corporativo sin contenido específico.
- **"Engagement"** / **"Awareness"** → Métricas vanidosas. Hablamos en margen, ticket, recurrencia, rotación.
- **"Brand storytelling"** → Suena a folleto de agencia. NextSwift cuenta cifras, no historias.
- **"Soluciones a la medida"** → Frase universal vacía.
- **"Equipo multidisciplinario de expertos"** → Lenguaje de RFP corporativo.
- **"Conoce más"** / **"Descubre"** → CTAs ambiguos prohibidos por Kuzma.

### Términos sustitutos (entran al copy del sitio)

- "Posts" → **contenido orgánico** (si aplica) o, mejor, omitir el insumo y hablar del resultado: **recurrencia**, **tráfico directo**, **boca-a-boca documentado**.
- "Creatividades" → **piezas operativas** o, mejor, **ingeniería operativa**.
- "Agencia de marketing" → **consultoría operativa** o **ingeniería de restaurante**.
- "Campañas bonitas" → **experimentos pagados medidos contra utilidad**.
- "Estrategia 360" → **Acelerador 3 Palancas** (nombre propio del producto, no abstracción).
- "Solución integral" → **rehabilitación financiera y operativa**.
- "Transformación digital" → **dashboard semanal + sistema operativo del restaurante**.
- "Engagement" → **ticket promedio, recurrencia, ventas directas**.
- "Awareness" → **demanda calificada** o **leads que califican**.
- "Brand storytelling" → **prueba documentada con cifras**.
- "Soluciones a la medida" → **diagnóstico de 10 días + plan específico para tu restaurante**.
- "Equipo multidisciplinario" → **Efer Lara, ingeniero financiero y operador de restaurantes**.
- "Conoce más" → **Agenda diagnóstico de 30 min**.
- "Descubre" → **Averigua si calificas**.

### Reglas de redacción derivadas

1. **Verbo de acción concreto > sustantivo abstracto.** "Rehabilitamos" > "ofrecemos rehabilitación". "Diagnosticamos" > "servicio de diagnóstico".
2. **Cifra > adjetivo.** "Recuperas 3-7 puntos de margen en 90 días" > "Recuperas margen significativo".
3. **Plazo siempre presente.** Toda promesa lleva tiempo asociado (10 días, 30 días, 90 días).
4. **Dueño como sujeto.** "Tu restaurante funciona sin ti" > "Optimizamos la autonomía del propietario".
5. **Lenguaje mexicano de cocina y barra.** Mermas, comensales, ticket promedio, escalafón, plaza, encargado, turno, brigada, propinas, comanda. NO "menú diseñado", NO "experiencia gastronómica", NO "concepto culinario".
6. **Voz operador-estratega (Ciancio).** Frases que un dueño-operador podría firmar; nunca frases que solo firmaría un consultor corporativo.
7. **Cero adjetivos vanidosos.** "Innovador", "líder", "premium" — todos vetados a menos que vengan con cifra que los respalde.

### Test de validación final

Antes de publicar cualquier pieza de copy en el sitio, debe pasar 3 filtros:

- **Filtro Grunt (Miller):** ¿En 5-10 segundos el visitante sabe qué ofreces, cómo le mejora la vida, y qué hacer?
- **Filtro Blandvertising (Laja):** ¿Si reemplazo "NextSwift" por el nombre de un competidor, el copy sigue funcionando? Si sí — se reescribe.
- **Filtro Operador (Ciancio):** ¿Un dueño-operador de restaurante con 12 años de oficio reconocería esto como su propia voz, o le sonaría a folleto?

Si una pieza falla cualquiera de los tres, no se publica.

---

## CIERRE — CRITERIOS DE ACEPTACIÓN DEL BRIEF

Este documento queda como entregable de cierre de Fase 1 y alimenta:

- **Fase 3** (sistema visual): el Bento Grid y la Hospitality-First quedan como restricciones visuales no negociables.
- **Fase 4-8** (home): el orden y peso de los tiles ya están descritos.
- **Fase 9** (6 landings): el copy semilla de §9 es la base; la versión final se redacta con OK explícito de Efer.
- **Fase 10** (`/casos-de-exito`): la rúbrica de métricas mínimas (4 de 7) es la regla de admisión.
- **Fase 11** (`/sobre-efer`): la dualidad operador-estratega (Ciancio) es el eje editorial.
- **Fase 12** (`/garantia`): las 11 garantías se mapean contra la ecuación de valor Hormozi (probabilidad percibida).
- **Fase 13** (quiz): las preguntas se calibran contra los 6 dolores y el filtro firmográfico de §2.
- **Fase 14-15** (CTAs y formulario): la bifurcación primario/ghost queda fija.
- **Fase 17** (prueba social): la rúbrica forense de §8 es el filtro de admisión.
- **Fase 18** (FAQ): las preguntas se redactan contra el filtro Grunt y el filtro Operador.
- **Fase 19** (blog): la voz autoral operador-estratega rige toda categoría editorial.
- **Fase 25-26** (SEO + tracking): el verbatim de los 6 dolores entra en `<title>`, meta description, schema y eventos de conversión por dolor.

**Decisión humana pendiente vinculada a este brief:** DH-NEW-01 (autorización por escrito de los 5 casos). Sin esta resolución, Fase 10 queda bloqueada.

**OK explícito de Efer requerido sobre:** (a) promesa central § 1; (b) sub-promesas por palanca §1; (c) buyer-persona Carlos §2; (d) copy semilla §9 (para arrancar Fase 9 con base, no como copy final).

---

*Fin del brief.*

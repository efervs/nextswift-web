/**
 * Single source of truth para FAQs del sitio.
 * Consumido por src/components/shared/FAQ.astro (variant global | landing + painSlug).
 *
 * Reglas:
 *  - `scope='home'` => FAQ global (8-10 entries). Render en home + páginas transversales (/sobre-efer, /garantia, /acelerador).
 *  - `scope=<painSlug>` => FAQ por landing (3-5 entries específicas al dolor).
 *  - Copy semilla inferido del pipeline real de Efer (DH-07 pendiente de validación verbatim).
 *  - Schema.org FAQPage se emite UNA VEZ POR PÁGINA en FAQ.astro (sin overlap home ↔ landing).
 */

export type FaqScope =
  | 'home'
  | 'utilidad'
  | 'autonomia'
  | 'ventas-delivery'
  | 'personal'
  | 'metricas-control'
  | 'crecimiento-controlado';

export interface FaqEntry {
  id: string;
  pregunta: string;
  respuesta: string;
  scope: FaqScope;
  orden: number;
}

export const FAQS: FaqEntry[] = [
  // ============================================================
  // HOME — FAQ global (8-10 preguntas inferidas del pipeline real)
  // DH-07 pendiente: Efer valida verbatim antes de publicar.
  // ============================================================
  {
    id: 'home-1',
    scope: 'home',
    orden: 1,
    pregunta: '¿Esto es consultoría de PowerPoint o realmente operan?',
    respuesta:
      'Operamos. Efer Lara opera y ha operado restaurantes — no llega con frameworks teóricos. Cada entregable es un artefacto que su equipo usa el día 11: SOPs, dashboard semanal, plantillas de costeo, rúbrica de encargado, P&L estructurado. Si en el diagnóstico de 10 días no encontramos al menos una fuga concreta y medible, le devolvemos el adelanto (garantía operativa).',
  },
  {
    id: 'home-2',
    scope: 'home',
    orden: 2,
    pregunta: '¿Cuánto cuesta el Acelerador? ¿Por qué no aparece el precio?',
    respuesta:
      'El precio se discute después de la auditoría de viabilidad (30-45 min, sin compromiso). Razón: el Acelerador exige ventas brutas ≥ $300,000 MXN/mes y un dueño dispuesto a abrir el P&L real. Sin ese piso, decimos que no antes de hablar de inversión — no queremos vender lo que no encaja. Si la auditoría confirma fit, presentamos pricing por escrito con las 11 garantías formales adjuntas.',
  },
  {
    id: 'home-3',
    scope: 'home',
    orden: 3,
    pregunta: '¿Cuánto dura el compromiso? ¿Me amarran a un contrato eterno?',
    respuesta:
      'El Acelerador son 10 días hábiles de implementación + 90 días de acompañamiento con dashboard semanal. Después de los 90 días, la relación se vuelve mensual con salida sin penalización aviso 30 días. No hay contratos anuales obligatorios. El cliente se queda porque el sistema funciona, no porque el contrato lo amarra.',
  },
  {
    id: 'home-4',
    scope: 'home',
    orden: 4,
    pregunta: '¿Mi restaurante califica para el Acelerador?',
    respuesta:
      'Califica si: ventas brutas ≥ $300,000 MXN/mes, al menos 12 meses de operación, dueño-operador involucrado en cocina o piso, y disposición a abrir el P&L. Si está por debajo del piso, el Acelerador no es para usted todavía — pero el quiz de diagnóstico gratuito le da un mapa de fugas y prioridades para llegar al piso.',
  },
  {
    id: 'home-5',
    scope: 'home',
    orden: 5,
    pregunta: '¿Funciona para mi tipo de restaurante? (sushi / mariscos / dark kitchen / cafetería)',
    respuesta:
      'El sistema operativo es agnóstico al concepto: aplica donde haya cocina, ticket, mermas, personal y P&L. Tenemos casos verificables en sushi (Temaky), mariscos (Pangas), comida vegetariana (Hare Krishna) y arranque de operación (Oita Fresh, $0 → $300k/mes). Si su modelo es muy atípico, lo detectamos en la auditoría y le decimos antes de cobrar.',
  },
  {
    id: 'home-6',
    scope: 'home',
    orden: 6,
    pregunta: '¿Qué pasa si en 90 días no veo resultados?',
    respuesta:
      'Las 11 garantías formales cubren tres líneas: previas (no firma si no encaja), durante (cumplimiento de entregables día 11) y post (recuperación de margen documentada al día 90). Si los entregables no se cumplen en tiempo, devolvemos el adelanto proporcional. Si el dashboard no muestra movimiento medible al día 90, extendemos acompañamiento sin costo hasta cerrar la fuga.',
  },
  {
    id: 'home-7',
    scope: 'home',
    orden: 7,
    pregunta: '¿Necesito cambiar mi punto de venta o sistemas?',
    respuesta:
      'No. Trabajamos con el POS que ya tiene. Si su POS no exporta a Excel/CSV, le entregamos una plantilla semanal que el encargado o contador llena en 20 minutos. Cero software adicional, cero licencias.',
  },
  {
    id: 'home-8',
    scope: 'home',
    orden: 8,
    pregunta: '¿Cuánto tiempo de mi parte requiere durante los 10 días?',
    respuesta:
      'Entre 4 y 8 horas totales: una sesión inicial de 2 horas para abrir P&L, 3 revisiones semanales de 45 min, y validaciones puntuales por WhatsApp. El resto lo hace el equipo NextSwift dentro de su cocina con su gente — no le agregamos juntas, le quitamos operación.',
  },
  {
    id: 'home-9',
    scope: 'home',
    orden: 9,
    pregunta: '¿Trabajan fuera de Monterrey?',
    respuesta:
      'Sí. La auditoría inicial y el acompañamiento semanal son 100% remotos por videollamada. El día de implementación se hace presencial si el restaurante está en zona metropolitana de Monterrey; fuera, se hace en formato híbrido (1 viaje de 2 días + remoto). Para restaurantes fuera de NL, se cotiza el viaje aparte.',
  },
  {
    id: 'home-10',
    scope: 'home',
    orden: 10,
    pregunta: '¿En qué se diferencian de una agencia de marketing?',
    respuesta:
      'En que no somos agencia. Una agencia vende tráfico medido contra alcance; NextSwift mide contra utilidad. Antes de tocar paid media, ordenamos cocina, costeo y margen. Si la operación está rota, lanzar campañas es gasolina en motor fundido — y eso le costaría más caro que no hacer nada.',
  },

  // ============================================================
  // /utilidad — Palanca Financiera (4 entries, copy ya validado en P8)
  // ============================================================
  {
    id: 'utilidad-1',
    scope: 'utilidad',
    orden: 1,
    pregunta: '¿Cómo saben que mi problema es de margen y no de ventas?',
    respuesta:
      'Los primeros 10 días son diagnóstico forense. Revisamos costo real por platillo, mermas medibles, descuentos no autorizados, mix por margen y ticket promedio. Si el diagnóstico muestra que el cuello es de tráfico y no de margen, lo decimos antes de firmar (garantía 1 y 2).',
  },
  {
    id: 'utilidad-2',
    scope: 'utilidad',
    orden: 2,
    pregunta: '¿Necesito cambiar mi sistema de punto de venta?',
    respuesta:
      'No. Trabajamos con el POS que ya tiene. Si su POS no exporta lo que necesitamos, le enseñamos a vaciarlo en una plantilla semanal manual — sin software adicional.',
  },
  {
    id: 'utilidad-3',
    scope: 'utilidad',
    orden: 3,
    pregunta: '¿Cuánto margen puedo recuperar realmente?',
    respuesta:
      '3 a 7 puntos de margen real en 90 días en restaurantes con operación promedio. Restaurantes con merma alta no auditada recuperan más; restaurantes ya optimizados recuperan menos. El dashboard semanal valida el avance — no es estimación.',
  },
  {
    id: 'utilidad-4',
    scope: 'utilidad',
    orden: 4,
    pregunta: '¿Qué pasa si subimos precios y se van los clientes?',
    respuesta:
      'No subimos precios a ciegas. Primero rediseñamos el menú por margen — bajamos el peso visual de platillos de baja rentabilidad y subimos el de los rentables. El precio sube solo donde la elasticidad lo permite.',
  },

  // ============================================================
  // /autonomia — Palanca Operativa
  // ============================================================
  {
    id: 'autonomia-1',
    scope: 'autonomia',
    orden: 1,
    pregunta: '¿Realmente puede mi restaurante operar 72 horas sin mí?',
    respuesta:
      'Sí, si tres piezas existen y están probadas: un encargado entrenado con rúbrica clara, SOPs documentados para apertura/cierre/compras/conflictos, y una junta semanal con dueño que revise KPIs en lugar de operar. En semana 12 hacemos la prueba de ausencia controlada — no antes.',
  },
  {
    id: 'autonomia-2',
    scope: 'autonomia',
    orden: 2,
    pregunta: '¿Cómo se entrena al encargado sin gastar 6 meses?',
    respuesta:
      'Con una rúbrica de 8 competencias operativas y un plan de 8-10 semanas: shadowing, decisión asistida, decisión sola con auditoría, decisión sola con revisión semanal. La rúbrica se hace con usted en la primera semana — no es un manual genérico.',
  },
  {
    id: 'autonomia-3',
    scope: 'autonomia',
    orden: 3,
    pregunta: '¿Qué pasa si mi encargado actual no da el ancho?',
    respuesta:
      'El diagnóstico de 10 días identifica si el encargado actual es capacitable o si necesita reemplazo. Si es lo segundo, le ayudamos a definir el perfil y el escalafón con bonos para atraer a la persona correcta — no a la barata.',
  },
  {
    id: 'autonomia-4',
    scope: 'autonomia',
    orden: 4,
    pregunta: '¿Y si soy el chef y la operación depende de mi sazón?',
    respuesta:
      'La sazón se documenta. Recetas estandarizadas con gramaje, tiempos y presentación, validadas por usted antes de soltar. La mayoría de chef-dueños descubre que el 80% de su sazón está en 6-8 platillos del menú, no en los 25.',
  },

  // ============================================================
  // /ventas-delivery — Palanca Comercial
  // ============================================================
  {
    id: 'ventas-delivery-1',
    scope: 'ventas-delivery',
    orden: 1,
    pregunta: '¿No es contradictorio bajarle a Rappi y Didi si ahí están las ventas?',
    respuesta:
      'No bajamos volumen — bajamos dependencia. Migramos 15-20% de los pedidos a canal directo (pickup, página propia, llamada). Sigue vendiendo en marketplaces, pero el margen de ese 15-20% se duplica al evitar comisiones.',
  },
  {
    id: 'ventas-delivery-2',
    scope: 'ventas-delivery',
    orden: 2,
    pregunta: '¿Cuándo lanzan tráfico pagado? ¿Y cuánto cuesta?',
    respuesta:
      'Solo cuando la cocina está ordenada y el margen lo permite. Lanzar tráfico sobre operación rota es gasolina en motor fundido. El presupuesto inicial de prueba arranca en $1,000-$5,000 MXN/mes — escalamos solo si el costo por venta lo justifica contra utilidad, no contra ROAS.',
  },
  {
    id: 'ventas-delivery-3',
    scope: 'ventas-delivery',
    orden: 3,
    pregunta: '¿Cómo construyo base de datos propia si todo me lo lleva la app?',
    respuesta:
      'Con tres palancas: captura en mesa (QR + incentivo claro), reactivación post-entrega (mensaje con descuento a canal directo), y programa de recurrencia (no "lealtad" — recurrencia medible con métricas de visita).',
  },
  {
    id: 'ventas-delivery-4',
    scope: 'ventas-delivery',
    orden: 4,
    pregunta: '¿Funciona esto para una dark kitchen sin local físico?',
    respuesta:
      'Sí, con dos ajustes: el "canal directo" se construye sobre página propia + WhatsApp + reactivación de base. Y la dependencia de marketplaces se mide más fuerte — porque ahí está 100%. Si su dark kitchen factura menos de $300k MXN/mes, el Acelerador no es para usted todavía; primero hay que llegar a ese piso.',
  },
  {
    id: 'ventas-delivery-5',
    scope: 'ventas-delivery',
    orden: 5,
    pregunta: '¿Cuánto tarda en notarse el cambio?',
    respuesta:
      '60-90 días para ver migración a canal directo. El tráfico pagado da señales en 14-21 días. La recurrencia se mide a partir del día 60. Todo se reporta cada lunes en el dashboard semanal.',
  },

  // ============================================================
  // /personal — Palanca Humana
  // ============================================================
  {
    id: 'personal-1',
    scope: 'personal',
    orden: 1,
    pregunta: '¿Bonos por ticket promedio no incentivan a "upsell" forzado?',
    respuesta:
      'No, si la rúbrica está bien diseñada. El bono se calcula sobre ticket promedio sostenido a 4 semanas, no por turno. El equipo aprende que insistir destruye el promedio en visitas siguientes, así que el incentivo natural es vender bien — no vender más.',
  },
  {
    id: 'personal-2',
    scope: 'personal',
    orden: 2,
    pregunta: '¿Y si bajo rotación pero el personal sigue trabajando mal?',
    respuesta:
      'Rotación baja sin desempeño es peor que rotación alta. Por eso instalamos política de retroalimentación documentada, evaluación trimestral con criterios objetivos, y separación rápida cuando los criterios no se cumplen. La meta es retención de A players, no retención total.',
  },
  {
    id: 'personal-3',
    scope: 'personal',
    orden: 3,
    pregunta: '¿Cuánto cuesta cambiar el escalafón? ¿No me va a costar más?',
    respuesta:
      'En la mayoría de casos cuesta igual o menos. Lo que se redistribuye es cómo se paga: sueldo base menor + bono variable atado a desempeño. El personal A gana más, el personal C gana lo mismo o menos. La rotación cae porque los A se quedan.',
  },
  {
    id: 'personal-4',
    scope: 'personal',
    orden: 4,
    pregunta: '¿Cómo se manejan las propinas para que sean justas?',
    respuesta:
      'Con política documentada que distribuye entre piso, cocina y barra según contribución medida. Sin "caja única" donde el de piso se lleva todo. Sin desigualdades arbitrarias. La política se firma con el equipo en una sesión — no se impone.',
  },

  // ============================================================
  // /metricas-control — Dashboard semanal
  // ============================================================
  {
    id: 'metricas-control-1',
    scope: 'metricas-control',
    orden: 1,
    pregunta: '¿Cuáles son los 10 KPIs que entregan cada semana?',
    respuesta:
      'Ventas brutas, ventas netas, costo de alimentos, costo de mano de obra, prime cost, ticket promedio, comensales, rotación de personal, merma, y margen operativo. Se ajusta a su modelo si tiene delivery alto o eventos privados.',
  },
  {
    id: 'metricas-control-2',
    scope: 'metricas-control',
    orden: 2,
    pregunta: '¿Funciona con mi POS o tengo que cambiar de sistema?',
    respuesta:
      'Funciona con cualquier POS que exporte ventas a Excel/CSV (la mayoría). Si su POS no exporta, le enseñamos a vaciarlo en una plantilla semanal en 20 minutos — sin software adicional ni licencias.',
  },
  {
    id: 'metricas-control-3',
    scope: 'metricas-control',
    orden: 3,
    pregunta: '¿Quién llena el dashboard cada semana?',
    respuesta:
      'Los primeros 4 lunes lo llenamos con usted. Del lunes 5 en adelante lo llena su encargado o contador en 20-30 minutos, con la plantilla y el video tutorial que dejamos documentados. Usted solo lee.',
  },
  {
    id: 'metricas-control-4',
    scope: 'metricas-control',
    orden: 4,
    pregunta: '¿Para qué sirve ver números si igual no sé qué hacer con ellos?',
    respuesta:
      'Los 10 KPIs vienen con rangos esperados y disparadores: si X baja de Y, hace falta Z. Las primeras 4 sesiones de revisión asistida son para enseñarle a leer el dashboard y a decidir con él. Al día 30 queda autónomo.',
  },

  // ============================================================
  // /crecimiento-controlado — Expansión por escenarios
  // ============================================================
  {
    id: 'crecimiento-controlado-1',
    scope: 'crecimiento-controlado',
    orden: 1,
    pregunta: '¿Cómo sé si mi restaurante está listo para una segunda sucursal?',
    respuesta:
      'Tres condiciones: el actual opera 72 horas sin su presencia, el margen está documentado y estable a 6 meses, y la economía unitaria por turno está medida. Si falta alguna, abrir la segunda sucursal multiplica problemas en vez de utilidad.',
  },
  {
    id: 'crecimiento-controlado-2',
    scope: 'crecimiento-controlado',
    orden: 2,
    pregunta: '¿Franquicia o sucursal propia? ¿Qué conviene más?',
    respuesta:
      'Depende del nivel de control que quiere y del capital disponible. Sucursal propia preserva margen completo pero requiere capital y operación replicable. Franquicia escala más rápido pero exige manual operativo blindado y soporte estructurado. El plan de expansión por escenarios compara ambos contra su situación específica.',
  },
  {
    id: 'crecimiento-controlado-3',
    scope: 'crecimiento-controlado',
    orden: 3,
    pregunta: '¿Qué es la "economía unitaria" y por qué importa?',
    respuesta:
      'Es saber cuánto cuesta y cuánto deja cada unidad de venta: un platillo, un turno, una sucursal. Sin ella, decidir abrir una segunda sucursal es apostar — porque no sabe si lo que gana por unidad cubre los costos fijos adicionales. El Acelerador documenta esta economía en 90 días.',
  },
  {
    id: 'crecimiento-controlado-4',
    scope: 'crecimiento-controlado',
    orden: 4,
    pregunta: '¿Me sirve si quiero abrir una dark kitchen como segunda operación?',
    respuesta:
      'Sí. Dark kitchen como expansión de un restaurante físico exitoso es una de las tres opciones que evaluamos en el plan por escenarios. Las otras dos: segunda sucursal completa, o modelo de franquicia. Cada una con su economía unitaria proyectada.',
  },
];

export function faqsByScope(scope: FaqScope): FaqEntry[] {
  return FAQS.filter((f) => f.scope === scope).sort((a, b) => a.orden - b.orden);
}

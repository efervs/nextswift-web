/**
 * Quiz "Diagnóstico de fuga de margen" — lógica determinística.
 * P11 / Fase 13. Consumido por src/pages/diagnostico.astro.
 *
 * TODO DH-NEW-02: las 10 preguntas y los pesos abajo son PLACEHOLDER.
 * Cuando Efer entregue el documento DH-NEW-02 (lista canónica de 8-12 preguntas
 * + mapeo a 3 recomendaciones por arquetipo), se reemplaza este archivo.
 * Mientras tanto el quiz es funcional pero el output es coherente, no canónico.
 */

export type RotacionLevel = 'alta' | 'media' | 'baja';
export type RevisionPnL = 'semanal' | 'mensual' | 'trimestral' | 'nunca';
export type CuelloDolor = 'utilidad' | 'ventas' | 'personal' | 'control';

/**
 * Una respuesta tipada del quiz. El `id` identifica la pregunta;
 * el `value` se interpreta según el tipo declarado en QUESTIONS.
 */
export interface QuizAnswer {
  id: string;
  value: string | number;
}

export interface QuizInputs {
  ventas_totales: number;       // MXN/mes
  ventas_delivery: number;      // MXN/mes
  comision_delivery: number;    // %
  food_cost: number;            // %
  ticket_promedio: number;      // MXN
  comensales_dia: number;       // unidades
  rotacion_personal: RotacionLevel;
  horas_dueno: number;          // h/semana
  revision_pnl: RevisionPnL;
  cuello: CuelloDolor;
}

export interface QuizResult {
  leakMXN: number;              // fuga mensual estimada (redondeada a $5k)
  recommendations: string[];    // exactamente 3
  arquetipo: string;            // titulo plain language
}

/**
 * Catálogo de preguntas (10 placeholders).
 * Renderizado por diagnostico.astro 1 por pantalla.
 */
export interface QuizQuestion {
  id: keyof QuizInputs;
  label: string;
  helper?: string;
  type: 'number' | 'radio';
  inputmode?: 'numeric' | 'decimal';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;                // sufijo visual ($, %, h)
  options?: { value: string; label: string }[];
  required: true;
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 'ventas_totales',
    label: '¿Cuánto factura su restaurante al mes?',
    helper: 'Ventas brutas totales (sala + delivery + eventos) en MXN.',
    type: 'number',
    inputmode: 'numeric',
    min: 50000,
    max: 5000000,
    step: 10000,
    unit: '$',
    required: true,
  },
  {
    id: 'ventas_delivery',
    label: 'De esas ventas, ¿cuánto entra por plataformas de delivery?',
    helper: 'Rappi + Uber Eats + DiDi + propias. Si no usa, ponga 0.',
    type: 'number',
    inputmode: 'numeric',
    min: 0,
    max: 5000000,
    step: 5000,
    unit: '$',
    required: true,
  },
  {
    id: 'comision_delivery',
    label: '¿Qué % de comisión paga en promedio a las plataformas?',
    helper: 'Incluya comisión + costo de promociones forzadas. Si no usa, ponga 0.',
    type: 'number',
    inputmode: 'numeric',
    min: 0,
    max: 45,
    step: 1,
    unit: '%',
    required: true,
  },
  {
    id: 'food_cost',
    label: '¿Cuál es su food cost actual aproximado?',
    helper: 'Costo de materia prima sobre venta. Si no lo calcula, estime entre 30-40%.',
    type: 'number',
    inputmode: 'numeric',
    min: 15,
    max: 60,
    step: 1,
    unit: '%',
    required: true,
  },
  {
    id: 'ticket_promedio',
    label: '¿Cuál es su ticket promedio por mesa?',
    helper: 'Total cuenta dividido entre número de mesas (no por comensal).',
    type: 'number',
    inputmode: 'numeric',
    min: 80,
    max: 5000,
    step: 10,
    unit: '$',
    required: true,
  },
  {
    id: 'comensales_dia',
    label: '¿Cuántos comensales atiende en un día promedio?',
    helper: 'Personas, no mesas. Promedio semanal.',
    type: 'number',
    inputmode: 'numeric',
    min: 10,
    max: 2000,
    step: 5,
    required: true,
  },
  {
    id: 'rotacion_personal',
    label: '¿Cómo describiría la rotación de su personal en los últimos 12 meses?',
    helper: 'Alta: cambia >40% de plantilla al año. Media: 20-40%. Baja: <20%.',
    type: 'radio',
    options: [
      { value: 'alta', label: 'Alta — costa onboarding y golpea servicio' },
      { value: 'media', label: 'Media — se siente, pero se compensa' },
      { value: 'baja', label: 'Baja — núcleo estable' },
    ],
    required: true,
  },
  {
    id: 'horas_dueno',
    label: '¿Cuántas horas a la semana está usted dentro de la operación directa?',
    helper: 'No incluye administración ni juntas. Solo piso + cocina + caja.',
    type: 'number',
    inputmode: 'numeric',
    min: 0,
    max: 100,
    step: 1,
    unit: 'h',
    required: true,
  },
  {
    id: 'revision_pnl',
    label: '¿Cada cuánto revisa el P&L (estado de resultados) con números reales?',
    helper: 'No el reporte del contador a 3 meses. Su número operativo.',
    type: 'radio',
    options: [
      { value: 'semanal', label: 'Semanal — vivo con el número' },
      { value: 'mensual', label: 'Mensual — cierro al final del mes' },
      { value: 'trimestral', label: 'Trimestral — lo veo con contador' },
      { value: 'nunca', label: 'Nunca — opero por sensación de caja' },
    ],
    required: true,
  },
  {
    id: 'cuello',
    label: 'Si tuviera que apostar, ¿cuál es hoy su cuello principal?',
    helper: 'El dolor que más le quita sueño.',
    type: 'radio',
    options: [
      { value: 'utilidad', label: 'Utilidad — vendo bien pero no me llevo dinero' },
      { value: 'ventas', label: 'Ventas — el comedor no llena o delivery se desploma' },
      { value: 'personal', label: 'Personal — rotación, calidad, ausentismo' },
      { value: 'control', label: 'Control — no sé qué números mover, opero a ciegas' },
    ],
    required: true,
  },
];

/**
 * Toma respuestas crudas y produce inputs tipados.
 * Inválidos o ausentes → 0 (numéricos) o defaults seguros (categóricos).
 */
export function answersToInputs(answers: QuizAnswer[]): QuizInputs {
  const map = new Map(answers.map((a) => [a.id, a.value]));

  const n = (id: string, fallback = 0) => {
    const v = map.get(id);
    const parsed = typeof v === 'number' ? v : parseFloat(String(v ?? ''));
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
  };

  const s = <T extends string>(id: string, valid: readonly T[], fallback: T): T => {
    const v = String(map.get(id) ?? '');
    return (valid as readonly string[]).includes(v) ? (v as T) : fallback;
  };

  return {
    ventas_totales: n('ventas_totales'),
    ventas_delivery: n('ventas_delivery'),
    comision_delivery: n('comision_delivery'),
    food_cost: n('food_cost'),
    ticket_promedio: n('ticket_promedio'),
    comensales_dia: n('comensales_dia'),
    rotacion_personal: s<RotacionLevel>('rotacion_personal', ['alta', 'media', 'baja'] as const, 'media'),
    horas_dueno: n('horas_dueno'),
    revision_pnl: s<RevisionPnL>('revision_pnl', ['semanal', 'mensual', 'trimestral', 'nunca'] as const, 'mensual'),
    cuello: s<CuelloDolor>('cuello', ['utilidad', 'ventas', 'personal', 'control'] as const, 'utilidad'),
  };
}

/**
 * Cálculo determinístico de fuga mensual.
 * Componentes (cada uno se suma y el total se capa a 25% de ventas):
 *  - delivery: si comisión >22% o delivery >35% de ventas
 *  - food cost: cada punto sobre 32% es fuga
 *  - rotación: alta = 3% de ventas, media = 1%
 *  - control P&L: nunca = 4%, trimestral = 2%, mensual = 0.5%
 *  - dueño atrapado: >60h en operación = 2%
 *  - ticket: <180 o sin upsell = 1%
 *
 * Output redondeado a múltiplos de $5,000 para honestidad (no falsa precisión).
 *
 * Contrato M2 (cifra mínima creíble, sin inventar números):
 *  - El redondeo a $5,000 ya implica que la cifra NO-CERO más pequeña es un bucket de $5,000.
 *  - Una fuga cruda < $2,500 redondea a `leakMXN === 0`: NO es "$0 de fuga real", es señal
 *    sub-resolución (no alcanza para una estimación honesta). La UI (diagnostico.astro) NUNCA
 *    debe renderizar "$0": cuando `leakMXN === 0` muestra copy alternativo, no una cifra.
 *  - No se fabrica un piso artificial: flotar un raw de $500 a $5,000 sería sobreestimar 10x.
 */
export function computeMarginLeak(inputs: QuizInputs): QuizResult {
  const ventas = Math.max(inputs.ventas_totales, 0);

  let leak = 0;

  const deliveryShare = ventas > 0 ? inputs.ventas_delivery / ventas : 0;
  if (inputs.comision_delivery > 22 && inputs.ventas_delivery > 0) {
    const excedente = (inputs.comision_delivery - 22) / 100;
    leak += inputs.ventas_delivery * excedente;
  }
  if (deliveryShare > 0.35) {
    leak += ventas * 0.02;
  }

  if (inputs.food_cost > 32) {
    leak += ventas * ((inputs.food_cost - 32) / 100);
  }

  if (inputs.rotacion_personal === 'alta') leak += ventas * 0.03;
  else if (inputs.rotacion_personal === 'media') leak += ventas * 0.01;

  if (inputs.revision_pnl === 'nunca') leak += ventas * 0.04;
  else if (inputs.revision_pnl === 'trimestral') leak += ventas * 0.02;
  else if (inputs.revision_pnl === 'mensual') leak += ventas * 0.005;

  if (inputs.horas_dueno > 60) leak += ventas * 0.02;

  if (inputs.ticket_promedio > 0 && inputs.ticket_promedio < 180) {
    leak += ventas * 0.01;
  }

  const cap = ventas * 0.25;
  leak = Math.min(leak, cap);
  leak = Math.max(leak, 0);

  const leakMXN = Math.round(leak / 5000) * 5000;

  const recommendations = pickRecommendations(inputs);
  const arquetipo = labelArquetipo(inputs);

  return { leakMXN, recommendations, arquetipo };
}

/**
 * Reglas determinísticas en orden. Se toman las primeras 3 que disparan.
 * Si menos de 3, se completa con baseline.
 */
function pickRecommendations(inputs: QuizInputs): string[] {
  const picks: string[] = [];
  const ventas = inputs.ventas_totales;
  const deliveryShare = ventas > 0 ? inputs.ventas_delivery / ventas : 0;

  if (inputs.comision_delivery > 25 || deliveryShare > 0.4) {
    picks.push(
      'Renegociar % de comisión con plataformas y mover 15-25% del volumen a canal propio (web/WhatsApp) en 60 días.',
    );
  }

  if (inputs.food_cost > 32) {
    picks.push(
      `Auditoría forense de food cost: pesar + costear + recetear el menú completo. Cada punto de food cost arriba de 32% es fuga directa (hoy: ${inputs.food_cost}%).`,
    );
  }

  if (inputs.rotacion_personal === 'alta') {
    picks.push(
      'Estructurar onboarding 30-60-90 + escalafón claro de propinas y bonos por turno. Rotación alta cuesta más que el sueldo extra de estabilizarla.',
    );
  }

  if (inputs.revision_pnl === 'nunca' || inputs.revision_pnl === 'trimestral') {
    picks.push(
      'Implementar P&L semanal + cabina de 10 KPIs operativos (food cost, labor, ticket, mermas, comensales, ventas delivery, comisiones, propinas, asistencia, margen). Sin esto no se gobierna.',
    );
  }

  if (inputs.horas_dueno > 60) {
    picks.push(
      `Diseñar sistema operativo que libere al dueño en 6-8 semanas. Hoy ${inputs.horas_dueno}h/sem en operación directa es trampa de capacidad, no compromiso.`,
    );
  }

  if (inputs.ticket_promedio > 0 && inputs.ticket_promedio < 180) {
    picks.push(
      `Reingeniería de menú por mix de margen + script de upsell estructurado. Ticket promedio $${inputs.ticket_promedio} es bajo para sostener food cost y labor mexicanos.`,
    );
  }

  if (inputs.cuello === 'control' && picks.length < 3) {
    picks.push(
      'Levantar el módulo financiero del Acelerador antes que el operativo: sin dashboard semanal, cualquier ajuste operativo es a ciegas.',
    );
  }
  if (inputs.cuello === 'ventas' && picks.length < 3) {
    picks.push(
      'Auditoría de canales: revisar reseñas, ficha de Google Business, mix delivery vs sala, y campaña local antes de cualquier inversión en ads.',
    );
  }

  const baseline = [
    'Confirmar fit con el Acelerador en una auditoría de viabilidad (piso $300k MXN ventas/mes).',
    'Revisar mix de menú por margen real, no por intuición ni por lo que "se vende más".',
    'Implementar cabina semanal con el dueño dentro: 10 KPIs, decisiones lunes, ejecución a la semana.',
  ];
  for (const b of baseline) {
    if (picks.length >= 3) break;
    if (!picks.includes(b)) picks.push(b);
  }

  return picks.slice(0, 3);
}

/**
 * Arquetipo plain language para el H2 del resultado.
 * Determinístico — la mayor fuga gana.
 */
function labelArquetipo(inputs: QuizInputs): string {
  const ventas = inputs.ventas_totales || 1;
  const scores = {
    'alta-fuga-delivery':
      inputs.comision_delivery > 25 || (inputs.ventas_delivery / ventas) > 0.4 ? inputs.ventas_delivery : 0,
    'alta-fuga-pricing': inputs.food_cost > 32 ? ventas * ((inputs.food_cost - 30) / 100) : 0,
    'alta-fuga-personal': inputs.rotacion_personal === 'alta' ? ventas * 0.03 : 0,
    'bajo-control':
      inputs.revision_pnl === 'nunca' || inputs.horas_dueno > 60
        ? ventas * 0.04 + (inputs.horas_dueno > 60 ? ventas * 0.02 : 0)
        : 0,
  } as const;

  const top = (Object.entries(scores) as Array<[keyof typeof scores, number]>).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ['bajo-control', 0] as [keyof typeof scores, number],
  );

  switch (top[0]) {
    case 'alta-fuga-delivery':
      return 'Restaurante que vende — y se desangra en delivery';
    case 'alta-fuga-pricing':
      return 'Restaurante con menú mal costeado — vende pero food cost lo come';
    case 'alta-fuga-personal':
      return 'Restaurante con rotación alta — paga el costo de reentrenar cada trimestre';
    case 'bajo-control':
    default:
      return 'Restaurante operado a sensación — sin tablero, no hay palanca';
  }
}

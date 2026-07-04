/**
 * Quiz "Diagnóstico de fuga de margen" — lógica determinística.
 * P11 / Fase 13. Consumido por src/pages/diagnostico.astro.
 *
 * TODO DH-NEW-02: las 8 preguntas y los pesos abajo son PLACEHOLDER.
 * Cuando Efer entregue el documento DH-NEW-02 (lista canónica de 8-12 preguntas
 * + mapeo a 3 recomendaciones por arquetipo), se reemplaza este archivo.
 * Mientras tanto el quiz es funcional pero el output es coherente, no canónico.
 *
 * M7 (plan_de_mejoras_v3.md): todas las preguntas numéricas se capturan por RANGO
 * (radio), no por input abierto — el punto medio (o la fracción, para delivery)
 * del rango elegido alimenta el cálculo. `ticket_promedio` y `comensales_dia` se
 * retiraron del quiz (la primera por ser el componente de menor peso y sin atarse
 * a ningún arquetipo; la segunda porque nunca se usó en el cálculo).
 */

export type RotacionLevel = 'alta' | 'media' | 'baja';
export type RevisionPnL = 'semanal' | 'mensual' | 'trimestral' | 'nunca';
export type CuelloDolor = 'utilidad' | 'ventas' | 'personal' | 'control';

/**
 * Una respuesta tipada del quiz. El `id` identifica la pregunta;
 * el `value` es el `value` de la opción de radio elegida (string).
 */
export interface QuizAnswer {
  id: string;
  value: string | number;
}

export interface QuizInputs {
  ventas_totales: number;       // MXN/mes (punto medio del rango elegido)
  ventas_delivery: number;      // MXN/mes (derivado: % del rango elegido × ventas_totales)
  comision_delivery: number;    // % (punto medio del rango; "no lo sé" -> 22, neutral)
  food_cost: number;            // % (punto medio del rango; "no lo sé" -> 32, neutral)
  rotacion_personal: RotacionLevel;
  horas_dueno: number;          // h/semana (punto medio del rango elegido)
  revision_pnl: RevisionPnL;
  cuello: CuelloDolor;
}

export interface QuizResult {
  leakMXN: number;              // fuga mensual estimada (redondeada a $5k)
  recommendations: string[];    // exactamente 3
  arquetipo: string;            // titulo plain language
}

/**
 * Catálogo de preguntas (8 placeholders, todas por rango/radio — M7).
 * Renderizado por diagnostico.astro 1 por pantalla.
 */
export interface QuizQuestion {
  id: keyof QuizInputs;
  label: string;
  helper?: string;
  // M7: las 8 preguntas actuales son 'radio'. 'number' se conserva en el tipo
  // (con sus props asociadas) porque diagnostico.astro ya sabe renderizar y
  // validar ese caso — no se elimina infraestructura genérica preexistente
  // que un futuro Q pueda volver a necesitar.
  type: 'number' | 'radio';
  inputmode?: 'numeric' | 'decimal';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;                // sufijo visual ($, %, h)
  /**
   * `numericValue` alimenta el cálculo cuando el campo destino es numérico
   * (punto medio del rango; para `ventas_delivery` es una fracción 0-1, no MXN).
   * Ausente en preguntas categóricas (rotacion_personal, revision_pnl, cuello).
   */
  options?: { value: string; label: string; numericValue?: number }[];
  required: true;
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 'ventas_totales',
    label: '¿Cuánto factura su restaurante al mes (bruto, todas las plataformas)?',
    helper: 'Ventas brutas totales: sala + delivery + eventos.',
    type: 'radio',
    options: [
      { value: '<300k', label: 'Menos de $300,000 / mes', numericValue: 150000 },
      { value: '300k-500k', label: '$300,000 – $500,000 / mes', numericValue: 400000 },
      { value: '500k-1M', label: '$500,000 – $1,000,000 / mes', numericValue: 750000 },
      { value: '1M-2M', label: '$1,000,000 – $2,000,000 / mes', numericValue: 1500000 },
      { value: '>2M', label: 'Más de $2,000,000 / mes', numericValue: 2500000 },
    ],
    required: true,
  },
  {
    id: 'ventas_delivery',
    label: 'De esas ventas, ¿qué % aproximado entra por plataformas de delivery?',
    helper: 'Rappi + Uber Eats + DiDi + propias. Si no usa delivery, elija la primera opción.',
    type: 'radio',
    options: [
      { value: '0', label: 'No uso delivery (0%)', numericValue: 0 },
      { value: '1-20', label: 'Poco — menos de 20% de mis ventas', numericValue: 0.1 },
      { value: '21-40', label: 'Considerable — 20% a 40% de mis ventas', numericValue: 0.3 },
      { value: '>40', label: 'La mayoría — más de 40% de mis ventas', numericValue: 0.5 },
    ],
    required: true,
  },
  {
    id: 'comision_delivery',
    label: '¿Qué % de comisión paga en promedio a esas plataformas?',
    helper: 'Incluya comisión + costo de promociones forzadas.',
    type: 'radio',
    options: [
      { value: '<=18', label: '18% o menos', numericValue: 15 },
      { value: '19-22', label: '19% a 22%', numericValue: 20 },
      { value: '23-30', label: '23% a 30%', numericValue: 26 },
      { value: '>30', label: 'Más de 30%', numericValue: 35 },
      { value: 'no_se', label: 'No lo sé / no uso delivery', numericValue: 22 },
    ],
    required: true,
  },
  {
    id: 'food_cost',
    label: '¿Cuál es su food cost actual aproximado?',
    helper: 'Costo de materia prima sobre venta.',
    type: 'radio',
    options: [
      { value: '<28', label: 'Menos de 28%', numericValue: 26 },
      { value: '28-32', label: '28% a 32%', numericValue: 30 },
      { value: '33-38', label: '33% a 38%', numericValue: 35 },
      { value: '>38', label: 'Más de 38%', numericValue: 42 },
      { value: 'no_se', label: 'No lo sé', numericValue: 32 },
    ],
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
    type: 'radio',
    options: [
      { value: '<=40', label: '40 horas o menos — el equipo corre el piso', numericValue: 30 },
      { value: '41-60', label: '41 a 60 horas', numericValue: 50 },
      { value: '61-80', label: '61 a 80 horas', numericValue: 70 },
      { value: '>80', label: 'Más de 80 horas — estoy en todos los turnos', numericValue: 90 },
    ],
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
 * Toma respuestas crudas (siempre el `value` de una opción de radio) y produce
 * inputs tipados. Inválidos o ausentes → default neutral de cada pregunta
 * (mismo valor que usaría la opción "no lo sé" cuando existe).
 */
export function answersToInputs(answers: QuizAnswer[]): QuizInputs {
  const map = new Map(answers.map((a) => [a.id, a.value]));

  // Traduce el `value` elegido a su `numericValue` declarado en QUESTIONS.
  const optionNumber = (id: string, fallback: number): number => {
    const q = QUESTIONS.find((q) => q.id === id);
    const raw = map.get(id);
    const opt = q?.options?.find((o) => o.value === String(raw ?? ''));
    return opt?.numericValue ?? fallback;
  };

  const s = <T extends string>(id: string, valid: readonly T[], fallback: T): T => {
    const v = String(map.get(id) ?? '');
    return (valid as readonly string[]).includes(v) ? (v as T) : fallback;
  };

  // 400,000 = punto medio del rango "300k-500k" (fallback conservador si falta la respuesta).
  const ventasTotales = optionNumber('ventas_totales', 400000);
  const deliveryShareFrac = optionNumber('ventas_delivery', 0);

  return {
    ventas_totales: ventasTotales,
    ventas_delivery: ventasTotales * deliveryShareFrac,
    comision_delivery: optionNumber('comision_delivery', 22),
    food_cost: optionNumber('food_cost', 32),
    rotacion_personal: s<RotacionLevel>('rotacion_personal', ['alta', 'media', 'baja'] as const, 'media'),
    horas_dueno: optionNumber('horas_dueno', 30),
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

/**
 * Single source of truth para las 11 garantías formales del Acelerador 3 Palancas.
 *
 * Consumido por:
 *  - src/pages/garantia.astro (vista completa con accordion)
 *  - src/components/shared/GarantiasResumen.astro (4 garantías ancla en home + /acelerador)
 *
 * Fuente verbatim: astro-nextswift/docs/garantias-verbatim.md (DH-NEW-04, cerrado 2026-05-18).
 * Regla CLAUDE.md §10: NO modificar copy sin OK explícito de Efer + actualizar el .md primero.
 */

export type GarantiaTipo =
  | 'previa'
  | 'durante'
  | 'post'
  | 'financiera'
  | 'comunicacion'
  | 'gobernanza';

export interface Garantia {
  id: number;
  titulo: string;
  enunciado: string;
  queCubre: string;
  queNoCubre: string;
  comoSeInvoca: string;
  tipo: GarantiaTipo;
  notaLegal?: string;
}

export const SLA_DEFAULT = {
  canal: 'WhatsApp +52 811 042 5674',
  ventana: '12 horas hábiles (compromiso interno: 1 hora máximo)',
  receptor: 'Efer Lara directo, sin filtros intermedios',
};

export const GARANTIAS: Garantia[] = [
  {
    id: 1,
    tipo: 'previa',
    titulo: 'Auditoría previa antes de firmar',
    enunciado:
      'Antes de firmar contrato, hacemos auditoría sin costo. Si no aplica el programa, se lo decimos.',
    queCubre:
      'Sesión de 30 minutos vía WhatsApp o llamada · solo para restaurantes calificados (≥ $300k MXN/mes en ventas brutas) · entrega de mini-reporte con hallazgos prioritarios.',
    queNoCubre:
      'Restaurantes que no califican (sin reporte) · auditoría operativa en piso (parte del Acelerador, no de la pre-venta) · implementación de fixes durante la sesión.',
    comoSeInvoca:
      'WhatsApp, antes de cualquier acuerdo comercial. Respuesta inicial ≤ 12 horas hábiles.',
  },
  {
    id: 2,
    tipo: 'previa',
    titulo: 'Criterio de no-fit honesto',
    enunciado:
      'Si no vemos potencial real para su restaurante, se lo decimos. No le vendemos lo que no necesita.',
    queCubre:
      'Veredicto explícito al cierre de la auditoría previa · recomendación alternativa cuando aplique (otro proveedor, otra etapa, otra prioridad).',
    queNoCubre:
      'Reembolso del tiempo invertido en la sesión (la sesión sigue siendo sin costo) · garantía de que NextSwift acepte a cualquier cliente que cumpla métricas duras (puede haber otros criterios de fit).',
    comoSeInvoca:
      'Automático — se entrega al cierre de la auditoría previa, sin solicitud del cliente.',
  },
  {
    id: 3,
    tipo: 'durante',
    titulo: 'Todo lo propuesto se implementa o se deja funcionando',
    enunciado:
      'Lo que proponemos en el plan se implementa o se deja funcionando antes de cerrar el ciclo. Sin entregables a medias.',
    queCubre:
      'Cada entregable del Acelerador 3 Palancas firmado en propuesta · documentación + handoff con el dueño · validación final con checklist.',
    queNoCubre:
      'Cambios de alcance solicitados después de firmar (entran como addendum) · ejecución de tareas dependientes del cliente que no se cumplieron (accesos, información, asistencia a sesiones).',
    comoSeInvoca:
      'Si un entregable no se entrega como prometido, WhatsApp a Efer. Resolución ≤ 72 horas hábiles o pro-rata del módulo afectado.',
  },
  {
    id: 4,
    tipo: 'durante',
    titulo: 'Resultados visibles en 10-12 días',
    enunciado:
      'El Acelerador 3 Palancas deja activos en 10-12 días hábiles los componentes del programa contratado.',
    queCubre:
      'P&L estructurado · dashboard semanal de KPIs · SOPs documentados de apertura, cierre y compras · costeo real de top-10 platillos · plan de captación con tracking.',
    queNoCubre:
      'Cambio cultural del equipo · resultados financieros sostenidos (esos llegan en 60-90 días según palanca) · adopción duradera sin disciplina del dueño.',
    comoSeInvoca:
      'Si al día 12 hábil falta algún componente firmado, WhatsApp a Efer. Resolución: extensión sin costo o pro-rata según caso.',
  },
  {
    id: 5,
    tipo: 'financiera',
    titulo: 'Cancelación sin compromiso en los primeros 30 días',
    enunciado:
      'Si en los primeros 30 días no superamos sus expectativas, puede cancelar la continuidad sin compromiso de meses futuros.',
    queCubre:
      'Cancelación de meses futuros del servicio recurrente · cierre administrativo limpio · entrega de archivos y entregables generados hasta la fecha de cancelación.',
    queNoCubre:
      'Devolución de meses ya cobrados ni pro-rata del mes en curso · cancelación cuando el cliente NO cumplió sus compromisos contractuales (asistencia a reuniones acordadas, entrega de accesos en tiempo, apertura del P&L real).',
    comoSeInvoca:
      'WhatsApp dentro de los primeros 30 días naturales desde el inicio. Respuesta ≤ 24 horas hábiles. Cierre administrativo en ≤ 7 días.',
    notaLegal: 'Texto sujeto a revisión jurídica previa al lanzamiento (DH-09 abierta).',
  },
  {
    id: 6,
    tipo: 'comunicacion',
    titulo: 'Nunca lo dejamos en visto',
    enunciado:
      'Nunca lo dejamos en visto. Toda solicitud tiene respuesta en menos de 12 horas hábiles.',
    queCubre:
      'Respuesta vía WhatsApp en ≤ 12 horas hábiles · compromiso interno de respuesta en ≤ 1 hora cuando sea posible · acuse de recibido aunque la resolución completa tarde más.',
    queNoCubre:
      'Resolución completa dentro de esas 12 horas (depende del tipo de solicitud) · disponibilidad en fines de semana o festivos (horas hábiles L-V).',
    comoSeInvoca:
      'Cualquier mensaje al WhatsApp +52 811 042 5674. Si pasan más de 12 horas hábiles sin respuesta, escalable al mismo número anteponiendo la palabra "ESCALACIÓN".',
  },
  {
    id: 7,
    tipo: 'gobernanza',
    titulo: 'Priorización por impacto, no por capricho',
    enunciado:
      'El orden de trabajo lo define el impacto sobre su restaurante, no la urgencia emocional del momento.',
    queCubre:
      'Junta mensual de priorización (semanal en paquetes premium) donde se acuerda qué se ataca primero · criterio explícito basado en impacto sobre margen, autonomía, ventas o reputación · documento de decisiones por sesión.',
    queNoCubre:
      'Desviaciones unilaterales del cliente sin pasar por la junta de priorización · ejecución de pendientes acumulados sin re-priorizar formalmente.',
    comoSeInvoca:
      'Si el cliente discrepa con la priorización vigente, se reabre en la siguiente junta. Sin escalación fuera de la cadencia acordada.',
  },
  {
    id: 8,
    tipo: 'post',
    titulo: '7 días de soporte post-Boost',
    enunciado:
      'Al cerrar el Acelerador, incluimos 7 días naturales adicionales de ajuste sobre entregables.',
    queCubre:
      'Ajustes a entregables del Acelerador · resolución de dudas sobre uso · soporte vía WhatsApp durante esos 7 días.',
    queNoCubre:
      'Nuevos módulos · cambios de alcance · soporte indefinido más allá de los 7 días naturales.',
    comoSeInvoca:
      'Automático — se activa al día siguiente del cierre del Acelerador, sin solicitud del cliente.',
  },
  {
    id: 9,
    tipo: 'comunicacion',
    titulo: 'No somos agencia fantasma',
    enunciado:
      'Quien firma es quien ejecuta. No hay capa intermedia, no hay equipo invisible, no hay subcontratación sin avisar.',
    queCubre:
      'Efer Lara aparece nombrado en propuesta, contrato y entrega · acceso directo a Efer vía WhatsApp durante todo el ciclo · transparencia explícita sobre cualquier colaborador externo si llegara a haberlo.',
    queNoCubre:
      'Disponibilidad 24/7 (aplica el SLA de la garantía #6) · presencia física diaria en el restaurante (a menos que se contrate explícitamente).',
    comoSeInvoca:
      'Si en algún momento la comunicación pasa por intermediarios no autorizados, WhatsApp directo a Efer. Resolución inmediata.',
  },
  {
    id: 10,
    tipo: 'comunicacion',
    titulo: 'No vendemos publicaciones bonitas',
    enunciado:
      'Nuestro trabajo no es entregar piezas estéticas. Es mover los números del restaurante.',
    queCubre:
      'Cada entregable se justifica contra un KPI medible (margen, ticket, comensales, recurrencia, reseñas) · reportes con números, no con presentaciones decorativas.',
    queNoCubre:
      'Diseño gráfico sin justificación operativa · piezas de marketing sin métrica de éxito asociada de antemano.',
    comoSeInvoca:
      'Si un entregable se siente "cosmético sin impacto", se reabre en la junta mensual de priorización. Se reemplaza por algo accionable.',
  },
  {
    id: 11,
    tipo: 'gobernanza',
    titulo: 'KPIs visibles y revisión periódica',
    enunciado:
      'Los KPIs del programa están visibles desde el día uno. Revisión formal con el dueño según cadencia del paquete contratado.',
    queCubre:
      'Reporte mensual preparado por Efer (semanal en paquetes premium) · KPIs operativos y financieros relevantes al cliente · semáforos de avance y alertas tempranas. Los KPIs específicos varían por restaurante y se acuerdan al inicio del programa.',
    queNoCubre:
      'Dashboards en tiempo real automatizados (entran como módulo separado del catálogo) · KPIs que el cliente no quiera o no pueda medir (food cost real si no abre números, por ejemplo).',
    comoSeInvoca:
      'Cadencia automática según paquete. Si el reporte no llega en la fecha acordada, WhatsApp a Efer — entrega ≤ 72 horas hábiles.',
  },
];

/**
 * Garantías ancla mostradas en el resumen de home y /acelerador.
 * Se eligen 4 con cobertura simbólica: pre-venta + operación + comunicación + financiera.
 */
export const GARANTIAS_RESUMEN_IDS = [1, 4, 5, 6] as const;

export function getGarantiaById(id: number): Garantia | undefined {
  return GARANTIAS.find((g) => g.id === id);
}

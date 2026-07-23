/**
 * /api/retro-drivers — endpoint server (Cloudflare Worker) para la hoja de
 * retroalimentación de drivers de Depósito Intocables (cliente "repartidores").
 *
 * Recibe el POST del formulario (nextswift.mx/retro-drivers, same-origin, sin CORS),
 * valida + descarta bots (honeypot) y REENVÍA server→server al Apps Script Web App
 * que escribe al Google Sheet. La URL del Apps Script NUNCA llega al cliente.
 *
 * Var requerida (Cloudflare): RETRO_APPS_SCRIPT_URL = la URL /exec del Web App.
 * Contrato de datos: 01-clientes/repartidores/.../formulario/contrato-campos.md
 * Mismo patrón que src/pages/api/lead.ts.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const RETRO_APPS_SCRIPT_URL = import.meta.env.RETRO_APPS_SCRIPT_URL as string | undefined;

const ENCARGADOS = ['Chely', 'Brayan'] as const;
const DRIVER_IDS = ['juan-antonio', 'gerardo', 'federico', 'james'] as const;
const VE = ['si', 'poco', 'no'] as const;
const TURNO_IDEAL = ['dia', 'tarde', 'noche', 'sin-opinion', ''] as const;
const RECOMENDACION = ['mantener', 'reubicar', 'baja', ''] as const;
const CRITERIOS = [
  'puntualidad', 'actividad_horas_muertas', 'profesionalismo', 'rapidez',
  'presentacion_requisitos', 'cuidado_producto', 'comunicacion', 'confiabilidad',
] as const;

interface DriverPayload {
  id?: string;
  nombre?: string;
  turno_actual?: string;
  ve_en_turno?: string;
  notas?: Record<string, unknown>;
  turno_ideal?: string;
  recomendacion?: string;
  comentario_libre?: string;
  [k: string]: unknown;
}
interface RetroPayload {
  encargado?: string;
  semana?: string;
  hp?: string;
  drivers?: DriverPayload[];
}

function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Entero 1–5 o null.
function score(v: unknown): number | null {
  if (v === null || v === undefined || v === '') return null;
  const n = Math.round(Number(v));
  if (!Number.isFinite(n) || n < 1 || n > 5) return null;
  return n;
}
function str(v: unknown, max = 1000): string {
  if (v === null || v === undefined) return '';
  return String(v).trim().slice(0, max);
}
function oneOf<T extends readonly string[]>(v: unknown, allowed: T): string {
  const s = str(v, 40);
  return (allowed as readonly string[]).includes(s) ? s : '';
}

export const POST: APIRoute = async ({ request }) => {
  if (!RETRO_APPS_SCRIPT_URL) {
    console.error('[retro-drivers] RETRO_APPS_SCRIPT_URL missing in env');
    return jsonResponse(500, { success: false, error: 'Server misconfiguration' });
  }

  let body: RetroPayload;
  try {
    body = (await request.json()) as RetroPayload;
  } catch {
    return jsonResponse(400, { success: false, error: 'Invalid JSON body' });
  }

  // Honeypot: campo oculto que un humano deja vacío. Si viene con texto → bot.
  // Respondemos "success" para no darle señal, pero NO reenviamos al Sheet.
  if (str(body.hp, 200)) {
    return jsonResponse(200, { success: true });
  }

  const encargado = str(body.encargado, 40);
  if (!(ENCARGADOS as readonly string[]).includes(encargado)) {
    return jsonResponse(400, { success: false, error: 'Encargado inválido' });
  }
  if (!Array.isArray(body.drivers) || body.drivers.length === 0 || body.drivers.length > 4) {
    return jsonResponse(400, { success: false, error: 'drivers inválido' });
  }

  // Normaliza cada driver a un shape limpio y validado (defensa en profundidad;
  // el Apps Script también sanea). Descarta ids desconocidos.
  const drivers = body.drivers
    .filter((d) => (DRIVER_IDS as readonly string[]).includes(str(d?.id, 40)))
    .map((d) => {
      const notasIn = (d.notas ?? {}) as Record<string, unknown>;
      const out: Record<string, unknown> = {
        id: str(d.id, 40),
        nombre: str(d.nombre, 120),
        turno_actual: str(d.turno_actual, 60),
        ve_en_turno: oneOf(d.ve_en_turno, VE),
        turno_ideal: oneOf(d.turno_ideal, TURNO_IDEAL),
        recomendacion: oneOf(d.recomendacion, RECOMENDACION),
        comentario_libre: str(d.comentario_libre),
      };
      const notas: Record<string, string> = {};
      for (const c of CRITERIOS) {
        out[c] = score((d as Record<string, unknown>)[c]);
        notas[c] = str(notasIn[c]);
      }
      out.notas = notas;
      return out;
    });

  if (drivers.length === 0) {
    return jsonResponse(400, { success: false, error: 'Sin drivers válidos' });
  }

  const forward = {
    encargado,
    semana: str(body.semana, 20),
    drivers,
  };

  try {
    const res = await fetch(RETRO_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(forward),
      redirect: 'follow',
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      console.error('[retro-drivers] Apps Script respondió error', res.status, data);
      return jsonResponse(502, { success: false, error: data.error ?? 'No se pudo guardar' });
    }
  } catch (err) {
    console.error('[retro-drivers] error al reenviar al Apps Script', err);
    return jsonResponse(502, { success: false, error: 'Network error reaching sheet' });
  }

  return jsonResponse(200, { success: true });
};

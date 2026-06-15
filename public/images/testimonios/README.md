# Avatares de testimonios — convención

Fotos de cara para los testimonios de `SocialProof variant="testimonios"` (M10).

## Reglas (no negociables)

- **Solo con autorización escrita** del cliente (DH-NEW-01). Sin autorización → NO se sube.
- **NUNCA stock, NUNCA una cara inventada.** Si no hay foto autorizada, el componente
  pinta automáticamente un placeholder con las iniciales del nombre. No hace falta hacer nada.
- DH-05 sigue vigente para **video**: cero video en testimonios.

## Formato

- `.webp`, recorte cuadrado (1:1), cara centrada.
- Mínimo **96×96 px** (se muestra a 48 px → 2× para pantallas retina).
- Peso objetivo: ≤ 20 KB por avatar.

## Nombrado

`/images/testimonios/<id-del-testimonio>.webp` — el `<id>` es el campo `id` en
`src/data/testimonios.ts`. Ejemplos:

| id testimonio   | archivo esperado                      | estado            |
|-----------------|---------------------------------------|-------------------|
| `temaky-exduena`| `temaky-exduena.webp`                 | pendiente de Efer |
| `pangas-metrica`| `pangas-metrica.webp`                 | pendiente de Efer |
| `oita-arranque` | `oita-arranque.webp`                  | pendiente de Efer (testimonio aún no autorizado) |

## Cómo activarlo

1. Coloca el `.webp` autorizado aquí con el nombre del `id`.
2. En `src/data/testimonios.ts`, añade al testimonio: `avatar: '/images/testimonios/<id>.webp'`.
3. Listo: el componente sustituye el placeholder de iniciales por la foto.

# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

---

## 📊 Tracking & Analytics (P21 / Fase 26)

Tracking client-side vive en `src/lib/tracking.ts` y expone `window.nxTrack`:

| Función | Disparo | Eventos | Consent gate |
| :--- | :--- | :--- | :--- |
| `pageView()` | Auto en `Base.astro` | Pixel + CAPI + GA4 | `cookieConsent='all'` |
| `viewContent(name)` | Scroll a Stakes/Oferta/Garantía | Pixel + CAPI + GA4 | `cookieConsent='all'` |
| `lead(quizResult)` | Quiz completado | Pixel + CAPI + GA4 | siempre (acción explícita) |
| `completeRegistration(formData)` | Form auditoria submit | Pixel + CAPI + GA4 | siempre (acción explícita) |
| `contact('whatsapp')` | Click wa.me (auto-wired) | Pixel + CAPI + GA4 | siempre (acción explícita) |

Dedup Pixel ↔ CAPI: shared `event_id` (UUID v4) por evento.

**Variables de entorno (Cloudflare Pages → Settings → Environment variables):**

- `META_PIXEL_ID` — `1545738293336210` (literal).
- `META_CAPI_TOKEN` — token CAPI (Events Manager → Settings → Conversions API). **Nunca commit.**
- `PUBLIC_GA4_MEASUREMENT_ID` — opcional, `G-XXXXXXXXXX`. Si vacía, GA4 es no-op.
- `PUBLIC_GOOGLE_ADS_ACCOUNT_ID` + `PUBLIC_GOOGLE_ADS_LABEL_*` — opcionales (ConversionTags en `/gracias-*`).
- `HUBSPOT_TOKEN` + `HUBSPOT_PIPELINE_ID` + `HUBSPOT_STAGE_NEW_ID` — server (`/api/lead`).

**Dashboard interno (placeholder — pendiente conectar):**

- Looker Studio: `https://lookerstudio.google.com/` — armar reporte conectando GA4 + Sheet (HubSpot export). URL del reporte final por agregar tras P21 closeout.
- Métricas baseline a tracker: PageView, Lead, CompleteRegistration, Contact, costos paid media (Meta Ads + Google Ads), CPL por canal, CAC mes a mes.


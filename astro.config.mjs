// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import critters from 'astro-critters';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.nextswift.mx',
  output: 'static',
  // imageService: 'compile' (M23) — optimiza las imágenes de astro:assets
  // (<Picture> del hero) a archivos AVIF/WebP ESTÁTICOS en build. Sin esto, el
  // adaptador default sirve /_image en runtime vía el binding Cloudflare Images,
  // que no está configurado en este proyecto → rompería el LCP del hero.
  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/gracias-') &&
        !page.includes('/api/'),
    }),
    critters(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

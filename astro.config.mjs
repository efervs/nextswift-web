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
  adapter: cloudflare(),
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

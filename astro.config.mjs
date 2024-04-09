import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

import { loadEnv } from 'vite';
const { RENDER_MODE, IMAGE_DOMAIN, LOCALES, DEFAULT_LOCALE } = loadEnv(
  import.meta.env,
  process.cwd(),
  ''
);

let renderSpecific = {};
if (RENDER_MODE === 'SSR') {
  renderSpecific = {
    output: 'server',
    adapter: cloudflare(),
  };
}
if (RENDER_MODE === 'SSG') {
  renderSpecific = {
    image: {
      domains: [`${IMAGE_DOMAIN}`, 'placehold.co'],
      // service: {
      //   entrypoint: 'src/imagesharp.ts',
      // },
    },
  };
}
export default defineConfig({
  prefetch: {
    defaultStrategy: 'hover', // 'tap'
  },
  // site: 'https://aks-astro-webhooks.pages.dev/',
  integrations: [react(), sitemap()],
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALES.split(','),
    routing: {
      prefixDefaultLocale: false,
    },
  },
  ...renderSpecific,
});

import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  prefetch: {
    defaultStrategy: 'hover', // 'tap'
  },
  site: 'https://aks-astro-webhooks.pages.dev/',
  integrations: [react(), sitemap()],
});

// SSR
// import { defineConfig } from 'astro/config'
// import { nodejs } from '@astrojs/node'

// export default defineConfig({
//   output: 'server', // 'server' or 'hybrid'
//   adapter: nodejs()
// })

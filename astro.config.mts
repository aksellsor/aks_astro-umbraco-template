import { defineConfig, passthroughImageService } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import satoriAstro from 'satori-astro';

import { loadEnv } from 'vite';
const {
  RENDER_MODE,
  // IMAGE_DOMAIN,
  PUBLIC_LOCALES,
  PUBLIC_DEFAULT_LOCALE,
  SITE,
} = loadEnv(import.meta.env, process.cwd(), '');

let renderSpecific = {};
if (RENDER_MODE === 'SSR') {
  renderSpecific = {
    output: 'server',
    adapter: cloudflare(),
    //   {
    //   imageService: 'passthrough',
    // }
    // image: {
    //   service: passthroughImageService(),
    // },
  };
}
// if (RENDER_MODE === 'SSG') {
//   renderSpecific = {
//     image: {
//       domains: [`${IMAGE_DOMAIN}`, 'placehold.co'],
//       // service: {
//       //   entrypoint: 'src/imagesharp.ts',
//       // },
//     },
//   };
// }

export default defineConfig({
  // prefetch: {
  //   defaultStrategy: 'hover', // 'tap'
  // },
  site: SITE,
  integrations: [react(), sitemap(), satoriAstro()],
  vite: {
    ssr: {
      external: ['node:buffer'],
    },
  },
  i18n: {
    defaultLocale: PUBLIC_DEFAULT_LOCALE,
    locales: PUBLIC_LOCALES.split(','),
    routing: {
      prefixDefaultLocale: false,
    },
  },
  ...renderSpecific,
});

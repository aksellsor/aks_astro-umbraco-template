import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // prefetch: {
  //   defaultStrategy: 'hover', // 'tap'
  // },
  integrations: [react()],
});

// SSR
// import { defineConfig } from 'astro/config'
// import { nodejs } from '@astrojs/node'

// export default defineConfig({
//   output: 'server', // 'server' or 'hybrid'
//   adapter: nodejs()
// })

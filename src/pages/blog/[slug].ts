// import type { APIRoute } from 'astro';
// import { satoriAstroOG } from 'satori-astro';
// import { html } from 'satori-html';

// export const GET: APIRoute = async ({ params, request }) => {
//   const fontFile = await fetch(
//     'https://og-playground.vercel.app/inter-latin-ext-700-normal.woff'
//   );
//   const fontData: ArrayBuffer = await fontFile.arrayBuffer();
//   function getUrlParam(param) {
//     const url = new URL(request.url); // Bruker window.location.href for å hente gjeldende side URL
//     return url.searchParams.get(param); // Henter verdien av den angitte parameteren
//   }
//   return await satoriAstroOG({
//     template: html`<div
//       style="display: flex;flex-direction:column; justify-items: center; align-items: center;background-color: #111111; box-shadow:inset 0px 0px 5px 5px solid greenyellow; font-family: Inter; height: 100%;">
//       <div
//         style="margin:auto auto auto 150px; display:flex;flex-direction:column;">
//         <h1 style="color: greenyellow;display:block;font-size:50px;">
//           ${params.slug.replace(/-/g, ' ')}
//         </h1>
//         <h2 style="color:#fff;font-size:70px;">
//           ${getUrlParam('description')?.replace(/-/g, ' ')}
//         </h2>
//       </div>
//     </div>`,
//     width: 1200,
//     height: 630,
//   }).toResponse({
//     satori: {
//       fonts: [
//         {
//           name: 'Inter Latin',
//           data: fontData,
//           style: 'normal',
//         },
//       ],
//     },
//   });
// };

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {
  return new Response('test');
};

import React from 'react';
import vercelOGPagesPlugin from '@cloudflare/pages-plugin-vercel-og';

interface Props {
  ogTitle: string;
}

export const onRequest = vercelOGPagesPlugin<Props>({
  imagePathSuffix: '/social-image.png',
  component: ({ ogTitle, pathname }) => {
    return <div style={{ display: 'flex' }}>{ogTitle}</div>;
  },
  extractors: {
    on: {
      'meta[property="og:title"]': (props) => ({
        element(element) {
          props.ogTitle = element.getAttribute('content');
        },
      }),
    },
  },
  autoInject: {
    openGraph: true,
  },
});

// imagePathSuffix:
// the path suffix to make the generate image available at.
// For example, if you mount this Plugin at functions/blog/_middleware.ts,
// set the imagePathSuffix as /social-image.png and have a /blog/hello-world page, the image will be available at /blog/hello-world/social-image.png.

// https://developers.cloudflare.com/pages/functions/plugins/vercel-og/

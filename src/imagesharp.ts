const IMAGE_CDN = import.meta.env.IMAGE_CDN;
import type { ExternalImageService, AstroConfig, ImageTransform } from 'astro';

const service: ExternalImageService = {
  validateOptions(options: ImageTransform, imageConfig: AstroConfig['image']) {
    const serviceConfig = imageConfig.service.config;
    // Enforce the user set max width.
    if (options.width > serviceConfig.maxWidth) {
      console.warn(
        `Image width ${options.width} exceeds max width ${serviceConfig.maxWidth}. Falling back to max width.`
      );
      options.width = serviceConfig.maxWidth;
    }

    return options;
  },
  getURL(options: ImageTransform, imageConfig: AstroConfig['image']) {
    return `${IMAGE_CDN}${options.src}?quality=${options.quality}&width=${options.width}&height=${options.height}&format=${options.format}`;
  },
  // getSrcSet(options: ImageTransform, imageConfig: AstroConfig['image']) {
  //   const { src, widths, format, quality, ...attributes } = options;
  //   return widths?.map((w) => {
  //     return {
  //       transform: {
  //         src: `${IMAGE_CDN}${src}?quality=${quality}&width=${w}format=${format}`,
  //         // width?: number | undefined;
  //         // widths?: number[] | undefined;
  //         // densities?: (number | `${number}x`)[] | undefined;
  //         // height?: number | undefined;
  //         // quality?: ImageQuality | undefined;
  //         // format?: ImageOutputFormat | undefined;
  //         // [key: string]: any;
  //       },
  //       descriptor: '',
  //       attributes: attributes,
  //     };
  //   });
  // },
  getHTMLAttributes(options, imageConfig) {
    const { src, format, quality, ...attributes } = options;
    return {
      ...attributes,
      loading: options.loading ?? 'lazy',
      decoding: options.decoding ?? 'async',
    };
  },
};

export default service;

import { getSortParam, getExpandParam } from './utils';
import type { Sort, Expand } from './utils';
const UMBRACO_ROOT_NODE = import.meta.env.UMBRACO_ROOT_NODE;
const RENDER_MODE = import.meta.env.RENDER_MODE;
const GET_FROM_LOCAL_JSON = import.meta.env.GET_FROM_LOCAL_JSON;
const UMBRACO_URL = import.meta.env.UMBRACO_URL;
let PUBLIC_DEFAULT_LOCALE = import.meta.env.PUBLIC_DEFAULT_LOCALE;
let PUBLIC_LOCALES = import.meta.env.PUBLIC_LOCALES?.split(',');
class UmbracoClient {
  private deliveryApiPath = '/umbraco/delivery/api/v1/content';
  private deliveryApiUrl: string;

  constructor(domain: string) {
    this.deliveryApiUrl = `${domain}${this.deliveryApiPath}`;
  }

  async getContentFromUmbraco(
    id: string,
    preview: boolean = false,
    // culture: string = '',
    { expand }: { expand?: Expand } = {}
  ) {
    return await fetch(
      `${this.deliveryApiUrl}/item/${id}${getExpandParam(expand)}`,
      {
        method: 'GET',
        headers: {
          Preview: preview ? 'true' : 'false',
          'Api-Key': 'b2radl-gr8skd-3fidjlw-ds8fj3-3dkfg6',
          // 'Accept-Language': culture,
        },
      }
    );
  }

  async getContentFromJson(url: string, id: string) {
    const response = await fetch(`${url}/data.json`);
    const dataObject = await response.json();
    // console.log(
    //   Object.values(dataObject)?.map((item: any) => item?.route?.path)
    // );
    let currentPage = Object.values(dataObject)?.find(
      (item: any) =>
        item?.route?.path === `${id === '/' ? '/' : `/${id}/`}` ||
        item.id === id
    );
    return currentPage;
  }

  async getContentById(
    url: string,
    id: string,
    preview: boolean = false,
    // culture: string = '',
    { expand }: { expand?: Expand } = {}
  ) {
    if (preview || GET_FROM_LOCAL_JSON === 'false' || RENDER_MODE === 'SSG') {
      let data = null;
      let err = null;
      await this.getContentFromUmbraco(id, preview, {
        expand,
      }).then((r) => {
        if (r.status != 200) {
          // Error
          err = true;
        } else {
          data = r.json();
        }
      });
      if (err) {
        await this.getContentFromJson(url, id).then((d) => {
          data = d;
        });
      }
      return data;
    } else {
      let data = null;
      await this.getContentFromJson(url, id).then((d) => {
        data = d;
      });
      return data;
    }
  }

  async getContentByType(
    itemType: string,
    { sort, expand }: { sort?: Sort; expand?: Expand } = {},
    culture: string = ''
  ) {
    let headers = {};
    if (culture?.length > 0) {
      headers['Accept-Language'] = culture;
    }
    const response = await fetch(
      `${this.deliveryApiUrl}?filter=contentType:${itemType}${getSortParam(
        sort
      )}${getExpandParam(expand)}`,
      {
        method: 'GET',
        headers,
      }
    );
    const data = await response.json();

    return data.items;
  }
  async getContentByLocale(locale) {
    const pages = await this.getContentByType(
      `page`,
      {
        sort: { type: 'createDate', order: 'asc' },
      },
      locale
    );

    const root = await this.getContentByType(
      `root`,
      {
        sort: { type: 'createDate', order: 'asc' },
      },
      locale
    );
    return [...pages, ...root];
  }
  async getAllPages() {
    let languages = PUBLIC_LOCALES?.map((lang) =>
      lang === PUBLIC_DEFAULT_LOCALE ? '' : lang
    );
    // Kaller getContentByLocale for hver locale og venter på alle løftene
    const allContentPromises = languages?.map((locale) =>
      this.getContentByLocale(locale)
    );
    const allContent = await Promise.all(allContentPromises);

    // Flattening av arrayet for å få en enkel liste med all innhold
    const flattenedContent = allContent.flat();
    return flattenedContent;
  }
  async getRootData(origin, pathname, preview) {
    let langPrefix = PUBLIC_LOCALES?.find(
      (lang) => lang === pathname.split('/')[1]
    );

    const pageData = await this.getContentById(
      origin,
      langPrefix || UMBRACO_ROOT_NODE,
      preview
    ).then((res) => res);
    return pageData;
  }
}

export default new UmbracoClient(UMBRACO_URL);

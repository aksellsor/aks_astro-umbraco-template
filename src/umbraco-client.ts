import { getSortParam, getExpandParam } from './utils';
import type { Sort, Expand } from './utils';
// const RENDER_MODE = import.meta.env.RENDER_MODE;
const GET_FROM_LOCAL_JSON = import.meta.env.GET_FROM_LOCAL_JSON;
// let SSG = RENDER_MODE === 'SSG';
const UMBRACO_URL = import.meta.env.UMBRACO_URL;
class UmbracoClient {
  private deliveryApiPath = '/umbraco/delivery/api/v1/content';
  private deliveryApiUrl: string;

  constructor(domain: string) {
    this.deliveryApiUrl = `${domain}${this.deliveryApiPath}`;
  }

  async getContentById(
    url: string,
    id: string,
    preview: boolean = false,
    // culture: string = '',
    { expand }: { expand?: Expand } = {}
  ) {
    if (preview || GET_FROM_LOCAL_JSON === 'false') {
      let error = null;
      let data = null;
      await fetch(
        `${this.deliveryApiUrl}/item/${id}${getExpandParam(expand)}`,
        {
          method: 'GET',
          headers: {
            Preview: preview ? 'true' : 'false',
            'Api-Key': 'b2radl-gr8skd-3fidjlw-ds8fj3-3dkfg6',
            // 'Accept-Language': culture,
          },
        }
      )
        .then((r) => r.json())
        .then((d) => (data = d))
        .catch((errorMessage) => (error = errorMessage));
      return data;
    } else {
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
}

export default new UmbracoClient(UMBRACO_URL);

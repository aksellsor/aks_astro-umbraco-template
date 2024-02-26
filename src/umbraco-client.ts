import { getSortParam, getExpandParam } from './utils';
import type { Sort, Expand } from './utils';

class UmbracoClient {
  private deliveryApiPath = '/umbraco/delivery/api/v1/content';
  private deliveryApiUrl: string;

  constructor(domain: string) {
    this.deliveryApiUrl = `${domain}${this.deliveryApiPath}`;
  }

  async getContentById(id: string, { expand }: { expand?: Expand } = {}) {
    const response = await fetch(
      `${this.deliveryApiUrl}/item/${id}${getExpandParam(expand)}`
    );
    const data = await response.json();

    return data;
  }

  async getContentByType(
    itemType: string,
    { sort, expand }: { sort?: Sort; expand?: Expand } = {}
  ) {
    const response = await fetch(
      `${this.deliveryApiUrl}?filter=contentType:${itemType}${getSortParam(
        sort
      )}${getExpandParam(expand)}`
    );
    const data = await response.json();

    return data.items;
  }
}

export default new UmbracoClient('https://1235738-www.web.tornado-node.net');

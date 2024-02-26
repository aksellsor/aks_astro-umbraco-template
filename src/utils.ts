const IMAGE_CDN = import.meta.env.IMAGE_CDN;
export type Sort = {
  type: 'createDate' | 'updateDate' | 'sortOrder' | 'name' | 'level';
  order?: 'asc' | 'desc';
};

function getSortParam(sort: Sort): string {
  if (!sort) return '';

  return `&sort=${sort.type}:${sort.order}`;
}

export type Expand = 'all' | string[];

function getExpandParam(expand: Expand) {
  let expandParam = '';

  if (expand === 'all') {
    expandParam = '&expand=all';
  } else if (typeof expand === 'object') {
    expandParam = '?expand=property:';

    expand.forEach((item, index) => {
      expandParam += index === 0 ? item : `,${item}`;
    });
  }

  return expandParam;
}

function getUmbracoImage(image) {
  if (!image) return;
  const { url } = image[0];
  return `${IMAGE_CDN}${url}`;
}
export { getSortParam, getExpandParam, getUmbracoImage };

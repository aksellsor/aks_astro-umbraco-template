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

function getUmbracoImage(image, params = '') {
  if (!image) return;
  const { url, name } = image[0];
  return { url: `${IMAGE_CDN}${url}${params}`, name };
}

function slugify(str) {
  if (!(typeof str === 'string' && str?.length > 0)) return '';
  return str
    .toString() // Gjør om til streng (i tilfelle den ikke allerede er det)
    .normalize('NFD') // Normaliserer til Unicode Normaliseringsskjema D
    .replace(/[\u0300-\u036f]/g, '') // Fjerner diakritiske tegn
    .trim() // Fjerner ledende og avsluttende mellomrom
    .replace(/\s+/g, '-') // Erstatter mellomrom med bindestrek
    .replace(/[^\w\-]+/g, '') // Fjerner alle tegn som ikke er ordtegn eller bindestrek
    .replace(/\-\-+/g, '-'); // Erstatter flere bindestreker med en enkelt
}
export { getSortParam, getExpandParam, getUmbracoImage, slugify };

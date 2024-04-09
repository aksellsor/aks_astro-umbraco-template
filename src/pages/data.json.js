import client from '../umbraco-client';
let PUBLIC_DEFAULT_LOCALE = import.meta.env.PUBLIC_DEFAULT_LOCALE;
let PUBLIC_LOCALES = import.meta.env.PUBLIC_LOCALES?.split(',');
export const prerender = true;
export async function GET() {
  let languages = PUBLIC_LOCALES?.map((lang) =>
    lang === PUBLIC_DEFAULT_LOCALE ? '' : lang
  );
  // const pages = await client.getContentByType('page', {
  //   sort: { type: 'createDate', order: 'asc' },
  // });

  // const root = await client.getContentByType('root', {
  //   sort: { type: 'createDate', order: 'asc' },
  // });

  // const allPages = [...pages, ...root];
  // return new Response(JSON.stringify(allPages));

  // En funksjon som henter innhold basert på locale
  async function getContentByLocale(locale) {
    const pages = await client.getContentByType(
      `page`,
      {
        sort: { type: 'createDate', order: 'asc' },
      },
      locale
    );

    const root = await client.getContentByType(
      `root`,
      {
        sort: { type: 'createDate', order: 'asc' },
      },
      locale
    );

    return [...pages, ...root];
  }

  // Kaller getContentByLocale for hver locale og venter på alle løftene
  const allContentPromises = languages?.map((locale) =>
    getContentByLocale(locale)
  );
  const allContent = await Promise.all(allContentPromises);

  // Flattening av arrayet for å få en enkel liste med all innhold
  const flattenedContent = allContent.flat();
  return new Response(JSON.stringify(flattenedContent));
}

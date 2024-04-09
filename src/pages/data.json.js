import client from '../umbraco-client';
export const prerender = true;
export async function GET() {
  let allPages = await client.getAllPages();
  return new Response(JSON.stringify(allPages));
}

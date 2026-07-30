import type { APIRoute } from 'astro';

export const GET: APIRoute = () => new Response(
  'User-agent: *\nAllow: /\nSitemap: https://riftbornewiki.317society.com/sitemap-index.xml\n',
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
);

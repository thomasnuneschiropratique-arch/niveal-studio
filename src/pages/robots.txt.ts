import type { APIRoute } from 'astro';
import { link } from '../lib/url';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(link('/sitemap-index.xml'), site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

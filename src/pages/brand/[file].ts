import type { APIRoute, GetStaticPaths } from 'astro';
import { logoPng, monogram, ogImage } from '../../lib/brand';

/** Fichiers générés à partir du logo et des photos (voir src/lib/brand.ts). */
const FILES: Record<string, () => Promise<Buffer>> = {
  'logo-black.png': async () => (await logoPng('black')).data,
  'logo-white.png': async () => (await logoPng('white')).data,
  'favicon-48.png': () => monogram(48),
  'favicon-192.png': () => monogram(192),
  'apple-touch-icon.png': () => monogram(180),
  'og-image.jpg': () => ogImage(),
};

export const getStaticPaths = (() =>
  Object.keys(FILES).map((file) => ({ params: { file } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const file = params.file!;
  const body = await FILES[file]();
  return new Response(new Uint8Array(body), {
    headers: { 'Content-Type': file.endsWith('.jpg') ? 'image/jpeg' : 'image/png' },
  });
};

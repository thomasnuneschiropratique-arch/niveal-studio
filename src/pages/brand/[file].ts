import type { APIRoute, GetStaticPaths } from 'astro';
import { logoPng, monogram, ogImage } from '../../lib/brand';
import { SITE } from '../../config';

/** Manifeste web : nom et icônes utilisés lors de l'ajout du site à l'écran d'accueil d'un téléphone. */
const manifest = () =>
  Promise.resolve(
    Buffer.from(
      JSON.stringify({
        name: SITE.name,
        short_name: 'Niveal',
        description: SITE.description,
        lang: 'fr',
        start_url: '../',
        display: 'browser',
        background_color: '#f7f5f0',
        theme_color: '#f7f5f0',
        icons: [
          { src: 'favicon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      }),
    ),
  );

/** Fichiers générés à partir du logo et des photos (voir src/lib/brand.ts). */
const FILES: Record<string, () => Promise<Buffer>> = {
  'logo-black.png': async () => (await logoPng('black')).data,
  'logo-white.png': async () => (await logoPng('white')).data,
  'favicon-48.png': () => monogram(48),
  'favicon-192.png': () => monogram(192),
  'apple-touch-icon.png': () => monogram(180),
  'icon-512.png': () => monogram(512),
  'manifest.webmanifest': manifest,
  'og-image.jpg': () => ogImage(),
};

export const getStaticPaths = (() =>
  Object.keys(FILES).map((file) => ({ params: { file } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const file = params.file!;
  const body = await FILES[file]();
  return new Response(new Uint8Array(body), {
    headers: {
      'Content-Type': file.endsWith('.jpg')
        ? 'image/jpeg'
        : file.endsWith('.webmanifest')
          ? 'application/manifest+json'
          : 'image/png',
    },
  });
};

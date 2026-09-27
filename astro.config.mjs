// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import protectOriginals from './src/integrations/protect-originals.mjs';

// Adresse publique du site et éventuel sous-dossier.
// Sur GitHub Pages, ces deux valeurs sont fournies automatiquement par le
// workflow de déploiement (.github/workflows/deploy.yml) : rien à modifier ici,
// y compris le jour où un nom de domaine personnalisé est branché.
const site = process.env.SITE_URL || 'https://nivealstudio.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,

  // Cache des images optimisées : conservé entre deux builds (et en CI) pour
  // ne pas recompresser les photos à chaque déploiement.
  cacheDir: './.astro-cache',

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/mentions-legales/'),
    }),
    protectOriginals(),
  ],

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        webp: { quality: 80 },
        jpeg: { quality: 82, mozjpeg: true },
        png: { compressionLevel: 9 },
      },
    },
  },

  // Les pages sont préchargées au survol des liens : navigation quasi instantanée.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  devToolbar: { enabled: false },
});

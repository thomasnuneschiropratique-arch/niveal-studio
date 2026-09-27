// @ts-check
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Garantit qu'aucune photo en pleine résolution n'est publiée.
 *
 * Astro copie dans le build chaque image importée, puis supprime les originaux
 * des images qu'il a optimisées. Les photos présentes dans /assets/photos mais
 * affichées nulle part (option `hidden`, fichier pas encore rangé…) resteraient
 * donc en ligne en pleine taille : cette étape les retire.
 *
 * @param {{ photosDir?: string }} [options]
 * @returns {import('astro').AstroIntegration}
 */
export default function protectOriginals({ photosDir = 'assets/photos' } = {}) {
  return {
    name: 'niveal:protect-originals',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const assetsDir = path.join(outDir, '_astro');
        // Le build remplace certains caractères des noms (« & » devient « _ ») : on garde les deux formes.
        const names = new Set(
          (await fs.readdir(photosDir)).flatMap((file) => {
            const base = file.replace(/\.[^.]+$/, '');
            return [base, base.replace(/[^\w.-]/g, '_')];
          }),
        );

        // Nom d'un original copié par Astro : « nom.hash8.ext »
        // (les versions optimisées sont de la forme « nom.hash8_xxxx.ext »).
        const isOriginal = (/** @type {string} */ file) => {
          const match = file.match(/^(.+)\.[\w-]{8}\.(jpe?g|png|webp|avif|tiff?)$/i);
          return match !== null && names.has(match[1]);
        };

        let files;
        try {
          files = await fs.readdir(assetsDir);
        } catch {
          return;
        }
        const originals = files.filter(isOriginal);
        if (originals.length === 0) return;

        // Sécurité : ne jamais supprimer un fichier réellement utilisé par une page.
        const html = await readAllHtml(outDir);
        let removed = 0;
        for (const file of originals) {
          if (html.includes(file)) {
            logger.warn(`${file} est utilisé tel quel dans une page : fichier conservé.`);
            continue;
          }
          await fs.unlink(path.join(assetsDir, file));
          removed++;
        }
        if (removed > 0) logger.info(`${removed} photo(s) originale(s) non publiée(s).`);
      },
    },
  };
}

/** @param {string} dir */
async function readAllHtml(dir) {
  let content = '';
  for (const entry of await fs.readdir(dir, { withFileTypes: true, recursive: true })) {
    if (entry.isFile() && entry.name.endsWith('.html')) {
      content += await fs.readFile(path.join(entry.parentPath, entry.name), 'utf8');
    }
  }
  return content;
}

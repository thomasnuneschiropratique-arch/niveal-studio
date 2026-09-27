import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { chapters, otherPhotos, type PhotoEntry } from '../data/photos';

/** Toutes les images de /assets/photos, indexées par nom de fichier. */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/assets/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

const byName = new Map<string, ImageMetadata>(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!, mod.default]),
);

export interface Photo {
  file: string;
  alt: string;
  image: ImageMetadata;
  width: number;
  height: number;
  /** Rapport largeur / hauteur. */
  ratio: number;
  orientation: 'portrait' | 'landscape';
  feature: boolean;
}

const entries = new Map<string, PhotoEntry>();
for (const entry of [...chapters.flatMap((c) => c.photos), ...otherPhotos]) {
  entries.set(entry.file, entry);
}

function toPhoto(entry: PhotoEntry): Photo {
  const image = byName.get(entry.file);
  if (!image) {
    throw new Error(
      `[photos] Fichier introuvable : « ${entry.file} ». Vérifiez qu'il est bien dans /assets/photos et que le nom est identique dans src/data/photos.ts (majuscules et extension comprises).`,
    );
  }
  // Astro publie le fichier original dès qu'on lit une propriété de l'image
  // hors de son pipeline : on lit donc les dimensions sur une copie. Ainsi,
  // seules les versions optimisées sont mises en ligne, jamais les originaux.
  const { width, height } = (image as ImageMetadata & { clone?: ImageMetadata }).clone ?? image;
  const ratio = width / height;
  return {
    file: entry.file,
    alt: entry.alt,
    image,
    width,
    height,
    ratio,
    orientation: ratio > 1.05 ? 'landscape' : 'portrait',
    feature: Boolean(entry.feature),
  };
}

/** Récupère une photo du catalogue par son nom de fichier. */
export function getPhoto(file: string): Photo {
  const entry = entries.get(file);
  if (!entry) {
    throw new Error(
      `[photos] « ${file} » n'est pas décrite dans src/data/photos.ts : ajoutez-y une ligne { file, alt }.`,
    );
  }
  return toPhoto(entry);
}

/** Les chapitres du portfolio, avec leurs photos visibles. */
export function getChapters() {
  return chapters.map((chapter) => ({
    ...chapter,
    photos: chapter.photos.filter((p) => !p.hidden).map(toPhoto),
  }));
}

/** Photos présentes dans /assets/photos mais utilisées nulle part (signalées au build). */
export function unusedPhotoFiles(): string[] {
  return [...byName.keys()].filter((name) => !entries.has(name)).sort();
}

/* -------------------------------------------------------------------------- */
/*  Optimisation                                                              */
/* -------------------------------------------------------------------------- */

/** Largeurs générées pour chaque photo (WebP). La plus grande sert à la visionneuse. */
export const WIDTHS = [640, 1024, 1600, 2400];
/** Version JPEG de secours pour les navigateurs sans WebP. */
const FALLBACK_WIDTHS = [800, 1600];

export interface OptimizedPhoto {
  webpSrcset: string;
  jpgSrc: string;
  jpgSrcset: string;
}

export async function optimize(photo: Photo, widths: number[] = WIDTHS): Promise<OptimizedPhoto> {
  const [webp, jpg] = await Promise.all([
    getImage({ src: photo.image, format: 'webp', width: widths.at(-1), widths }),
    getImage({ src: photo.image, format: 'jpg', width: FALLBACK_WIDTHS.at(-1), widths: FALLBACK_WIDTHS }),
  ]);
  return {
    webpSrcset: webp.srcSet.attribute,
    jpgSrc: jpg.src,
    jpgSrcset: jpg.srcSet.attribute,
  };
}

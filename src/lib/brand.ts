import path from 'node:path';
import sharp from 'sharp';

/**
 * Déclinaisons du logo, générées au build à partir de /assets/logo :
 * logos recadrés, favicon (le « N » du logo) et image de partage (Open Graph).
 * Remplacer les fichiers de /assets/logo suffit à tout mettre à jour.
 */

const LOGO_DIR = path.resolve('assets/logo');
const PHOTO_DIR = path.resolve('assets/photos');

type LogoColor = 'black' | 'white';

const PAPER = '#f7f5f0';
const INK = '#12110f';

const trimmedCache = new Map<LogoColor, Promise<Buffer>>();

/** Logo débarrassé des marges transparentes du fichier d'origine. */
function trimmedLogo(color: LogoColor): Promise<Buffer> {
  if (!trimmedCache.has(color)) {
    trimmedCache.set(
      color,
      sharp(path.join(LOGO_DIR, `logo-${color}.png`)).trim().png().toBuffer(),
    );
  }
  return trimmedCache.get(color)!;
}

const LOGO_WIDTH = 800;

export async function logoPng(color: LogoColor) {
  const { data, info } = await sharp(await trimmedLogo(color))
    .resize({ width: LOGO_WIDTH, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/** Dimensions du logo, pour réserver sa place dans la page (attributs width/height). */
export async function logoSize() {
  const { width, height } = await logoPng('black');
  return { width, height };
}

/** Première lettre du logo (le « N »), isolée automatiquement. */
async function monogramGlyph(): Promise<Buffer> {
  const logo = await trimmedLogo('black');
  const { data, info } = await sharp(logo)
    .ensureAlpha()
    .extractChannel('alpha')
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const ink = (x: number, y: number) => data[y * w + x] > 32;
  const columnHasInk = (x: number) => {
    for (let y = 0; y < h; y++) if (ink(x, y)) return true;
    return false;
  };

  let x0 = 0;
  while (x0 < w && !columnHasInk(x0)) x0++;
  let x1 = x0;
  while (x1 < w && columnHasInk(x1)) x1++;

  let y0 = h;
  let y1 = 0;
  for (let y = 0; y < h; y++) {
    for (let x = x0; x < x1; x++) {
      if (ink(x, y)) {
        y0 = Math.min(y0, y);
        y1 = Math.max(y1, y + 1);
        break;
      }
    }
  }
  return sharp(logo).extract({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 }).toBuffer();
}

/** Icône carrée : le « N » noir centré sur fond crème. */
export async function monogram(size: number): Promise<Buffer> {
  const inner = Math.round(size * 0.62);
  const glyph = await sharp(await monogramGlyph())
    .resize({ width: inner, height: inner, fit: 'inside' })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: PAPER } })
    .composite([{ input: glyph, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Image de partage 1200 × 630 : la photo d'accueil, recadrée autour de la mariée, et le logo blanc. */
export async function ogImage(): Promise<Buffer> {
  const W = 1200;
  const H = 630;
  // La photo est verticale : on la met à la largeur puis on garde une bande centrée sur la mariée.
  const resized = await sharp(path.join(PHOTO_DIR, 'mariee-mur-jaune.jpg'))
    .rotate()
    .resize({ width: W })
    .toBuffer({ resolveWithObject: true });
  const top = Math.max(0, Math.min(resized.info.height - H, Math.round(resized.info.height * 0.42 - H / 2)));

  const [photo, logo] = await Promise.all([
    sharp(resized.data).extract({ left: 0, top, width: W, height: H }).toBuffer(),
    sharp(await trimmedLogo('white')).resize({ width: 440 }).toBuffer(),
  ]);
  const shade = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="${INK}" fill-opacity="0.34"/></svg>`,
  );

  return sharp({ create: { width: W, height: H, channels: 3, background: INK } })
    .composite([
      { input: photo, left: 0, top: 0 },
      { input: shade, left: 0, top: 0 },
      { input: logo, gravity: 'center' },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
}

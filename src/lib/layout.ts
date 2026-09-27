import type { Photo } from './photos';

/**
 * Mise en page « magazine » du portfolio.
 *
 * Les photos sont regroupées en lignes d'une à trois images selon leur
 * orientation, en faisant tourner plusieurs gabarits (duo décalé, triptyque,
 * photo seule à gauche ou à droite, paysage large…) pour éviter la grille
 * uniforme. Le rendu de chaque gabarit est défini dans portfolio.astro.
 */

export type RowType =
  | 'feature'
  | 'duo'
  | 'duo-rev'
  | 'trio'
  | 'solo-left'
  | 'solo-right'
  | 'solo-center'
  | 'wide'
  | 'll'
  | 'll-rev'
  | 'pl'
  | 'lp';

export interface Row {
  type: RowType;
  photos: Photo[];
}

const PORTRAIT_CYCLE: RowType[] = ['duo', 'trio', 'solo-right', 'duo-rev', 'solo-left'];

export function buildRows(photos: Photo[]): Row[] {
  const rows: Row[] = [];
  const isL = (p?: Photo) => !!p && !p.feature && p.orientation === 'landscape';
  const isP = (p?: Photo) => !!p && !p.feature && p.orientation === 'portrait';
  let portraitTurn = 0;
  let landscapeTurn = 0;
  let pairTurn = 0;
  let i = 0;

  while (i < photos.length) {
    const [a, b, c] = [photos[i], photos[i + 1], photos[i + 2]];

    if (a.feature) {
      rows.push({ type: a.orientation === 'landscape' ? 'wide' : 'feature', photos: [a] });
      i += 1;
      continue;
    }

    if (a.orientation === 'landscape') {
      if (isL(b)) {
        rows.push({ type: pairTurn++ % 2 === 0 ? 'll' : 'll-rev', photos: [a, b] });
        i += 2;
      } else if (isP(b) && landscapeTurn++ % 2 === 0) {
        rows.push({ type: 'lp', photos: [a, b] });
        i += 2;
      } else {
        rows.push({ type: 'wide', photos: [a] });
        i += 1;
      }
      continue;
    }

    // `a` est un portrait.
    if (isL(b)) {
      rows.push({ type: 'pl', photos: [a, b] });
      i += 2;
      continue;
    }
    if (!isP(b)) {
      rows.push({ type: 'solo-center', photos: [a] });
      i += 1;
      continue;
    }

    const type = PORTRAIT_CYCLE[portraitTurn++ % PORTRAIT_CYCLE.length];
    if (type === 'trio' && isP(c)) {
      rows.push({ type, photos: [a, b, c] });
      i += 3;
    } else if (type === 'solo-left' || type === 'solo-right') {
      rows.push({ type, photos: [a] });
      i += 1;
    } else {
      rows.push({ type: type === 'trio' ? 'duo' : type, photos: [a, b] });
      i += 2;
    }
  }

  return rows;
}

/* -------------------------------------------------------------------------- */
/*  Attribut `sizes` : largeur affichée de chaque emplacement                 */
/* -------------------------------------------------------------------------- */

/** Colonnes occupées (sur 12) par chaque emplacement, à partir de la tablette. */
const COLUMNS: Record<RowType, number[]> = {
  feature: [8],
  duo: [6, 4],
  'duo-rev': [4, 6],
  trio: [4, 4, 4],
  'solo-left': [6],
  'solo-right': [6],
  'solo-center': [6],
  wide: [10],
  ll: [7, 5],
  'll-rev': [5, 7],
  pl: [4, 7],
  lp: [7, 4],
};

/** Largeur (en % de l'écran) de chaque emplacement sur mobile. */
const MOBILE: Record<RowType, number[]> = {
  feature: [100],
  duo: [50, 50],
  'duo-rev': [84, 84],
  trio: [100, 50, 50],
  'solo-left': [84],
  'solo-right': [84],
  'solo-center': [100],
  wide: [100],
  ll: [100, 84],
  'll-rev': [84, 100],
  pl: [66, 100],
  lp: [100, 66],
};

const MAX_CONTAINER = 1560;

export function sizesFor(type: RowType, index: number): string {
  const cols = COLUMNS[type][index];
  const wide = Math.round((cols / 12) * MAX_CONTAINER);
  const vw = Math.round((cols / 12) * 94);
  return `(min-width: 1700px) ${wide}px, (min-width: 40em) ${vw}vw, ${MOBILE[type][index]}vw`;
}

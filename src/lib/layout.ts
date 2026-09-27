import type { Photo } from './photos';

/**
 * Mise en page du portfolio : lignes « justifiées ».
 *
 * Les photos sont regroupées en lignes de 2 à 5 images qui occupent toute la
 * largeur ; dans une ligne, toutes les photos ont la même hauteur (les
 * portraits sont plus étroits, les paysages plus larges), sans recadrage et
 * sans photo isolée. La hauteur des lignes varie légèrement d'une ligne à
 * l'autre pour garder du rythme.
 *
 * Sur mobile, chaque ligne est redécoupée : deux portraits côte à côte,
 * les paysages seuls sur toute la largeur.
 */

export interface Row {
  photos: Photo[];
  /** Somme des rapports largeur / hauteur de la ligne. */
  sum: number;
  /** Découpage de la ligne sur mobile. */
  lines: Photo[][];
}

/**
 * Somme visée des rapports largeur / hauteur pour chaque ligne :
 * plus elle est grande, plus la ligne est basse. On alterne pour varier.
 */
const TARGETS = [2.5, 3.1, 2.2, 2.8];
const FEATURE_TARGET = 2;

const total = (photos: Photo[]) => photos.reduce((s, p) => s + p.ratio, 0);

/** Écart à une ligne « confortable » : ni trop haute (somme < 2), ni trop basse (somme > 3,4). */
const penalty = (photos: Photo[]) => {
  const sum = total(photos);
  return sum < 2 ? (2 - sum) * 2 : Math.max(0, sum - 3.4);
};

export function buildRows(photos: Photo[]): Row[] {
  const groups: Photo[][] = [];
  let current: Photo[] = [];
  let turn = 0;
  let target = TARGETS[0];

  const close = () => {
    groups.push(current);
    current = [];
    turn++;
    target = TARGETS[turn % TARGETS.length];
  };

  for (const photo of photos) {
    if (current.length === 0 && photo.feature) target = FEATURE_TARGET;
    const sum = total(current);
    // Ajouter cette photo éloignerait la ligne de sa cible : on la ferme avant.
    if (current.length >= 2 && Math.abs(sum + photo.ratio - target) > Math.abs(sum - target)) {
      close();
      if (photo.feature) target = FEATURE_TARGET;
    }
    current.push(photo);
    if (current.length >= 2 && total(current) >= target) close();
  }

  if (current.length > 0) groups.push(current);

  // Fin de chapitre : une dernière ligne isolée ou trop haute est fusionnée avec
  // la précédente, puis les deux sont redécoupées de la façon la plus équilibrée.
  const last = groups[groups.length - 1];
  if (groups.length >= 2 && (last.length < 2 || total(last) < 1.8)) {
    const merged = [...groups[groups.length - 2], ...last];
    let best: Photo[][] = [merged];
    let bestPenalty = penalty(merged);
    for (let k = 2; k <= merged.length - 2; k++) {
      const option = [merged.slice(0, k), merged.slice(k)];
      const p = Math.max(...option.map(penalty));
      if (p < bestPenalty) {
        bestPenalty = p;
        best = option;
      }
    }
    groups.splice(-2, 2, ...best);
  }

  return groups.map((group) => ({ photos: group, sum: total(group), lines: mobileLines(group) }));
}

function mobileLines(photos: Photo[]): Photo[][] {
  const lines: Photo[][] = [];
  for (let i = 0; i < photos.length; ) {
    const [a, b] = [photos[i], photos[i + 1]];
    if (a.orientation === 'portrait' && b?.orientation === 'portrait') {
      lines.push([a, b]);
      i += 2;
    } else {
      lines.push([a]);
      i += 1;
    }
  }
  return lines;
}

/* -------------------------------------------------------------------------- */
/*  Attribut `sizes` : largeur réellement affichée de chaque photo            */
/* -------------------------------------------------------------------------- */

const MAX_CONTAINER = 1560;

export function sizesFor(photo: Photo, row: Row): string {
  const share = photo.ratio / row.sum;
  const line = row.lines.find((l) => l.includes(photo)) ?? [photo];
  const mobileShare = photo.ratio / total(line);
  return [
    `(min-width: 1700px) ${Math.round(share * MAX_CONTAINER)}px`,
    `(min-width: 40em) ${Math.max(10, Math.round(share * 94))}vw`,
    `${Math.round(mobileShare * 92)}vw`,
  ].join(', ');
}

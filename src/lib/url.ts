const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Préfixe un chemin interne avec le sous-dossier du site
 * (utile sur GitHub Pages, où le site peut vivre sous /nom-du-depot/).
 */
export function link(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Vrai si `path` correspond à la page affichée. */
export function isCurrent(path: string, pathname: string): boolean {
  const normalize = (p: string) => p.replace(/\/+$/, '') || '/';
  return normalize(link(path)) === normalize(pathname);
}

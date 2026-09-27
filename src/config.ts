/**
 * Réglages généraux du site.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  CONTACT_EMAIL      → l'adresse e-mail d'Anna (À COMPLÉTER)          │
 * │  FORMSPREE_ENDPOINT → le formulaire Formspree (configuré)            │
 * │                                                                      │
 * │  Tant que CONTACT_EMAIL contient « A_REMPLACER », l'adresse n'est    │
 * │  pas affichée sur le site (le formulaire, lui, fonctionne).          │
 * └──────────────────────────────────────────────────────────────────────┘
 */

/** Adresse e-mail d'Anna — affichée sur la page Contact et dans le pied de page. */
export const CONTACT_EMAIL = 'A_REMPLACER@exemple.fr';

/**
 * Adresse du formulaire Formspree (https://formspree.io), de la forme
 * « https://formspree.io/f/xxxxxxxx ». C'est dans le tableau de bord Formspree
 * que l'on choisit l'adresse qui reçoit les messages.
 */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdekpwwa';

export const SITE = {
  name: 'Niveal Studio',
  photographer: 'Anna Aguerre',
  tagline: 'Fine art, with true emotions.',
  city: 'Toulouse',
  region: 'Occitanie',
  description:
    'Anna Aguerre, photographe de mariage à Toulouse et dans le Sud-Ouest : une approche documentaire et fine art, discrète du début à la fin.',
  instagram: {
    url: 'https://www.instagram.com/nivealstudio',
    handle: '@nivealstudio',
  },
  email: CONTACT_EMAIL,
  formEndpoint: FORMSPREE_ENDPOINT,
} as const;

/** Vrai tant qu'une valeur n'a pas été personnalisée. */
export const isPlaceholder = (value: string) => value.includes('A_REMPLACER');

/**
 * Réglages généraux du site.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  À COMPLÉTER AVANT LA MISE EN LIGNE                                  │
 * │                                                                      │
 * │  1. CONTACT_EMAIL      → l'adresse e-mail d'Anna                     │
 * │  2. FORMSPREE_ENDPOINT → l'adresse du formulaire Formspree           │
 * │                                                                      │
 * │  Tant que ces valeurs contiennent « A_REMPLACER », l'adresse e-mail  │
 * │  n'est pas affichée sur le site et le formulaire ouvre la messagerie │
 * │  du visiteur au lieu d'envoyer le message (voir README).             │
 * └──────────────────────────────────────────────────────────────────────┘
 */

/** Adresse e-mail d'Anna — affichée sur la page Contact et dans le pied de page. */
export const CONTACT_EMAIL = 'A_REMPLACER@exemple.fr';

/**
 * Adresse du formulaire Formspree (https://formspree.io), de la forme
 * « https://formspree.io/f/xxxxxxxx ». C'est dans le tableau de bord Formspree
 * que l'on choisit l'adresse qui reçoit les messages.
 */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/A_REMPLACER';

export const SITE = {
  name: 'Niveal Studio',
  photographer: 'Anna Aguerre',
  tagline: 'Fine art, with true emotions.',
  city: 'Toulouse',
  region: 'Occitanie',
  description:
    'Anna Aguerre, photographe de mariage à Toulouse et dans le Sud-Ouest. Une approche documentaire et fine art, discrète du début à la fin. Destination weddings partout ailleurs.',
  instagram: {
    url: 'https://www.instagram.com/nivealstudio',
    handle: '@nivealstudio',
  },
  email: CONTACT_EMAIL,
  formEndpoint: FORMSPREE_ENDPOINT,
} as const;

/** Vrai tant qu'une valeur n'a pas été personnalisée. */
export const isPlaceholder = (value: string) => value.includes('A_REMPLACER');

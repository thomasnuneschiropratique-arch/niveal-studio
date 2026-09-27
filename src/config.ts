/**
 * Réglages généraux du site.
 *
 *   CONTACT_EMAIL      → l'adresse e-mail d'Anna (page Contact, pied de page)
 *   FORMSPREE_ENDPOINT → le formulaire Formspree qui envoie les messages
 *   LEGAL              → statut, SIRET et adresse (page Mentions légales)
 */

/** Adresse e-mail d'Anna — affichée sur la page Contact et dans le pied de page. */
export const CONTACT_EMAIL = 'anna.aguerre@hotmail.com';

/**
 * Adresse du formulaire Formspree (https://formspree.io), de la forme
 * « https://formspree.io/f/xxxxxxxx ». C'est dans le tableau de bord Formspree
 * que l'on choisit l'adresse qui reçoit les messages.
 */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdekpwwa';

/**
 * Informations légales affichées sur la page Mentions légales.
 * Chaque ligne n'apparaît sur le site qu'une fois remplie.
 */
export const LEGAL = {
  /** Activité déclarée, ex. « Photographie » */
  activity: 'Photographie',
  /** Ex. « Entrepreneur individuel (micro-entreprise) » */
  status: 'Entrepreneuse individuelle (micro-entreprise)',
  /** Numéro SIRET à 14 chiffres, ex. « 123 456 789 00012 » */
  siret: '981 627 219 00026',
  /** Adresse professionnelle ou de domiciliation, ex. « 12 rue …, 31000 Toulouse » */
  address: 'Toulouse, France',
};

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

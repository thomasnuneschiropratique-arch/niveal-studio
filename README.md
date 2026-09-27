# Niveal Studio — site vitrine

Site d'Anna Aguerre, photographe de mariage à Toulouse : accueil, à propos,
portfolio et contact. Construit avec [Astro](https://astro.build) (site statique)
et publié sur GitHub Pages.

---

## Lancer le site sur son ordinateur

Il faut [Node.js](https://nodejs.org) version 22.12 ou plus récente
(version « LTS » conseillée).

```bash
npm install     # une seule fois : installe les outils
npm run dev     # lance le site sur http://localhost:4321
```

Les modifications s'affichent en direct dans le navigateur. Autres commandes :

```bash
npm run build     # fabrique la version finale dans le dossier dist/
npm run preview   # affiche cette version finale sur http://localhost:4321
```

> Sur le Mac où le site a été préparé, Node.js est installé dans `~/.local/node`.
> Pour l'utiliser depuis un terminal : `export PATH="$HOME/.local/node/bin:$PATH"`
> (ou installez Node.js normalement depuis nodejs.org).

---

## Avant la mise en ligne : l'e-mail et le formulaire

Tout se règle dans **`src/config.ts`** :

| Réglage              | Rôle                                                            |
| -------------------- | --------------------------------------------------------------- |
| `CONTACT_EMAIL`      | adresse affichée sur la page Contact et dans le pied de page (**à compléter**) |
| `FORMSPREE_ENDPOINT` | formulaire Formspree (**déjà configuré** : `https://formspree.io/f/xdekpwwa`) |

Le formulaire fonctionne sans serveur grâce à [Formspree](https://formspree.io) :
les messages arrivent à l'adresse choisie dans le tableau de bord Formspree.
À la première demande reçue, Formspree peut demander de confirmer le formulaire
par e-mail : pensez à vérifier la boîte de réception (et les indésirables).

Tant que `CONTACT_EMAIL` contient `A_REMPLACER`, l'adresse n'est simplement pas
affichée sur le site.

Pensez aussi à compléter les passages surlignés de la page
**Mentions légales** (`src/pages/mentions-legales.astro`) : statut, SIRET,
adresse, durée de conservation des messages.

---

## Changer les photos

Les photos sont dans **`assets/photos/`**, le logo dans **`assets/logo/`**.
Déposez les fichiers tels qu'ils sortent de Lightroom : le site fabrique
lui-même les versions légères (WebP et JPEG, plusieurs tailles). Un export
à 2500–3000 px de large suffit largement et accélère la publication.
Les fichiers originaux ne sont **jamais** mis en ligne.

Toutes les photos sont décrites dans **`src/data/photos.ts`** :

- **ajouter une photo au portfolio** : déposez le fichier dans `assets/photos/`,
  puis ajoutez une ligne dans le chapitre voulu (préparatifs, cérémonie,
  couple, réception), avec une courte description (`alt`) de ce que l'on voit ;
- **changer l'ordre** : déplacez les lignes ; la mise en page se recalcule
  toute seule : les photos sont regroupées en lignes pleine largeur qui
  s'emboîtent (même hauteur sur une ligne, portraits et paysages mélangés,
  jamais de photo isolée) ;
- **mettre une photo en avant** : ajoutez `feature: true` (sa ligne est plus haute) ;
- **masquer une photo** sans la supprimer : ajoutez `hidden: true`.

Si un nom de fichier est mal écrit, `npm run dev` / `npm run build` le signale
clairement. Une photo déposée mais pas encore rangée est signalée au build.

Les photos des autres pages se choisissent en haut de chaque page, par leur nom
de fichier (`getPhoto('…')`) :

| Page     | Fichier                   | Photos utilisées                                         |
| -------- | ------------------------- | -------------------------------------------------------- |
| Accueil  | `src/pages/index.astro`   | photo d'ouverture, sélection, chapitres, témoignages      |
| À propos | `src/pages/a-propos.astro`| portrait d'Anna, diptyque « Fine art / True emotions »   |
| Contact  | `src/pages/contact.astro` | photo d'accompagnement                                   |

Le logo (`assets/logo/logo-black.png` et `logo-white.png`) peut être remplacé
par un nouvel export : les marges transparentes, le favicon (le « N » du logo)
et l'image de partage sur les réseaux sont recalculés automatiquement.

---

## Changer les textes

Les textes sont directement dans les pages, dans `src/pages/` :

- `index.astro` — accueil (phrase signature, approche, témoignages) ;
- `a-propos.astro` — « Qui je suis », « New York, 2024 », valeurs ;
- `portfolio.astro` — introduction et citation entre les chapitres ;
- `contact.astro` — accroche et formulaire ;
- `mentions-legales.astro`.

Le titre et la description de chaque page pour Google sont en haut du fichier
(`title=` et `description=`). Les réglages communs (nom, Instagram, description
générale) sont dans `src/config.ts`.

Couleurs, typographies et espacements : `src/styles/global.css`.

---

## Mise en ligne sur GitHub Pages

Le déploiement est automatique à chaque envoi sur la branche `main`
(fichier `.github/workflows/deploy.yml`).

1. Créez un dépôt sur GitHub (par exemple `niveal-studio`) et envoyez-y le projet :
   ```bash
   git remote add origin https://github.com/VOTRE-COMPTE/niveal-studio.git
   git push -u origin main
   ```
2. Sur GitHub : **Settings → Pages → Build and deployment → Source :
   « GitHub Actions »**.
3. Le site est publié en quelques minutes à l'adresse
   `https://VOTRE-COMPTE.github.io/niveal-studio/` (onglet **Actions** pour
   suivre la publication).

**Nom de domaine** (ex. `nivealstudio.fr`) : renseignez-le dans
Settings → Pages → Custom domain et suivez les indications de GitHub pour la
configuration DNS. Rien à modifier dans le code : l'adresse du site, les liens,
le sitemap et les balises de partage s'adaptent automatiquement.

---

## Organisation des fichiers

```
assets/
  logo/                 logo noir et blanc (fichiers d'origine)
  photos/               toutes les photos (fichiers d'origine)
src/
  config.ts             ← e-mail, formulaire, Instagram
  data/photos.ts        ← catalogue des photos (chapitres, ordre, descriptions)
  pages/                les pages du site (un fichier = une page)
  components/           en-tête, pied de page, photo, visionneuse…
  layouts/              gabarit commun (balises SEO, polices)
  lib/                  optimisation des images, mise en page du portfolio, logo
  scripts/site.ts       menu mobile, en-tête, apparitions au défilement
  styles/global.css     couleurs, typographies, espacements
.github/workflows/      publication automatique sur GitHub Pages
```

Bon à savoir :

- **Performances** : images en WebP (JPEG de secours), plusieurs tailles selon
  l'écran, chargement différé ; polices hébergées sur le site.
- **Référencement** : titres et descriptions par page, balises Open Graph,
  données structurées (photographe à Toulouse), `sitemap-index.xml` et
  `robots.txt` générés automatiquement.
- **Accessibilité** : texte alternatif sur chaque photo, navigation au clavier
  (menu et visionneuse), contrastes vérifiés, animations désactivées si le
  visiteur l'a demandé à son système.

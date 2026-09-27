/**
 * Catalogue des photos du site.
 *
 * Les fichiers se trouvent dans /assets/photos. Pour ajouter une photo :
 *   1. déposez le fichier dans /assets/photos ;
 *   2. ajoutez une ligne { file, alt } dans le chapitre voulu ci-dessous.
 * L'ordre des lignes est l'ordre d'affichage dans le portfolio ; la mise en page
 * (tailles, décalages, alternance portrait / paysage) se calcule toute seule.
 *
 * « alt » est la description lue par les lecteurs d'écran et par Google :
 * une phrase simple qui dit ce que l'on voit sur la photo.
 *
 * Options facultatives :
 *   feature: true  → la photo est mise en avant, seule sur sa ligne et en grand ;
 *   hidden: true   → la photo reste dans le catalogue mais n'apparaît pas dans le portfolio.
 */

export interface PhotoEntry {
  file: string;
  alt: string;
  feature?: boolean;
  hidden?: boolean;
}

export interface Chapter {
  /** Identifiant utilisé dans l'adresse : /portfolio/#preparatifs */
  id: string;
  number: string;
  /** Titre complet du chapitre ; le dernier mot s'affiche en italique. */
  title: string;
  /** Titre court (index du portfolio, liste de la page d'accueil). */
  label: string;
  /** Photo illustrant le chapitre sur la page d'accueil. */
  cover: string;
  photos: PhotoEntry[];
}

export const chapters: Chapter[] = [
  {
    id: 'preparatifs',
    number: '01',
    title: 'Les préparatifs',
    label: 'Préparatifs',
    cover: 'image00006.jpeg',
    photos: [
      { file: 'image00007.jpeg', alt: 'Salle de bain d’une demeure ancienne baignée de soleil : la robe de dentelle suspendue au mur, les souliers posés sur les tomettes.' },
      { file: 'image00006.jpeg', alt: 'Détails du matin posés sur un lavabo : flacons de parfum, rangs de perles et escarpins à plateforme couleur nude.' },
      { file: 'image00009.jpeg', alt: 'Faire-part calligraphié, rangs de perles et voile de dentelle posés sur un tissu rouge sombre traversé par la lumière.' },
      { file: 'image00035.jpeg', alt: 'Les alliances dans un écrin rose posé sur le tulle et la dentelle du voile.' },
      { file: 'image00018.jpeg', alt: 'En noir et blanc, perles, parfums et souliers de la mariée rassemblés dans un lavabo ancien.' },
      { file: 'image00042.jpeg', alt: 'Les accessoires de la mariée sur une banquette : escarpins blancs, boucles d’oreilles, parfum, gazette du mariage et champagne au frais.' },
      { file: 'image00053.jpeg', alt: 'En noir et blanc, la mariée en peignoir satiné rit en se penchant vers le miroir d’une salle de bain ancienne.' },
      { file: 'image00069.jpeg', alt: 'Les demoiselles d’honneur en robes jaune pâle se préparent dans un salon, l’une d’elles assise au piano.' },
      { file: 'image00080.jpeg', alt: 'La robe de mariée suspendue à une armoire ancienne en noyer, les sandales posées sur les tomettes.' },
      { file: 'image00012.jpeg', alt: 'Vue plongeante sur un billard vert : mocassins, montre, cigares, flacon de parfum et carte de bienvenue du marié.' },
      { file: 'image00008.jpeg', alt: 'Le marié en costume croisé crème joue au billard dans un salon de château, un verre de cognac posé sur le tapis vert.' },
      { file: 'image00015.jpeg', alt: 'Portrait du marié en costume croisé crème fumant un cigare, la fumée suspendue dans la lumière d’une fenêtre.' },
      { file: 'image00017.jpeg', alt: 'Le marié en costume blanc prend la pose sur un canapé de velours vert, un verre de cognac à portée de main.' },
      { file: 'image00016.jpeg', alt: 'Les amis du marié réunis dans la cuisine d’un château, lunettes de soleil sur le nez, le matin du mariage.' },
      { file: 'image00011.jpeg', alt: 'En noir et blanc, fous rires entre témoins autour du billard, dans un salon inondé de lumière.' },
      { file: 'image00019.jpeg', alt: 'En noir et blanc et en cadrage incliné, les témoins en lunettes de soleil éclatent de rire sur un carrelage ancien.' },
      { file: 'image00010.jpeg', alt: 'En noir et blanc, les témoins du marié rient à une fenêtre aux volets ouverts sur la façade d’un château.' },
      { file: 'image00071.jpeg', alt: 'Vue d’en haut des escarpins blancs, des boucles d’oreilles, du parfum et de la gazette des mariés posés sur le voile de dentelle.' },
      { file: 'image00070.jpeg', alt: 'En noir et blanc, les accessoires du marié alignés sur un sol de pierre : montre, souliers vernis, boutons de manchette et champagne au frais.' },
      { file: 'image00048.jpeg', alt: 'Le marié en chemise blanche lace ses chaussures, la boîte encore ouverte sur les tomettes.' },
      { file: 'image00038.jpeg', alt: 'En noir et blanc, la veste de smoking du marié suspendue devant un miroir baroque, près d’un bouquet de renoncules.' },
      { file: 'image00037.jpeg', alt: 'Le marié en smoking et ses témoins en costume beige montent en riant un escalier de pierre claire.' },
      { file: 'image00036.jpeg', alt: 'En noir et blanc, le marié et ses témoins réunis sous une grande arche de pierre.' },
      { file: 'image00082.jpeg', alt: 'Le marié et ses témoins en costumes crème dans une bibliothèque aux murs Art nouveau, vus par une double porte en bois.' },
      { file: 'image00081.jpeg', alt: 'Deux invités en costume clair lisent la gazette du mariage dans l’embrasure d’une porte.' },
      { file: 'image00052.jpeg', alt: 'Le marié en costume blanc et ses témoins en costume bleu marine posent sur un canapé Louis XVI, devant un mur rayé vert d’eau.' },
      // Presque identique à image00052 : retirez « hidden: true » pour l'afficher aussi.
      { file: 'image00043.jpeg', alt: 'Le marié en costume blanc et ses témoins en costume bleu marine, coupe de champagne à la main, sur un canapé Louis XVI.', hidden: true },
      { file: 'image00044.jpeg', alt: 'Le marié en smoking blanc et ses témoins en costume bleu marine descendent un escalier sous un lustre de cristal.' },
    ],
  },
  {
    id: 'ceremonie',
    number: '02',
    title: 'La cérémonie',
    label: 'Cérémonie',
    cover: 'image00025.jpeg',
    photos: [
      { file: 'image00051.jpeg', alt: 'Les invités patientent dans la salle Henri-Martin du Capitole de Toulouse, sous la verrière et les grandes toiles du peintre.' },
      { file: 'image00050.jpeg', alt: 'Les invités entrent dans une salle dorée du Capitole de Toulouse pour la cérémonie civile.' },
      { file: 'image00024.jpeg', alt: 'Deux mariées au fond d’une salle d’apparat du Capitole de Toulouse, sous les lustres de cristal et les ors du plafond.' },
      { file: 'image00025.jpeg', alt: 'Cérémonie civile au Capitole de Toulouse : les deux mariées s’avancent main dans la main vers l’officier d’état civil.' },
      { file: 'image00026.jpeg', alt: 'Une mariée en robe de satin dos nu contemple une grande toile d’Henri Martin, salle Henri-Martin du Capitole de Toulouse.' },
      { file: 'image00058.jpeg', alt: 'Une tour de pierre ancienne où pousse le lierre, une lanterne en fer forgé accrochée au mur voisin.' },
      { file: 'image00034.jpeg', alt: 'Les invités réunis dans une cour aux murs de brique rose, derrière un massif de lavande.' },
      { file: 'image00049.jpeg', alt: 'Dans la lumière de l’après-midi, les invités se rassemblent dans la cour de brique d’un domaine, lavande au premier plan.' },
      { file: 'image00078.jpeg', alt: 'Une invitée en robe verte lève son ombrelle en riant pendant une cérémonie en plein air.' },
      { file: 'image00077.jpeg', alt: 'Vue plongeante sur un invité assis à l’ombre d’une ombrelle blanche, la gazette du mariage posée dans l’herbe fleurie.' },
      { file: 'image00059.jpeg', alt: 'Un bras levé vers le ciel brandit un bouquet d’anthuriums roses, d’orchidées blanches et de fleurs orangées.' },
    ],
  },
  {
    id: 'portraits',
    number: '03',
    title: 'Les portraits',
    label: 'Portraits',
    cover: 'image00066.jpeg',
    photos: [
      { file: 'maries-voile-salon-haussmannien.jpg', alt: 'Les mariés enlacés sous un long voile de dentelle devant la cheminée de marbre d’un salon haussmannien, entre canapés vert canard et miroir doré.', feature: true },
      { file: 'image00004.jpeg', alt: 'Les mariés rient front contre front sur un canapé de velours vert, dans un salon aux boiseries pastel.' },
      { file: 'image00005.jpeg', alt: 'En noir et blanc, les mariés assis dans un salon ancien, la robe déployée sur le tapis.' },
      { file: 'mariee-mur-jaune.jpg', alt: 'La mariée, voile sur la tête, devant une porte à moulures dans un salon aux boiseries jaunes, près d’un fauteuil ancien à motifs rouges et d’un tableau encadré.' },
      { file: 'image00046.jpeg', alt: 'En noir et blanc, la mariée voilée se tient près d’une haute fenêtre, dans une lumière douce.' },
      { file: 'image00045.jpeg', alt: 'La mariée fait voler son long voile de dentelle au milieu d’un salon ancien au sol de marbre.' },
      { file: 'image00068.jpeg', alt: 'La mariée voilée, tête baissée, près d’une fenêtre ouverte encadrée d’un rideau de velours bleu canard.' },
      { file: 'couple-decapotable.jpg', alt: 'En noir et blanc, vue plongeante sur les mariés enlacés dans une décapotable ancienne, le voile emporté par le vent.' },
      { file: 'image00031.jpeg', alt: 'En noir et blanc, la mariée au volant d’une décapotable ancienne, le marié en nœud papillon à ses côtés.' },
      { file: 'image00027.jpeg', alt: 'Dans une immense salle dorée du Capitole de Toulouse, une mariée renverse l’autre pour un baiser, dans un rai de soleil.' },
      { file: 'image00028.jpeg', alt: 'Une mariée en tailleur-pantalon blanc s’appuie sur la balustrade d’un escalier d’honneur orné de fresques.' },
      { file: 'image00029.jpeg', alt: 'Les deux mariées s’éloignent sous une arche Renaissance sculptée, sur les pavés d’une cour.' },
      { file: 'image00021.jpeg', alt: 'En noir et blanc, deux mariées s’embrassent à contre-jour, leurs cheveux éclairés par le soleil.' },
      { file: 'image00022.jpeg', alt: 'En noir et blanc, portrait de deux mariées joue contre joue, le regard tourné vers l’objectif.' },
      { file: 'image00062.jpeg', alt: 'Dans une chapelle de brique éclairée par ses vitraux, la mariée soulève sa traîne et tourne sur elle-même.' },
      { file: 'image00063.jpeg', alt: 'Dans la même chapelle, le marié se penche pour arranger la traîne de la mariée, dans une lumière chaude.' },
      { file: 'image00057.jpeg', alt: 'En noir et blanc, le marié soulève la mariée dans un champ, devant la silhouette d’un grand pin parasol.' },
      { file: 'image00066.jpeg', alt: 'Devant une façade de brique et de pierre, le marié soulève la mariée, son long voile de dentelle déployé.' },
      { file: 'image00065.jpeg', alt: 'Le marié soulève la mariée qui l’enlace en riant, sur une pelouse bordée d’arbres.' },
      { file: 'image00067.jpeg', alt: 'En noir et blanc, les mariés se sourient, la main baguée de la mariée posée sur l’épaule du marié.' },
      { file: 'maries-voile-herbe.jpg', alt: 'Les mariés, tous deux vêtus de blanc, s’embrassent sous le voile, penchés au-dessus d’une pelouse.' },
      { file: 'image00054.jpeg', alt: 'La mariée fait tourner sa robe sur un palier au carrelage en damier, sous le regard du marié en smoking blanc.' },
      { file: 'image00076.jpeg', alt: 'Le marié en costume croisé lilas guide la mariée dans un escalier de pierre à la rampe en fer forgé.' },
      { file: 'image00041.jpeg', alt: 'La mariée, le visage sous son voile, devant une double porte en bois clair, à côté d’un fauteuil ancien rouge.' },
      { file: 'image00079.jpeg', alt: 'La mariée en robe bustier drapée pose dans une chambre ancienne, entre une armoire en noyer et un tapis kilim.' },
      { file: 'image00020.jpeg', alt: 'Le marié porte la mariée sur son dos vers l’entrée du château, la traîne de la robe flottant derrière eux.' },
      { file: 'image00047.jpeg', alt: 'Les mariés marchent vers l’entrée d’un château de brique crénelé, la traîne de la robe soulevée par le vent.' },
      { file: 'image00039.jpeg', alt: 'Un château de brique rose et sa tour dans la lumière du soir, les mariés au balcon, un grand arbre à côté.' },
    ],
  },
  {
    id: 'fete',
    number: '04',
    title: 'La fête',
    label: 'Fête',
    cover: 'couple-baiser-ombrelles.jpg',
    photos: [
      { file: 'couple-baiser-ombrelles.jpg', alt: 'En noir et blanc, le marié renverse la mariée pour un baiser devant leurs invités hilares, ombrelles blanches levées.' },
      { file: 'image00064.jpeg', alt: 'La mariée éclate de rire au milieu de ses demoiselles d’honneur en robes jaune pâle, bouquets à la main.' },
      { file: 'image00040.jpeg', alt: 'Vin d’honneur dans la cour d’une ancienne ferme de brique : le champagne est servi sur une longue table en bois.' },
      { file: 'image00032.jpeg', alt: 'Des invitées en robes de satin vert et rouge dansent dans une cour pavée, devant un mur de brique couvert de vigne.' },
      { file: 'image00033.jpeg', alt: 'Le marié en smoking entouré d’amies en robes de satin colorées, fous rires sur les marches d’une porte ancienne.' },
      { file: 'image00055.jpeg', alt: 'Les invités se retrouvent dans une orangerie à la charpente apparente, autour du bar et d’un grand bouquet.' },
      { file: 'image00056.jpeg', alt: 'Détail de table : un livre en guise de marque-place, une assiette ancienne fleurie et des fleurs des champs.' },
      { file: 'image00075.jpeg', alt: 'Les longues tables dressées sous les platanes, le long d’une demeure couverte de vigne vierge, avant l’arrivée des invités.' },
      { file: 'image00072.jpeg', alt: 'Déjeuner dans le jardin d’une demeure couverte de vigne vierge aux volets blancs, les invités attablés.' },
      { file: 'image00073.jpeg', alt: 'Les invités lèvent leurs verres le long d’une grande tablée fleurie, à l’ombre des arbres.' },
      { file: 'image00074.jpeg', alt: 'En noir et blanc, les invités applaudissent et lèvent les bras autour des tables, devant la façade couverte de lierre.' },
      { file: 'image00061.jpeg', alt: 'En noir et blanc, dîner en plein air sous les guirlandes lumineuses, un invité debout pour un discours.' },
      { file: 'image00023.jpeg', alt: 'En noir et blanc, deux mariées en combinaison blanche partagent une part de pizza devant un food truck.' },
      { file: 'image00014.jpeg', alt: 'Deux danseuses de carnaval en costumes de plumes multicolores prennent la pose en pleine soirée.' },
    ],
  },
];

/** Photos utilisées ailleurs que dans le portfolio. */
export const otherPhotos: PhotoEntry[] = [
  { file: 'portrait-anna.jpg', alt: 'Portrait en noir et blanc d’Anna Aguerre, souriante, cheveux tirés en queue de cheval, en blazer noir.' },
];

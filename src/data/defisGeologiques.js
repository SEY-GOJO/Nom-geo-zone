const defisGeologiques = [
  {
    id: 1,
    domaine: "Minéralogie",
    situation:
      "Un échantillon métallique laisse une poudre rouge brun sur une plaque de porcelaine non émaillée. Quelle propriété observes-tu ?",
    options: ["Le clivage", "Le trait", "La dureté", "La densité"],
    reponse: 1,
    explication:
      "Le trait est la couleur de la poudre laissée par un minéral. Un trait rouge brun est caractéristique de l'hématite.",
  },
  {
    id: 2,
    domaine: "Géomorphologie",
    situation:
      "Après une crue, des sédiments se sont accumulés sur une zone plane en bordure de rivière. Quel processus explique directement ce dépôt ?",
    options: [
      "La capacité de transport du cours d'eau a diminué",
      "La roche s'est métamorphisée",
      "Le magma s'est refroidi",
      "La pente est devenue infinie",
    ],
    reponse: 0,
    explication:
      "Quand l'énergie ou la capacité de transport du cours d'eau diminue, une partie de la charge sédimentaire se dépose, notamment dans la plaine alluviale.",
  },
  {
    id: 3,
    domaine: "Géochimie",
    situation:
      "Un prélèvement présente une teneur en cuivre nettement supérieure aux échantillons voisins. Quelle est la meilleure première interprétation ?",
    options: [
      "Un gisement exploitable est prouvé",
      "Il s'agit d'une anomalie à vérifier avec le contexte et les contrôles qualité",
      "Tous les résultats du secteur sont inutilisables",
      "La teneur peut être ignorée sans vérification",
    ],
    reponse: 1,
    explication:
      "Une anomalie est un indice, pas une preuve. Il faut vérifier l'échantillonnage, les analyses, le fond géochimique et le contexte géologique.",
  },
  {
    id: 4,
    domaine: "Hydrogéologie",
    situation:
      "Deux points d'un aquifère présentent une différence de charge hydraulique. Quelle grandeur rapporte cette variation à la distance entre les points ?",
    options: [
      "La porosité",
      "Le gradient hydraulique",
      "La masse volumique",
      "La teneur en argile",
    ],
    reponse: 1,
    explication:
      "Le gradient hydraulique exprime la variation de charge hydraulique par unité de distance.",
  },
  {
    id: 5,
    domaine: "Cristallographie",
    situation:
      "Une rotation de 90° autour d'un axe ramène un cristal sur lui-même. Quel est l'ordre de cet axe de rotation ?",
    options: ["2", "3", "4", "6"],
    reponse: 2,
    explication:
      "L'ordre n vaut 360° divisé par l'angle minimal de rotation : 360° / 90° = 4.",
  },
  {
    id: 6,
    domaine: "Pétrographie",
    situation:
      "Une roche métamorphique montre une alternance de lits clairs riches en quartz et feldspaths et de lits plus foncés. Quelle roche est la plus probable ?",
    options: ["Un gneiss", "Un calcaire", "Un basalte", "Un conglomérat"],
    reponse: 0,
    explication:
      "Le rubanement et l'alternance de niveaux clairs et foncés sont des caractères fréquents des gneiss.",
  },
  {
    id: 7,
    domaine: "Exploration minière",
    situation:
      "Une anomalie géophysique a été repérée, mais plusieurs causes géologiques peuvent produire une réponse similaire. Quelle suite est la plus pertinente ?",
    options: [
      "Conclure immédiatement à la présence d'un minerai",
      "Comparer l'anomalie aux observations géologiques et aux autres données",
      "Supprimer les mesures qui ne confirment pas l'hypothèse",
      "Remplacer toute vérification par une carte régionale",
    ],
    reponse: 1,
    explication:
      "Les mesures géophysiques sont indirectes. Elles doivent être confrontées à la géologie, à la géochimie et, si nécessaire, à des reconnaissances directes.",
  },
  {
    id: 8,
    domaine: "Forage",
    situation:
      "Une équipe récupère des carottes de roche. Quelle information doit accompagner chaque intervalle pour préserver sa traçabilité ?",
    options: [
      "Uniquement la couleur générale",
      "La profondeur et l'identifiant de l'échantillon",
      "Le nom de la localité la plus proche seulement",
      "Aucune information si la carotte est photographiée",
    ],
    reponse: 1,
    explication:
      "La profondeur, l'identifiant et la documentation associée permettent de replacer chaque échantillon dans le forage et de conserver une chaîne de traçabilité.",
  },
];

export default defisGeologiques;

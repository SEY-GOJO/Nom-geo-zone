const questions = [
  // =========================================================
  // GÉOLOGIE GÉNÉRALE
  // =========================================================

  {
    id: 1,
    categorie: "Géologie générale",
    difficulte: "Facile",
    question: "Quelle est la science qui étudie les roches ?",
    options: [
      "La météorologie",
      "La pétrographie",
      "La zoologie",
      "La botanique",
    ],
    reponse: 1,
    explication:
      "La pétrographie est la branche de la géologie consacrée à l'étude et à la description des roches.",
  },

  {
    id: 2,
    categorie: "Géologie générale",
    difficulte: "Facile",
    question: "Le granite appartient à quelle grande famille de roches ?",
    options: [
      "Roches sédimentaires",
      "Roches métamorphiques",
      "Roches magmatiques",
      "Roches organiques",
    ],
    reponse: 2,
    explication:
      "Le granite est une roche magmatique plutonique formée par cristallisation lente d'un magma en profondeur.",
  },

  {
    id: 3,
    categorie: "Géologie générale",
    difficulte: "Facile",
    question: "Quelle roche est une roche sédimentaire ?",
    options: [
      "Le grès",
      "Le granite",
      "Le gneiss",
      "Le basalte",
    ],
    reponse: 0,
    explication:
      "Le grès est une roche sédimentaire détritique constituée principalement de grains de sable cimentés.",
  },

  {
    id: 4,
    categorie: "Géologie générale",
    difficulte: "Moyenne",
    question: "Comment appelle-t-on la transformation d'une roche préexistante sous l'effet de nouvelles conditions de température et de pression, principalement à l'état solide ?",
    options: [
      "L'érosion",
      "La sédimentation",
      "Le métamorphisme",
      "La fusion",
    ],
    reponse: 2,
    explication:
      "Le métamorphisme correspond à la transformation d'une roche préexistante sous l'effet de nouvelles conditions physiques et chimiques, principalement à l'état solide.",
  },

  {
    id: 5,
    categorie: "Géologie générale",
    difficulte: "Moyenne",
    question: "Quel processus intervient directement dans la formation des roches sédimentaires détritiques ?",
    options: [
      "La cristallisation d'un magma",
      "La compaction et la cimentation des sédiments",
      "La fusion partielle d'une roche",
      "La cristallisation métamorphique",
    ],
    reponse: 1,
    explication:
      "Les roches sédimentaires détritiques se forment notamment par dépôt, compaction et cimentation de matériaux issus de l'érosion.",
  },

  // =========================================================
  // MINÉRALOGIE
  // =========================================================

  {
    id: 6,
    categorie: "Minéralogie",
    difficulte: "Facile",
    question: "Quel minéral est très fréquent dans de nombreuses roches magmatiques et métamorphiques ?",
    options: [
      "Le quartz",
      "Le gypse",
      "La halite",
      "Le soufre",
    ],
    reponse: 0,
    explication:
      "Le quartz est un minéral très courant, notamment dans de nombreuses roches magmatiques et métamorphiques.",
  },

  {
    id: 7,
    categorie: "Minéralogie",
    difficulte: "Moyenne",
    question: "Quelle propriété permet d'exprimer la résistance d'un minéral à la rayure ?",
    options: [
      "La densité",
      "Le clivage",
      "La dureté",
      "La couleur",
    ],
    reponse: 2,
    explication:
      "La dureté correspond à la résistance d'un minéral à la rayure.",
  },

  {
    id: 8,
    categorie: "Minéralogie",
    difficulte: "Moyenne",
    question: "Lequel de ces minéraux appartient à la famille des feldspaths ?",
    options: [
      "La calcite",
      "Le quartz",
      "Le gypse",
      "Le plagioclase",
    ],
    reponse: 3,
    explication:
      "Le plagioclase est un feldspath appartenant à la série des feldspaths plagioclases.",
  },

  {
    id: 9,
    categorie: "Minéralogie",
    difficulte: "Facile",
    question: "Quelle propriété correspond au comportement d'un minéral lorsqu'il se casse selon des surfaces préférentielles ?",
    options: [
      "Le clivage",
      "La densité",
      "La couleur",
      "La transparence",
    ],
    reponse: 0,
    explication:
      "Le clivage correspond à la tendance d'un minéral à se séparer selon certaines directions cristallographiques privilégiées.",
  },

  {
    id: 10,
    categorie: "Minéralogie",
    difficulte: "Moyenne",
    question: "Quel minéral est généralement associé à une forte effervescence au contact d'un acide dilué ?",
    options: [
      "Le quartz",
      "La calcite",
      "Le feldspath",
      "Le mica",
    ],
    reponse: 1,
    explication:
      "La calcite réagit facilement avec un acide dilué en produisant une effervescence caractéristique.",
  },

  // =========================================================
  // PÉTROGRAPHIE
  // =========================================================

  {
    id: 11,
    categorie: "Pétrographie",
    difficulte: "Facile",
    question: "Quelle roche est généralement une roche magmatique plutonique ?",
    options: [
      "Le schiste",
      "Le granite",
      "Le calcaire",
      "Le grès",
    ],
    reponse: 1,
    explication:
      "Le granite est une roche magmatique plutonique formée par refroidissement lent d'un magma en profondeur.",
  },

  {
    id: 12,
    categorie: "Pétrographie",
    difficulte: "Facile",
    question: "Quelle roche est issue du métamorphisme d'un calcaire ?",
    options: [
      "Le basalte",
      "Le grès",
      "Le marbre",
      "Le granite",
    ],
    reponse: 2,
    explication:
      "Le marbre est une roche métamorphique principalement issue de la recristallisation d'un calcaire.",
  },

  {
    id: 13,
    categorie: "Pétrographie",
    difficulte: "Moyenne",
    question: "Quelle roche est une roche magmatique volcanique ?",
    options: [
      "Le basalte",
      "Le gneiss",
      "Le marbre",
      "Le grès",
    ],
    reponse: 0,
    explication:
      "Le basalte est une roche magmatique volcanique formée à partir d'un magma ou d'une lave refroidissant relativement rapidement à la surface.",
  },

  {
    id: 14,
    categorie: "Pétrographie",
    difficulte: "Moyenne",
    question: "Quelle roche métamorphique est caractérisée par une foliation généralement bien développée et une alternance de lits clairs et foncés ?",
    options: [
      "Le granite",
      "Le gneiss",
      "Le calcaire",
      "Le basalte",
    ],
    reponse: 1,
    explication:
      "Le gneiss est une roche métamorphique généralement caractérisée par une foliation et une alternance de niveaux clairs et foncés.",
  },

  {
    id: 15,
    categorie: "Pétrographie",
    difficulte: "Moyenne",
    question: "Quelle caractéristique est souvent associée aux roches métamorphiques de type schisteux ?",
    options: [
      "Une schistosité",
      "Une stratification détritique primaire obligatoire",
      "Une texture vitreuse systématique",
      "Une absence totale d'orientation",
    ],
    reponse: 0,
    explication:
      "Les schistes présentent généralement une schistosité nette liée à l'orientation des minéraux et aux transformations métamorphiques.",
  },

  // =========================================================
  // HYDROGÉOLOGIE
  // =========================================================

  {
    id: 16,
    categorie: "Hydrogéologie",
    difficulte: "Facile",
    question: "Que représente la porosité d'une roche ou d'un sol ?",
    options: [
      "La proportion de volume occupée par les vides",
      "La masse volumique",
      "La pente du terrain",
      "La température de la roche",
    ],
    reponse: 0,
    explication:
      "La porosité représente la proportion du volume total occupée par les espaces vides.",
  },

  {
    id: 17,
    categorie: "Hydrogéologie",
    difficulte: "Moyenne",
    question: "Dans la loi de Darcy, que représente K ?",
    options: [
      "Le débit",
      "La section",
      "La conductivité hydraulique",
      "Le gradient hydraulique",
    ],
    reponse: 2,
    explication:
      "Dans la loi de Darcy, K désigne la conductivité hydraulique du milieu.",
  },

  {
    id: 18,
    categorie: "Hydrogéologie",
    difficulte: "Moyenne",
    question: "Que représente le gradient hydraulique ?",
    options: [
      "Une variation de charge hydraulique rapportée à une distance",
      "La quantité totale d'eau dans une nappe",
      "La masse volumique de l'eau",
      "Le diamètre des pores",
    ],
    reponse: 0,
    explication:
      "Le gradient hydraulique exprime la variation de charge hydraulique par unité de distance.",
  },

  {
    id: 19,
    categorie: "Hydrogéologie",
    difficulte: "Moyenne",
    question: "Dans un aquifère, la zone saturée est une zone où :",
    options: [
      "Les pores sont entièrement remplis de gaz",
      "Les pores contiennent principalement de l'air",
      "Les vides sont remplis d'eau",
      "Il n'existe aucun vide",
    ],
    reponse: 2,
    explication:
      "Dans la zone saturée, les espaces vides du milieu sont remplis d'eau.",
  },

  {
    id: 20,
    categorie: "Hydrogéologie",
    difficulte: "Difficile",
    question: "Quelle relation correspond à la forme simplifiée de la loi de Darcy pour un débit ?",
    options: [
      "Q = K × i × A",
      "Q = K + i + A",
      "Q = K / (i × A)",
      "Q = i / (K × A)",
    ],
    reponse: 0,
    explication:
      "Dans la forme utilisée par GEO ZONE, le débit de Darcy s'exprime par Q = K × i × A.",
  },

  // =========================================================
  // GÉOLOGIE STRUCTURALE
  // =========================================================

  {
    id: 21,
    categorie: "Géologie structurale",
    difficulte: "Facile",
    question: "Que décrit le pendage d'une structure géologique ?",
    options: [
      "Son inclinaison",
      "Sa couleur",
      "Sa composition chimique",
      "Sa densité",
    ],
    reponse: 0,
    explication:
      "Le pendage décrit l'inclinaison d'un plan géologique par rapport à l'horizontale.",
  },

  {
    id: 22,
    categorie: "Géologie structurale",
    difficulte: "Facile",
    question: "Que représente le strike d'un plan géologique ?",
    options: [
      "La direction de la plus grande pente",
      "La direction de la ligne d'intersection du plan avec l'horizontale",
      "La profondeur du plan",
      "La puissance du plan",
    ],
    reponse: 1,
    explication:
      "Le strike correspond à la direction de la ligne d'intersection d'un plan géologique avec un plan horizontal.",
  },

  {
    id: 23,
    categorie: "Géologie structurale",
    difficulte: "Moyenne",
    question: "Une faille correspond principalement à :",
    options: [
      "Une roche sédimentaire",
      "Une fracture sans aucun déplacement possible",
      "Une fracture accompagnée d'un déplacement relatif des blocs",
      "Une couche horizontale",
    ],
    reponse: 2,
    explication:
      "Une faille est une fracture ou zone de rupture le long de laquelle un déplacement relatif des blocs s'est produit.",
  },

  {
    id: 24,
    categorie: "Géologie structurale",
    difficulte: "Moyenne",
    question: "Quelle structure géologique résulte d'une déformation en compression pouvant entraîner la courbure des couches ?",
    options: [
      "Un filon",
      "Un pli",
      "Un joint",
      "Un dépôt alluvial",
    ],
    reponse: 1,
    explication:
      "Un pli est une structure résultant notamment de la déformation des couches sous l'effet de contraintes tectoniques.",
  },

  {
    id: 25,
    categorie: "Géologie structurale",
    difficulte: "Moyenne",
    question: "Dans un système d'azimut, une direction est généralement exprimée sur une base de :",
    options: [
      "0 à 90°",
      "0 à 180°",
      "0 à 270°",
      "0 à 360°",
    ],
    reponse: 3,
    explication:
      "L'azimut est généralement exprimé comme une direction angulaire comprise entre 0° et 360°.",
  },

  // =========================================================
  // GÉOLOGIE MINIÈRE
  // =========================================================

  {
    id: 26,
    categorie: "Géologie minière",
    difficulte: "Facile",
    question: "Dans une exploitation minière, que désigne le terme « ore » ?",
    options: [
      "Le puits",
      "Le minerai",
      "Le camion",
      "Le stérile",
    ],
    reponse: 1,
    explication:
      "En anglais minier, « ore » désigne le minerai, c'est-à-dire le matériau considéré comme exploitable économiquement dans le contexte étudié.",
  },

  {
    id: 27,
    categorie: "Géologie minière",
    difficulte: "Facile",
    question: "Que signifie « waste » dans le vocabulaire minier ?",
    options: [
      "La teneur",
      "La récupération",
      "Le minerai",
      "Le stérile",
    ],
    reponse: 3,
    explication:
      "« Waste » désigne le stérile, c'est-à-dire le matériau qui n'est pas considéré comme minerai dans le contexte d'exploitation.",
  },

  {
    id: 28,
    categorie: "Géologie minière",
    difficulte: "Facile",
    question: "Que désigne le terme « orebody » ?",
    options: [
      "Un camion minier",
      "Un corps minéralisé",
      "Une usine de traitement",
      "Une galerie",
    ],
    reponse: 1,
    explication:
      "« Orebody » désigne un corps minéralisé contenant une concentration de matériau d'intérêt économique.",
  },

  {
    id: 29,
    categorie: "Géologie minière",
    difficulte: "Moyenne",
    question: "Quelle séquence correspond à une succession classique d'opérations minières ?",
    options: [
      "Loading → Drilling → Hauling → Blasting",
      "Hauling → Loading → Drilling → Blasting",
      "Drilling → Blasting → Loading → Hauling",
      "Blasting → Hauling → Drilling → Loading",
    ],
    reponse: 2,
    explication:
      "Une séquence classique de production comprend le forage, le tir, le chargement puis le transport.",
  },

  {
    id: 30,
    categorie: "Géologie minière",
    difficulte: "Moyenne",
    question: "Dans une mine à ciel ouvert, qu'est-ce qu'un « bench » ?",
    options: [
      "Une banquette ou gradin de l'exploitation",
      "Une usine de traitement",
      "Un forage vertical obligatoire",
      "Un laboratoire",
    ],
    reponse: 0,
    explication:
      "Dans une mine à ciel ouvert, un bench correspond à une banquette ou un gradin de l'exploitation.",
  },
];

export default questions;
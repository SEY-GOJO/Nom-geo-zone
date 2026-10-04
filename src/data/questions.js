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

  // =========================================================
  // ROCHES ET MINÉRAUX — RÉVISION DES FICHES
  // =========================================================
  {
    id: 31,
    categorie: "Minéralogie",
    difficulte: "Facile",
    question: "Quel minéral occupe le niveau 10 de l'échelle de Mohs ?",
    options: ["Le quartz", "Le diamant", "Le corindon", "La topaze"],
    reponse: 1,
    explication:
      "Le diamant est le minéral de référence du niveau 10, le plus élevé de l'échelle de Mohs.",
  },
  {
    id: 32,
    categorie: "Minéralogie",
    difficulte: "Moyenne",
    question: "Quel minéral possède une dureté de 7 sur l'échelle de Mohs ?",
    options: ["La calcite", "L'apatite", "Le quartz", "Le corindon"],
    reponse: 2,
    explication:
      "Le quartz, de dureté 7, peut notamment rayer le verre et sert de repère pratique sur le terrain.",
  },
  {
    id: 33,
    categorie: "Minéralogie",
    difficulte: "Moyenne",
    question: "Quel critère aide particulièrement à reconnaître la magnétite ?",
    options: ["Son goût salé", "Son fort magnétisme", "Sa fluorescence systématique", "Sa très faible densité"],
    reponse: 1,
    explication:
      "La magnétite est fortement attirée par un aimant : cette propriété est très utile pour l'identifier.",
  },
  {
    id: 34,
    categorie: "Minéralogie",
    difficulte: "Moyenne",
    question: "Quelle couleur de trait est typiquement associée à l'hématite ?",
    options: ["Blanc", "Bleu", "Rouge brun", "Vert vif"],
    reponse: 2,
    explication:
      "Même lorsqu'elle a un éclat gris acier, l'hématite laisse le plus souvent une trace rouge brun.",
  },
  {
    id: 35,
    categorie: "Minéralogie",
    difficulte: "Facile",
    question: "Quelle forme cristalline est fréquente chez la pyrite ?",
    options: ["Un cube strié", "Un prisme hexagonal", "Une sphère parfaite", "Un feuillet basal"],
    reponse: 0,
    explication:
      "La pyrite forme souvent des cubes dont les faces portent de fines stries parallèles.",
  },
  {
    id: 36,
    categorie: "Pétrographie",
    difficulte: "Facile",
    question: "Quelle roche vitreuse résulte du refroidissement très rapide d'une lave riche en silice ?",
    options: ["L'obsidienne", "Le marbre", "Le calcaire", "Le gneiss"],
    reponse: 0,
    explication:
      "L'obsidienne est un verre volcanique : le refroidissement est si rapide que les minéraux ne cristallisent pas complètement.",
  },
  {
    id: 37,
    categorie: "Pétrographie",
    difficulte: "Moyenne",
    question: "Quelle roche est formée par précipitation de calcite à partir d'eaux riches en carbonate de calcium ?",
    options: ["Le travertin", "La dolérite", "La rhyolite", "Le schiste vert"],
    reponse: 0,
    explication:
      "Le travertin est une roche carbonatée chimique, souvent déposée près de sources et de cascades.",
  },
  {
    id: 38,
    categorie: "Pétrographie",
    difficulte: "Moyenne",
    question: "Quelle roche peut transporter des diamants depuis une grande profondeur vers la surface ?",
    options: ["La kimberlite", "Le grès", "La marne", "L'ardoise"],
    reponse: 0,
    explication:
      "La kimberlite est une roche magmatique ultrabasique remontée rapidement depuis les profondeurs ; elle peut contenir des diamants.",
  },
  {
    id: 39,
    categorie: "Pétrographie",
    difficulte: "Moyenne",
    question: "Quel minéral est le constituant principal du travertin et de nombreux calcaires ?",
    options: ["La calcite", "La halite", "La pyrite", "Le graphite"],
    reponse: 0,
    explication:
      "La calcite est un carbonate de calcium qui constitue de nombreux calcaires et le travertin.",
  },
  {
    id: 40,
    categorie: "Minéralogie",
    difficulte: "Facile",
    question: "Quelle propriété décrit la couleur de la poudre laissée par un minéral ?",
    options: ["Le trait", "La densité", "Le clivage", "La porosité"],
    reponse: 0,
    explication:
      "Le trait est la couleur de la poudre produite par le minéral sur une plaque non émaillée.",
  },
  {
    id: 41,
    categorie: "Géomorphologie",
    difficulte: "Facile",
    question: "Que décrit principalement la géomorphologie ?",
    options: [
      "La composition des étoiles",
      "Les formes du relief et leur évolution",
      "La classification des organismes",
      "La météo quotidienne",
    ],
    reponse: 1,
    explication:
      "La géomorphologie étudie les formes du relief, leur origine et leur évolution.",
  },
  {
    id: 42,
    categorie: "Géomorphologie",
    difficulte: "Moyenne",
    question: "Quel ensemble résume les principales actions d'un cours d'eau sur les sédiments ?",
    options: [
      "Fusion, cristallisation et métamorphisme",
      "Érosion, transport et dépôt",
      "Compaction, cimentation et fusion",
      "Évaporation, condensation et sublimation",
    ],
    reponse: 1,
    explication:
      "Un cours d'eau peut arracher des matériaux, les transporter puis les déposer lorsque sa capacité de transport diminue.",
  },
  {
    id: 43,
    categorie: "Géomorphologie",
    difficulte: "Moyenne",
    question: "Quelle distinction est correcte entre altération et érosion ?",
    options: [
      "L'altération transforme la roche en place ; l'érosion enlève ou transporte des matériaux.",
      "L'altération ne concerne que les rivières ; l'érosion ne concerne que les glaciers.",
      "L'érosion forme toujours de nouveaux minéraux ; l'altération ne modifie jamais la roche.",
      "Les deux termes désignent uniquement le dépôt des sédiments.",
    ],
    reponse: 0,
    explication:
      "L'altération modifie les roches en place, alors que l'érosion implique leur enlèvement et souvent le transport des produits.",
  },
  {
    id: 44,
    categorie: "Géochimie",
    difficulte: "Facile",
    question: "Que cherche principalement à comprendre la géochimie ?",
    options: [
      "La répartition et le comportement des éléments chimiques dans la Terre",
      "La vitesse du vent dans l'atmosphère",
      "La forme des organismes fossiles uniquement",
      "La géométrie des instruments de mesure",
    ],
    reponse: 0,
    explication:
      "La géochimie étudie la distribution des éléments chimiques dans les matériaux terrestres et les processus qui la contrôlent.",
  },
  {
    id: 45,
    categorie: "Géochimie",
    difficulte: "Moyenne",
    question: "Quelle unité convient couramment à l'expression d'une faible teneur en élément trace ?",
    options: ["Kilomètre", "Degré Celsius", "Partie par million (ppm)", "Mètre par seconde"],
    reponse: 2,
    explication:
      "Les teneurs en éléments traces sont fréquemment exprimées en ppm, ou parfois en ppb selon leur niveau.",
  },
  {
    id: 46,
    categorie: "Géochimie",
    difficulte: "Moyenne",
    question: "Que peut indiquer une anomalie géochimique isolée ?",
    options: [
      "La preuve certaine d'un gisement exploitable",
      "Un résultat à vérifier dans son contexte géologique et avec des contrôles qualité",
      "L'absence de tout processus géologique",
      "Une erreur systématique dans tous les échantillons",
    ],
    reponse: 1,
    explication:
      "Une anomalie est un indice à vérifier : elle doit être interprétée avec le fond géochimique, la géologie et la qualité des données.",
  },
  {
    id: 47,
    categorie: "Géologie minière",
    difficulte: "Moyenne",
    question: "Quel assemblage est fréquemment observé dans les systèmes porphyriques cuprifères ?",
    options: [
      "Chalcopyrite et bornite disséminées ou en veinules",
      "Halite et gypse dans des couches évaporitiques",
      "Graphite et talc dans des filons de quartz",
      "Olivine et serpentine dans des pegmatites",
    ],
    reponse: 0,
    explication:
      "Les systèmes porphyriques cuprifères peuvent contenir de la chalcopyrite et de la bornite disséminées dans la roche ou concentrées en veinules.",
  },
  {
    id: 48,
    categorie: "Géologie minière",
    difficulte: "Moyenne",
    question: "Quel contexte structural est souvent associé aux gisements aurifères orogéniques ?",
    options: [
      "Des zones de cisaillement et des failles dans des ceintures déformées",
      "Uniquement des cratères volcaniques récents",
      "Des récifs coralliens sans déformation",
      "Des dunes côtières actives",
    ],
    reponse: 0,
    explication:
      "Les gisements aurifères orogéniques sont fréquemment liés à la circulation de fluides dans des failles et des zones de cisaillement.",
  },
  {
    id: 49,
    categorie: "Géologie minière",
    difficulte: "Facile",
    question: "Lequel de ces minéraux peut porter du lithium dans certaines pegmatites ?",
    options: ["Spodumène", "Pyrite", "Calcite", "Hématite"],
    reponse: 0,
    explication:
      "Le spodumène est l'un des minéraux porteurs de lithium que l'on peut rencontrer dans des pegmatites.",
  },
  {
    id: 50,
    categorie: "Géologie minière",
    difficulte: "Moyenne",
    question: "Qu'est-ce qui rend un skarn particulièrement pertinent à rechercher près d'une intrusion ?",
    options: [
      "La réaction entre des fluides liés à l'intrusion et une roche carbonatée",
      "Le dépôt éolien de sable quartzeux",
      "La cristallisation d'une évaporite à la surface",
      "La fusion complète de tous les calcaires encaissants",
    ],
    reponse: 0,
    explication:
      "Un skarn peut se développer par réaction métasomatique entre des fluides chauds associés à une intrusion et un encaissant carbonaté.",
  },
  {
    id: 51,
    categorie: "Géologie minière",
    difficulte: "Facile",
    question: "Quels éléments entrent dans le calcul du RQD à partir d'une passe de carottage ?",
    options: [
      "La somme des longueurs de morceaux retenus rapportée à la longueur de la passe",
      "La profondeur finale du forage divisée par sa pente",
      "Le nombre de minéraux par mètre de carotte",
      "La masse de la carotte divisée par sa densité",
    ],
    reponse: 0,
    explication:
      "Le RQD rapporte la somme des longueurs des morceaux de carotte d'au moins 100 mm à la longueur totale de la passe.",
  },
  {
    id: 52,
    categorie: "Géologie minière",
    difficulte: "Moyenne",
    question: "Pourquoi faut-il interpréter un RQD avec d'autres observations géotechniques ?",
    options: [
      "Il ne décrit pas à lui seul l'orientation, l'état des discontinuités ni l'effet de l'eau",
      "Il mesure directement toutes les contraintes du massif",
      "Il donne automatiquement le type de soutènement à installer",
      "Il n'est jamais influencé par la qualité du carottage",
    ],
    reponse: 0,
    explication:
      "Le RQD décrit principalement la continuité des morceaux de carotte ; il ne remplace pas l'étude des discontinuités, de l'eau et des conditions de l'ouvrage.",
  },
  {
    id: 53,
    categorie: "Géologie minière",
    difficulte: "Moyenne",
    question: "À quoi servent principalement les classifications RMR, Q et GSI ?",
    options: [
      "À organiser plusieurs observations du massif dans un cadre descriptif",
      "À remplacer toute cartographie géologique",
      "À prouver qu'une excavation est stable sans inspection",
      "À déterminer automatiquement le prix du minerai",
    ],
    reponse: 0,
    explication:
      "Ces cadres synthétisent différentes caractéristiques du massif, mais doivent être appliqués dans leur domaine et confrontés aux conditions du site.",
  },
  {
    id: 54,
    categorie: "Géologie minière",
    difficulte: "Facile",
    question: "Quel est l'objectif général du soutènement d'une excavation souterraine ?",
    options: [
      "Contrôler les déformations et limiter les chutes de blocs",
      "Augmenter la teneur du minerai",
      "Remplacer l'aérage de la mine",
      "Réduire la profondeur du gisement",
    ],
    reponse: 0,
    explication:
      "Le soutènement contribue à contrôler les déformations et les instabilités autour d'un ouvrage ; sa conception dépend des conditions du site.",
  },
  {
    id: 55,
    categorie: "Géologie minière",
    difficulte: "Facile",
    question: "Quel est le rôle principal de l'aérage dans une mine souterraine ?",
    options: [
      "Renouveler l'air et contribuer à évacuer chaleur et contaminants",
      "Augmenter la teneur du minerai",
      "Remplacer les soutènements",
      "Mesurer la profondeur du gisement",
    ],
    reponse: 0,
    explication:
      "L'aérage apporte de l'air aux zones occupées et contribue à évacuer chaleur, poussières et contaminants.",
  },
  {
    id: 56,
    categorie: "Géologie minière",
    difficulte: "Moyenne",
    question: "À quoi sert notamment la ventilation secondaire d'un front en développement ?",
    options: [
      "À renouveler l'air dans une zone éloignée du réseau principal",
      "À mesurer la teneur du minerai abattu",
      "À stabiliser automatiquement les piliers",
      "À transporter le concentré vers l'usine",
    ],
    reponse: 0,
    explication:
      "Des conduits et ventilateurs auxiliaires peuvent acheminer ou aspirer l'air à proximité d'un front éloigné du circuit principal.",
  },
  {
    id: 57,
    categorie: "Géologie minière",
    difficulte: "Facile",
    question: "Quel est le principe de base de la méthode des chambres et piliers ?",
    options: [
      "Extraire dans les chambres tout en laissant des piliers de soutien",
      "Remplir tous les chantiers avec du béton",
      "Faire s'effondrer systématiquement la surface avant l'extraction",
      "Dissoudre le minerai en place avec un réactif",
    ],
    reponse: 0,
    explication:
      "La méthode des chambres et piliers extrait le minerai dans les chambres tout en conservant des piliers conçus pour soutenir les terrains.",
  },
  {
    id: 58,
    categorie: "Géologie minière",
    difficulte: "Moyenne",
    question: "Quel facteur est essentiel au choix d'une méthode d'exploitation souterraine ?",
    options: [
      "La géométrie du gisement et la stabilité du minerai et des encaissants",
      "La couleur de la signalisation de surface",
      "Le nombre de cartes dans le rapport",
      "La distance du gisement à l'équateur uniquement",
    ],
    reponse: 0,
    explication:
      "La géométrie du gisement et le comportement mécanique du minerai et des encaissants influencent les ouvertures, le soutènement et la séquence d'exploitation.",
  },
  {
    id: 59,
    categorie: "Minéralurgie",
    difficulte: "Facile",
    question: "Quelle distinction entre minéralurgie et métallurgie est correcte ?",
    options: [
      "La minéralurgie prépare et concentre le minerai ; la métallurgie traite les matières pour produire ou transformer les métaux",
      "La minéralurgie étudie les fossiles ; la métallurgie étudie les reliefs",
      "Les deux termes désignent uniquement le forage",
      "La métallurgie consiste à cartographier les gisements",
    ],
    reponse: 0,
    explication:
      "La minéralurgie porte sur la préparation et la concentration des minerais, tandis que la métallurgie traite les matières pour produire ou transformer les métaux.",
  },
  {
    id: 60,
    categorie: "Minéralurgie",
    difficulte: "Moyenne",
    question: "Pourquoi fragmente-t-on le minerai avant certaines opérations de concentration ?",
    options: [
      "Pour libérer les minéraux utiles de la gangue à une taille adaptée",
      "Pour augmenter la teneur initiale du gisement",
      "Pour modifier la position géographique des minéraux",
      "Pour éviter toute classification des particules",
    ],
    reponse: 0,
    explication:
      "La fragmentation vise à séparer les minéraux utiles de la gangue ; le degré requis dépend de la texture et des associations minérales.",
  },
  {
    id: 61,
    categorie: "Minéralurgie",
    difficulte: "Moyenne",
    question: "Quelle opération exploite les différences de densité entre particules ?",
    options: [
      "La séparation gravimétrique",
      "La cartographie structurale",
      "Le nivellement géométrique",
      "La ventilation secondaire",
    ],
    reponse: 0,
    explication:
      "La séparation gravimétrique exploite les contrastes de densité des particules dans un fluide.",
  },
  {
    id: 62,
    categorie: "Équipements miniers",
    difficulte: "Facile",
    question: "Quelles étapes composent généralement un cycle de transport par camion en mine ?",
    options: [
      "Chargement, trajet chargé, déversement et retour",
      "Forage, cristallisation, fusion et dépôt",
      "Nivellement, flottation, analyse et ventilation",
      "Concassage, soutènement, cartographie et forage",
    ],
    reponse: 0,
    explication:
      "Un cycle courant comprend le chargement, le trajet chargé, le déversement et le retour à la zone de chargement.",
  },
  {
    id: 63,
    categorie: "Équipements miniers",
    difficulte: "Moyenne",
    question: "Pourquoi la capacité nominale d'un engin ne suffit-elle pas à estimer la production réelle ?",
    options: [
      "La durée des cycles, les attentes et la disponibilité modifient le rendement effectif",
      "La capacité nominale indique toujours le tonnage journalier",
      "Les pistes n'influencent jamais les cycles",
      "Les engins ne nécessitent aucune maintenance",
    ],
    reponse: 0,
    explication:
      "La production réelle dépend aussi du temps de cycle, des attentes, de l'état des pistes, de l'organisation et de la disponibilité mécanique.",
  },
  {
    id: 64,
    categorie: "Topographie minière",
    difficulte: "Facile",
    question: "À quoi sert le nivellement en topographie ?",
    options: [
      "À déterminer des différences d'altitude entre des points",
      "À identifier la composition d'un minerai",
      "À mesurer directement la résistance d'une roche",
      "À calculer la teneur d'un concentré",
    ],
    reponse: 0,
    explication:
      "Le nivellement détermine des différences de niveau qui permettent de calculer les altitudes des points.",
  },
  {
    id: 65,
    categorie: "Topographie minière",
    difficulte: "Moyenne",
    question: "Pourquoi les points d'un levé topographique sont-ils rattachés à un réseau de référence ?",
    options: [
      "Pour assurer la cohérence et le contrôle des coordonnées et des altitudes",
      "Pour augmenter artificiellement l'échelle du plan",
      "Pour remplacer les observations de terrain",
      "Pour rendre les mesures indépendantes de leur localisation",
    ],
    reponse: 0,
    explication:
      "Le rattachement à des points de référence permet de comparer les levés dans un système de coordonnées et d'altitudes commun.",
  },
];

export default questions;

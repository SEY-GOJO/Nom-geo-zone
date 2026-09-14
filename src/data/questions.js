const questions = [
  {
    id: 1,
    categorie: "Géologie générale",
    question: "Quelle est la science qui étudie les roches ?",
    options: [
      "La pétrographie",
      "La météorologie",
      "La zoologie",
      "La botanique",
    ],
    reponse: 0,
    explication:
      "La pétrographie est la branche de la géologie consacrée à l'étude et à la description des roches.",
  },

  {
    id: 2,
    categorie: "Pétrographie",
    question:
      "Quelle roche est généralement une roche magmatique plutonique ?",
    options: [
      "Le granite",
      "Le calcaire",
      "Le schiste",
      "Le grès",
    ],
    reponse: 0,
    explication:
      "Le granite est une roche magmatique plutonique formée par refroidissement lent d'un magma en profondeur.",
  },

  {
    id: 3,
    categorie: "Pétrographie",
    question:
      "Quelle roche est issue du métamorphisme d'un calcaire ?",
    options: [
      "Le marbre",
      "Le basalte",
      "Le granite",
      "Le grès",
    ],
    reponse: 0,
    explication:
      "Le marbre est une roche métamorphique principalement issue de la recristallisation d'un calcaire.",
  },

  {
    id: 4,
    categorie: "Minéralogie",
    question:
      "Quel minéral est très fréquent dans les roches magmatiques et métamorphiques ?",
    options: [
      "Le quartz",
      "Le gypse",
      "La halite",
      "La tourmaline uniquement",
    ],
    reponse: 0,
    explication:
      "Le quartz est un minéral très courant, notamment dans de nombreuses roches magmatiques et métamorphiques.",
  },

  {
    id: 5,
    categorie: "Géologie minière",
    question:
      "Dans une exploitation minière, que désigne le terme « ore » ?",
    options: [
      "Le minerai",
      "Le stérile",
      "Le puits",
      "Le camion",
    ],
    reponse: 0,
    explication:
      "En anglais minier, « ore » désigne le minerai, c'est-à-dire le matériau contenant une substance exploitable économiquement.",
  },

  {
    id: 6,
    categorie: "Géologie minière",
    question:
      "Quelle séquence correspond aux opérations minières classiques ?",
    options: [
      "Drilling → Blasting → Loading → Hauling",
      "Hauling → Blasting → Drilling → Loading",
      "Loading → Drilling → Hauling → Blasting",
      "Blasting → Hauling → Drilling → Loading",
    ],
    reponse: 0,
    explication:
      "Une séquence classique est : forage, tir, chargement puis transport.",
  },

  {
    id: 7,
    categorie: "Hydrogéologie",
    question:
      "Que représente la porosité d'une roche ou d'un sol ?",
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
    id: 8,
    categorie: "Géologie structurale",
    question:
      "Que décrit le pendage d'une structure géologique ?",
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
    id: 9,
    categorie: "Géologie générale",
    question:
      "Quelle roche est une roche sédimentaire ?",
    options: [
      "Le grès",
      "Le granite",
      "Le gneiss",
      "Le basalte",
    ],
    reponse: 0,
    explication:
      "Le grès est une roche sédimentaire détritique formée principalement de grains de sable cimentés.",
  },

  {
    id: 10,
    categorie: "Géologie minière",
    question:
      "Que signifie « waste » dans le vocabulaire minier ?",
    options: [
      "Le stérile",
      "Le minerai",
      "La teneur",
      "La récupération",
    ],
    reponse: 0,
    explication:
      "« Waste » désigne le stérile, c'est-à-dire le matériau qui n'est pas considéré comme minerai dans le contexte d'exploitation.",
  },
];

export default questions;
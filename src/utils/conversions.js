// src/utils/conversions.js

/**
 * Convertisseur central de GEO ZONE.
 *
 * Les conversions sont organisées par familles d'unités
 * afin de pouvoir être réutilisées par tous les futurs outils.
 */

/* =========================
   LONGUEUR
========================= */

const longueurEnMetres = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
};

const convertirLongueur = (valeur, uniteDepart, uniteArrivee) => {
  if (
    !Object.hasOwn(longueurEnMetres, uniteDepart) ||
    !Object.hasOwn(longueurEnMetres, uniteArrivee)
  ) {
    throw new Error("Unité de longueur non prise en charge.");
  }

  const valeurEnMetres = valeur * longueurEnMetres[uniteDepart];

  return valeurEnMetres / longueurEnMetres[uniteArrivee];
};

/* =========================
   MASSE
========================= */

const masseEnKilogrammes = {
  mg: 0.000001,
  g: 0.001,
  kg: 1,
  t: 1000,
};

const convertirMasse = (valeur, uniteDepart, uniteArrivee) => {
  if (
    !Object.hasOwn(masseEnKilogrammes, uniteDepart) ||
    !Object.hasOwn(masseEnKilogrammes, uniteArrivee)
  ) {
    throw new Error("Unité de masse non prise en charge.");
  }

  const valeurEnKilogrammes = valeur * masseEnKilogrammes[uniteDepart];

  return valeurEnKilogrammes / masseEnKilogrammes[uniteArrivee];
};

/* =========================
   VOLUME
========================= */

const volumeEnMetresCubiques = {
  cm3: 0.000001,
  m3: 1,
};

const convertirVolume = (valeur, uniteDepart, uniteArrivee) => {
  if (
    !Object.hasOwn(volumeEnMetresCubiques, uniteDepart) ||
    !Object.hasOwn(volumeEnMetresCubiques, uniteArrivee)
  ) {
    throw new Error("Unité de volume non prise en charge.");
  }

  const valeurEnMetresCubiques =
    valeur * volumeEnMetresCubiques[uniteDepart];

  return valeurEnMetresCubiques / volumeEnMetresCubiques[uniteArrivee];
};

/* =========================
   DENSITÉ / MASSE VOLUMIQUE
========================= */

const masseVolumiqueEnKgParM3 = {
  "kg/m3": 1,
  "g/cm3": 1000,
  "t/m3": 1000,
};

const convertirMasseVolumique = (
  valeur,
  uniteDepart,
  uniteArrivee
) => {
  if (
    !Object.hasOwn(masseVolumiqueEnKgParM3, uniteDepart) ||
    !Object.hasOwn(masseVolumiqueEnKgParM3, uniteArrivee)
  ) {
    throw new Error(
      "Unité de masse volumique non prise en charge."
    );
  }

  const valeurEnKgParM3 =
    valeur * masseVolumiqueEnKgParM3[uniteDepart];

  return (
    valeurEnKgParM3 / masseVolumiqueEnKgParM3[uniteArrivee]
  );
};

/* =========================
   CONCENTRATION
========================= */

const convertirConcentration = (
  valeur,
  uniteDepart,
  uniteArrivee
) => {
  const versPpm = {
    "%": 10000,
    ppm: 1,
    ppb: 0.001,
    "g/t": 1,
  };

  if (
    !Object.hasOwn(versPpm, uniteDepart) ||
    !Object.hasOwn(versPpm, uniteArrivee)
  ) {
    throw new Error(
      "Unité de concentration non prise en charge."
    );
  }

  const valeurEnPpm = valeur * versPpm[uniteDepart];

  return valeurEnPpm / versPpm[uniteArrivee];
};

/* =========================
   MOTEUR GÉNÉRAL
========================= */

export const convertir = (
  valeur,
  famille,
  uniteDepart,
  uniteArrivee
) => {
  const nombre = Number(valeur);

  if (!Number.isFinite(nombre)) {
    throw new Error("La valeur à convertir doit être numérique.");
  }

  switch (famille) {
    case "longueur":
      return convertirLongueur(
        nombre,
        uniteDepart,
        uniteArrivee
      );

    case "masse":
      return convertirMasse(
        nombre,
        uniteDepart,
        uniteArrivee
      );

    case "volume":
      return convertirVolume(
        nombre,
        uniteDepart,
        uniteArrivee
      );

    case "masseVolumique":
      return convertirMasseVolumique(
        nombre,
        uniteDepart,
        uniteArrivee
      );

    case "concentration":
      return convertirConcentration(
        nombre,
        uniteDepart,
        uniteArrivee
      );

    default:
      throw new Error(
        `Famille de conversion inconnue : ${famille}`
      );
  }
};

/* =========================
   UNITÉS DISPONIBLES
========================= */

export const unitesConversion = {
  longueur: [
    { value: "mm", label: "Millimètre (mm)" },
    { value: "cm", label: "Centimètre (cm)" },
    { value: "m", label: "Mètre (m)" },
    { value: "km", label: "Kilomètre (km)" },
  ],

  masse: [
    { value: "mg", label: "Milligramme (mg)" },
    { value: "g", label: "Gramme (g)" },
    { value: "kg", label: "Kilogramme (kg)" },
    { value: "t", label: "Tonne (t)" },
  ],

  volume: [
    { value: "cm3", label: "Centimètre cube (cm³)" },
    { value: "m3", label: "Mètre cube (m³)" },
  ],

  masseVolumique: [
    { value: "kg/m3", label: "kg/m³" },
    { value: "g/cm3", label: "g/cm³" },
    { value: "t/m3", label: "t/m³" },
  ],

  concentration: [
    { value: "%", label: "Pourcentage (%)" },
    { value: "ppm", label: "ppm" },
    { value: "ppb", label: "ppb" },
    { value: "g/t", label: "Gramme par tonne (g/t)" },
  ],
};
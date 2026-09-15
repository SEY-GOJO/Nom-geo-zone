import { convertir } from "./conversions.js";

/**
 * Pipeline d'analyse minière pédagogique de GEO ZONE.
 *
 * Chaîne : volume × masse volumique → tonnage → teneur (g/t) →
 * dilution → stripping ratio → métal contenu → récupération.
 *
 * Unités canoniques
 * -----------------
 * - volume : m³
 * - masse volumique : t/m³
 * - tonnages : t
 * - teneurs internes : g/t (ppm équivalent)
 * - dilution et récupération : %
 *
 * Contrats
 * --------
 * Les fonctions élémentaires renvoient `null` si l'entrée est
 * incomplète ou invalide (saisie interactive).
 * `analyserProjetMinier` conserve ce comportement pour l'UI et
 * expose en plus `issues` (codes stables) pour les tests et l'API.
 */

export const UNITES_TENEUR = Object.freeze(["g/t", "ppm", "%", "ppb"]);

export const CODES_VALIDATION = Object.freeze({
  INCOMPLET: "INCOMPLET",
  NON_NUMERIQUE: "NON_NUMERIQUE",
  HORS_DOMAINE: "HORS_DOMAINE",
  UNITE_INCONNUE: "UNITE_INCONNUE",
});

function champVide(valeur) {
  return valeur === "" || valeur === null || valeur === undefined;
}

function nombreFini(valeur) {
  const nombre = Number(valeur);
  return Number.isFinite(nombre) ? nombre : null;
}

function issue(code, champ, message) {
  return { code, champ, message };
}

/**
 * Interprète une saisie numérique.
 *
 * @param {unknown} valeur
 * @param {{ champ: string, min?: number, max?: number, exclusMin?: boolean, obligatoire?: boolean }} options
 * @returns {{ ok: boolean, vide: boolean, value: number | null, issue: object | null }}
 */
export function validerNombre(valeur, options) {
  const { champ, min, max, exclusMin = false, obligatoire = false } = options;

  if (champVide(valeur)) {
    if (obligatoire) {
      return {
        ok: false,
        vide: true,
        value: null,
        issue: issue(
          CODES_VALIDATION.INCOMPLET,
          champ,
          `Le champ ${champ} est requis.`
        ),
      };
    }

    return { ok: true, vide: true, value: null, issue: null };
  }

  const nombre = nombreFini(valeur);
  if (nombre === null) {
    return {
      ok: false,
      vide: false,
      value: null,
      issue: issue(
        CODES_VALIDATION.NON_NUMERIQUE,
        champ,
        `Le champ ${champ} doit être un nombre fini.`
      ),
    };
  }

  const sousMin = min !== undefined && (exclusMin ? nombre <= min : nombre < min);
  const auDessusMax = max !== undefined && nombre > max;

  if (sousMin || auDessusMax) {
    return {
      ok: false,
      vide: false,
      value: null,
      issue: issue(
        CODES_VALIDATION.HORS_DOMAINE,
        champ,
        `Le champ ${champ} est hors domaine.`
      ),
    };
  }

  return { ok: true, vide: false, value: nombre, issue: null };
}

/**
 * Tonnage minerai : T = V × ρ
 *
 * @param {unknown} volume volume en m³ (≥ 0)
 * @param {unknown} densite masse volumique en t/m³ (> 0)
 * @returns {number | null} tonnage en t
 */
export function calculerTonnage(volume, densite) {
  const volumeValide = validerNombre(volume, {
    champ: "volume",
    min: 0,
  });
  const densiteValide = validerNombre(densite, {
    champ: "densite",
    min: 0,
    exclusMin: true,
  });

  if (volumeValide.vide || densiteValide.vide) return null;
  if (!volumeValide.ok || !densiteValide.ok) return null;

  return volumeValide.value * densiteValide.value;
}

/**
 * Convertit une teneur vers g/t.
 *
 * @param {unknown} valeur
 * @param {string} [unite="g/t"]
 * @returns {number | null}
 */
export function normaliserTeneur(valeur, unite = "g/t") {
  const teneur = validerNombre(valeur, { champ: "teneur", min: 0 });
  if (teneur.vide || !teneur.ok) return null;

  if (!UNITES_TENEUR.includes(unite)) return null;

  try {
    return convertir(teneur.value, "concentration", unite, "g/t");
  } catch {
    return null;
  }
}

/**
 * Dilution : stérile = minerai × (taux / 100).
 * Teneur diluée = métal total / tonnage total, teneurs en g/t.
 *
 * @param {{
 *   tonnageMinerai: unknown,
 *   teneurMinerai: unknown,
 *   teneurSterile: unknown,
 *   tauxDilution: unknown,
 * }} params
 * @returns {{
 *   sterileAjoute: number,
 *   tonnageSterile: number,
 *   tonnageTotal: number,
 *   metalMinerai: number,
 *   metalSterile: number,
 *   metalTotalGrammes: number,
 *   metalTotal: number,
 *   teneurDiluee: number,
 * } | null}
 */
export function calculerDilution({
  tonnageMinerai,
  teneurMinerai,
  teneurSterile,
  tauxDilution,
}) {
  const minerai = validerNombre(tonnageMinerai, {
    champ: "tonnageMinerai",
    min: 0,
  });
  const gradeMinerai = validerNombre(teneurMinerai, {
    champ: "teneurMinerai",
    min: 0,
  });
  const gradeSterile = validerNombre(teneurSterile, {
    champ: "teneurSterile",
    min: 0,
  });
  const taux = validerNombre(tauxDilution, {
    champ: "tauxDilution",
    min: 0,
  });

  if (
    minerai.vide ||
    gradeMinerai.vide ||
    gradeSterile.vide ||
    taux.vide ||
    !minerai.ok ||
    !gradeMinerai.ok ||
    !gradeSterile.ok ||
    !taux.ok
  ) {
    return null;
  }

  const sterileAjoute = minerai.value * (taux.value / 100);
  const tonnageTotal = minerai.value + sterileAjoute;
  const metalMinerai = minerai.value * gradeMinerai.value;
  const metalSterile = sterileAjoute * gradeSterile.value;
  const metalTotalGrammes = metalMinerai + metalSterile;

  return {
    sterileAjoute,
    tonnageSterile: sterileAjoute,
    tonnageTotal,
    metalMinerai,
    metalSterile,
    metalTotalGrammes,
    metalTotal: metalTotalGrammes,
    teneurDiluee: tonnageTotal > 0 ? metalTotalGrammes / tonnageTotal : 0,
  };
}

/**
 * Stripping ratio SR = stérile / minerai.
 *
 * @param {unknown} tonnageMinerai
 * @param {unknown} tonnageSterile
 * @returns {number | null}
 */
export function calculerStrippingRatio(tonnageMinerai, tonnageSterile) {
  const minerai = validerNombre(tonnageMinerai, {
    champ: "tonnageMinerai",
    min: 0,
    exclusMin: true,
  });
  const sterile = validerNombre(tonnageSterile, {
    champ: "tonnageSterile",
    min: 0,
  });

  if (minerai.vide || sterile.vide || !minerai.ok || !sterile.ok) {
    return null;
  }

  return sterile.value / minerai.value;
}

/**
 * Métal contenu à partir d'un objet dilution (métal en grammes).
 *
 * @param {{ metalTotalGrammes: number } | null} dilution
 * @returns {{ grammes: number, kilogrammes: number, tonnes: number } | null}
 */
export function calculerMetalContenu(dilution) {
  if (dilution === null || dilution === undefined) return null;

  const grammes = nombreFini(dilution.metalTotalGrammes);
  if (grammes === null || grammes < 0) return null;

  return convertirGrammesMetal(grammes);
}

/**
 * Métal contenu : M(t) = T(t) × teneur(g/t) / 1e6
 *
 * @param {unknown} tonnage
 * @param {unknown} teneur
 * @param {string} [unite="g/t"]
 * @returns {{ grammes: number, kilogrammes: number, tonnes: number } | null}
 */
export function calculerMetalDepuisTeneur(tonnage, teneur, unite = "g/t") {
  const T = validerNombre(tonnage, { champ: "tonnage", min: 0 });
  if (T.vide || !T.ok) return null;

  const teneurGt = normaliserTeneur(teneur, unite);
  if (teneurGt === null) return null;

  return convertirGrammesMetal(T.value * teneurGt);
}

function convertirGrammesMetal(grammes) {
  return {
    grammes,
    kilogrammes: grammes / 1000,
    tonnes: grammes / 1_000_000,
  };
}

/**
 * Récupération métallurgique : récupéré = métal × (taux / 100).
 *
 * @param {{ tonnes: number } | number | string | null} metalContenu
 * @param {unknown} recuperation taux en % dans [0, 100]
 * @returns {{ recupere: number, nonRecupere: number } | null}
 */
export function calculerMetalRecupere(metalContenu, recuperation) {
  const tonnes = extraireTonnesMetal(metalContenu);
  if (tonnes === null || tonnes < 0) return null;

  const taux = validerNombre(recuperation, {
    champ: "recuperation",
    min: 0,
    max: 100,
  });
  if (taux.vide || !taux.ok) return null;

  const recupere = tonnes * (taux.value / 100);
  return { recupere, nonRecupere: tonnes - recupere };
}

function extraireTonnesMetal(metalContenu) {
  if (champVide(metalContenu)) return null;

  if (
    typeof metalContenu === "object" &&
    metalContenu !== null &&
    "tonnes" in metalContenu
  ) {
    return nombreFini(metalContenu.tonnes);
  }

  return nombreFini(metalContenu);
}

/**
 * Analyse complète (et partielle) d'un projet minier.
 *
 * Les étapes indépendantes sont calculées dès que leurs
 * entrées sont valides, afin de refléter la saisie progressive.
 *
 * @param {{
 *   nomProjet?: unknown,
 *   volume?: unknown,
 *   densite?: unknown,
 *   teneurMinerai?: unknown,
 *   teneurSterile?: unknown,
 *   uniteTeneur?: string,
 *   tauxDilution?: unknown,
 *   tonnageSterile?: unknown,
 *   recuperation?: unknown,
 * }} entrees
 * @returns {{
 *   nomProjet: string,
 *   issues: Array<{ code: string, champ: string, message: string }>,
 *   volume: number | null,
 *   densite: number | null,
 *   tonnageMinerai: number | null,
 *   teneurMineraiGParTonne: number | null,
 *   teneurSterileGParTonne: number | null,
 *   dilution: ReturnType<typeof calculerDilution>,
 *   strippingRatio: number | null,
 *   strippingSterileUtilise: number | null,
 *   metalContenu: ReturnType<typeof calculerMetalContenu>,
 *   metalRecupere: ReturnType<typeof calculerMetalRecupere>,
 * }}
 */
export function analyserProjetMinier(entrees = {}) {
  const issues = [];
  const nomProjet =
    typeof entrees.nomProjet === "string" ? entrees.nomProjet.trim() : "";

  const uniteTeneur = entrees.uniteTeneur || "g/t";
  if (!UNITES_TENEUR.includes(uniteTeneur)) {
    issues.push(
      issue(
        CODES_VALIDATION.UNITE_INCONNUE,
        "uniteTeneur",
        "Unité de teneur non prise en charge."
      )
    );
  }

  const volume = validerNombre(entrees.volume, { champ: "volume", min: 0 });
  const densite = validerNombre(entrees.densite, {
    champ: "densite",
    min: 0,
    exclusMin: true,
  });
  if (volume.issue) issues.push(volume.issue);
  if (densite.issue) issues.push(densite.issue);

  const tonnageMinerai = calculerTonnage(entrees.volume, entrees.densite);

  const teneurMineraiGParTonne =
    champVide(entrees.teneurMinerai) || !UNITES_TENEUR.includes(uniteTeneur)
      ? null
      : normaliserTeneur(entrees.teneurMinerai, uniteTeneur);

  if (!champVide(entrees.teneurMinerai) && teneurMineraiGParTonne === null) {
    issues.push(
      issue(
        CODES_VALIDATION.HORS_DOMAINE,
        "teneurMinerai",
        "Teneur du minerai invalide."
      )
    );
  }

  const teneurSterileSaisie = champVide(entrees.teneurSterile)
    ? 0
    : entrees.teneurSterile;
  const teneurSterileGParTonne = UNITES_TENEUR.includes(uniteTeneur)
    ? normaliserTeneur(teneurSterileSaisie, uniteTeneur)
    : null;

  if (!champVide(entrees.teneurSterile) && teneurSterileGParTonne === null) {
    issues.push(
      issue(
        CODES_VALIDATION.HORS_DOMAINE,
        "teneurSterile",
        "Teneur du stérile invalide."
      )
    );
  }

  const tauxDilutionSaisi = champVide(entrees.tauxDilution)
    ? 0
    : entrees.tauxDilution;
  const taux = validerNombre(tauxDilutionSaisi, {
    champ: "tauxDilution",
    min: 0,
  });
  if (taux.issue) issues.push(taux.issue);

  const dilution = calculerDilution({
    tonnageMinerai,
    teneurMinerai: teneurMineraiGParTonne,
    teneurSterile: teneurSterileGParTonne,
    tauxDilution: tauxDilutionSaisi,
  });

  const sterileOverride = validerNombre(entrees.tonnageSterile, {
    champ: "tonnageSterile",
    min: 0,
  });
  if (sterileOverride.issue) issues.push(sterileOverride.issue);

  const strippingSterileUtilise = sterileOverride.vide
    ? dilution?.sterileAjoute ?? null
    : sterileOverride.value;

  const strippingRatio = calculerStrippingRatio(
    tonnageMinerai,
    strippingSterileUtilise
  );

  const metalContenu = calculerMetalContenu(dilution);

  const recuperation = validerNombre(entrees.recuperation, {
    champ: "recuperation",
    min: 0,
    max: 100,
  });
  if (recuperation.issue) issues.push(recuperation.issue);

  const metalRecupere = calculerMetalRecupere(
    metalContenu,
    entrees.recuperation
  );

  return {
    nomProjet,
    issues,
    volume: volume.vide ? null : volume.value,
    densite: densite.vide ? null : densite.value,
    tonnageMinerai,
    teneurMineraiGParTonne,
    teneurSterileGParTonne,
    dilution,
    strippingRatio,
    strippingSterileUtilise,
    metalContenu,
    metalRecupere,
  };
}

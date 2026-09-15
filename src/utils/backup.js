const PREFIXE_GEO_ZONE = "geo-zone:";
const TAILLE_MAX_FICHIER = 1_000_000;

function donneesLocales() {
  const donnees = {};

  for (let index = 0; index < localStorage.length; index += 1) {
    const cle = localStorage.key(index);
    if (cle?.startsWith(PREFIXE_GEO_ZONE)) {
      donnees[cle] = localStorage.getItem(cle);
    }
  }

  return donnees;
}

export function telechargerSauvegarde() {
  const contenu = JSON.stringify({
    version: 1,
    exporteLe: new Date().toISOString(),
    donnees: donneesLocales(),
  });

  const fichier = new Blob([contenu], { type: "application/json" });
  const url = URL.createObjectURL(fichier);
  const lien = document.createElement("a");

  lien.href = url;
  lien.download = "geo-zone-sauvegarde.json";
  document.body.appendChild(lien);
  lien.click();
  lien.remove();
  URL.revokeObjectURL(url);
}

export async function importerSauvegarde(fichier) {
  if (!fichier) {
    throw new Error("Sélectionne un fichier de sauvegarde.");
  }

  if (fichier.size > TAILLE_MAX_FICHIER) {
    throw new Error("Ce fichier est trop volumineux.");
  }

  let sauvegarde;
  try {
    sauvegarde = JSON.parse(await fichier.text());
  } catch {
    throw new Error("Le fichier de sauvegarde est invalide.");
  }

  if (sauvegarde?.version !== 1 || typeof sauvegarde.donnees !== "object") {
    throw new Error("Ce fichier ne correspond pas à une sauvegarde GEO ZONE.");
  }

  let nombreImporte = 0;
  for (const [cle, valeur] of Object.entries(sauvegarde.donnees)) {
    if (cle.startsWith(PREFIXE_GEO_ZONE) && typeof valeur === "string") {
      localStorage.setItem(cle, valeur);
      nombreImporte += 1;
    }
  }

  if (nombreImporte === 0) {
    throw new Error("Aucune donnée GEO ZONE n’a été trouvée dans ce fichier.");
  }

  return nombreImporte;
}

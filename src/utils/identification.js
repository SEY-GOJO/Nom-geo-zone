function normaliserValeur(valeur) {
  return String(valeur ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[–—−]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("fr");
}

export function compterCorrespondances(valeurs, filtres) {
  return Object.entries(filtres).reduce((total, [cle, filtre]) => {
    if (!filtre) return total;

    const valeur = valeurs[cle];
    const correspond = Array.isArray(valeur)
      ? valeur.some(
          (element) => normaliserValeur(element) === normaliserValeur(filtre)
        )
      : normaliserValeur(valeur) === normaliserValeur(filtre);

    return total + Number(correspond);
  }, 0);
}

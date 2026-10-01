export function analyserContenuChapitre(contenu = "") {
  const lignes = (contenu || "")
    .split(/\r?\n/)
    .map((ligne) => ligne.trim())
    .filter(Boolean);

  const paragraphes = [];
  const pointsCle = [];

  for (const ligne of lignes) {
    if (ligne.startsWith("- ")) {
      const point = ligne.replace(/^-\s*/, "").trim();
      if (point) {
        pointsCle.push(point);
      }
      continue;
    }

    if (ligne.startsWith("À retenir :")) {
      continue;
    }

    if (ligne.length > 0 && ligne.length < 120 && ligne.endsWith(":")) {
      continue;
    }

    paragraphes.push(ligne.replace(/^[-•]\s*/, "").trim());
  }

  const resume =
    paragraphes.find((ligne) => ligne.length > 18 && !ligne.startsWith("1.")) ||
    pointsCle[0] ||
    "Comprends l’essentiel de ce chapitre pour avancer avec confiance.";

  const objectif =
    pointsCle[0]
      ? `Comprendre les idées clés : ${pointsCle[0].replace(/[.]+$/, "")}.`
      : "Maîtriser le concept principal du chapitre et ses applications.";

  return {
    resume,
    pointsCle: pointsCle.slice(0, 3),
    objectif,
  };
}

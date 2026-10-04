const COURSE_PROGRESS_PREFIX = "geo-zone:course-progress:";

export function lireChapitresTermines(
  coursId,
  chapitres,
  stockage = localStorage
) {
  const donnees = stockage.getItem(
    `${COURSE_PROGRESS_PREFIX}${coursId}`
  );

  if (!donnees) {
    return [];
  }

  const progression = JSON.parse(donnees);

  if (!Array.isArray(progression)) {
    return [];
  }

  const idsDisponibles = new Set(
    chapitres.map((chapitre) => chapitre.id)
  );

  return [...new Set(
    progression.filter((chapitreId) =>
      idsDisponibles.has(chapitreId)
    )
  )];
}

export function calculerProgressionCours(
  chapitres,
  chapitresTermines
) {
  const totalChapitres = chapitres.length;
  const nombreTermines = chapitresTermines.length;

  return {
    nombreTermines,
    totalChapitres,
    pourcentage:
      totalChapitres > 0
        ? Math.round((nombreTermines / totalChapitres) * 100)
        : 0,
  };
}

export function validerChapitre(
  coursId,
  chapitreId,
  chapitres,
  stockage = localStorage
) {
  if (!chapitres.some((chapitre) => chapitre.id === chapitreId)) {
    throw new RangeError("Le chapitre à valider n'existe pas dans ce cours.");
  }

  const chapitresTermines = lireChapitresTermines(
    coursId,
    chapitres,
    stockage
  );

  if (!chapitresTermines.includes(chapitreId)) {
    chapitresTermines.push(chapitreId);
  }

  stockage.setItem(
    `${COURSE_PROGRESS_PREFIX}${coursId}`,
    JSON.stringify(chapitresTermines)
  );

  return chapitresTermines;
}

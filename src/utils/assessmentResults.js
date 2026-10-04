export function consoliderResultatsEvaluation(reponses, total) {
  const reponsesUniques = [
    ...new Map(
      reponses.map((reponse) => [reponse.questionId, reponse])
    ).values(),
  ];
  const score = reponsesUniques.filter(
    (reponse) => reponse.correcte
  ).length;

  return {
    reponses: reponsesUniques,
    score,
    total,
    pourcentage:
      total > 0
        ? Math.round((score / total) * 100)
        : 0,
  };
}

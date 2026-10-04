export function creerSessionQuestions(
  questions,
  { categorie = "Toutes", nombre = 10 } = {}
) {
  const questionsDisponibles =
    categorie === "Toutes"
      ? [...questions]
      : questions.filter((question) => question.categorie === categorie);

  for (let index = questionsDisponibles.length - 1; index > 0; index -= 1) {
    const indexAleatoire = Math.floor(Math.random() * (index + 1));
    [questionsDisponibles[index], questionsDisponibles[indexAleatoire]] = [
      questionsDisponibles[indexAleatoire],
      questionsDisponibles[index],
    ];
  }

  const nombreSelectionne = Math.max(
    0,
    Math.min(Math.floor(nombre), questionsDisponibles.length)
  );

  return questionsDisponibles.slice(0, nombreSelectionne);
}

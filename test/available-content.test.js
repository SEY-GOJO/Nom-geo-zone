import test from "node:test";
import assert from "node:assert/strict";
import categories from "../src/data/categories.js";
import cours from "../src/data/cours.js";
import defisGeologiques from "../src/data/defisGeologiques.js";
import questions from "../src/data/questions.js";

test("toutes les catégories disposent de cours avec des chapitres renseignés", () => {
  for (const categorie of categories) {
    const coursCategorie = cours.filter(
      (element) => element.categorieId === categorie.id
    );

    assert.ok(coursCategorie.length > 0);
  }

  assert.ok(
    cours.every((element) =>
      element.chapitres.every(
        (chapitre) => chapitre.contenu.trim().length > 0
      )
    )
  );
});

test("les questions du quiz ont des réponses et explications valides", () => {
  assert.ok(questions.length > 0);
  assert.ok(
    questions.some((question) => question.categorie === "Géomorphologie")
  );
  assert.ok(
    questions.some((question) => question.categorie === "Géochimie")
  );

  for (const question of questions) {
    assert.ok(question.options.length >= 2);
    assert.ok(question.reponse >= 0 && question.reponse < question.options.length);
    assert.ok(question.explication.trim().length > 0);
  }
});

test("les défis géologiques disposent de choix, d'une réponse et d'une explication", () => {
  assert.ok(defisGeologiques.length > 0);

  for (const defi of defisGeologiques) {
    assert.ok(defi.options.length >= 2);
    assert.ok(defi.reponse >= 0 && defi.reponse < defi.options.length);
    assert.ok(defi.explication.trim().length > 0);
  }
});

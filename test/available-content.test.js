import test from "node:test";
import assert from "node:assert/strict";
import categories from "../src/data/categories.js";
import cours from "../src/data/cours.js";
import defisGeologiques from "../src/data/defisGeologiques.js";
import glossaire from "../src/data/glossaire.js";
import questions from "../src/data/questions.js";

test("toutes les catégories disposent de cours avec des chapitres renseignés", () => {
  for (const categorie of categories) {
    const coursCategorie = cours.filter(
      (element) => element.categorieId === categorie.id
    );

    assert.ok(coursCategorie.length > 0);
  }

  for (const coursId of [17, 18, 19, 20, 21, 22, 23]) {
    assert.ok(cours.some((element) => element.id === coursId));
  }

  assert.ok(
    cours.filter((element) => [8, 9].includes(element.categorieId)).length >= 10
  );

  assert.ok(
    cours.every((element) =>
      element.chapitres.every(
        (chapitre) => chapitre.contenu.trim().length > 0
      )
    )
  );
});

test("le glossaire couvre les nouvelles notions minières sans doublons", () => {
  const termes = glossaire.map((item) => item.terme.toLocaleLowerCase());
  assert.equal(new Set(termes).size, termes.length);
  assert.ok(glossaire.every((item) => item.definition.trim().length > 0));

  for (const terme of ["Aérage minier", "Gangue", "RQD", "Foudroyage", "Spodumène"]) {
    assert.ok(glossaire.some((item) => item.terme === terme));
  }
});

test("les questions du quiz ont des réponses et explications valides", () => {
  assert.ok(questions.length > 0);
  assert.equal(
    new Set(questions.map((question) => question.id)).size,
    questions.length
  );
  assert.ok(
    questions.some((question) => question.categorie === "Géomorphologie")
  );
  assert.ok(
    questions.some((question) => question.categorie === "Géochimie")
  );
  assert.ok(
    questions.some((question) => question.categorie === "Minéralurgie")
  );
  assert.ok(
    questions.some((question) => question.categorie === "Topographie minière")
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

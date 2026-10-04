import test from "node:test";
import assert from "node:assert/strict";
import { analyserContenuChapitre } from "../src/utils/courseReading.js";
import {
  calculerProgressionCours,
  lireChapitresTermines,
  validerChapitre,
} from "../src/utils/courseProgress.js";
import { consoliderResultatsEvaluation } from "../src/utils/assessmentResults.js";
import { creerSessionQuestions } from "../src/utils/assessmentQuestions.js";

test("découpe le contenu en résumé et points clés pour une lecture plus claire", () => {
  const contenu = `
La cristallographie étudie les cristaux.

À retenir : les cristaux sont ordonnés.

- Ils ont une structure périodique.
- Leur symétrie est régie par des axes.

La forme externe dépend de la croissance.
`;

  const analyse = analyserContenuChapitre(contenu);

  assert.match(analyse.resume, /cristallographie/i);
  assert.deepEqual(analyse.pointsCle, [
    "Ils ont une structure périodique.",
    "Leur symétrie est régie par des axes.",
  ]);
  assert.ok(analyse.objectif.length > 0);
});

test("la progression ne compte que les chapitres existants et sans doublon", () => {
  const chapitres = [{ id: 1 }, { id: 2 }];
  const stockage = {
    getItem: () => JSON.stringify([1, 1, 99, "2"]),
  };
  const termines = lireChapitresTermines(10, chapitres, stockage);

  assert.deepEqual(termines, [1]);
  assert.deepEqual(calculerProgressionCours(chapitres, termines), {
    nombreTermines: 1,
    totalChapitres: 2,
    pourcentage: 50,
  });
});

test("validerChapitre enregistre une validation sans la dupliquer", () => {
  let valeurEnregistree = JSON.stringify([1]);
  const stockage = {
    getItem: () => valeurEnregistree,
    setItem: (_cle, valeur) => {
      valeurEnregistree = valeur;
    },
  };

  const resultats = validerChapitre(
    10,
    1,
    [{ id: 1 }, { id: 2 }],
    stockage
  );

  assert.deepEqual(resultats, [1]);
  assert.equal(valeurEnregistree, "[1]");
});

test("validerChapitre signale une référence de chapitre invalide", () => {
  assert.throws(
    () => validerChapitre(10, 3, [{ id: 1 }], {
      getItem: () => null,
      setItem: () => {},
    }),
    RangeError
  );
});

test("le dernier item d'une évaluation n'est compté qu'une fois", () => {
  const reponses = Array.from({ length: 10 }, (_, index) => ({
    questionId: index + 1,
    correcte: true,
  }));
  reponses.push({ questionId: 10, correcte: true });

  assert.deepEqual(
    consoliderResultatsEvaluation(reponses, 10),
    {
      reponses: reponses.slice(0, 10),
      score: 10,
      total: 10,
      pourcentage: 100,
    }
  );
});

test("le quiz sélectionne uniquement les questions de la matière demandée", () => {
  const questions = [
    { id: 1, categorie: "Géochimie" },
    { id: 2, categorie: "Minéralogie" },
    { id: 3, categorie: "Géochimie" },
  ];

  const session = creerSessionQuestions(questions, {
    categorie: "Géochimie",
    nombre: 10,
  });

  assert.equal(session.length, 2);
  assert.ok(session.every((question) => question.categorie === "Géochimie"));
  assert.equal(creerSessionQuestions(questions).length, questions.length);
});

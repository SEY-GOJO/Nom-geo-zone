import test from "node:test";
import assert from "node:assert/strict";
import { analyserContenuChapitre } from "../src/utils/courseReading.js";

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

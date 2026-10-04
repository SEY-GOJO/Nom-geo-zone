import test from "node:test";
import assert from "node:assert/strict";

import mineraux from "../src/data/mineraux.js";
import roches from "../src/data/roches.js";
import { compterCorrespondances } from "../src/utils/identification.js";

test("les nouveaux catalogues géologiques sont complets et sans identifiants répétés", () => {
  assert.equal(new Set(roches.map((roche) => roche.id)).size, roches.length);
  assert.equal(new Set(mineraux.map((mineral) => mineral.id)).size, mineraux.length);

  for (const nom of ["Microgranite", "Pegmatite", "Phyllite"]) {
    assert.ok(roches.some((roche) => roche.nom === nom && roche.indices));
  }

  for (const nom of [
    "Or natif",
    "Bornite",
    "Chalcocite",
    "Malachite",
    "Azurite",
    "Sphalérite",
    "Galène",
  ]) {
    assert.ok(mineraux.some((mineral) => mineral.nom === nom));
  }
});

test("l’identification exige chaque critère et compare les minéraux par nom complet", () => {
  const filtres = {
    famille: "Roche métamorphique",
    mineral: "Quartz",
  };

  assert.equal(
    compterCorrespondances(
      { famille: "Roche métamorphique", mineral: ["Quartzite"] },
      filtres
    ),
    1
  );
  assert.equal(
    compterCorrespondances(
      { famille: "Roche métamorphique", mineral: ["Quartz", "Mica"] },
      filtres
    ),
    2
  );
});

test("la comparaison ignore les accents et les variantes de tiret", () => {
  assert.equal(
    compterCorrespondances(
      { durete: "2,5–3", trait: "Vert pâle" },
      { durete: "2,5-3", trait: "vert pale" }
    ),
    2
  );
});

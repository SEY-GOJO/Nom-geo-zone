import test from "node:test";
import assert from "node:assert/strict";
import {
  analyserProjetMinier,
  calculerDilution,
  calculerMetalDepuisTeneur,
  calculerMetalRecupere,
  calculerStrippingRatio,
  calculerTonnage,
  CODES_VALIDATION,
  normaliserTeneur,
  validerNombre,
} from "../src/utils/miningCalculations.js";

function presqueEgal(obtenu, attendu, epsilon = 1e-12) {
  assert.ok(
    Math.abs(obtenu - attendu) < epsilon,
    `${obtenu} n'est pas assez proche de ${attendu}`
  );
}

test("validerNombre distingue vide, non numérique et hors domaine", () => {
  assert.equal(validerNombre("", { champ: "x" }).vide, true);
  assert.equal(validerNombre("abc", { champ: "x" }).issue.code, CODES_VALIDATION.NON_NUMERIQUE);
  assert.equal(
    validerNombre(-1, { champ: "x", min: 0 }).issue.code,
    CODES_VALIDATION.HORS_DOMAINE
  );
  assert.equal(validerNombre(0, { champ: "densite", min: 0, exclusMin: true }).ok, false);
  assert.equal(validerNombre(2.65, { champ: "densite", min: 0, exclusMin: true }).value, 2.65);
});

test("calcule le tonnage et rejette une densité invalide", () => {
  assert.equal(calculerTonnage(2400, 2.65), 6360);
  assert.equal(calculerTonnage(2400, 0), null);
  assert.equal(calculerTonnage("", 2.65), null);
  assert.equal(calculerTonnage(-1, 2.65), null);
});

test("normalise les teneurs vers g/t", () => {
  assert.equal(normaliserTeneur(3.2, "g/t"), 3.2);
  assert.equal(normaliserTeneur(1, "%"), 10000);
  assert.equal(normaliserTeneur(1, "ppm"), 1);
  assert.equal(normaliserTeneur(-1, "g/t"), null);
  assert.equal(normaliserTeneur(1, "oz/t"), null);
});

test("applique la dilution avec stérile à teneur nulle", () => {
  const dilution = calculerDilution({
    tonnageMinerai: 1000,
    teneurMinerai: 3.2,
    teneurSterile: 0,
    tauxDilution: 10,
  });

  assert.equal(dilution.tonnageSterile, 100);
  assert.equal(dilution.sterileAjoute, 100);
  assert.equal(dilution.tonnageTotal, 1100);
  presqueEgal(dilution.teneurDiluee, 3200 / 1100);
  assert.equal(dilution.metalTotalGrammes, 3200);
});

test("calcule le stripping ratio et le métal récupéré", () => {
  assert.equal(calculerStrippingRatio(25000, 50000), 2);
  assert.equal(calculerStrippingRatio(0, 50000), null);

  const recupere = calculerMetalRecupere(32, 85);
  presqueEgal(recupere.recupere, 27.2);
  presqueEgal(recupere.nonRecupere, 4.8);
  assert.equal(calculerMetalRecupere(32, 101), null);
});

test("calcule le métal contenu depuis une teneur", () => {
  const metal = calculerMetalDepuisTeneur(10000, 3.2, "g/t");
  assert.equal(metal.grammes, 32000);
  assert.equal(metal.kilogrammes, 32);
  presqueEgal(metal.tonnes, 0.032);

  const depuisPourcent = calculerMetalDepuisTeneur(100, 1, "%");
  presqueEgal(depuisPourcent.tonnes, 1);
});

test("pipeline : exemple pédagogique volume → récupération", () => {
  const analyse = analyserProjetMinier({
    nomProjet: "  Projet aurifère  ",
    volume: 2400,
    densite: 2.65,
    teneurMinerai: 3.2,
    uniteTeneur: "g/t",
    teneurSterile: 0,
    tauxDilution: 10,
    recuperation: 85,
  });

  assert.equal(analyse.nomProjet, "Projet aurifère");
  assert.equal(analyse.issues.length, 0);
  assert.equal(analyse.tonnageMinerai, 6360);
  assert.equal(analyse.teneurMineraiGParTonne, 3.2);
  assert.equal(analyse.dilution.sterileAjoute, 636);
  assert.equal(analyse.dilution.tonnageTotal, 6996);
  presqueEgal(analyse.dilution.teneurDiluee, (6360 * 3.2) / 6996);
  presqueEgal(analyse.strippingRatio, 0.1);
  presqueEgal(analyse.metalContenu.grammes, 6360 * 3.2);
  presqueEgal(analyse.metalRecupere.recupere, (6360 * 3.2) / 1_000_000 * 0.85);
});

test("pipeline : tonnage stérile saisi remplace la dilution pour le SR", () => {
  const analyse = analyserProjetMinier({
    volume: 100,
    densite: 2,
    teneurMinerai: 1,
    uniteTeneur: "g/t",
    tauxDilution: 10,
    tonnageSterile: 800,
  });

  assert.equal(analyse.tonnageMinerai, 200);
  assert.equal(analyse.dilution.sterileAjoute, 20);
  assert.equal(analyse.strippingSterileUtilise, 800);
  assert.equal(analyse.strippingRatio, 4);
});

test("pipeline : saisie partielle et erreurs stables", () => {
  const partiel = analyserProjetMinier({ volume: 2400, densite: 2.65 });
  assert.equal(partiel.tonnageMinerai, 6360);
  assert.equal(partiel.dilution, null);
  assert.equal(partiel.metalRecupere, null);

  const invalide = analyserProjetMinier({
    volume: "abc",
    densite: 2.65,
    recuperation: 150,
    uniteTeneur: "oz/t",
  });

  const codes = invalide.issues.map((item) => `${item.champ}:${item.code}`);
  assert.ok(codes.includes(`volume:${CODES_VALIDATION.NON_NUMERIQUE}`));
  assert.ok(codes.includes(`recuperation:${CODES_VALIDATION.HORS_DOMAINE}`));
  assert.ok(codes.includes(`uniteTeneur:${CODES_VALIDATION.UNITE_INCONNUE}`));
});

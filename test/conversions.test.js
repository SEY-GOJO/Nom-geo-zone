import test from "node:test";
import assert from "node:assert/strict";
import { convertir } from "../src/utils/conversions.js";

test("convertit les longueurs, masses, volumes et concentrations", () => {
  assert.equal(convertir(2, "longueur", "km", "m"), 2000);
  assert.equal(convertir(1, "masse", "t", "kg"), 1000);
  assert.equal(convertir(1, "volume", "m3", "cm3"), 1_000_000);
  assert.equal(convertir(1, "masseVolumique", "g/cm3", "kg/m3"), 1000);
  assert.equal(convertir(1, "concentration", "%", "g/t"), 10000);
});

test("rejette une valeur ou une famille invalide", () => {
  assert.throws(() => convertir("x", "longueur", "m", "km"));
  assert.throws(() => convertir(1, "temps", "s", "min"));
});

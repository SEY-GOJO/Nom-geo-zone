# GEO ZONE

Application pédagogique de géologie et de mines. Les calculateurs miniers s’appuient sur un pipeline d’analyse unique, testable, plutôt que sur des formules recopiées dans chaque écran.

## Pipeline d’analyse minière

Module : `src/utils/miningCalculations.js`.

Entrée principale : `analyserProjetMinier(entrees)`.

| Champ | Unité | Contrainte |
| --- | --- | --- |
| `volume` | m³ | ≥ 0 |
| `densite` | t/m³ | > 0 |
| `teneurMinerai` / `teneurSterile` | `uniteTeneur` | ≥ 0 |
| `uniteTeneur` | `g/t`, `ppm`, `%`, `ppb` | obligatoire si une teneur est saisie |
| `tauxDilution` | % | ≥ 0 (défaut 0) |
| `tonnageSterile` | t | ≥ 0, optionnel (sinon stérile de dilution) |
| `recuperation` | % | 0–100 |

Sortie : tonnage, teneurs en g/t, dilution, stripping ratio, métal contenu, métal récupéré, plus `issues` (`INCOMPLET`, `NON_NUMERIQUE`, `HORS_DOMAINE`, `UNITE_INCONNUE`).

Formules (modèle pédagogique) :

- Tonnage : \(T = V \times \rho\)
- Dilution : \(S = T \times d/100\), teneur diluée = métal total / tonnage total
- Stripping ratio : stérile / minerai
- Métal contenu (g) : tonnage (t) × teneur (g/t)
- Récupération : métal × taux / 100

Les champs vides produisent `null` sur les étapes concernées (saisie progressive). Les valeurs invalides sont aussi `null` et apparaissent dans `issues`.

```js
import { analyserProjetMinier } from "./src/utils/miningCalculations.js";

const analyse = analyserProjetMinier({
  volume: 2400,
  densite: 2.65,
  teneurMinerai: 3.2,
  uniteTeneur: "g/t",
  tauxDilution: 10,
  recuperation: 85,
});
```

Les pages Tonnage, Dilution, Stripping Ratio, Métal contenu, Récupération et Mining Calculator utilisent ce module.

## Tests

```bash
npm test
```

Les tests du pipeline sont dans `test/mining-project.test.js`.

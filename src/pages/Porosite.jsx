import { Link } from "react-router-dom";
import { useState } from "react";

function Porosite() {
  const [mode, setMode] = useState("volumes");

  const [volumeVides, setVolumeVides] = useState("");
  const [volumeTotal, setVolumeTotal] = useState("");
  const [volumeSolides, setVolumeSolides] = useState("");

  const calculer = () => {
    if (mode === "volumes") {
      if (volumeVides === "" || volumeTotal === "") {
        return null;
      }

      const vides = Number(volumeVides);
      const total = Number(volumeTotal);

      if (
        !Number.isFinite(vides) ||
        !Number.isFinite(total) ||
        vides < 0 ||
        total <= 0 ||
        vides > total
      ) {
        return null;
      }

      return {
        porosite: (vides / total) * 100,
        volumeVides: vides,
        volumeTotal: total,
        volumeSolides: total - vides,
      };
    }

    if (volumeSolides === "" || volumeTotal === "") {
      return null;
    }

    const solides = Number(volumeSolides);
    const total = Number(volumeTotal);

    if (
      !Number.isFinite(solides) ||
      !Number.isFinite(total) ||
      solides < 0 ||
      total <= 0 ||
      solides > total
    ) {
      return null;
    }

    const vides = total - solides;

    return {
      porosite: (vides / total) * 100,
      volumeVides: vides,
      volumeTotal: total,
      volumeSolides: solides,
    };
  };

  const resultat = calculer();

  const changerMode = (nouveauMode) => {
    setMode(nouveauMode);
    setVolumeVides("");
    setVolumeTotal("");
    setVolumeSolides("");
  };

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">💧</div>

        <h1>Porosité</h1>

        <p>
          Calcule la porosité d'un matériau géologique à partir
          du volume des vides et du volume total, ou à partir du
          volume des solides.
        </p>
      </div>

      <div className="card">
        <h2>💧 Calcul de la porosité</h2>

        <label htmlFor="porosite-mode">
          Méthode de calcul
        </label>

        <select
          id="porosite-mode"
          value={mode}
          onChange={(e) => changerMode(e.target.value)}
        >
          <option value="volumes">
            Volume des vides + volume total
          </option>

          <option value="solides">
            Volume des solides + volume total
          </option>
        </select>

        {mode === "volumes" ? (
          <>
            <label htmlFor="porosite-vides">
              Volume des vides
            </label>

            <input
              className="search"
              id="porosite-vides"
              type="number"
              min="0"
              step="any"
              placeholder="Exemple : 0.25"
              value={volumeVides}
              onChange={(e) => setVolumeVides(e.target.value)}
            />

            <p>Unité : m³</p>

            <label htmlFor="porosite-total">
              Volume total
            </label>

            <input
              className="search"
              id="porosite-total"
              type="number"
              min="0"
              step="any"
              placeholder="Exemple : 1"
              value={volumeTotal}
              onChange={(e) => setVolumeTotal(e.target.value)}
            />

            <p>Unité : m³</p>
          </>
        ) : (
          <>
            <label htmlFor="porosite-solides">
              Volume des solides
            </label>

            <input
              className="search"
              id="porosite-solides"
              type="number"
              min="0"
              step="any"
              placeholder="Exemple : 0.75"
              value={volumeSolides}
              onChange={(e) => setVolumeSolides(e.target.value)}
            />

            <p>Unité : m³</p>

            <label htmlFor="porosite-total">
              Volume total
            </label>

            <input
              className="search"
              id="porosite-total"
              type="number"
              min="0"
              step="any"
              placeholder="Exemple : 1"
              value={volumeTotal}
              onChange={(e) => setVolumeTotal(e.target.value)}
            />

            <p>Unité : m³</p>
          </>
        )}

        {resultat !== null ? (
          <div className="card">
            <h2>Résultats</h2>

            <p>Porosité</p>

            <h1>{resultat.porosite.toFixed(3)} %</h1>

            <p>
              Volume des vides :{" "}
              {resultat.volumeVides} m³
            </p>

            <p>
              Volume des solides :{" "}
              {resultat.volumeSolides} m³
            </p>

            <p>
              Volume total :{" "}
              {resultat.volumeTotal} m³
            </p>
          </div>
        ) : (
          ((mode === "volumes" &&
            volumeVides !== "" &&
            volumeTotal !== "") ||
            (mode === "solides" &&
              volumeSolides !== "" &&
              volumeTotal !== "")) && (
            <p>
              Vérifie que les volumes sont positifs et que le
              volume des vides ou des solides ne dépasse pas le
              volume total.
            </p>
          )
        )}
      </div>

      <div className="card">
        <h2>📚 Comprendre</h2>

        <p>
          La porosité correspond à la proportion du volume
          total occupée par les espaces vides d'une roche ou
          d'un sol.
        </p>

        <p>
          Elle peut être exprimée sous forme décimale ou en
          pourcentage.
        </p>

        <p>
          Exemple : si un échantillon de 1 m³ possède 0,25 m³
          de vides, sa porosité est de 25 %.
        </p>

        <p>
          La porosité totale ne signifie pas nécessairement que
          tous les pores permettent effectivement à l'eau de
          circuler. La porosité effective concerne les espaces
          interconnectés participant à l'écoulement.
        </p>
      </div>
    </div>
  );
}

export default Porosite;
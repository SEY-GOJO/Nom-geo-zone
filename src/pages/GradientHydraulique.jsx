import { Link } from "react-router-dom";
import { useState } from "react";

function GradientHydraulique() {
  const [mode, setMode] = useState("difference");

  const [differenceCharge, setDifferenceCharge] = useState("");
  const [chargeAmont, setChargeAmont] = useState("");
  const [chargeAval, setChargeAval] = useState("");
  const [distance, setDistance] = useState("");

  const calculer = () => {
    const longueur = Number(distance);

    if (!Number.isFinite(longueur) || longueur <= 0) {
      return null;
    }

    let deltaH;

    if (mode === "difference") {
      const difference = Number(differenceCharge);

      if (!Number.isFinite(difference) || difference < 0) {
        return null;
      }

      deltaH = difference;
    } else {
      const amont = Number(chargeAmont);
      const aval = Number(chargeAval);

      if (
        !Number.isFinite(amont) ||
        !Number.isFinite(aval) ||
        amont < 0 ||
        aval < 0
      ) {
        return null;
      }

      deltaH = Math.abs(amont - aval);
    }

    const gradient = deltaH / longueur;

    return {
      deltaH,
      distance: longueur,
      gradient,
    };
  };

  const resultat = calculer();

  const changerMode = (nouveauMode) => {
    setMode(nouveauMode);

    setDifferenceCharge("");
    setChargeAmont("");
    setChargeAval("");
    setDistance("");
  };

  const reinitialiser = () => {
    setDifferenceCharge("");
    setChargeAmont("");
    setChargeAval("");
    setDistance("");
  };

  const champsComplets =
    (mode === "difference" &&
      differenceCharge !== "" &&
      distance !== "") ||
    (mode === "charges" &&
      chargeAmont !== "" &&
      chargeAval !== "" &&
      distance !== "");

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">💧</div>

        <h1>Gradient hydraulique</h1>

        <p>
          Calcule le gradient hydraulique d'un écoulement souterrain à
          partir de la différence de charge hydraulique et de la distance
          entre deux points.
        </p>
      </div>

      <div className="card">
        <h2>💧 Calcul du gradient hydraulique</h2>

        <label htmlFor="gradient-mode">
          Méthode de calcul
        </label>

        <select
          id="gradient-mode"
          value={mode}
          onChange={(e) => changerMode(e.target.value)}
        >
          <option value="difference">
            Différence de charge + distance
          </option>

          <option value="charges">
            Charge amont + charge aval + distance
          </option>
        </select>

        {mode === "difference" ? (
          <>
            <label htmlFor="gradient-difference">
              Différence de charge hydraulique
            </label>

            <input
              className="search"
              id="gradient-difference"
              type="number"
              min="0"
              step="any"
              placeholder="Exemple : 5"
              value={differenceCharge}
              onChange={(e) => setDifferenceCharge(e.target.value)}
            />

            <p>Unité : m</p>
          </>
        ) : (
          <>
            <label htmlFor="gradient-amont">
              Charge hydraulique amont
            </label>

            <input
              className="search"
              id="gradient-amont"
              type="number"
              min="0"
              step="any"
              placeholder="Exemple : 105"
              value={chargeAmont}
              onChange={(e) => setChargeAmont(e.target.value)}
            />

            <p>Unité : m</p>

            <label htmlFor="gradient-aval">
              Charge hydraulique aval
            </label>

            <input
              className="search"
              id="gradient-aval"
              type="number"
              min="0"
              step="any"
              placeholder="Exemple : 100"
              value={chargeAval}
              onChange={(e) => setChargeAval(e.target.value)}
            />

            <p>Unité : m</p>
          </>
        )}

        <label htmlFor="gradient-distance">
          Distance entre les deux points
        </label>

        <input
          className="search"
          id="gradient-distance"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 100"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />

        <p>Unité : m</p>

        <div className="outil-actions">
          <button type="button" onClick={reinitialiser}>
            Réinitialiser
          </button>
        </div>

        {resultat !== null ? (
          <div className="card">
            <h2>Résultats</h2>

            <p>Différence de charge hydraulique</p>

            <h1>{resultat.deltaH.toFixed(3)} m</h1>

            <p>
              Distance : {resultat.distance.toFixed(3)} m
            </p>

            <p>
              Gradient hydraulique :{" "}
              <strong>{resultat.gradient.toFixed(5)}</strong>
            </p>

            <p>
              Le gradient hydraulique est une grandeur sans unité,
              puisque c'est un rapport entre une différence de hauteur
              et une distance.
            </p>
          </div>
        ) : (
          champsComplets && (
            <p>
              Vérifie que la distance est supérieure à zéro et que les
              charges hydrauliques sont valides.
            </p>
          )
        )}
      </div>

      <div className="card">
        <h2>📚 Comprendre</h2>

        <p>
          Le gradient hydraulique représente la variation de charge
          hydraulique par unité de distance entre deux points.
        </p>

        <p>
          Pour un écoulement souterrain, l'eau se déplace généralement
          d'une zone de charge hydraulique plus élevée vers une zone de
          charge hydraulique plus faible.
        </p>

        <p>
          Exemple : pour une différence de charge de 5 m sur une
          distance de 100 m, le gradient hydraulique est de 0,05.
        </p>

        <p>
          Un gradient de 0,05 correspond donc à une différence de
          charge de 5 m pour chaque 100 m de distance.
        </p>
      </div>
    </div>
  );
}

export default GradientHydraulique;
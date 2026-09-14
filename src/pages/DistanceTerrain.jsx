import { Link } from "react-router-dom";
import { useState } from "react";

function DistanceTerrain() {
  const [mode, setMode] = useState("horizontal");
  const [distanceHorizontale, setDistanceHorizontale] =
    useState("");
  const [denivele, setDenivele] = useState("");
  const [distanceInclinee, setDistanceInclinee] =
    useState("");
  const [angle, setAngle] = useState("");

  const calculer = () => {
    if (mode === "horizontal") {
      if (
        distanceHorizontale === "" ||
        denivele === ""
      ) {
        return null;
      }

      const horizontal = Number(distanceHorizontale);
      const vertical = Number(denivele);

      if (
        !Number.isFinite(horizontal) ||
        !Number.isFinite(vertical) ||
        horizontal <= 0 ||
        vertical < 0
      ) {
        return null;
      }

      const inclinee = Math.sqrt(
        horizontal ** 2 + vertical ** 2
      );

      const pente = (vertical / horizontal) * 100;

      const angleCalcule =
        (Math.atan(vertical / horizontal) * 180) /
        Math.PI;

      return {
        horizontal,
        vertical,
        inclinee,
        pente,
        angle: angleCalcule,
      };
    }

    if (
      distanceInclinee === "" ||
      angle === ""
    ) {
      return null;
    }

    const inclinee = Number(distanceInclinee);
    const angleNombre = Number(angle);

    if (
      !Number.isFinite(inclinee) ||
      !Number.isFinite(angleNombre) ||
      inclinee <= 0 ||
      angleNombre < 0 ||
      angleNombre > 90
    ) {
      return null;
    }

    const angleRadians =
      (angleNombre * Math.PI) / 180;

    const horizontal =
      inclinee * Math.cos(angleRadians);

    const vertical =
      inclinee * Math.sin(angleRadians);

    const pente =
      horizontal > 0
        ? (vertical / horizontal) * 100
        : vertical > 0
          ? Infinity
          : 0;

    return {
      horizontal,
      vertical,
      inclinee,
      pente,
      angle: angleNombre,
    };
  };

  const resultat = calculer();

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">
          🗺️
        </div>

        <h1>
          Distance terrain
        </h1>

        <p>
          Calcule la distance inclinée, le dénivelé et la pente
          à partir de mesures réalisées sur le terrain.
        </p>
      </div>

      <div className="card">
        <h2>
          📐 Calcul géométrique
        </h2>

        <label htmlFor="distance-mode">
          Type de calcul
        </label>

        <select
          id="distance-mode"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            setDistanceHorizontale("");
            setDenivele("");
            setDistanceInclinee("");
            setAngle("");
          }}
        >
          <option value="horizontal">
            Distance horizontale + dénivelé
          </option>

          <option value="inclinee">
            Distance inclinée + angle
          </option>
        </select>

        {mode === "horizontal" ? (
          <>
            <label htmlFor="horizontal-distance">
              Distance horizontale
            </label>

            <input
              className="search"
              id="horizontal-distance"
              type="number"
              min="0"
              step="any"
              placeholder="Exemple : 100"
              value={distanceHorizontale}
              onChange={(e) =>
                setDistanceHorizontale(e.target.value)
              }
            />

            <p>
              Unité : m
            </p>

            <label htmlFor="vertical-difference">
              Dénivelé
            </label>

            <input
              className="search"
              id="vertical-difference"
              type="number"
              min="0"
              step="any"
              placeholder="Exemple : 50"
              value={denivele}
              onChange={(e) =>
                setDenivele(e.target.value)
              }
            />

            <p>
              Unité : m
            </p>
          </>
        ) : (
          <>
            <label htmlFor="inclined-distance">
              Distance inclinée
            </label>

            <input
              className="search"
              id="inclined-distance"
              type="number"
              min="0"
              step="any"
              placeholder="Exemple : 100"
              value={distanceInclinee}
              onChange={(e) =>
                setDistanceInclinee(e.target.value)
              }
            />

            <p>
              Unité : m
            </p>

            <label htmlFor="terrain-angle">
              Angle d'inclinaison
            </label>

            <input
              className="search"
              id="terrain-angle"
              type="number"
              min="0"
              max="90"
              step="any"
              placeholder="Exemple : 30"
              value={angle}
              onChange={(e) =>
                setAngle(e.target.value)
              }
            />

            <p>
              Unité : °
            </p>
          </>
        )}

        {resultat !== null && (
          <div className="card">
            <h2>
              Résultats
            </h2>

            <p>
              Distance horizontale
            </p>

            <h2>
              {resultat.horizontal.toFixed(3)} m
            </h2>

            <p>
              Dénivelé
            </p>

            <h2>
              {resultat.vertical.toFixed(3)} m
            </h2>

            <p>
              Distance inclinée
            </p>

            <h2>
              {resultat.inclinee.toFixed(3)} m
            </h2>

            <p>
              Pente
            </p>

            <h2>
              {Number.isFinite(resultat.pente)
                ? `${resultat.pente.toFixed(3)} %`
                : "90°"}
            </h2>

            <p>
              Angle d'inclinaison
            </p>

            <h1>
              {resultat.angle.toFixed(3)}°
            </h1>
          </div>
        )}

        {mode === "horizontal" &&
          distanceHorizontale !== "" &&
          denivele !== "" &&
          resultat === null && (
            <p>
              Vérifie que la distance horizontale est positive
              et que le dénivelé est positif ou nul.
            </p>
          )}

        {mode === "inclinee" &&
          distanceInclinee !== "" &&
          angle !== "" &&
          resultat === null && (
            <p>
              Vérifie que la distance inclinée est positive et
              que l'angle est compris entre 0° et 90°.
            </p>
          )}
      </div>

      <div className="card">
        <h2>
          📚 Comprendre
        </h2>

        <p>
          La distance inclinée correspond à la longueur réelle
          entre deux points lorsque le terrain n'est pas
          horizontal.
        </p>

        <p>
          Le dénivelé représente la différence d'altitude entre
          les deux points.
        </p>

        <p>
          La pente correspond au rapport entre le dénivelé et
          la distance horizontale, exprimé en pourcentage.
        </p>

        <p>
          Exemple : pour 100 m de distance horizontale et 50 m
          de dénivelé, la distance inclinée est d'environ
          111,803 m et la pente est de 50 %.
        </p>
      </div>
    </div>
  );
}

export default DistanceTerrain;
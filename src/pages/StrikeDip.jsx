import { Link } from "react-router-dom";
import { useState } from "react";

function StrikeDip() {
  const [strike, setStrike] = useState("");
  const [dip, setDip] = useState("");

  const calculer = () => {
    if (strike === "" || dip === "") {
      return null;
    }

    const strikeNombre = Number(strike);
    const dipNombre = Number(dip);

    if (
      !Number.isFinite(strikeNombre) ||
      !Number.isFinite(dipNombre) ||
      strikeNombre < 0 ||
      strikeNombre >= 360 ||
      dipNombre < 0 ||
      dipNombre > 90
    ) {
      return null;
    }

    const dipDirection = (strikeNombre + 90) % 360;

    return {
      strike: strikeNombre,
      dip: dipNombre,
      dipDirection,
    };
  };

  const resultat = calculer();

  const directionCardinale = (azimut) => {
    const directions = [
      "N",
      "NE",
      "E",
      "SE",
      "S",
      "SO",
      "O",
      "NO",
    ];

    const index = Math.round(azimut / 45) % 8;

    return directions[index];
  };

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">
          🧭
        </div>

        <h1>
          Strike & Dip
        </h1>

        <p>
          Détermine la direction du pendage à partir du strike
          et de l'angle de pendage selon la règle de la main
          droite.
        </p>
      </div>

      <div className="card">
        <h2>
          🧭 Orientation d'une structure géologique
        </h2>

        <label htmlFor="strike-value">
          Strike
        </label>

        <input
          className="search"
          id="strike-value"
          type="number"
          min="0"
          max="359.99"
          step="any"
          placeholder="Exemple : 120"
          value={strike}
          onChange={(e) => setStrike(e.target.value)}
        />

        <p>
          Azimut en degrés, mesuré depuis le Nord.
        </p>

        <label htmlFor="dip-value">
          Pendage
        </label>

        <input
          className="search"
          id="dip-value"
          type="number"
          min="0"
          max="90"
          step="any"
          placeholder="Exemple : 35"
          value={dip}
          onChange={(e) => setDip(e.target.value)}
        />

        <p>
          Angle compris entre 0° et 90°.
        </p>

        {resultat !== null && (
          <div className="card">
            <h2>
              Résultat
            </h2>

            <p>
              Strike
            </p>

            <h2>
              {resultat.strike}°
            </h2>

            <p>
              Pendage
            </p>

            <h2>
              {resultat.dip}°
            </h2>

            <p>
              Direction du pendage
            </p>

            <h1>
              {String(
                Math.round(resultat.dipDirection)
              ).padStart(3, "0")}°
            </h1>

            <p>
              Direction approximative :{" "}
              {directionCardinale(resultat.dipDirection)}
            </p>

            <p>
              Convention : règle de la main droite.
            </p>
          </div>
        )}
      </div>

      <div className="card">
        <h2>
          📚 Comprendre
        </h2>

        <p>
          Le strike correspond à l'azimut d'une ligne
          horizontale appartenant au plan géologique.
        </p>

        <p>
          Le pendage correspond à l'inclinaison maximale du
          plan par rapport à l'horizontale.
        </p>

        <p>
          Avec la règle de la main droite, la direction du
          pendage se déduit en ajoutant 90° au strike.
        </p>

        <p>
          Exemple : un strike de 120° et un pendage de 35°
          donnent une direction de pendage de 210°.
        </p>
      </div>
    </div>
  );
}

export default StrikeDip;
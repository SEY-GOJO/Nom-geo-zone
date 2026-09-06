import { Link } from "react-router-dom";
import { useState } from "react";

function Azimut() {
  const [azimut, setAzimut] = useState("");

  const calculerInverse = () => {
    if (azimut === "") {
      return null;
    }

    const valeur = Number(azimut);

    if (!Number.isFinite(valeur) || valeur < 0 || valeur > 360) {
      return "Valeur invalide";
    }

    return (valeur + 180) % 360;
  };

  const resultat = calculerInverse();

  const reinitialiser = () => {
    setAzimut("");
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
          Calculateur d'azimut
        </h1>

        <p>
          Calcule l'azimut inverse d'une direction pour les
          travaux de terrain et l'orientation géologique.
        </p>
      </div>

      <div className="card">
        <h2>
          🧭 Azimut inverse
        </h2>

        <p>
          Entre un azimut compris entre 0° et 360°.
        </p>

        <label htmlFor="azimut-valeur">
          Azimut
        </label>

        <input
          className="search"
          id="azimut-valeur"
          type="number"
          min="0"
          max="360"
          placeholder="Exemple : 45"
          value={azimut}
          onChange={(e) => setAzimut(e.target.value)}
        />

        {resultat !== null && (
          <div className="card">
            <h2>
              📊 Résultat
            </h2>

            {resultat === "Valeur invalide" ? (
              <p>
                ❌ L'azimut doit être compris entre 0° et 360°.
              </p>
            ) : (
              <>
                <p>
                  Azimut initial : {azimut}°
                </p>

                <h1>
                  Azimut inverse : {resultat}°
                </h1>
              </>
            )}
          </div>
        )}

        <button onClick={reinitialiser}>
          🔄 Réinitialiser
        </button>
      </div>

      <div className="card">
        <h2>
          📚 Exemple
        </h2>

        <p>
          Pour un azimut de 45°, l'azimut inverse est de 225°.
        </p>

        <p>
          Pour un azimut de 270°, l'azimut inverse est de 90°.
        </p>
      </div>
    </div>
  );
}

export default Azimut;
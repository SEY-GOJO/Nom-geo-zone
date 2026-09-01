import { useState } from "react";
import { Link } from "react-router-dom";

function Pendage() {
  const [direction, setDirection] = useState("");
  const [angle, setAngle] = useState("");

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">
          📏
        </div>

        <h1>Calcul du pendage</h1>

        <p>
          Outil simple pour travailler avec la direction
          et l'angle de pendage d'une structure géologique.
        </p>
      </div>

      <div className="card">
        <h2>🧭 Paramètres</h2>

        <label>
          Direction :
        </label>

        <input
          className="search"
          type="number"
          placeholder="Exemple : 120"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
        />

        <label>
          Angle de pendage :
        </label>

        <input
          className="search"
          type="number"
          placeholder="Exemple : 35"
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
        />

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => {
              setDirection("");
              setAngle("");
            }}
          >
            🔄 Réinitialiser
          </button>
        </div>
      </div>

      <div className="card">
        <h2>📐 Résultat</h2>

        {direction || angle ? (
          <div>
            <p>
              <strong>Direction :</strong>{" "}
              {direction || "Non renseignée"}°
            </p>

            <p>
              <strong>Angle de pendage :</strong>{" "}
              {angle || "Non renseigné"}°
            </p>
          </div>
        ) : (
          <p>
            Renseigne les paramètres pour afficher les résultats.
          </p>
        )}
      </div>
    </div>
  );
}

export default Pendage;
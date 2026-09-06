import { useState } from "react";
import { Link } from "react-router-dom";

function Pendage() {
  const [direction, setDirection] = useState("");
  const [angle, setAngle] = useState("");
  const directionNumber = Number(direction);
  const angleNumber = Number(angle);
  const directionValide =
    direction !== "" &&
    Number.isFinite(directionNumber) &&
    directionNumber >= 0 &&
    directionNumber <= 360;
  const angleValide =
    angle !== "" &&
    Number.isFinite(angleNumber) &&
    angleNumber >= 0 &&
    angleNumber <= 90;
  const parametresValides = directionValide && angleValide;

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

        <label htmlFor="pendage-direction">
          Direction :
        </label>

        <input
          className="search"
          id="pendage-direction"
          type="number"
          min="0"
          max="360"
          placeholder="Exemple : 120"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
        />

        <label htmlFor="pendage-angle">
          Angle de pendage :
        </label>

        <input
          className="search"
          id="pendage-angle"
          type="number"
          min="0"
          max="90"
          placeholder="Exemple : 35"
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
        />

        <div style={{ marginTop: "20px" }}>
          <button
            type="button"
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

        {parametresValides ? (
          <div>
            <p>
              <strong>Direction :</strong>{" "}
              {directionNumber}°
            </p>

            <p>
              <strong>Angle de pendage :</strong>{" "}
              {angleNumber}°
            </p>
          </div>
        ) : direction || angle ? (
          <p role="alert">
            La direction doit être comprise entre 0° et 360° et l'angle entre
            0° et 90°.
          </p>
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
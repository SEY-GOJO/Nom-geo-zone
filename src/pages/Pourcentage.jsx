import { Link } from "react";
import { useState } from "react";

function Pourcentage() {
  const [valeur, setValeur] = useState("");
  const [pourcentage, setPourcentage] = useState("");

  const resultat =
    valeur !== "" && pourcentage !== ""
      ? (Number(valeur) * Number(pourcentage)) / 100
      : null;

  const reinitialiser = () => {
    setValeur("");
    setPourcentage("");
  };

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">
          📊
        </div>

        <h1>
          Calculateur de pourcentage
        </h1>

        <p>
          Calcule rapidement un pourcentage d'une valeur.
        </p>
      </div>

      <div className="card">
        <h2>
          🧮 Calcul
        </h2>

        <label>
          Valeur
        </label>

        <input
          className="search"
          type="number"
          placeholder="Exemple : 500"
          value={valeur}
          onChange={(e) => setValeur(e.target.value)}
        />

        <label>
          Pourcentage
        </label>

        <input
          className="search"
          type="number"
          placeholder="Exemple : 15"
          value={pourcentage}
          onChange={(e) => setPourcentage(e.target.value)}
        />

        {resultat !== null && (
          <div className="card">
            <h2>
              📊 Résultat
            </h2>

            <p>
              {pourcentage}% de {valeur} =
            </p>

            <h1>
              {resultat.toLocaleString("fr-FR", {
                maximumFractionDigits: 4
              })}
            </h1>
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
          15% de 500 = 75.
        </p>
      </div>
    </div>
  );
}

export default Pourcentage;
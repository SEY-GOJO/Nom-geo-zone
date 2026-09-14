import { Link } from "react-router-dom";
import { useState } from "react";

function ConductiviteHydraulique() {
  const [debit, setDebit] = useState("");
  const [gradient, setGradient] = useState("");
  const [surface, setSurface] = useState("");
  const [resultat, setResultat] = useState(null);

  const calculerConductivite = () => {
    const Q = Number(debit);
    const i = Number(gradient);
    const A = Number(surface);

    if (
      !Number.isFinite(Q) ||
      !Number.isFinite(i) ||
      !Number.isFinite(A) ||
      Q < 0 ||
      i <= 0 ||
      A <= 0
    ) {
      return null;
    }

    const conductivite = Q / (i * A);

    return {
      debit: Q,
      gradient: i,
      surface: A,
      conductivite,
    };
  };

  const resultatCalcule = calculerConductivite();

  const calculer = () => {
    setResultat(resultatCalcule);
  };

  const reinitialiser = () => {
    setDebit("");
    setGradient("");
    setSurface("");
    setResultat(null);
  };

  const champsComplets =
    debit !== "" &&
    gradient !== "" &&
    surface !== "";

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">💧</div>

        <h1>Conductivité hydraulique</h1>

        <p>
          Calcule la conductivité hydraulique d'un milieu poreux
          à partir du débit, du gradient hydraulique et de la
          surface traversée.
        </p>
      </div>

      <div className="card">
        <h2>💧 Calcul de la conductivité</h2>

        <label htmlFor="conductivite-debit">
          Débit d'écoulement
        </label>

        <input
          className="search"
          id="conductivite-debit"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 0.001"
          value={debit}
          onChange={(e) => {
            setDebit(e.target.value);
            setResultat(null);
          }}
        />

        <p>Unité : m³/s</p>

        <label htmlFor="conductivite-gradient">
          Gradient hydraulique
        </label>

        <input
          className="search"
          id="conductivite-gradient"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 0.05"
          value={gradient}
          onChange={(e) => {
            setGradient(e.target.value);
            setResultat(null);
          }}
        />

        <p>Sans unité</p>

        <label htmlFor="conductivite-surface">
          Surface traversée
        </label>

        <input
          className="search"
          id="conductivite-surface"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 20"
          value={surface}
          onChange={(e) => {
            setSurface(e.target.value);
            setResultat(null);
          }}
        />

        <p>Unité : m²</p>

        <div className="outil-actions">
          <button
            type="button"
            onClick={calculer}
            disabled={!champsComplets}
          >
            Calculer
          </button>

          <button
            type="button"
            onClick={reinitialiser}
          >
            Réinitialiser
          </button>
        </div>

        {resultat !== null ? (
          <div className="card">
            <h2>Résultats</h2>

            <p>Conductivité hydraulique</p>

            <h1>
              {resultat.conductivite.toExponential(4)} m/s
            </h1>

            <p>
              Débit : {resultat.debit.toExponential(4)} m³/s
            </p>

            <p>
              Gradient hydraulique : {resultat.gradient}
            </p>

            <p>
              Surface traversée : {resultat.surface} m²
            </p>
          </div>
        ) : (
          champsComplets && (
            <p>
              Vérifie que le débit est positif, que le gradient
              est supérieur à zéro et que la surface est valide.
            </p>
          )
        )}
      </div>

      <div className="card">
        <h2>📚 Comprendre</h2>

        <p>
          La conductivité hydraulique caractérise la facilité
          avec laquelle l'eau peut circuler à travers un milieu
          poreux sous l'effet d'un gradient hydraulique.
        </p>

        <p>
          Dans ce calculateur, elle est déterminée à partir du
          débit d'écoulement, du gradient hydraulique et de la
          surface traversée.
        </p>

        <p>
          Exemple : pour un débit de 0,001 m³/s, un gradient
          hydraulique de 0,05 et une surface de 20 m², la
          conductivité hydraulique calculée est :
        </p>

        <p>
          <strong>
            K = 0,001 ÷ (0,05 × 20) = 0,001 m/s
          </strong>
        </p>

        <p>
          L'unité utilisée ici est le mètre par seconde (m/s).
        </p>
      </div>
    </div>
  );
}

export default ConductiviteHydraulique;
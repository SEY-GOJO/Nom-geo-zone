import { Link } from "react-router-dom";
import { useState } from "react";

function DebitDarcy() {
  const [conductivite, setConductivite] = useState("");
  const [gradient, setGradient] = useState("");
  const [surface, setSurface] = useState("");
  const [resultat, setResultat] = useState(null);

  const calculer = () => {
    const K = Number(conductivite);
    const i = Number(gradient);
    const A = Number(surface);

    if (
      !Number.isFinite(K) ||
      !Number.isFinite(i) ||
      !Number.isFinite(A) ||
      K <= 0 ||
      i < 0 ||
      A <= 0
    ) {
      return null;
    }

    const debit = K * i * A;

    return {
      conductivite: K,
      gradient: i,
      surface: A,
      debit,
    };
  };

  const resultatCalcule = calculer();

  const reinitialiser = () => {
    setConductivite("");
    setGradient("");
    setSurface("");
    setResultat(null);
  };

  const calculerResultat = () => {
    setResultat(resultatCalcule);
  };

  const champsComplets =
    conductivite !== "" &&
    gradient !== "" &&
    surface !== "";

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">💧</div>

        <h1>Débit de Darcy</h1>

        <p>
          Calcule le débit d'écoulement à travers un milieu poreux
          à partir de la conductivité hydraulique, du gradient
          hydraulique et de la surface traversée.
        </p>
      </div>

      <div className="card">
        <h2>💧 Calcul du débit</h2>

        <label htmlFor="darcy-conductivite">
          Conductivité hydraulique
        </label>

        <input
          className="search"
          id="darcy-conductivite"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 0.0001"
          value={conductivite}
          onChange={(e) => {
            setConductivite(e.target.value);
            setResultat(null);
          }}
        />

        <p>Unité : m/s</p>

        <label htmlFor="darcy-gradient">
          Gradient hydraulique
        </label>

        <input
          className="search"
          id="darcy-gradient"
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

        <label htmlFor="darcy-surface">
          Surface traversée
        </label>

        <input
          className="search"
          id="darcy-surface"
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
            onClick={calculerResultat}
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

            <p>Débit de Darcy</p>

            <h1>
              {resultat.debit.toExponential(4)} m³/s
            </h1>

            <p>
              Conductivité hydraulique :{" "}
              {resultat.conductivite} m/s
            </p>

            <p>
              Gradient hydraulique :{" "}
              {resultat.gradient}
            </p>

            <p>
              Surface traversée :{" "}
              {resultat.surface} m²
            </p>
          </div>
        ) : (
          champsComplets && (
            <p>
              Vérifie que la conductivité hydraulique et la surface
              sont supérieures à zéro et que le gradient est valide.
            </p>
          )
        )}
      </div>

      <div className="card">
        <h2>📚 Comprendre</h2>

        <p>
          La loi de Darcy permet de relier le débit d'écoulement
          dans un milieu poreux à la conductivité hydraulique,
          au gradient hydraulique et à la surface traversée.
        </p>

        <p>
          Le débit obtenu ici correspond au débit volumique
          traversant la section considérée.
        </p>

        <p>
          Exemple : avec une conductivité hydraulique de
          0,0001 m/s, un gradient de 0,05 et une surface de
          20 m², le débit calculé est :
        </p>

        <p>
          <strong>
            0,0001 × 0,05 × 20 = 0,0001 m³/s
          </strong>
        </p>

        <p>
          Le résultat peut ensuite être converti en litres par
          seconde pour faciliter son interprétation.
        </p>
      </div>
    </div>
  );
}

export default DebitDarcy;
import { Link } from "react-router-dom";
import { useState } from "react";

function Transmissivite() {
  const [conductivite, setConductivite] = useState("");
  const [epaisseur, setEpaisseur] = useState("");
  const [resultat, setResultat] = useState(null);

  const calculer = () => {
    const K = Number(conductivite);
    const b = Number(epaisseur);

    if (
      !Number.isFinite(K) ||
      !Number.isFinite(b) ||
      K <= 0 ||
      b <= 0
    ) {
      return null;
    }

    const transmissivite = K * b;

    return {
      conductivite: K,
      epaisseur: b,
      transmissivite,
    };
  };

  const calculerResultat = () => {
    setResultat(calculer());
  };

  const reinitialiser = () => {
    setConductivite("");
    setEpaisseur("");
    setResultat(null);
  };

  const champsComplets =
    conductivite !== "" && epaisseur !== "";

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">💧</div>

        <h1>Transmissivité hydraulique</h1>

        <p>
          Calcule la transmissivité d'un aquifère à partir de sa
          conductivité hydraulique et de son épaisseur saturée.
        </p>
      </div>

      <div className="card">
        <h2>💧 Calcul de la transmissivité</h2>

        <label htmlFor="transmissivite-conductivite">
          Conductivité hydraulique
        </label>

        <input
          className="search"
          id="transmissivite-conductivite"
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

        <label htmlFor="transmissivite-epaisseur">
          Épaisseur saturée de l'aquifère
        </label>

        <input
          className="search"
          id="transmissivite-epaisseur"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 20"
          value={epaisseur}
          onChange={(e) => {
            setEpaisseur(e.target.value);
            setResultat(null);
          }}
        />

        <p>Unité : m</p>

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

            <p>Transmissivité hydraulique</p>

            <h1>
              {resultat.transmissivite.toExponential(4)} m²/s
            </h1>

            <p>
              Conductivité hydraulique :{" "}
              {resultat.conductivite} m/s
            </p>

            <p>
              Épaisseur saturée :{" "}
              {resultat.epaisseur} m
            </p>
          </div>
        ) : (
          champsComplets && (
            <p>
              Vérifie que la conductivité hydraulique et
              l'épaisseur saturée sont supérieures à zéro.
            </p>
          )
        )}
      </div>

      <div className="card">
        <h2>📚 Comprendre</h2>

        <p>
          La transmissivité caractérise la capacité d'un aquifère
          à transmettre l'eau sur toute son épaisseur saturée.
        </p>

        <p>
          Elle dépend de deux paramètres principaux : la
          conductivité hydraulique du matériau et l'épaisseur
          saturée de l'aquifère.
        </p>

        <p>
          Exemple : pour une conductivité hydraulique de
          0,0001 m/s et une épaisseur saturée de 20 m :
        </p>

        <p>
          <strong>
            Transmissivité = 0,0001 × 20 = 0,002 m²/s
          </strong>
        </p>

        <p>
          Une transmissivité élevée indique, toutes choses égales
          par ailleurs, qu'une plus grande quantité d'eau peut
          traverser l'aquifère.
        </p>
      </div>
    </div>
  );
}

export default Transmissivite;
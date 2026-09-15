import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { calculerMetalRecupere } from "../utils/miningCalculations.js";

function Recuperation() {
  const [searchParams] = useSearchParams();

  const metalTransmis = searchParams.get("metal");

  const [metalContenu, setMetalContenu] = useState(
    metalTransmis || ""
  );

  const [recuperation, setRecuperation] = useState("");

  const resultat = calculerMetalRecupere(metalContenu, recuperation);

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">
          ♻️
        </div>

        <h1>
          Récupération métallurgique
        </h1>

        <p>
          Calcule la quantité théorique de métal récupérée à
          partir du métal contenu et d'un taux de récupération.
        </p>
      </div>

      <div className="card">
        <h2>
          ♻️ Calcul de la récupération
        </h2>

        <label htmlFor="recovery-metal">
          Métal contenu
        </label>

        <input
          className="search"
          id="recovery-metal"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 32"
          value={metalContenu}
          onChange={(e) =>
            setMetalContenu(e.target.value)
          }
        />

        <p>
          Unité : tonnes (t)
        </p>

        <label htmlFor="recovery-rate">
          Taux de récupération
        </label>

        <input
          className="search"
          id="recovery-rate"
          type="number"
          min="0"
          max="100"
          step="any"
          placeholder="Exemple : 85"
          value={recuperation}
          onChange={(e) =>
            setRecuperation(e.target.value)
          }
        />

        <p>
          Unité : %
        </p>

        {resultat !== null && (
          <>
            <div className="card">
              <h2>
                Résultat
              </h2>

              <p>
                Métal récupéré théorique
              </p>

              <h1>
                {resultat.recupere} t
              </h1>

              <p>
                Métal non récupéré :{" "}
                {resultat.nonRecupere} t
              </p>
            </div>

            <Link
              to={`/outils/dilution?metal=${resultat.recupere}`}
              className="hero-button primary"
            >
              Continuer vers la dilution →
            </Link>
          </>
        )}
      </div>

      <div className="card">
        <h2>
          📚 Comprendre
        </h2>

        <p>
          Le taux de récupération représente la proportion du
          métal contenu qui est récupérée par le procédé
          métallurgique considéré.
        </p>

        <p>
          Exemple : avec 32 t de métal contenu et un taux de
          récupération de 85 %, la quantité récupérée est de
          27,2 t.
        </p>

        <p>
          Le calcul présenté ici est théorique. Une récupération
          réelle dépend du minerai, du procédé de traitement et
          des performances de l'installation.
        </p>
      </div>
    </div>
  );
}

export default Recuperation;
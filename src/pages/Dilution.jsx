import { Link } from "react-router-dom";
import { useState } from "react";
import { calculerDilution } from "../utils/miningCalculations.js";

function Dilution() {
  const [tonnageMinerai, setTonnageMinerai] = useState("");
  const [tauxDilution, setTauxDilution] = useState("");
  const [teneurMinerai, setTeneurMinerai] = useState("");
  const [teneurSterile, setTeneurSterile] = useState("0");

  const resultat = calculerDilution({
    tonnageMinerai,
    teneurMinerai,
    teneurSterile,
    tauxDilution,
  });

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">
          ⛏️
        </div>

        <h1>
          Dilution minière
        </h1>

        <p>
          Étudie l'effet de l'ajout de stérile sur le tonnage
          extrait et la teneur du matériau miné.
        </p>
      </div>

      <div className="card">
        <h2>
          ⛏️ Calcul de dilution
        </h2>

        <label htmlFor="dilution-minerai">
          Tonnage du minerai
        </label>

        <input
          className="search"
          id="dilution-minerai"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 10000"
          value={tonnageMinerai}
          onChange={(e) =>
            setTonnageMinerai(e.target.value)
          }
        />

        <p>
          Unité : tonnes (t)
        </p>

        <label htmlFor="dilution-taux">
          Taux de dilution
        </label>

        <input
          className="search"
          id="dilution-taux"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 10"
          value={tauxDilution}
          onChange={(e) =>
            setTauxDilution(e.target.value)
          }
        />

        <p>
          Définition utilisée : stérile / minerai × 100.
        </p>

        <label htmlFor="dilution-teneur">
          Teneur du minerai
        </label>

        <input
          className="search"
          id="dilution-teneur"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 3.2"
          value={teneurMinerai}
          onChange={(e) =>
            setTeneurMinerai(e.target.value)
          }
        />

        <p>
          Unité : g/t
        </p>

        <label htmlFor="dilution-teneur-sterile">
          Teneur du stérile
        </label>

        <input
          className="search"
          id="dilution-teneur-sterile"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 0"
          value={teneurSterile}
          onChange={(e) =>
            setTeneurSterile(e.target.value)
          }
        />

        <p>
          Unité : g/t
        </p>

        {resultat !== null && (
          <div className="card">
            <h2>
              Résultats
            </h2>

            <p>
              Stérile ajouté
            </p>

            <h2>
              {resultat.tonnageSterile} t
            </h2>

            <p>
              Tonnage total après dilution
            </p>

            <h2>
              {resultat.tonnageTotal} t
            </h2>

            <p>
              Teneur après dilution
            </p>

            <h1>
              {resultat.teneurDiluee} g/t
            </h1>
          </div>
        )}
      </div>

      <div className="card">
        <h2>
          📚 Comprendre
        </h2>

        <p>
          La dilution correspond à l'introduction de matériau
          non économique ou de faible teneur dans le minerai
          extrait.
        </p>

        <p>
          Elle augmente le tonnage à extraire et à transporter
          tout en pouvant réduire la teneur moyenne du matériau
          envoyé au traitement.
        </p>

        <p>
          La teneur du stérile est prise en compte dans ce
          calcul afin de représenter aussi le cas où le matériau
          de dilution possède une faible teneur résiduelle.
        </p>

        <p>
          Cet outil est un modèle pédagogique simplifié. Les
          calculs réels de dilution dépendent du gisement, de la
          méthode d'exploitation, des pertes et des données de
          contrôle de production.
        </p>
      </div>
    </div>
  );
}

export default Dilution;
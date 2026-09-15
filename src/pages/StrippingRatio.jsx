import { Link } from "react-router-dom";
import { useState } from "react";
import { calculerStrippingRatio } from "../utils/miningCalculations.js";

function StrippingRatio() {
  const [tonnageSterile, setTonnageSterile] = useState("");
  const [tonnageMinerai, setTonnageMinerai] = useState("");

  const ratio = calculerStrippingRatio(tonnageMinerai, tonnageSterile);

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
          Stripping Ratio
        </h1>

        <p>
          Calcule le rapport entre le stérile à extraire et le
          minerai exploité dans une exploitation à ciel ouvert.
        </p>
      </div>

      <div className="card">
        <h2>
          ⛏️ Calcul du Stripping Ratio
        </h2>

        <label htmlFor="stripping-sterile">
          Tonnage du stérile
        </label>

        <input
          className="search"
          id="stripping-sterile"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 50000"
          value={tonnageSterile}
          onChange={(e) =>
            setTonnageSterile(e.target.value)
          }
        />

        <p>
          Unité : tonnes (t)
        </p>

        <label htmlFor="stripping-ore">
          Tonnage du minerai
        </label>

        <input
          className="search"
          id="stripping-ore"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 25000"
          value={tonnageMinerai}
          onChange={(e) =>
            setTonnageMinerai(e.target.value)
          }
        />

        <p>
          Unité : tonnes (t)
        </p>

        {ratio !== null && (
          <div className="card">
            <h2>
              Résultat
            </h2>

            <p>
              Stripping Ratio
            </p>

            <h1>
              {ratio.toFixed(3)}
            </h1>

            <p>
              Rapport : {ratio.toFixed(3)} : 1
            </p>
          </div>
        )}
      </div>

      <div className="card">
        <h2>
          📚 Comprendre
        </h2>

        <p>
          Le Stripping Ratio exprime la quantité de stérile
          associée à une unité de minerai selon la définition
          utilisée dans cet outil.
        </p>

        <p>
          Exemple : 50 000 t de stérile pour 25 000 t de minerai
          donnent un Stripping Ratio de 2:1.
        </p>

        <p>
          Cela signifie que, dans cet exemple, 2 tonnes de
          stérile sont associées à chaque tonne de minerai.
        </p>

        <p>
          La convention peut varier selon les études et les
          données utilisées. GEO ZONE indique donc explicitement
          la définition retenue pour éviter toute ambiguïté.
        </p>
      </div>
    </div>
  );
}

export default StrippingRatio;
import { Link } from "react-router-dom";
import { useState } from "react";

function Pente() {
  const [mode, setMode] = useState("pourcentage");
  const [valeur, setValeur] = useState("");

  const calculer = () => {
    if (valeur === "") {
      return null;
    }

    const nombre = Number(valeur);

    if (!Number.isFinite(nombre) || nombre < 0) {
      return null;
    }

    if (mode === "pourcentage") {
      const angle = (Math.atan(nombre / 100) * 180) / Math.PI;

      return {
        type: "angle",
        valeur: angle,
      };
    }

    if (nombre > 90) {
      return null;
    }

    const pente = Math.tan(
      (nombre * Math.PI) / 180
    ) * 100;

    return {
      type: "pourcentage",
      valeur: pente,
    };
  };

  const resultat = calculer();

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">
          📐
        </div>

        <h1>
          Calculateur de pente
        </h1>

        <p>
          Convertis une pente exprimée en pourcentage en angle
          et inversement.
        </p>
      </div>

      <div className="card">
        <h2>
          📐 Conversion de pente
        </h2>

        <label htmlFor="pente-mode">
          Type de conversion
        </label>

        <select
          id="pente-mode"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            setValeur("");
          }}
        >
          <option value="pourcentage">
            Pente (%) → Angle (°)
          </option>

          <option value="angle">
            Angle (°) → Pente (%)
          </option>
        </select>

        <label htmlFor="pente-valeur">
          Valeur
        </label>

        <input
          className="search"
          id="pente-valeur"
          type="number"
          min="0"
          step="any"
          max={mode === "angle" ? "90" : undefined}
          placeholder={
            mode === "pourcentage"
              ? "Exemple : 50"
              : "Exemple : 26.565"
          }
          value={valeur}
          onChange={(e) => setValeur(e.target.value)}
        />

        <p>
          {mode === "pourcentage"
            ? "Unité : %"
            : "Unité : °"}
        </p>

        {resultat !== null ? (
          <div className="card">
            <h2>
              Résultat
            </h2>

            {resultat.type === "angle" ? (
              <>
                <p>
                  Angle correspondant
                </p>

                <h1>
                  {resultat.valeur.toFixed(3)}°
                </h1>
              </>
            ) : (
              <>
                <p>
                  Pente correspondante
                </p>

                <h1>
                  {resultat.valeur.toFixed(3)} %
                </h1>
              </>
            )}
          </div>
        ) : (
          valeur !== "" && (
            <p>
              Valeur invalide. L'angle doit être compris entre
              0° et 90°.
            </p>
          )
        )}
      </div>

      <div className="card">
        <h2>
          📚 Comprendre
        </h2>

        <p>
          Une pente exprimée en pourcentage correspond au
          rapport entre le dénivelé vertical et la distance
          horizontale, multiplié par 100.
        </p>

        <p>
          Pour convertir un angle en pente, on utilise la
          tangente de l'angle.
        </p>

        <p>
          Exemple : un angle de 45° correspond à une pente
          de 100 %.
        </p>

        <p>
          Cet outil peut être utilisé pour l'étude du relief,
          des talus et de certains travaux de terrain.
        </p>
      </div>
    </div>
  );
}

export default Pente;
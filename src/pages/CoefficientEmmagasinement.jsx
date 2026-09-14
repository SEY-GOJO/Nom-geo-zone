import { Link } from "react-router-dom";
import { useState } from "react";

function CoefficientEmmagasinement() {
  const [volumeEau, setVolumeEau] = useState("");
  const [volumeAquifere, setVolumeAquifere] = useState("");
  const [resultat, setResultat] = useState(null);

  const calculer = () => {
    const eau = Number(volumeEau);
    const aquifere = Number(volumeAquifere);

    if (
      !Number.isFinite(eau) ||
      !Number.isFinite(aquifere) ||
      eau < 0 ||
      aquifere <= 0 ||
      eau > aquifere
    ) {
      return null;
    }

    const coefficient = eau / aquifere;

    return {
      volumeEau: eau,
      volumeAquifere: aquifere,
      coefficient,
      pourcentage: coefficient * 100,
    };
  };

  const calculerResultat = () => {
    setResultat(calculer());
  };

  const reinitialiser = () => {
    setVolumeEau("");
    setVolumeAquifere("");
    setResultat(null);
  };

  const champsComplets =
    volumeEau !== "" && volumeAquifere !== "";

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">💧</div>

        <h1>Coefficient d'emmagasinement</h1>

        <p>
          Calcule le rapport entre un volume d'eau libéré ou
          stocké et le volume de référence de l'aquifère.
        </p>
      </div>

      <div className="card">
        <h2>💧 Calcul du coefficient</h2>

        <label htmlFor="emmagasinement-eau">
          Volume d'eau libéré ou stocké
        </label>

        <input
          className="search"
          id="emmagasinement-eau"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 50"
          value={volumeEau}
          onChange={(e) => {
            setVolumeEau(e.target.value);
            setResultat(null);
          }}
        />

        <p>Unité : m³</p>

        <label htmlFor="emmagasinement-aquifere">
          Volume de référence de l'aquifère
        </label>

        <input
          className="search"
          id="emmagasinement-aquifere"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 10000"
          value={volumeAquifere}
          onChange={(e) => {
            setVolumeAquifere(e.target.value);
            setResultat(null);
          }}
        />

        <p>Unité : m³</p>

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

            <p>Coefficient d'emmagasinement</p>

            <h1>
              {resultat.coefficient.toFixed(6)}
            </h1>

            <p>
              Soit{" "}
              <strong>
                {resultat.pourcentage.toFixed(3)} %
              </strong>
            </p>

            <p>
              Volume d'eau : {resultat.volumeEau} m³
            </p>

            <p>
              Volume de référence :{" "}
              {resultat.volumeAquifere} m³
            </p>
          </div>
        ) : (
          champsComplets && (
            <p>
              Vérifie que les volumes sont positifs et que le
              volume d'eau ne dépasse pas le volume de référence.
            </p>
          )
        )}
      </div>

      <div className="card">
        <h2>📚 Comprendre</h2>

        <p>
          Le coefficient d'emmagasinement est un rapport sans
          dimension utilisé en hydrogéologie pour caractériser
          la quantité d'eau qu'un aquifère peut libérer ou stocker
          en fonction d'une variation de charge hydraulique.
        </p>

        <p>
          Dans les aquifères captifs, ce coefficient est généralement
          associé aux phénomènes d'élasticité de l'eau et de
          l'aquifère. Dans les aquifères libres, le drainage
          gravitaire de la zone saturée joue également un rôle.
        </p>

        <p>
          Le calculateur proposé ici utilise une relation
          pédagogique simplifiée sous forme de rapport entre
          deux volumes.
        </p>

        <p>
          Exemple : pour 50 m³ d'eau rapportés à 10 000 m³ :
        </p>

        <p>
          <strong>
            50 ÷ 10 000 = 0,005
          </strong>
        </p>

        <p>
          Le résultat peut également être exprimé en pourcentage :
          <strong> 0,5 %</strong>.
        </p>
      </div>
    </div>
  );
}

export default CoefficientEmmagasinement;
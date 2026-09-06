import { Link } from "react-router-dom";

function Drilling() {
  return (
    <div className="container">
      <Link to="/mining" className="back-link">
        ← Retour au Mining
      </Link>

      <div className="welcome">
        <div className="module-icon">
          🕳️
        </div>

        <h1>
          Drilling
        </h1>

        <p>
          Découvre les principes du forage minier, les équipements
          et les principaux paramètres utilisés sur le terrain.
        </p>
      </div>

      <div className="card">
        <h2>
          🧭 Introduction au forage
        </h2>

        <p>
          Le forage est une opération essentielle dans l'exploration
          et l'exploitation minières. Il permet notamment de réaliser
          des reconnaissances du sous-sol et de préparer certaines
          opérations d'exploitation et de fragmentation du massif rocheux.
        </p>
      </div>

      <div className="modules">

        <div className="card">
          <div className="module-icon">
            🛠️
          </div>

          <h2>
            Équipements de forage
          </h2>

          <p>
            Découvre les principales familles de machines et d'outils
            utilisés dans les différents travaux de forage.
          </p>

          <div className="lesson-takeaway">
            <strong>À retenir</strong>
            <p>
              Une foreuse, un mât, une tête de forage et un système
              d'évacuation des déblais forment l'ensemble de base.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="module-icon">
            📐
          </div>

          <h2>
            Paramètres de forage
          </h2>

          <p>
            Étudie les paramètres géométriques et techniques qui
            caractérisent un forage.
          </p>

          <div className="lesson-takeaway">
            <strong>Paramètres clés</strong>
            <p>
              Le diamètre, la profondeur, l'inclinaison, la vitesse
              de rotation et la pression influencent le résultat.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="module-icon">
            ⛰️
          </div>

          <h2>
            Forage et massif rocheux
          </h2>

          <p>
            Comprends comment les propriétés du massif rocheux
            influencent les opérations de forage.
          </p>

          <div className="lesson-takeaway">
            <strong>Point important</strong>
            <p>
              La résistance, la fracturation et l'abrasivité de la
              roche conditionnent le choix des outils et du procédé.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Drilling;
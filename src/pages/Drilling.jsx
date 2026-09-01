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

          <button className="disabled-button">
            Bientôt disponible
          </button>
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

          <button className="disabled-button">
            Bientôt disponible
          </button>
        </div>

        <div className="card">
          <div className="module-icon">
            🪨
          </div>

          <h2>
            Forage et massif rocheux
          </h2>

          <p>
            Comprends comment les propriétés du massif rocheux
            influencent les opérations de forage.
          </p>

          <button className="disabled-button">
            Bientôt disponible
          </button>
        </div>

      </div>
    </div>
  );
}

export default Drilling;
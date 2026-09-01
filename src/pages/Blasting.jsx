import { Link } from "react-router-dom";

function Blasting() {
  return (
    <div className="container">
      <Link to="/mining" className="back-link">
        ← Retour au Mining
      </Link>

      <div className="welcome">
        <div className="module-icon">
          💥
        </div>

        <h1>
          Blasting
        </h1>

        <p>
          Découvre les principes généraux du tir de mines,
          de la fragmentation du massif rocheux et du contrôle
          des opérations de blasting.
        </p>
      </div>

      <div className="card">
        <h2>
          💥 Introduction au blasting
        </h2>

        <p>
          Le blasting est une opération de fragmentation contrôlée
          du massif rocheux réalisée dans le cadre de certaines
          exploitations minières et carrières.
        </p>

        <p>
          GEO ZONE présentera progressivement les notions
          fondamentales, les paramètres de conception, le contrôle
          de la fragmentation et les bonnes pratiques de sécurité.
        </p>
      </div>

      <div className="modules">

        <div className="card">
          <div className="module-icon">
            📐
          </div>

          <h2>
            Paramètres de tir
          </h2>

          <p>
            Découvre les principaux paramètres géométriques utilisés
            pour caractériser une configuration de tir.
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
            Fragmentation
          </h2>

          <p>
            Comprends les principaux facteurs qui influencent
            la fragmentation du massif rocheux.
          </p>

          <button className="disabled-button">
            Bientôt disponible
          </button>
        </div>

        <div className="card">
          <div className="module-icon">
            📊
          </div>

          <h2>
            Analyse des résultats
          </h2>

          <p>
            Étudie les indicateurs permettant d'évaluer la qualité
            d'une opération de fragmentation.
          </p>

          <button className="disabled-button">
            Bientôt disponible
          </button>
        </div>

        <div className="card">
          <div className="module-icon">
            🦺
          </div>

          <h2>
            Sécurité
          </h2>

          <p>
            Découvre les principes généraux de sécurité associés
            aux opérations de tir de mines.
          </p>

          <button className="disabled-button">
            Bientôt disponible
          </button>
        </div>

      </div>
    </div>
  );
}

export default Blasting;
import { Link } from "react-router-dom";

function ExplorationMiniere() {
  return (
    <div className="container">
      <Link to="/mining" className="back-link">
        ← Retour au Mining
      </Link>

      <div className="welcome">
        <div className="module-icon">
          🌍
        </div>

        <h1>
          Exploration minière
        </h1>

        <p>
          Découvre les principales méthodes utilisées pour
          rechercher, identifier et évaluer les ressources
          minérales.
        </p>
      </div>

      <div className="card">
        <h2>
          🌍 Introduction à l'exploration minière
        </h2>

        <p>
          L'exploration minière regroupe l'ensemble des méthodes
          permettant de rechercher des concentrations de minerais,
          de déterminer leur extension et d'évaluer leur potentiel.
        </p>

        <p>
          Elle fait intervenir notamment la géologie, la
          géochimie, la géophysique, la télédétection et les
          travaux de terrain.
        </p>
      </div>

      <div className="modules">

        <div className="card">
          <div className="module-icon">
            🗺️
          </div>

          <h2>
            Cartographie géologique
          </h2>

          <p>
            Découvre comment observer, décrire et cartographier
            les formations géologiques afin de mieux comprendre
            le contexte d'un secteur.
          </p>

          <button className="disabled-button">
            Bientôt disponible
          </button>
        </div>

        <div className="card">
          <div className="module-icon">
            🧪
          </div>

          <h2>
            Exploration géochimique
          </h2>

          <p>
            Découvre l'utilisation des analyses géochimiques
            pour rechercher des anomalies associées à certains
            gisements.
          </p>

          <button className="disabled-button">
            Bientôt disponible
          </button>
        </div>

        <div className="card">
          <div className="module-icon">
            📡
          </div>

          <h2>
            Exploration géophysique
          </h2>

          <p>
            Découvre les méthodes géophysiques utilisées pour
            étudier les propriétés du sous-sol.
          </p>

          <button className="disabled-button">
            Bientôt disponible
          </button>
        </div>

        <div className="card">
          <div className="module-icon">
            🕳️
          </div>

          <h2>
            Sondage et forage d'exploration
          </h2>

          <p>
            Comprends le rôle des sondages et des forages dans
            la reconnaissance directe du sous-sol et l'évaluation
            d'un gisement.
          </p>

          <button className="disabled-button">
            Bientôt disponible
          </button>
        </div>

      </div>

      <div className="card">
        <h2>
          📚 Notions à retenir
        </h2>

        <p>
          L'exploration minière commence généralement par
          l'identification d'un contexte géologique favorable,
          puis utilise différentes méthodes de reconnaissance
          pour réduire progressivement l'incertitude sur le
          potentiel du secteur étudié.
        </p>
      </div>
    </div>
  );
}

export default ExplorationMiniere;
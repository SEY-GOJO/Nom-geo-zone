import { Link } from "react-router-dom";

function MinePlanning() {
  return (
    <div className="container">
      <Link to="/mining" className="back-link">
        ← Retour au Mining
      </Link>

      <div className="welcome">
        <div className="module-icon">
          📊
        </div>

        <h1>
          Mine Planning
        </h1>

        <p>
          Découvre les principes de planification, d'organisation
          et d'optimisation d'une exploitation minière.
        </p>
      </div>

      <div className="card">
        <h2>
          📊 Introduction au Mine Planning
        </h2>

        <p>
          Le Mine Planning consiste à organiser dans le temps
          et dans l'espace les différentes opérations d'une
          exploitation minière afin d'assurer une production
          efficace et cohérente avec les objectifs du projet.
        </p>

        <p>
          La planification prend notamment en compte le gisement,
          les équipements, les contraintes géologiques, les
          capacités de production et les objectifs économiques.
        </p>
      </div>

      <div className="modules">

        <div className="card">
          <div className="module-icon">
            🗺️
          </div>

          <h2>
            Planification minière
          </h2>

          <p>
            Découvre les différents niveaux de planification
            utilisés dans une exploitation minière.
          </p>

          <button className="disabled-button">
            Bientôt disponible
          </button>
        </div>

        <div className="card">
          <div className="module-icon">
            ⏱️
          </div>

          <h2>
            Planification à court terme
          </h2>

          <p>
            Découvre comment organiser les opérations minières
            sur une période de courte durée.
          </p>

          <button className="disabled-button">
            Bientôt disponible
          </button>
        </div>

        <div className="card">
          <div className="module-icon">
            📅
          </div>

          <h2>
            Planification à moyen et long terme
          </h2>

          <p>
            Comprends les principes permettant de planifier
            l'évolution d'une exploitation sur plusieurs années.
          </p>

          <button className="disabled-button">
            Bientôt disponible
          </button>
        </div>

        <div className="card">
          <div className="module-icon">
            💰
          </div>

          <h2>
            Optimisation
          </h2>

          <p>
            Découvre les principaux facteurs pris en compte
            pour améliorer les performances d'une exploitation.
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
          Le Mine Planning permet de déterminer quand, où et
          comment extraire les matériaux en tenant compte des
          contraintes techniques, géologiques et économiques
          de l'exploitation.
        </p>
      </div>
    </div>
  );
}

export default MinePlanning;
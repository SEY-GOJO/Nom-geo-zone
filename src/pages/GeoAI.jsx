import { Link } from "react-router-dom";

function GeoAI() {
  return (
    <div className="container geoai-page">

      <Link to="/" className="back-link">
        ← Retour à l'accueil
      </Link>

      <div className="geoai-hero">

        <div className="geoai-icon">
          🤖
        </div>

        <span className="geoai-badge">
          INTELLIGENCE GÉOLOGIQUE
        </span>

        <h1>
          GEO AI
        </h1>

        <p>
          Ton assistant intelligent spécialisé en géologie,
          mines et sciences de la Terre.
        </p>

      </div>

      <div className="card geoai-question">

        <div className="geoai-question-header">

          <div className="geoai-small-icon">
            💬
          </div>

          <div>
            <h2>
              Pose ta question
            </h2>

            <p>
              Demande une explication et approfondis tes
              connaissances avec GEO AI.
            </p>
          </div>

        </div>

        <textarea
          placeholder="Exemple : Qu'est-ce qu'une roche métamorphique ?"
          rows="6"
        />

        <div className="geoai-action">

          <span>
            🌍 Géologie • ⛏️ Mines • 📚 Formation
          </span>

          <button>
            🤖 Poser la question
          </button>

        </div>

      </div>

      <div className="welcome geoai-section-title">

        <h2>
          Que peux-tu demander à GEO AI ?
        </h2>

        <p>
          Explore différents domaines et obtiens des explications
          adaptées à ton apprentissage.
        </p>

      </div>

      <div className="modules">

        <div className="card geoai-topic-card">

          <div className="module-icon">
            🪨
          </div>

          <h2>
            Géologie
          </h2>

          <p>
            Pose des questions sur les roches, minéraux,
            structures, processus géologiques et sciences
            de la Terre.
          </p>

          <span className="geoai-topic-label">
            Roches • Minéraux • Géologie
          </span>

        </div>

        <div className="card geoai-topic-card">

          <div className="module-icon">
            ⛏️
          </div>

          <h2>
            Mining
          </h2>

          <p>
            Explore les notions liées à l'exploration,
            l'exploitation, le drilling, le blasting et
            la planification minière.
          </p>

          <span className="geoai-topic-label">
            Exploration • Mining • Drilling
          </span>

        </div>

        <div className="card geoai-topic-card">

          <div className="module-icon">
            📚
          </div>

          <h2>
            Cours
          </h2>

          <p>
            Utilise les contenus de GEO ZONE pour approfondir
            tes cours et réviser plus efficacement.
          </p>

          <span className="geoai-topic-label">
            Cours • Révision • Apprentissage
          </span>

        </div>

      </div>

      <div className="geoai-info">

        <div className="geoai-info-icon">
          💡
        </div>

        <div>
          <h3>
            Un assistant pensé pour les géologues
          </h3>

          <p>
            GEO AI est conçu pour t'aider à comprendre les
            concepts, clarifier les notions difficiles et
            approfondir tes connaissances.
          </p>
        </div>

      </div>

    </div>
  );
}

export default GeoAI;
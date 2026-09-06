import { Link } from "react-router-dom";
import { useState } from "react";

function GeoAI() {
  const [question, setQuestion] = useState("");
  const [reponse, setReponse] = useState("");

  const poserQuestion = (event) => {
    event.preventDefault();

    const questionNettoyee = question.trim();

    if (!questionNettoyee) {
      setReponse("Écris une question pour commencer.");
      return;
    }

    setReponse(
      `Ta question a bien été enregistrée : « ${questionNettoyee} ». ` +
        "Le service de réponse GEO AI sera bientôt connecté à la plateforme."
    );
  };

  const domaines = [
    {
      icon: "⛰️",
      titre: "Géologie",
      description:
        "Pose des questions sur les roches, minéraux, structures, processus géologiques et sciences de la Terre.",
      label: "Roches • Minéraux • Géologie",
    },
    {
      icon: "⛏️",
      titre: "Mining",
      description:
        "Explore les notions liées à l'exploration, l'exploitation, le drilling et la planification minière.",
      label: "Exploration • Mining • Drilling",
    },
    {
      icon: "📚",
      titre: "Cours",
      description:
        "Utilise les contenus de GEO ZONE pour approfondir tes cours et réviser plus efficacement.",
      label: "Cours • Révision • Apprentissage",
    },
    {
      icon: "🧭",
      titre: "Sciences de la Terre",
      description:
        "Approfondis les phénomènes et grands concepts liés au fonctionnement de la Terre.",
      label: "Terre • Processus • Compréhension",
    },
  ];

  return (
    <div className="container geoai-page">
      <Link to="/" className="back-link">
        ← Accueil
      </Link>

      <section className="geoai-hero">
        <div className="geoai-icon">🤖</div>

        <div className="geoai-hero-content">
          <span className="geoai-badge">
            INTELLIGENCE GÉOLOGIQUE
          </span>

          <h1>GEO AI</h1>

          <p>
            Ton assistant intelligent spécialisé en géologie,
            mines et sciences de la Terre.
          </p>
        </div>
      </section>

      <section className="geoai-question">
        <div className="geoai-question-header">
          <div className="geoai-small-icon">💬</div>

          <div>
            <span className="geoai-question-label">
              ASSISTANT
            </span>

            <h2>Pose ta question</h2>

            <p>
              Demande une explication et approfondis tes
              connaissances avec GEO AI.
            </p>
          </div>
        </div>

        <form onSubmit={poserQuestion}>
          <label htmlFor="geoai-question" className="sr-only">
            Ta question
          </label>

          <textarea
            id="geoai-question"
            placeholder="Exemple : Qu'est-ce qu'une roche métamorphique ?"
            rows="5"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />

          <div className="geoai-action">
            <span>🌍 Géologie • ⛏️ Mines • 📚 Formation</span>

            <button type="submit" disabled={!question.trim()}>
              🤖 Poser la question
            </button>
          </div>
        </form>

        {reponse && (
          <div className="card" role="status" aria-live="polite">
            <h3>Réponse GEO AI</h3>
            <p>{reponse}</p>
          </div>
        )}
      </section>

      <section className="geoai-section">
        <div className="geoai-section-heading">
          <div>
            <span>EXPLORE GEO AI</span>
            <h2>Que peux-tu demander ?</h2>
          </div>

          <p>
            Choisis un domaine pour orienter ton apprentissage.
          </p>
        </div>

        <div className="geoai-grid">
          {domaines.map((domaine, index) => (
            <div
              className="geoai-topic-card"
              key={domaine.titre}
            >
              <div className="geoai-topic-top">
                <div className="geoai-topic-icon">
                  {domaine.icon}
                </div>

                <span className="geoai-topic-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="geoai-topic-content">
                <h3>{domaine.titre}</h3>

                <p>{domaine.description}</p>
              </div>

              <span className="geoai-topic-label">
                {domaine.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="geoai-info">
        <div className="geoai-info-icon">💡</div>

        <div>
          <span className="geoai-info-label">
            À PROPOS DE GEO AI
          </span>

          <h3>
            Un assistant pensé pour les géologues
          </h3>

          <p>
            GEO AI est conçu pour t'aider à comprendre les
            concepts, clarifier les notions difficiles et
            approfondir tes connaissances.
          </p>
        </div>
      </section>
    </div>
  );
}

export default GeoAI;
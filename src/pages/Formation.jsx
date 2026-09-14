import { Link } from "react-router-dom";

function Formation() {
  const formations = [
    {
      icon: "📚",
      titre: "Cours interactifs",
      description:
        "Apprends les notions essentielles de géologie à travers des cours structurés.",
      link: "/bibliotheque",
      disponible: true,
      action: "Accéder",
    },
    {
  icon: "📝",
  titre: "Quiz",
  description:
    "Teste tes connaissances avec des questions adaptées aux différentes matières.",
  link: "/quiz",
  disponible: true,
  action: "Commencer",
},
    {
      icon: "🧠",
      titre: "Révision",
      description:
        "Révise les notions importantes avant tes examens et évaluations.",
      link: null,
      disponible: false,
      action: "Bientôt disponible",
    },
    {
      icon: "🎯",
      titre: "Évaluation",
      description:
        "Évalue ton niveau et identifie les notions à approfondir.",
      link: null,
      disponible: false,
      action: "Bientôt disponible",
    },
    {
      icon: "📈",
      titre: "Progression",
      description:
        "Suis ton évolution et ton avancement dans ton apprentissage.",
      link: "/progression",
      disponible: true,
      action: "Voir ma progression",
    },
    {
      icon: "🏆",
      titre: "Défis géologiques",
      description:
        "Relève des défis pour mettre tes connaissances à l'épreuve.",
      link: null,
      disponible: false,
      action: "Bientôt disponible",
    },
  ];

  return (
    <div className="container formation-page">
      <Link to="/" className="back-link">
        ← Accueil
      </Link>

      <section className="formation-hero">
        <div className="formation-hero-icon">🎓</div>

        <div className="formation-hero-content">
          <span>ESPACE D'APPRENTISSAGE</span>

          <h1>Formation</h1>

          <p>
            Apprends, révise et teste tes connaissances en géologie
            et en sciences de la Terre.
          </p>
        </div>
      </section>

      <section className="formation-intro">
        <div className="formation-intro-icon">🚀</div>

        <div>
          <span>APPRENDS À TON RYTHME</span>

          <h2>Ton espace d'apprentissage</h2>

          <p>
            GEO ZONE rassemble progressivement plusieurs outils
            pour progresser, renforcer tes connaissances et mieux
            te préparer à tes études.
          </p>
        </div>
      </section>

      <section className="formation-section">
        <div className="formation-section-heading">
          <div>
            <span>EXPLORE LA FORMATION</span>

            <h2>Choisis une activité</h2>
          </div>

          <p>
            Commence par les activités actuellement disponibles.
          </p>
        </div>

        <div className="formation-grid">
          {formations.map((formation, index) => {
            const contenu = (
              <>
                <div className="formation-card-top">
                  <div className="formation-card-icon">
                    {formation.icon}
                  </div>

                  <span className="formation-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="formation-card-content">
                  <h3>{formation.titre}</h3>

                  <p>{formation.description}</p>
                </div>

                <div className="formation-card-footer">
                  {formation.disponible ? (
                    <span className="formation-action">
                      {formation.action}
                      <span>→</span>
                    </span>
                  ) : (
                    <span className="formation-coming">
                      {formation.action}
                    </span>
                  )}
                </div>
              </>
            );

            if (formation.disponible) {
              return (
                <Link
                  key={formation.titre}
                  to={formation.link}
                  className="formation-card"
                >
                  {contenu}
                </Link>
              );
            }

            return (
              <div
                key={formation.titre}
                className="formation-card formation-card-disabled"
              >
                {contenu}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Formation;
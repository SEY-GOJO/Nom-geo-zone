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
    "Entraîne-toi dans la matière de ton choix avec une correction après chaque réponse.",
  link: "/quiz",
  disponible: true,
  action: "Commencer",
},
    {
  icon: "🧠",
  titre: "Révision",
  description:
    "Retrouve une notion dans les chapitres et révise avec des cartes mémoire.",
  link: "/revision",
  disponible: true,
  action: "Réviser",
},
    {
  icon: "🎯",
  titre: "Évaluation",
  description:
    "Fais un diagnostic transversal et repère les matières à retravailler.",
  link: "/evaluation",
  disponible: true,
  action: "Commencer",
},
    {
      icon: "📈",
      titre: "Progression",
      description:
        "Suis tes cours terminés et reprends là où tu t'es arrêté.",
      link: "/progression",
      disponible: true,
      action: "Voir ma progression",
    },
    {
      icon: "🏆",
      titre: "Défis géologiques",
      description:
        "Relève des défis pour mettre tes connaissances à l'épreuve.",
      link: "/defis-geologiques",
      disponible: true,
      action: "Jouer",
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
            Apprends avec les cours, entraîne-toi avec les quiz et
            les défis, puis retrouve tes résultats dans ta progression.
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
            Choisis une activité pour apprendre, réviser et relever des défis.
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
import { Link } from "react-router-dom";

function Formation() {
  const formations = [
    {
      icon: "📚",
      titre: "Cours interactifs",
      description:
        "Apprends les notions essentielles de géologie à travers des cours structurés.",
    },
    {
      icon: "📝",
      titre: "Quiz",
      description:
        "Teste tes connaissances avec des questions adaptées aux différentes matières.",
    },
    {
      icon: "🧠",
      titre: "Révision",
      description:
        "Révise les notions importantes avant tes examens et évaluations.",
    },
    {
      icon: "🎯",
      titre: "Évaluation",
      description:
        "Évalue ton niveau et identifie les notions que tu dois encore approfondir.",
    },
    {
      icon: "📈",
      titre: "Progression",
      description:
        "Suis ton évolution et ton avancement dans ton apprentissage.",
    },
    {
      icon: "🏆",
      titre: "Défis géologiques",
      description:
        "Relève des défis pour mettre tes connaissances à l'épreuve.",
    },
  ];

  return (
    <div className="container">
      <Link to="/" className="back-link">
        ← Retour à l'accueil
      </Link>

      <div className="welcome">
        <h1>🎓 Formation</h1>

        <p>
          Apprends, révise et teste tes connaissances en géologie
          et en sciences de la Terre.
        </p>
      </div>

      <div className="card">
        <h2>🚀 Ton espace d'apprentissage</h2>

        <p>
          GEO ZONE te propose plusieurs outils pour progresser,
          renforcer tes connaissances et mieux te préparer à tes
          études en géologie et dans le domaine minier.
        </p>
      </div>

      <div className="modules">
        {formations.map((formation) => (
          <div className="card" key={formation.titre}>
            <div className="module-icon">
              {formation.icon}
            </div>

            <h2>{formation.titre}</h2>

            <p>{formation.description}</p>

            <button className="disabled-button">
              Bientôt disponible
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Formation;
import { Link } from "react-router-dom";

function Mining() {
  const domaines = [
  {
  icon: "🌍",
  titre: "Exploration minière",
  description:
    "Découvre les principales méthodes utilisées pour rechercher et évaluer les ressources minérales.",
  link: "/mining/exploration",
},
 {
  icon: "⛏️",
  titre: "Exploitation minière",
  description:
    "Comprends les différentes méthodes d'exploitation des gisements.",
  link: "/mining/exploitation",
},
  {
    icon: "🕳️",
    titre: "Drilling",
    description:
      "Découvre les principes du forage, les équipements et les paramètres de forage.",
    link: "/mining/drilling",
  },
  {
    icon: "💥",
    titre: "Blasting",
    description:
      "Comprends les principes du tir de mines, du dimensionnement et du contrôle du massif rocheux.",
    link: "/mining/blasting",
  },
  {
    icon: "🚜",
    titre: "Chargement & transport",
    description:
      "Découvre les équipements et les principes du cycle de chargement et de transport.",
    link: "/mining/chargement-transport",
  },
  {
  icon: "📊",
  titre: "Mine Planning",
  description:
    "Découvre les principes de planification et d'organisation d'une exploitation minière.",
  link: "/mining/mine-planning",
},
];

  return (
    <div className="container mining-page">
      <Link to="/" className="back-link">
        ← Retour à l'accueil
      </Link>

      <div className="mining-hero">
        <div className="mining-icon">
          ⛏️
        </div>

        <span className="mining-badge">
          MINING &amp; MINE ENGINEERING
        </span>

        <h1>
          Mining
        </h1>

        <p>
          Explore les différents domaines de l'exploitation
          minière et développe tes connaissances dans le secteur
          des mines.
        </p>
      </div>

      <div className="card mining-intro">
        <div className="mining-intro-icon">
          🌍
        </div>

        <div>
          <h2>
            Découvre le monde minier
          </h2>

          <p>
            De l'exploration à la planification minière, GEO ZONE
            rassemble progressivement les notions essentielles
            pour comprendre le fonctionnement d'une exploitation
            minière.
          </p>
        </div>
      </div>

      <div className="welcome mining-section-title">
        <h2>
          Les domaines du Mining
        </h2>

        <p>
          Sélectionne un domaine pour découvrir ses concepts,
          méthodes et applications.
        </p>
      </div>

      <div className="modules">
        {domaines.map((domaine) => (
  <div
    className="card mining-card"
    key={domaine.titre}
  >
    <div className="module-icon">
      {domaine.icon}
    </div>

    <h2>
      {domaine.titre}
    </h2>

    <p>
      {domaine.description}
    </p>

    {domaine.link ? (
      <Link to={domaine.link}>
        <button>
          Explorer →
        </button>
      </Link>
    ) : (
      <button className="disabled-button">
        Bientôt disponible
      </button>
    )}
  </div>
))}
      </div>

      <div className="mining-info">
        <div className="mining-info-icon">
          💡
        </div>

        <div>
          <h3>
            Une approche progressive
          </h3>

          <p>
            GEO ZONE développera progressivement chaque domaine
            avec des cours, des explications, des exercices et
            des ressources spécialisées.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Mining;
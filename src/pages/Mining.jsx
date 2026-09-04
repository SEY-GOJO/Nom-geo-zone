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
        "Comprends les principes du tir de mines et du contrôle du massif rocheux.",
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
        ← Accueil
      </Link>

      <section className="mining-hero">
        <div className="mining-hero-content">
          <div className="mining-icon">⛏️</div>

          <span className="mining-badge">
            MINING & MINE ENGINEERING
          </span>

          <h1>Mining</h1>

          <p>
            Explore les différents domaines de l'exploitation minière
            et développe tes connaissances dans le secteur des mines.
          </p>
        </div>
      </section>

      <section className="mining-intro-card">
        <div className="mining-intro-icon">🌍</div>

        <div>
          <span className="mining-intro-label">
            UNIVERS MINIER
          </span>

          <h2>Découvre le monde minier</h2>

          <p>
            De l'exploration à la planification minière, GEO ZONE
            rassemble progressivement les notions essentielles pour
            comprendre le fonctionnement d'une exploitation minière.
          </p>
        </div>
      </section>

      <section className="mining-section">
        <div className="mining-section-heading">
          <div>
            <span>EXPLORE LE MINING</span>
            <h2>Les domaines du Mining</h2>
          </div>

          <p>
            Sélectionne un domaine pour découvrir ses concepts,
            méthodes et applications.
          </p>
        </div>

        <div className="mining-grid">
          {domaines.map((domaine, index) => (
            <Link
              key={domaine.titre}
              to={domaine.link}
              className="mining-domain-card"
            >
              <div className="mining-domain-top">
                <div className="mining-domain-icon">
                  {domaine.icon}
                </div>

                <span className="mining-domain-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mining-domain-content">
                <h3>{domaine.titre}</h3>

                <p>{domaine.description}</p>
              </div>

              <div className="mining-domain-footer">
                <span>
                  Explorer
                  <strong>→</strong>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mining-info">
        <div className="mining-info-icon">💡</div>

        <div>
          <h3>Une approche progressive</h3>

          <p>
            GEO ZONE développera progressivement chaque domaine
            avec des cours, des explications, des exercices et
            des ressources spécialisées.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Mining;
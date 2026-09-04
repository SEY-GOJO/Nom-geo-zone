import { Link } from "react-router-dom";

function Outils() {
  const outils = [
    {
      icon: "📐",
      title: "Conversion des unités",
      description: "Convertis rapidement les unités utilisées en géologie.",
      link: "/outils/convertisseur",
      disponible: true,
    },
    {
      icon: "⚖️",
      title: "Masse volumique",
      description: "Calcule la masse volumique d'un matériau.",
      link: "/outils/masse-volumique",
      disponible: true,
    },
    {
      icon: "📊",
      title: "Pourcentage",
      description: "Effectue rapidement tes calculs de pourcentage.",
      link: "/outils/pourcentage",
      disponible: true,
    },
    {
      icon: "🧭",
      title: "Azimut",
      description: "Effectue des calculs liés aux directions et orientations.",
      link: "/outils/azimut",
      disponible: true,
    },
    {
      icon: "📏",
      title: "Pendage",
      description: "Travaille sur la direction et le pendage des structures.",
      link: "/outils/pendage",
      disponible: true,
    },
    {
      icon: "⛏️",
      title: "Mining",
      description: "Outils spécialisés pour les activités minières.",
      link: null,
      disponible: false,
    },
  ];

  return (
    <div className="container outils-page">
      <Link to="/" className="back-link">
        ← Accueil
      </Link>

      <section className="tools-hero">
        <div className="tools-hero-icon">🧮</div>

        <div className="tools-hero-content">
          <span>BOÎTE À OUTILS</span>

          <h1>Outils géologiques</h1>

          <p>
            Des outils pratiques pour effectuer rapidement
            tes calculs et travaux en géologie.
          </p>
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-section-heading">
          <div>
            <span>OUTILS DISPONIBLES</span>
            <h2>Choisis un outil</h2>
          </div>

          <p>
            Accède directement au calculateur dont tu as besoin.
          </p>
        </div>

        <div className="tools-grid">
          {outils.map((outil, index) => {
            const contenu = (
              <>
                <div className="tool-card-top">
                  <div className="tool-icon">{outil.icon}</div>

                  <span className="tool-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="tool-card-content">
                  <h3>{outil.title}</h3>

                  <p>{outil.description}</p>
                </div>

                <div className="tool-card-footer">
                  {outil.disponible ? (
                    <span className="tool-action">
                      Ouvrir
                      <span>→</span>
                    </span>
                  ) : (
                    <span className="tool-coming">
                      Bientôt disponible
                    </span>
                  )}
                </div>
              </>
            );

            if (outil.disponible) {
              return (
                <Link
                  key={outil.title}
                  to={outil.link}
                  className={`tool-card ${
                    index === 5 ? "tool-card-wide" : ""
                  }`}
                >
                  {contenu}
                </Link>
              );
            }

            return (
              <div
                key={outil.title}
                className={`tool-card tool-card-disabled ${
                  index === 5 ? "tool-card-wide" : ""
                }`}
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

export default Outils;
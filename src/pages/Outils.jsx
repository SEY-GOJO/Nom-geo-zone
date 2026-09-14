import { Link } from "react-router-dom";

function Outils() {
  const categories = [
    {
      icon: "⛏️",
      title: "Outils miniers",
      description:
        "Tonnage, teneur, métal contenu, récupération, dilution et autres calculs miniers.",
      count: 7,
      link: "/outils/groupe/miniers",
    },
    {
      icon: "💧",
      title: "Outils hydrogéologiques",
      description:
        "Porosité, gradient hydraulique, débit de Darcy, conductivité et transmissivité.",
      count: 6,
      link: "/outils/groupe/hydrogeologie",
    },
    {
      icon: "🧭",
      title: "Géologie structurale & terrain",
      description:
        "Azimut, pendage, Strike & Dip, pente et calculs de terrain.",
      count: 5,
      link: "/outils/groupe/structure",
    },
    {
      icon: "🗺️",
      title: "Cartographie",
      description:
        "Échelle cartographique et outils liés aux distances sur carte.",
      count: 2,
      link: "/outils/groupe/cartographie",
    },
    {
      icon: "⚖️",
      title: "Calculs généraux",
      description:
        "Masse volumique, pourcentage et conversions d'unités.",
      count: 3,
      link: "/outils/groupe/general",
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

          <h1>GEO Tools</h1>

          <p>
            Des outils pratiques regroupés par domaine pour
            faciliter tes calculs en géologie, mines et
            hydrogéologie.
          </p>
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-section-heading">
          <div>
            <span>CATÉGORIES</span>

            <h2>Choisis un domaine</h2>
          </div>

          <p>
            Sélectionne une catégorie pour accéder à ses outils.
          </p>
        </div>

        <div className="tools-grid">
          {categories.map((categorie, index) => (
            <Link
              key={categorie.title}
              to={categorie.link}
              className={`tool-card ${
                index === 0 ? "tool-card-wide" : ""
              }`}
            >
              <div className="tool-card-top">
                <div className="tool-icon">
                  {categorie.icon}
                </div>

                <span className="tool-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="tool-card-content">
                <h3>{categorie.title}</h3>

                <p>{categorie.description}</p>
              </div>

              <div className="tool-card-footer">
                <span className="tool-action">
                  {categorie.count} outils
                  <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Outils;
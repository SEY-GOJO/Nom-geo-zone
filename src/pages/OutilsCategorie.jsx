import { Link, useParams } from "react-router-dom";

function OutilsCategorie() {
  const { categorie } = useParams();

  const categories = {
    miniers: {
      icon: "⛏️",
      title: "Outils miniers",
      description:
        "Calculs essentiels pour l'exploitation minière et l'évaluation du minerai.",
      outils: [
        {
          icon: "⛏️",
          title: "Tonnage minier",
          description:
            "Calcule le tonnage à partir du volume et de la masse volumique.",
          link: "/outils/tonnage",
        },
        {
          icon: "🧪",
          title: "Teneur",
          description:
            "Convertis les teneurs entre %, ppm, ppb et g/t.",
          link: "/outils/teneur",
        },
        {
          icon: "🥇",
          title: "Métal contenu",
          description:
            "Estime la quantité de métal contenue dans un tonnage donné.",
          link: "/outils/metal-contenu",
        },
        {
          icon: "♻️",
          title: "Récupération",
          description:
            "Calcule la quantité de métal récupérée selon un taux donné.",
          link: "/outils/recuperation",
        },
        {
          icon: "⚠️",
          title: "Dilution",
          description:
            "Étudie l'effet du stérile sur le tonnage et la teneur.",
          link: "/outils/dilution",
        },
        {
          icon: "⛏️",
          title: "Mining Calculator",
          description:
            "Regroupe plusieurs calculs miniers dans un seul outil.",
          link: "/outils/mining-calculator",
        },
        {
          icon: "⛰️",
          title: "Stripping Ratio",
          description:
            "Calcule le rapport entre le stérile et le minerai.",
          link: "/outils/stripping-ratio",
        },
      ],
    },

    hydrogeologie: {
      icon: "💧",
      title: "Outils hydrogéologiques",
      description:
        "Outils consacrés aux propriétés et aux écoulements des eaux souterraines.",
      outils: [
        {
          icon: "💧",
          title: "Porosité",
          description:
            "Calcule la porosité d'une roche ou d'un sol.",
          link: "/outils/porosite",
        },
        {
          icon: "💧",
          title: "Gradient hydraulique",
          description:
            "Calcule le gradient hydraulique entre deux points.",
          link: "/outils/gradient-hydraulique",
        },
        {
          icon: "💧",
          title: "Débit de Darcy",
          description:
            "Calcule le débit à travers un milieu poreux.",
          link: "/outils/debit-darcy",
        },
        {
          icon: "💧",
          title: "Conductivité hydraulique",
          description:
            "Calcule la conductivité hydraulique d'un milieu poreux.",
          link: "/outils/conductivite-hydraulique",
        },
        {
          icon: "💧",
          title: "Transmissivité",
          description:
            "Calcule la transmissivité hydraulique d'un aquifère.",
          link: "/outils/transmissivite",
        },
        {
          icon: "💧",
          title: "Coefficient d'emmagasinement",
          description:
            "Calcule un coefficient d'emmagasinement à partir de volumes.",
          link: "/outils/coefficient-emmagasinement",
        },
      ],
    },

    structure: {
      icon: "🧭",
      title: "Géologie structurale & terrain",
      description:
        "Outils pour les orientations, structures et mesures de terrain.",
      outils: [
        {
          icon: "🧭",
          title: "Azimut",
          description:
            "Effectue des calculs liés aux directions et orientations.",
          link: "/outils/azimut",
        },
        {
          icon: "📏",
          title: "Pendage",
          description:
            "Travaille sur la direction et le pendage des structures.",
          link: "/outils/pendage",
        },
        {
          icon: "🧭",
          title: "Strike & Dip",
          description:
            "Détermine l'orientation d'une structure géologique.",
          link: "/outils/strike-dip",
        },
        {
          icon: "📐",
          title: "Pente",
          description:
            "Convertis une pente entre pourcentage et angle.",
          link: "/outils/pente",
        },
        {
          icon: "🗺️",
          title: "Distance terrain",
          description:
            "Calcule les distances et le dénivelé sur le terrain.",
          link: "/outils/distance-terrain",
        },
      ],
    },

    cartographie: {
      icon: "🗺️",
      title: "Cartographie",
      description:
        "Outils pour interpréter les distances et les échelles cartographiques.",
      outils: [
        {
          icon: "🗺️",
          title: "Échelle cartographique",
          description:
            "Calcule les distances réelles ou cartographiques.",
          link: "/outils/echelle-carte",
        },
        {
          icon: "📐",
          title: "Conversion des unités",
          description:
            "Convertis rapidement les unités utilisées en géologie.",
          link: "/outils/convertisseur",
        },
      ],
    },

    general: {
      icon: "⚖️",
      title: "Calculs généraux",
      description:
        "Calculs de base utiles dans plusieurs domaines de la géologie.",
      outils: [
        {
          icon: "⚖️",
          title: "Masse volumique",
          description:
            "Calcule la masse volumique d'un matériau.",
          link: "/outils/masse-volumique",
        },
        {
          icon: "📊",
          title: "Pourcentage",
          description:
            "Effectue rapidement tes calculs de pourcentage.",
          link: "/outils/pourcentage",
        },
        {
          icon: "📐",
          title: "Conversion des unités",
          description:
            "Convertis les unités utilisées en géologie.",
          link: "/outils/convertisseur",
        },
      ],
    },
  };

  const groupe = categories[categorie];

  if (!groupe) {
    return (
      <div className="container">
        <Link to="/outils" className="back-link">
          ← Retour aux outils
        </Link>

        <div className="welcome">
          <div className="module-icon">⚠️</div>

          <h1>Catégorie introuvable</h1>

          <p>
            La catégorie demandée n'existe pas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container outils-page">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <section className="tools-hero">
        <div className="tools-hero-icon">
          {groupe.icon}
        </div>

        <div className="tools-hero-content">
          <span>GEO TOOLS</span>

          <h1>{groupe.title}</h1>

          <p>{groupe.description}</p>
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-section-heading">
          <div>
            <span>
              {groupe.outils.length} OUTILS
            </span>

            <h2>Choisis un outil</h2>
          </div>

          <p>
            Accède directement au calculateur dont tu as besoin.
          </p>
        </div>

        <div className="tools-grid">
          {groupe.outils.map((outil, index) => (
            <Link
              key={outil.title}
              to={outil.link}
              className="tool-card"
            >
              <div className="tool-card-top">
                <div className="tool-icon">
                  {outil.icon}
                </div>

                <span className="tool-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="tool-card-content">
                <h3>{outil.title}</h3>

                <p>{outil.description}</p>
              </div>

              <div className="tool-card-footer">
                <span className="tool-action">
                  Ouvrir
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

export default OutilsCategorie;
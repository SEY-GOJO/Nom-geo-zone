import { Link } from "react-router-dom";

const methodesExploration = [
  {
    icon: "🗺️",
    title: "Cartographie géologique",
    description:
      "Observe, décris et cartographie les formations géologiques pour comprendre le contexte d'un secteur.",
  },
  {
    icon: "🧪",
    title: "Exploration géochimique",
    description:
      "Utilise les analyses géochimiques pour rechercher des anomalies associées à certains gisements.",
  },
  {
    icon: "📡",
    title: "Exploration géophysique",
    description:
      "Découvre les méthodes géophysiques utilisées pour étudier les propriétés du sous-sol.",
  },
  {
    icon: "🕳️",
    title: "Sondage et forage d'exploration",
    description:
      "Comprends le rôle des sondages et des forages dans la reconnaissance directe du sous-sol.",
  },
];

function ExplorationMiniere() {
  return (
    <main className="container">
      <Link to="/mining" className="back-link">
        ← Retour au Mining
      </Link>

      <div className="welcome">
        <div className="module-icon">
          🌍
        </div>

        <h1>
          Exploration minière
        </h1>

        <p>
          Découvre les principales méthodes utilisées pour
          rechercher, identifier et évaluer les ressources
          minérales.
        </p>
      </div>

      <section className="card" aria-labelledby="introduction-exploration">
        <h2>
          <span id="introduction-exploration">
          🌍 Introduction à l'exploration minière
          </span>
        </h2>

        <p>
          L'exploration minière regroupe l'ensemble des méthodes
          permettant de rechercher des concentrations de minerais,
          de déterminer leur extension et d'évaluer leur potentiel.
        </p>

        <p>
          Elle fait intervenir notamment la géologie, la
          géochimie, la géophysique, la télédétection et les
          travaux de terrain.
        </p>
      </section>

      <section className="modules" aria-label="Méthodes d'exploration minière">
        {methodesExploration.map((methode) => (
          <article className="card" key={methode.title}>
            <div className="module-icon" aria-hidden="true">
              {methode.icon}
            </div>

            <h2>{methode.title}</h2>
            <p>{methode.description}</p>

            <button className="disabled-button" type="button" disabled>
              Bientôt disponible
            </button>
          </article>
        ))}
      </section>

      <section className="card" aria-labelledby="notions-exploration">
        <h2>
          <span id="notions-exploration">
          📚 Notions à retenir
          </span>
        </h2>

        <p>
          L'exploration minière commence généralement par
          l'identification d'un contexte géologique favorable,
          puis utilise différentes méthodes de reconnaissance
          pour réduire progressivement l'incertitude sur le
          potentiel du secteur étudié.
        </p>
      </section>
    </main>
  );
}

export default ExplorationMiniere;
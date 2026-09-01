import { Link, useParams } from "react-router-dom";
import categories from "../data/categories";
import cours from "../data/cours";

function CoursDetail() {
  const { categorieId, id } = useParams();

  const coursActuel = cours.find(
    (element) => element.id === Number(id)
  );

  const categorie = categories.find(
    (element) => element.id === Number(categorieId)
  );

  if (!coursActuel) {
    return (
      <div className="container">
        <div className="card course-not-found">
          <div className="module-icon">📚</div>

          <h1>❌ Cours introuvable</h1>

          <p>
            Le cours que tu recherches n'existe pas ou n'est plus
            disponible.
          </p>

          <Link to="/bibliotheque">
            <button>← Retour à la bibliothèque</button>
          </Link>
        </div>
      </div>
    );
  }

  const totalChapitres = coursActuel.chapitres.length;

  return (
    <div className="container">

      <Link
        to={`/bibliotheque/${categorieId}`}
        className="back-link"
      >
        ← Retour à {categorie ? categorie.nom : "la catégorie"}
      </Link>

      <section className="course-header card">

        <div className="course-category">
          {categorie?.icon} {categorie?.nom}
        </div>

        <div className="course-main-icon">
          📚
        </div>

        <p className="course-label">
          COURS DE GÉOLOGIE
        </p>

        <h1>
          {coursActuel.titre}
        </h1>

        <p className="course-description">
          {coursActuel.description}
        </p>

        <div className="course-stats">

          <div className="course-stat">
            <span className="stat-icon">📖</span>

            <strong>
              {totalChapitres}
            </strong>

            <span>
              Chapitre{totalChapitres > 1 ? "s" : ""}
            </span>
          </div>

          <div className="course-stat">
            <span className="stat-icon">🎓</span>

            <strong>
              GEO ZONE
            </strong>

            <span>
              Formation
            </span>
          </div>

          <div className="course-stat">
            <span className="stat-icon">🌍</span>

            <strong>
              Géologie
            </strong>

            <span>
              Sciences de la Terre
            </span>
          </div>

        </div>
      </section>

      <section className="course-introduction">

        <div>
          <span className="section-badge">
            PROGRAMME
          </span>

          <h2>
            📖 Contenu du cours
          </h2>

          <p>
            Parcours les différents chapitres de ce cours
            pour approfondir tes connaissances et progresser
            dans ton apprentissage de la géologie.
          </p>
        </div>

        <div className="course-progress-info">
          <strong>
            {totalChapitres}
          </strong>

          <span>
            chapitre{totalChapitres > 1 ? "s" : ""} à découvrir
          </span>
        </div>

      </section>

      <section className="modules course-chapters">

        {coursActuel.chapitres.map((chapitre, index) => (

          <article
            className="card chapter-card"
            key={chapitre.id}
          >

            <div className="chapter-top">

              <div className="chapter-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <span className="chapter-label">
                CHAPITRE {index + 1}
              </span>

            </div>

            <div className="chapter-content">

              <h2>
                {chapitre.titre}
              </h2>

              <p>
                📖 Chapitre {index + 1} sur {totalChapitres}
              </p>

            </div>

            <Link
              to={`/bibliotheque/${categorieId}/cours/${coursActuel.id}/chapitre/${chapitre.id}`}
              className="chapter-link"
            >
              <button>
                Commencer le chapitre →
              </button>
            </Link>

          </article>

        ))}

      </section>

    </div>
  );
}

export default CoursDetail;
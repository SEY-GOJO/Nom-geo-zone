import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

  const [chapitresTermines, setChapitresTermines] = useState([]);

  const progressKey = `geo-zone:course-progress:${id}`;

  useEffect(() => {
    if (!coursActuel) {
      return;
    }

    try {
      const progressionEnregistree =
        localStorage.getItem(progressKey);

      if (progressionEnregistree) {
        const progressionParsee =
          JSON.parse(progressionEnregistree);

        if (Array.isArray(progressionParsee)) {
          const idsValides = progressionParsee.filter((chapitreId) =>
            coursActuel.chapitres.some(
              (chapitre) => chapitre.id === chapitreId
            )
          );

          setChapitresTermines(idsValides);
        }
      }
    } catch (error) {
      console.error(
        "Impossible de récupérer la progression du cours :",
        error
      );
    }
  }, [id, progressKey, coursActuel]);

  if (!coursActuel) {
    return (
      <div className="container">
        <div className="card course-not-found">
          <div className="module-icon">📚</div>

          <h1>❌ Cours introuvable</h1>

          <p>
            Le cours que tu recherches n'existe pas ou
            n'est plus disponible.
          </p>

          <Link to="/bibliotheque">
            <button type="button">
              ← Retour à la bibliothèque
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const totalChapitres = coursActuel.chapitres.length;

  const nombreChapitresTermines =
    chapitresTermines.length;

  const progression =
    totalChapitres > 0
      ? Math.round(
          (nombreChapitresTermines / totalChapitres) * 100
        )
      : 0;

  return (
    <div className="container course-detail-page">
      <Link
        to={`/bibliotheque/${categorieId}`}
        className="back-link"
      >
        ← {categorie ? categorie.nom : "Retour"}
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

        <h1>{coursActuel.titre}</h1>

        <p className="course-description">
          {coursActuel.description}
        </p>

        <div className="course-stats">
          <div className="course-stat">
            <span className="stat-icon">📖</span>

            <strong>{totalChapitres}</strong>

            <span>
              Chapitre
              {totalChapitres > 1 ? "s" : ""}
            </span>
          </div>

          <div className="course-stat">
            <span className="stat-icon">✅</span>

            <strong>{nombreChapitresTermines}</strong>

            <span>
              Terminé
              {nombreChapitresTermines > 1 ? "s" : ""}
            </span>
          </div>

          <div className="course-stat">
            <span className="stat-icon">📊</span>

            <strong>{progression}%</strong>

            <span>Progression</span>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-top">
            <span>Progression du cours</span>

            <strong>{progression}%</strong>
          </div>

          <div
            className="progress-bar"
            aria-label={`Progression ${progression}%`}
          >
            <div
              className="progress-fill"
              style={{
                width: `${progression}%`,
              }}
            />
          </div>

          <p>
            {nombreChapitresTermines} chapitre
            {nombreChapitresTermines > 1 ? "s" : ""} terminé
            {nombreChapitresTermines > 1 ? "s" : ""} sur{" "}
            {totalChapitres}.
          </p>
        </div>
      </section>

      <section className="course-introduction">
        <div>
          <span className="section-badge">
            PROGRAMME
          </span>

          <h2>📖 Contenu du cours</h2>

          <p>
            Parcours les différents chapitres de ce cours
            pour approfondir tes connaissances et progresser
            dans ton apprentissage.
          </p>
        </div>

        <div className="course-progress-info">
          <strong>
            {progression}%
          </strong>

          <span>
            du cours terminé
          </span>
        </div>
      </section>

      <section className="course-chapters">
        <div className="course-chapters-heading">
          <div>
            <span>PROGRAMME DU COURS</span>

            <h2>Les chapitres</h2>
          </div>

          <span className="course-chapter-count">
            {totalChapitres} chapitre
            {totalChapitres > 1 ? "s" : ""}
          </span>
        </div>

        <div className="course-chapters-grid">
          {coursActuel.chapitres.map(
            (chapitre, index) => {
              const chapitreTermine =
                chapitresTermines.includes(chapitre.id);

              return (
                <article
                  className="chapter-card"
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
                    <h3>{chapitre.titre}</h3>

                    <p>
                      📖 Chapitre {index + 1} sur{" "}
                      {totalChapitres}
                    </p>

                    {chapitreTermine && (
                      <p>
                        ✅ Chapitre terminé
                      </p>
                    )}
                  </div>

                  <Link
                    to={`/bibliotheque/${categorieId}/cours/${coursActuel.id}/chapitre/${chapitre.id}`}
                    className="chapter-link"
                  >
                    {chapitreTermine
                      ? "Revoir"
                      : "Commencer"}

                    <span>→</span>
                  </Link>
                </article>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
}

export default CoursDetail;
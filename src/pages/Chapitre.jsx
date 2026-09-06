import { Link, useParams } from "react-router-dom";

import cours from "../data/cours";

function Chapitre() {
  const { categorieId, id, chapitreId } = useParams();

  const coursActuel = cours.find(
    (element) => element.id === Number(id)
  );

  if (!coursActuel) {
    return (
      <div className="container">
        <div className="card error-card">
          <div className="error-icon">📚</div>

          <h1>Cours introuvable</h1>

          <p>
            Le cours demandé n'existe pas ou n'est plus disponible.
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

  const chapitreIndex = coursActuel.chapitres.findIndex(
    (chapitre) => chapitre.id === Number(chapitreId)
  );

  if (chapitreIndex === -1) {
    return (
      <div className="container">
        <div className="card error-card">
          <div className="error-icon">📖</div>

          <h1>Chapitre introuvable</h1>

          <p>
            Le chapitre demandé n'existe pas.
          </p>

          <Link
            to={`/bibliotheque/${categorieId}/cours/${id}`}
          >
            <button type="button">
              ← Retour au cours
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const chapitre = coursActuel.chapitres[chapitreIndex];

  const totalChapitres = coursActuel.chapitres.length;

  const progression = Math.round(
    ((chapitreIndex + 1) / totalChapitres) * 100
  );

  const chapitrePrecedent =
    chapitreIndex > 0
      ? coursActuel.chapitres[chapitreIndex - 1]
      : null;

  const chapitreSuivant =
    chapitreIndex < totalChapitres - 1
      ? coursActuel.chapitres[chapitreIndex + 1]
      : null;

  const baseUrl =
    `/bibliotheque/${categorieId}/cours/${id}`;

  return (
    <div className="container chapter-page">
      <Link to={baseUrl} className="back-link">
        ← Retour au cours
      </Link>

      <section className="chapter-hero">
        <div className="chapter-hero-top">
          <div className="chapter-hero-icon">
            📖
          </div>

          <span className="chapter-label">
            CHAPITRE {chapterIndexSafe(chapitreIndex)}
          </span>
        </div>

        <p className="chapter-course-name">
          {coursActuel.titre}
        </p>

        <h1>{chapitre.titre}</h1>

        <div className="chapter-info">
          <span>
            📖 {chapitreIndex + 1} / {totalChapitres}
          </span>

          <span>
            🎓 GEO ZONE
          </span>
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
        </div>
      </section>

      <article className="chapter-reading-card">
        <header className="chapter-reading-header">
          <div className="content-icon">
            📚
          </div>

          <div>
            <span>
              LEÇON {chapitreIndex + 1}
            </span>

            <h2>{chapitre.titre}</h2>
          </div>
        </header>

        <div className="content-body">
          {chapitre.contenu ? (
            chapitre.contenu.split("\n").map((ligne, index) =>
              ligne.trim() ? (
                <p key={index}>
                  {ligne}
                </p>
              ) : (
                <div
                  key={index}
                  className="content-space"
                />
              )
            )
          ) : (
            <div className="empty-content">
              <div>📚</div>

              <h3>
                Contenu bientôt disponible
              </h3>

              <p>
                Le contenu de ce chapitre sera bientôt ajouté
                à GEO ZONE.
              </p>
            </div>
          )}
        </div>
      </article>

      <div className="chapter-navigation">
        <div className="navigation-left">
          {chapitrePrecedent ? (
            <Link
              className="secondary-button"
              to={`${baseUrl}/chapitre/${chapitrePrecedent.id}`}
            >
              ← Précédent
            </Link>
          ) : (
            <Link className="secondary-button" to={baseUrl}>
              ← Chapitres
            </Link>
          )}
        </div>

        <div className="navigation-right">
          {chapitreSuivant ? (
            <Link
              className="chapter-next-link"
              to={`${baseUrl}/chapitre/${chapitreSuivant.id}`}
            >
              Suivant
              <span>→</span>
            </Link>
          ) : (
            <Link className="chapter-next-link" to={baseUrl}>
              ✓ Terminer
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function chapterIndexSafe(index) {
  return String(index + 1).padStart(2, "0");
}

export default Chapitre;
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
          <p>Le cours demandé n'existe pas ou n'est plus disponible.</p>

          <Link to="/bibliotheque">
            <button>← Retour à la bibliothèque</button>
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
          <p>Le chapitre demandé n'existe pas.</p>

          <Link
            to={
              "/bibliotheque/" +
              categorieId +
              "/cours/" +
              id
            }
          >
            <button>← Retour au cours</button>
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

  return (
    <div className="container chapter-page">

      <Link
        to={
          "/bibliotheque/" +
          categorieId +
          "/cours/" +
          id
        }
        className="back-link"
      >
        ← Retour au cours
      </Link>

      <div className="chapter-hero">

        <div className="chapter-hero-icon">
          📖
        </div>

        <div className="chapter-label">
          COURS
        </div>

        <p className="chapter-course-name">
          {coursActuel.titre}
        </p>

        <h1>
          {chapitre.titre}
        </h1>

        <div className="chapter-info">
          <span>
            📖 Chapitre {chapitreIndex + 1} sur {totalChapitres}
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

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: progression + "%" }}
            />
          </div>

        </div>

      </div>

      <article className="card course-content">

        <div className="content-heading">

          <div className="content-icon">
            📚
          </div>

          <div>
            <span>CHAPITRE {chapitreIndex + 1}</span>
            <h2>{chapitre.titre}</h2>
          </div>

        </div>

        <div className="content-body">

          {chapitre.contenu ? (
            chapitre.contenu
              .split("\n")
              .map((ligne, index) =>
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
              <h3>Contenu bientôt disponible</h3>
              <p>
                Le contenu de ce chapitre sera bientôt ajouté à GEO ZONE.
              </p>
            </div>
          )}

        </div>

      </article>

      <div className="chapter-navigation">

        <div className="navigation-left">
          {chapitrePrecedent ? (
            <Link
              to={
                "/bibliotheque/" +
                categorieId +
                "/cours/" +
                id +
                "/chapitre/" +
                chapitrePrecedent.id
              }
            >
              <button className="secondary-button">
                ← Précédent
              </button>
            </Link>
          ) : (
            <Link
              to={
                "/bibliotheque/" +
                categorieId +
                "/cours/" +
                id
              }
            >
              <button className="secondary-button">
                ← Tous les chapitres
              </button>
            </Link>
          )}
        </div>

        <div className="navigation-right">

          {chapitreSuivant ? (
            <Link
              to={
                "/bibliotheque/" +
                categorieId +
                "/cours/" +
                id +
                "/chapitre/" +
                chapitreSuivant.id
              }
            >
              <button>
                Chapitre suivant →
              </button>
            </Link>
          ) : (
            <Link
              to={
                "/bibliotheque/" +
                categorieId +
                "/cours/" +
                id
              }
            >
              <button>
                ✓ Terminer le cours
              </button>
            </Link>
          )}

        </div>

      </div>

    </div>
  );
}

export default Chapitre;
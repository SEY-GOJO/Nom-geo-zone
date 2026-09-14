import { Link } from "react-router-dom";
import { useState } from "react";

import cours from "../data/cours";
import categories from "../data/categories";

function Progression() {
  const [actualisation, setActualisation] = useState(0);

  const getProgression = (coursId) => {
    try {
      const donnees = localStorage.getItem(
        `geo-zone:course-progress:${coursId}`
      );

      if (!donnees) {
        return [];
      }

      const progression = JSON.parse(donnees);

      return Array.isArray(progression) ? progression : [];
    } catch (error) {
      console.error(
        "Impossible de lire la progression :",
        error
      );

      return [];
    }
  };

  const coursProgression = cours.map((coursActuel) => {
    const chapitresTermines = getProgression(
      coursActuel.id
    );

    const totalChapitres =
      coursActuel.chapitres.length;

    const nombreTermines =
      chapitresTermines.filter((chapitreId) =>
        coursActuel.chapitres.some(
          (chapitre) => chapitre.id === chapitreId
        )
      ).length;

    const pourcentage =
      totalChapitres > 0
        ? Math.round(
            (nombreTermines / totalChapitres) * 100
          )
        : 0;

    const categorie = categories.find(
      (element) =>
        element.id === coursActuel.categorieId
    );

    return {
      ...coursActuel,
      categorie,
      nombreTermines,
      totalChapitres,
      pourcentage,
    };
  });

  const coursCommences = coursProgression.filter(
    (coursActuel) => coursActuel.nombreTermines > 0
  );

  const coursTermines = coursProgression.filter(
    (coursActuel) =>
      coursActuel.totalChapitres > 0 &&
      coursActuel.nombreTermines ===
        coursActuel.totalChapitres
  );

  const totalChapitres = coursProgression.reduce(
    (total, coursActuel) =>
      total + coursActuel.totalChapitres,
    0
  );

  const totalTermines = coursProgression.reduce(
    (total, coursActuel) =>
      total + coursActuel.nombreTermines,
    0
  );

  const progressionGlobale =
    totalChapitres > 0
      ? Math.round(
          (totalTermines / totalChapitres) * 100
        )
      : 0;

  const actualiser = () => {
    setActualisation((valeur) => valeur + 1);
  };

  void actualisation;

  return (
    <div className="container">
      <Link to="/" className="back-link">
        ← Accueil
      </Link>

      <section className="welcome">
        <div className="module-icon">📊</div>

        <h1>Ma progression</h1>

        <p>
          Suis ton avancement dans les cours de GEO ZONE
          et retrouve rapidement les chapitres déjà étudiés.
        </p>
      </section>

      <section className="card">
        <h2>📈 Progression globale</h2>

        <div className="course-stats">
          <div className="course-stat">
            <span className="stat-icon">📚</span>

            <strong>{cours.length}</strong>

            <span>Cours</span>
          </div>

          <div className="course-stat">
            <span className="stat-icon">▶️</span>

            <strong>{coursCommences.length}</strong>

            <span>Commencés</span>
          </div>

          <div className="course-stat">
            <span className="stat-icon">✅</span>

            <strong>{coursTermines.length}</strong>

            <span>Terminés</span>
          </div>

          <div className="course-stat">
            <span className="stat-icon">📊</span>

            <strong>{progressionGlobale}%</strong>

            <span>Progression</span>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-top">
            <span>Progression globale</span>

            <strong>{progressionGlobale}%</strong>
          </div>

          <div
            className="progress-bar"
            aria-label={`Progression globale ${progressionGlobale}%`}
          >
            <div
              className="progress-fill"
              style={{
                width: `${progressionGlobale}%`,
              }}
            />
          </div>
        </div>

        <div className="outil-actions">
          <button
            type="button"
            onClick={actualiser}
          >
            Actualiser
          </button>
        </div>
      </section>

      <section className="course-chapters">
        <div className="course-chapters-heading">
          <div>
            <span>COURS</span>

            <h2>Mon parcours</h2>
          </div>

          <span className="course-chapter-count">
            {coursCommences.length} en cours
          </span>
        </div>

        {coursCommences.length > 0 ? (
          <div className="course-chapters-grid">
            {coursCommences.map((coursActuel) => (
              <article
                className="chapter-card"
                key={coursActuel.id}
              >
                <div className="chapter-top">
                  <div className="chapter-number">
                    {String(
                      coursActuel.nombreTermines
                    ).padStart(2, "0")}
                  </div>

                  <span className="chapter-label">
                    {coursActuel.pourcentage === 100
                      ? "TERMINÉ"
                      : "EN COURS"}
                  </span>
                </div>

                <div className="chapter-content">
                  <h3>{coursActuel.titre}</h3>

                  <p>
                    {coursActuel.categorie?.icon}{" "}
                    {coursActuel.categorie?.nom ||
                      "Géologie"}
                  </p>

                  <p>
                    {coursActuel.nombreTermines} /{" "}
                    {coursActuel.totalChapitres}{" "}
                    chapitres
                  </p>

                  <div className="progress-section">
                    <div className="progress-top">
                      <span>Progression</span>

                      <strong>
                        {coursActuel.pourcentage}%
                      </strong>
                    </div>

                    <div
                      className="progress-bar"
                      aria-label={`Progression ${coursActuel.pourcentage}%`}
                    >
                      <div
                        className="progress-fill"
                        style={{
                          width: `${coursActuel.pourcentage}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <Link
                  to={`/bibliotheque/${coursActuel.categorieId}/cours/${coursActuel.id}`}
                  className="chapter-link"
                >
                  {coursActuel.pourcentage === 100
                    ? "Revoir le cours"
                    : "Continuer"}
                  <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="card">
            <div className="empty-content">
              <div>📚</div>

              <h3>Aucun cours commencé</h3>

              <p>
                Commence un cours depuis la bibliothèque
                et ta progression apparaîtra ici.
              </p>

              <Link
                to="/bibliotheque"
                className="chapter-next-link"
              >
                Ouvrir la bibliothèque
                <span>→</span>
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Progression;
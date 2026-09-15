import { Link } from "react-router-dom";

import cours from "../data/cours";

const QUIZ_RESULT_KEY = "geo-zone:quiz-result:v1";
const QUIZ_HISTORY_KEY = "geo-zone:quiz-history:v1";

const EVALUATION_RESULT_KEY =
  "geo-zone:evaluation-result:v1";
const EVALUATION_HISTORY_KEY =
  "geo-zone:evaluation-history:v1";

const COURSE_PROGRESS_PREFIX =
  "geo-zone:course-progress:";

function lireJSON(cle, valeurParDefaut) {
  try {
    const contenu = localStorage.getItem(cle);

    if (!contenu) {
      return valeurParDefaut;
    }

    const donnees = JSON.parse(contenu);

    return donnees ?? valeurParDefaut;
  } catch (error) {
    console.error(
      `Impossible de lire ${cle} :`,
      error
    );

    return valeurParDefaut;
  }
}

function obtenirProgressionCours(coursActuel) {
  if (!coursActuel) {
    return 0;
  }

  const chapitres =
    Array.isArray(coursActuel.chapitres)
      ? coursActuel.chapitres
      : [];

  if (chapitres.length === 0) {
    return 0;
  }

  const progression = lireJSON(
    `${COURSE_PROGRESS_PREFIX}${coursActuel.id}`,
    []
  );

  if (!Array.isArray(progression)) {
    return 0;
  }

  const idsValides = progression.filter(
    (chapitreId) =>
      chapitres.some(
        (chapitre) =>
          chapitre.id === chapitreId
      )
  );

  return Math.round(
    (idsValides.length / chapitres.length) * 100
  );
}

function formaterDate(date) {
  if (!date) {
    return "Aucune donnée";
  }

  try {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  } catch {
    return "Date inconnue";
  }
}

function Dashboard() {
  const quizResultat = lireJSON(
    QUIZ_RESULT_KEY,
    null
  );

  const evaluationResultat = lireJSON(
    EVALUATION_RESULT_KEY,
    null
  );

  const quizHistorique = lireJSON(
    QUIZ_HISTORY_KEY,
    []
  );

  const evaluationHistorique = lireJSON(
    EVALUATION_HISTORY_KEY,
    []
  );

  const historiqueActivites = [
    ...(Array.isArray(quizHistorique)
      ? quizHistorique.map((resultat) => ({
          type: "quiz",
          titre: "Quiz",
          icone: "🏆",
          ...resultat,
        }))
      : []),

    ...(Array.isArray(evaluationHistorique)
      ? evaluationHistorique.map((resultat) => ({
          type: "evaluation",
          titre: "Évaluation",
          icone: "🎯",
          ...resultat,
        }))
      : []),
  ]
    .filter((activite) => activite.date)
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, 10);

  const progressionsCours = cours.map(
    (coursActuel) => ({
      ...coursActuel,
      progression:
        obtenirProgressionCours(
          coursActuel
        ),
    })
  );

  const coursCommences =
    progressionsCours.filter(
      (coursActuel) =>
        coursActuel.progression > 0
    );

  const coursTermines =
    progressionsCours.filter(
      (coursActuel) =>
        coursActuel.progression >= 100
    );

  const totalChapitres =
    progressionsCours.reduce(
      (total, coursActuel) =>
        total +
        (Array.isArray(
          coursActuel.chapitres
        )
          ? coursActuel.chapitres.length
          : 0),
      0
    );

  const chapitresTermines =
    progressionsCours.reduce(
      (total, coursActuel) => {
        const chapitres =
          Array.isArray(
            coursActuel.chapitres
          )
            ? coursActuel.chapitres
            : [];

        if (chapitres.length === 0) {
          return total;
        }

        const progression = lireJSON(
          `${COURSE_PROGRESS_PREFIX}${coursActuel.id}`,
          []
        );

        if (!Array.isArray(progression)) {
          return total;
        }

        const idsValides =
          progression.filter(
            (chapitreId) =>
              chapitres.some(
                (chapitre) =>
                  chapitre.id === chapitreId
              )
          );

        return total + idsValides.length;
      },
      0
    );

  const progressionGlobale =
    totalChapitres > 0
      ? Math.round(
          (chapitresTermines /
            totalChapitres) *
            100
        )
      : 0;

  const prochainCours =
    progressionsCours.find(
      (coursActuel) =>
        coursActuel.progression > 0 &&
        coursActuel.progression < 100
    ) ||
    progressionsCours.find(
      (coursActuel) =>
        coursActuel.progression === 0
    ) ||
    null;

  const dernierDomaine =
    evaluationResultat?.domainesARevoir
      ?.length > 0
      ? evaluationResultat.domainesARevoir[0]
      : null;

  return (
    <div className="container">
      <Link
        to="/"
        className="back-link"
      >
        ← Accueil
      </Link>

      <section className="welcome">
        <div className="module-icon">
          📊
        </div>

        <h1>
          Mon tableau de bord
        </h1>

        <p>
          Retrouve ici ta progression, tes derniers
          résultats et les prochaines étapes de ton
          apprentissage dans GEO ZONE.
        </p>
      </section>

      <section className="modules">
        <div className="card">
          <div className="module-icon">
            📈
          </div>

          <h2>
            {progressionGlobale}%
          </h2>

          <p>
            Progression globale des cours
          </p>
        </div>

        <div className="card">
          <div className="module-icon">
            📚
          </div>

          <h2>
            {coursCommences.length}
          </h2>

          <p>
            Cours commencés
          </p>
        </div>

        <div className="card">
          <div className="module-icon">
            ✅
          </div>

          <h2>
            {coursTermines.length}
          </h2>

          <p>
            Cours terminés
          </p>
        </div>

        <div className="card">
          <div className="module-icon">
            📖
          </div>

          <h2>
            {chapitresTermines} /{" "}
            {totalChapitres}
          </h2>

          <p>
            Chapitres terminés
          </p>
        </div>
      </section>

      <section className="card">
        <div className="course-chapters-heading">
          <div>
            <span>
              APPRENTISSAGE
            </span>

            <h2>
              ▶️ Continuer à apprendre
            </h2>
          </div>
        </div>

        {prochainCours ? (
          <div>
            <h3>
              {prochainCours.titre}
            </h3>

            <p>
              {prochainCours.progression === 0
                ? "Tu n'as pas encore commencé ce cours."
                : `Tu as terminé ${prochainCours.progression}% de ce cours.`}
            </p>

            <div className="progress-section">
              <div className="progress-top">
                <span>
                  Progression
                </span>

                <strong>
                  {prochainCours.progression}%
                </strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${prochainCours.progression}%`,
                  }}
                />
              </div>
            </div>

            <Link
              to={`/bibliotheque/${prochainCours.categorieId}/cours/${prochainCours.id}`}
              className="chapter-next-link"
            >
              {prochainCours.progression === 0
                ? "Commencer le cours"
                : "Continuer le cours"}

              <span>
                →
              </span>
            </Link>
          </div>
        ) : (
          <p>
            Tous les cours disponibles ont
            été parcourus.
          </p>
        )}
      </section>

      <section className="modules">
        <div className="card">
          <div className="module-icon">
            🏆
          </div>

          <h2>
            Dernier Quiz
          </h2>

          {quizResultat ? (
            <>
              <p>
                Score :{" "}
                <strong>
                  {quizResultat.score} /{" "}
                  {quizResultat.total}
                </strong>
              </p>

              <p>
                Réussite :{" "}
                <strong>
                  {quizResultat.pourcentage}%
                </strong>
              </p>

              <p>
                {formaterDate(
                  quizResultat.date
                )}
              </p>
            </>
          ) : (
            <p>
              Aucun quiz terminé pour le moment.
            </p>
          )}

          <Link
            to="/quiz"
            className="chapter-next-link"
          >
            Aller au quiz

            <span>
              →
            </span>
          </Link>
        </div>

        <div className="card">
          <div className="module-icon">
            🎯
          </div>

          <h2>
            Dernière Évaluation
          </h2>

          {evaluationResultat ? (
            <>
              <p>
                Niveau :{" "}
                <strong>
                  {evaluationResultat.pourcentage >=
                  80
                    ? "Excellent"
                    : evaluationResultat.pourcentage >=
                      60
                    ? "Bon niveau"
                    : evaluationResultat.pourcentage >=
                      40
                    ? "Niveau moyen"
                    : "À renforcer"}
                </strong>
              </p>

              <p>
                Score :{" "}
                <strong>
                  {evaluationResultat.score} /{" "}
                  {evaluationResultat.total}
                </strong>
              </p>

              <p>
                Réussite :{" "}
                <strong>
                  {evaluationResultat.pourcentage}%
                </strong>
              </p>

              <p>
                {formaterDate(
                  evaluationResultat.date
                )}
              </p>
            </>
          ) : (
            <p>
              Aucune évaluation terminée
              pour le moment.
            </p>
          )}

          <Link
            to="/evaluation"
            className="chapter-next-link"
          >
            Faire l'évaluation

            <span>
              →
            </span>
          </Link>
        </div>
      </section>

      <section className="card">
        <div className="course-chapters-heading">
          <div>
            <span>
              ACTIVITÉS
            </span>

            <h2>
              📋 Historique récent
            </h2>
          </div>
        </div>

        {historiqueActivites.length > 0 ? (
          <div className="dashboard-history">
            {historiqueActivites.map(
              (activite, index) => (
                <div
                  key={`${activite.type}-${activite.date}-${index}`}
                  className="dashboard-history-item"
                >
                  <div className="dashboard-history-icon">
                    {activite.icone}
                  </div>

                  <div className="dashboard-history-content">
                    <strong>
                      {activite.titre}
                    </strong>

                    <span>
                      Score : {activite.score} /{" "}
                      {activite.total}
                    </span>

                    <small>
                      {formaterDate(
                        activite.date
                      )}
                    </small>
                  </div>

                  <div className="dashboard-history-score">
                    {activite.pourcentage}%
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <p>
            Aucun quiz ou aucune évaluation
            n'a encore été enregistré.
          </p>
        )}
      </section>

      <section className="card">
        <div className="course-chapters-heading">
          <div>
            <span>
              DIAGNOSTIC
            </span>

            <h2>
              🧠 Point à renforcer
            </h2>
          </div>
        </div>

        {dernierDomaine ? (
          <>
            <p>
              Ton dernier diagnostic indique que
              ce domaine mérite une attention
              particulière :
            </p>

            <h3>
              {dernierDomaine}
            </h3>

            <Link
              to="/revision"
              className="chapter-next-link"
            >
              Aller à la révision

              <span>
                →
              </span>
            </Link>
          </>
        ) : (
          <>
            <p>
              Aucun domaine faible n'est encore
              enregistré.
            </p>

            <Link
              to="/evaluation"
              className="chapter-next-link"
            >
              Faire une évaluation

              <span>
                →
              </span>
            </Link>
          </>
        )}
      </section>

      <section className="modules">
        <Link
          to="/bibliotheque"
          className="card"
        >
          <div className="module-icon">
            📚
          </div>

          <h2>
            Bibliothèque
          </h2>

          <p>
            Explorer les cours et chapitres.
          </p>
        </Link>

        <Link
          to="/revision"
          className="card"
        >
          <div className="module-icon">
            🧠
          </div>

          <h2>
            Révision
          </h2>

          <p>
            Revoir les notions importantes.
          </p>
        </Link>

        <Link
          to="/quiz"
          className="card"
        >
          <div className="module-icon">
            📝
          </div>

          <h2>
            Quiz
          </h2>

          <p>
            Tester tes connaissances.
          </p>
        </Link>

        <Link
          to="/evaluation"
          className="card"
        >
          <div className="module-icon">
            🎯
          </div>

          <h2>
            Évaluation
          </h2>

          <p>
            Mesurer ton niveau.
          </p>
        </Link>
      </section>
    </div>
  );
}

export default Dashboard;
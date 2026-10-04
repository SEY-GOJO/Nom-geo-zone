import { Link } from "react-router-dom";
import { useState } from "react";

import questions from "../data/questions";
import { consoliderResultatsEvaluation } from "../utils/assessmentResults";
import { creerSessionQuestions } from "../utils/assessmentQuestions";

const QUIZ_RESULT_KEY = "geo-zone:quiz-result:v1";
const QUIZ_HISTORY_KEY = "geo-zone:quiz-history:v1";

function Quiz() {
  const [categorieSelectionnee, setCategorieSelectionnee] =
    useState("Toutes");
  const [questionsQuiz, setQuestionsQuiz] = useState([]);
  const [demarre, setDemarre] = useState(false);

  const [questionActuelle, setQuestionActuelle] =
    useState(0);

  const [score, setScore] = useState(0);

  const [reponseChoisie, setReponseChoisie] =
    useState(null);

  const [termine, setTermine] = useState(false);

  const [reponses, setReponses] = useState([]);

  const categories = [...new Set(
    questions.map((question) => question.categorie)
  )].sort((a, b) => a.localeCompare(b, "fr"));
  const nombreQuestionsDisponibles = questions.filter(
    (question) =>
      categorieSelectionnee === "Toutes" ||
      question.categorie === categorieSelectionnee
  ).length;

  const question = questionsQuiz[questionActuelle];

  const commencerQuiz = () => {
    const session = creerSessionQuestions(questions, {
      categorie: categorieSelectionnee,
    });
    setQuestionsQuiz(session);
    setQuestionActuelle(0);
    setScore(0);
    setReponseChoisie(null);
    setReponses([]);
    setTermine(false);
    setDemarre(true);
  };

  const choisirAutreMatiere = () => {
    setDemarre(false);
    setQuestionsQuiz([]);
    setQuestionActuelle(0);
    setScore(0);
    setReponseChoisie(null);
    setReponses([]);
    setTermine(false);
  };

  const choisirReponse = (index) => {
    if (reponseChoisie !== null) {
      return;
    }

    setReponseChoisie(index);

    const correcte =
      index === question.reponse;

    if (correcte) {
      setScore((valeur) => valeur + 1);
    }

    setReponses((anciennesReponses) => [
      ...anciennesReponses,
      {
        questionId: question.id,
        correcte,
      },
    ]);
  };

  const suivante = () => {
    if (
      questionActuelle ===
      questionsQuiz.length - 1
    ) {
      const resultatFinal = consoliderResultatsEvaluation(
        reponses,
        questionsQuiz.length
      );
      const reponsesFinales = resultatFinal.reponses;

      try {
        const resultat = {
          ...resultatFinal,
          date: new Date().toISOString(),
        };

        localStorage.setItem(
          QUIZ_RESULT_KEY,
          JSON.stringify(resultat)
        );

        const historiqueExistant = JSON.parse(
          localStorage.getItem(QUIZ_HISTORY_KEY) || "[]"
        );

        const historiqueValide = Array.isArray(historiqueExistant)
          ? historiqueExistant
          : [];

        const nouvelHistorique = [
          resultat,
          ...historiqueValide,
        ].slice(0, 20);

        localStorage.setItem(
          QUIZ_HISTORY_KEY,
          JSON.stringify(nouvelHistorique)
        );
      } catch (error) {
        console.error(
          "Impossible d'enregistrer le résultat du quiz :",
          error
        );
      }

      setScore(resultatFinal.score);
      setReponses(reponsesFinales);
      setTermine(true);

      return;
    }

    setQuestionActuelle(
      (valeur) => valeur + 1
    );

    setReponseChoisie(null);
  };

  const recommencer = () => {
    commencerQuiz();
  };

  const pourcentage =
    questionsQuiz.length > 0
      ? Math.round(
          (score / questionsQuiz.length) * 100
        )
      : 0;

  if (!demarre) {
    return (
      <main className="container">
        <Link to="/formation" className="back-link">
          ← Formation
        </Link>

        <section className="welcome">
          <div className="module-icon">📝</div>
          <h1>Quiz par matière</h1>
          <p>
            Entraîne-toi sur un domaine précis avec une correction et
            une explication après chaque réponse.
          </p>
        </section>

        <section className="card quiz-setup">
          <label htmlFor="quiz-categorie">Choisis une matière</label>
          <select
            id="quiz-categorie"
            value={categorieSelectionnee}
            onChange={(event) =>
              setCategorieSelectionnee(event.target.value)
            }
          >
            <option value="Toutes">Toutes les matières</option>
            {categories.map((categorie) => (
              <option key={categorie} value={categorie}>
                {categorie}
              </option>
            ))}
          </select>

          <p aria-live="polite">
            {nombreQuestionsDisponibles} question
            {nombreQuestionsDisponibles === 1 ? "" : "s"} disponible
            {nombreQuestionsDisponibles === 1 ? "" : "s"} ; jusqu'à 10
            seront tirées au hasard.
          </p>

          <button
            type="button"
            onClick={commencerQuiz}
            disabled={nombreQuestionsDisponibles === 0}
          >
            Commencer l'entraînement
          </button>
        </section>
      </main>
    );
  }

  if (questionsQuiz.length === 0) {
    return (
      <div className="container">
        <Link
          to="/formation"
          className="back-link"
        >
          ← Formation
        </Link>

        <section className="card">
          <h1>Quiz indisponible</h1>

          <p>
            Aucune question n'est actuellement
            disponible.
          </p>
        </section>
      </div>
    );
  }

  if (termine) {
    return (
      <div className="container">
        <Link
          to="/formation"
          className="back-link"
        >
          ← Formation
        </Link>

        <section className="welcome">
          <div className="module-icon">
            🏆
          </div>

          <h1>Quiz terminé</h1>

          <p>
            Voici ton résultat final.
          </p>
        </section>

        <section className="card">
          <div className="empty-content">
            <div>🎯</div>

            <h2>
              {score} / {questionsQuiz.length}
            </h2>

            <h1>
              {pourcentage} %
            </h1>

            <p>
              {pourcentage >= 80
                ? "Excellent travail !"
                : pourcentage >= 50
                ? "Bon travail. Continue à réviser pour progresser."
                : "Continue à apprendre et à t'entraîner."}
            </p>

            <button
              type="button"
              onClick={recommencer}
            >
              🔄 Refaire ce quiz
            </button>
            <button
              type="button"
              onClick={choisirAutreMatiere}
            >
              Choisir une autre matière
            </button>
          </div>
        </section>

        <section className="card">
          <h2>📊 Bilan</h2>

          <p>
            Bonnes réponses :{" "}
            <strong>{score}</strong>
          </p>

          <p>
            Mauvaises réponses :{" "}
            <strong>
              {questionsQuiz.length - score}
            </strong>
          </p>

        </section>
      </div>
    );
  }

  return (
    <div className="container">
      <Link
        to="/formation"
        className="back-link"
      >
        ← Formation
      </Link>

      <section className="welcome">
        <div className="module-icon">
          📝
        </div>

      <h1>
        {categorieSelectionnee === "Toutes"
          ? "Quiz GEO ZONE"
          : `Quiz : ${categorieSelectionnee}`}
      </h1>

      <p>
        {categorieSelectionnee === "Toutes"
          ? "Teste tes connaissances dans plusieurs domaines de la géologie."
          : `Teste tes connaissances en ${categorieSelectionnee}. Une explication accompagne chaque réponse.`}
      </p>
      </section>

      <section className="card">
        <div className="course-chapters-heading">
          <div>
            <span>QUESTION</span>

            <h2>
              {questionActuelle + 1} /{" "}
              {questionsQuiz.length}
            </h2>
          </div>

          <span className="course-chapter-count">
            Score : {score}
          </span>
        </div>

        <div className="progress-section">
          <div className="progress-top">
            <span>Progression</span>

            <strong>
              {Math.round(
                ((questionActuelle + 1) /
                  questionsQuiz.length) *
                  100
              )}
              %
            </strong>
          </div>

          <div
            className="progress-bar"
            aria-label={`Progression ${
              questionActuelle + 1
            } sur ${questionsQuiz.length}`}
          >
            <div
              className="progress-fill"
              style={{
                width: `${
                  ((questionActuelle + 1) /
                    questionsQuiz.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </section>

      <section className="card">
        <span className="section-badge">
          {question.categorie}
        </span>

        <h2>{question.question}</h2>

        <div className="formation-grid">
          {question.options.map(
            (option, index) => {
              const selectionnee =
                reponseChoisie === index;

              const correcte =
                index === question.reponse;

              let classe =
                "formation-card";

              if (
                reponseChoisie !== null &&
                correcte
              ) {
                classe +=
                  " quiz-answer-correct";
              }

              if (
                selectionnee &&
                !correcte
              ) {
                classe +=
                  " quiz-answer-wrong";
              }

              return (
                <button
                  type="button"
                  className={classe}
                  key={option}
                  onClick={() =>
                    choisirReponse(index)
                  }
                  disabled={
                    reponseChoisie !== null
                  }
                >
                  <div className="formation-card-top">
                    <div className="formation-card-icon">
                      {String.fromCharCode(
                        65 + index
                      )}
                    </div>
                  </div>

                  <div className="formation-card-content">
                    <h3>{option}</h3>
                  </div>
                </button>
              );
            }
          )}
        </div>

        {reponseChoisie !== null && (
          <div className="card">
            <h3>
              {reponseChoisie ===
              question.reponse
                ? "✅ Bonne réponse !"
                : "❌ Mauvaise réponse"}
            </h3>

            <p>
              {question.explication}
            </p>

            <button
              type="button"
              onClick={suivante}
            >
              {questionActuelle ===
              questionsQuiz.length - 1
                ? "🏆 Voir mon résultat"
                : "Question suivante →"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Quiz;
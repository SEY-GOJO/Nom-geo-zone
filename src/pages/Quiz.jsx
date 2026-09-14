import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import questions from "../data/questions";

function Quiz() {
  const nombreQuestions = 10;

  const questionsQuiz = useMemo(() => {
    const melange = [...questions].sort(
      () => Math.random() - 0.5
    );

    return melange.slice(
      0,
      Math.min(nombreQuestions, questions.length)
    );
  }, []);

  const [questionActuelle, setQuestionActuelle] =
    useState(0);

  const [score, setScore] = useState(0);

  const [reponseChoisie, setReponseChoisie] =
    useState(null);

  const [termine, setTermine] = useState(false);

  const [reponses, setReponses] = useState([]);

  const question = questionsQuiz[questionActuelle];

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
    if (questionActuelle === questionsQuiz.length - 1) {
      setTermine(true);
      return;
    }

    setQuestionActuelle(
      (valeur) => valeur + 1
    );

    setReponseChoisie(null);
  };

  const recommencer = () => {
    window.location.reload();
  };

  const pourcentage =
    questionsQuiz.length > 0
      ? Math.round(
          (score / questionsQuiz.length) * 100
        )
      : 0;

  if (questionsQuiz.length === 0) {
    return (
      <div className="container">
        <Link to="/formation" className="back-link">
          ← Formation
        </Link>

        <section className="card">
          <h1>Quiz indisponible</h1>

          <p>
            Aucune question n'est actuellement disponible.
          </p>
        </section>
      </div>
    );
  }

  if (termine) {
    return (
      <div className="container">
        <Link to="/formation" className="back-link">
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
              🔄 Recommencer
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

          <p>
            Taux de réussite :{" "}
            <strong>{pourcentage} %</strong>
          </p>

          <p>
            Questions répondues :{" "}
            <strong>{reponses.length}</strong>
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/formation" className="back-link">
        ← Formation
      </Link>

      <section className="welcome">
        <div className="module-icon">
          📝
        </div>

        <h1>Quiz GEO ZONE</h1>

        <p>
          Teste tes connaissances en géologie, minéralogie,
          hydrogéologie et géologie minière.
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
              {reponseChoisie === question.reponse
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
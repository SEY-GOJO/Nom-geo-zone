import { Link } from "react-router-dom";
import { useState } from "react";

import questions from "../data/questions";

const EVALUATION_RESULT_KEY =
  "geo-zone:evaluation-result:v1";
  const EVALUATION_HISTORY_KEY =
  "geo-zone:evaluation-history:v1";

function melangerQuestions(liste) {
  const resultat = [...liste];

  for (let i = resultat.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [resultat[i], resultat[j]] = [
      resultat[j],
      resultat[i],
    ];
  }

  return resultat;
}

function Evaluation() {
  const nombreQuestions = Math.min(
    10,
    questions.length
  );

  const [questionsEvaluation] = useState(() =>
    melangerQuestions(questions).slice(
      0,
      nombreQuestions
    )
  );

  const [questionActuelle, setQuestionActuelle] =
    useState(0);

  const [reponseChoisie, setReponseChoisie] =
    useState(null);

  const [score, setScore] = useState(0);

  const [resultats, setResultats] = useState([]);

  const [terminee, setTerminee] = useState(false);

  const question =
    questionsEvaluation[questionActuelle];

  const choisirReponse = (index) => {
    if (reponseChoisie !== null) {
      return;
    }

    const correcte =
      index === question.reponse;

    setReponseChoisie(index);

    if (correcte) {
      setScore(
        (valeur) => valeur + 1
      );
    }

    setResultats(
      (anciensResultats) => [
        ...anciensResultats,
        {
          questionId: question.id,
          categorie: question.categorie,
          correcte,
        },
      ]
    );
  };

  const suivante = () => {
    if (
      questionActuelle ===
      questionsEvaluation.length - 1
    ) {
      const derniereReponseCorrecte =
        reponseChoisie === question.reponse;

      const scoreFinal =
        score +
        (derniereReponseCorrecte ? 1 : 0);

      const resultatsFinaux = [
        ...resultats,
        {
          questionId: question.id,
          categorie: question.categorie,
          correcte:
            derniereReponseCorrecte,
        },
      ];

      const pourcentageFinal =
        questionsEvaluation.length > 0
          ? Math.round(
              (scoreFinal /
                questionsEvaluation.length) *
                100
            )
          : 0;

      const bilanCategoriesFinal = {};

      resultatsFinaux.forEach(
        (resultat) => {
          if (
            !bilanCategoriesFinal[
              resultat.categorie
            ]
          ) {
            bilanCategoriesFinal[
              resultat.categorie
            ] = {
              total: 0,
              bonnes: 0,
            };
          }

          bilanCategoriesFinal[
            resultat.categorie
          ].total += 1;

          if (resultat.correcte) {
            bilanCategoriesFinal[
              resultat.categorie
            ].bonnes += 1;
          }
        }
      );

      const categoriesTrieesFinal =
        Object.entries(
          bilanCategoriesFinal
        ).sort((a, b) => {
          const scoreA =
            a[1].bonnes /
            a[1].total;

          const scoreB =
            b[1].bonnes /
            b[1].total;

          return scoreA - scoreB;
        });

      const domainesARevoirFinal =
        categoriesTrieesFinal
          .filter(
            ([, valeurs]) =>
              valeurs.bonnes /
                valeurs.total <
              0.6
          )
          .map(([nom]) => nom);

      try {
  const resultat = {
    score: scoreFinal,
    total: questionsEvaluation.length,
    pourcentage: pourcentageFinal,
    resultats: resultatsFinaux,
    bilanCategories: bilanCategoriesFinal,
    categoriesTriees: categoriesTrieesFinal,
    domainesARevoir: domainesARevoirFinal,
    date: new Date().toISOString(),
  };

  localStorage.setItem(
    EVALUATION_RESULT_KEY,
    JSON.stringify(resultat)
  );

  const historiqueExistant = JSON.parse(
    localStorage.getItem(EVALUATION_HISTORY_KEY) || "[]"
  );

  const historiqueValide = Array.isArray(historiqueExistant)
    ? historiqueExistant
    : [];

  const nouvelHistorique = [
    resultat,
    ...historiqueValide,
  ].slice(0, 20);

  localStorage.setItem(
    EVALUATION_HISTORY_KEY,
    JSON.stringify(nouvelHistorique)
  );
} catch (error) {
  console.error(
    "Impossible d'enregistrer le résultat de l'évaluation :",
    error
  );
}

      setScore(scoreFinal);
      setResultats(resultatsFinaux);
      setTerminee(true);

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
    questionsEvaluation.length > 0
      ? Math.round(
          (score /
            questionsEvaluation.length) *
            100
        )
      : 0;

  const bilanCategories = {};

  resultats.forEach((resultat) => {
    if (
      !bilanCategories[resultat.categorie]
    ) {
      bilanCategories[resultat.categorie] = {
        total: 0,
        bonnes: 0,
      };
    }

    bilanCategories[
      resultat.categorie
    ].total += 1;

    if (resultat.correcte) {
      bilanCategories[
        resultat.categorie
      ].bonnes += 1;
    }
  });

  const categoriesTriees =
    Object.entries(
      bilanCategories
    ).sort((a, b) => {
      const scoreA =
        a[1].bonnes /
        a[1].total;

      const scoreB =
        b[1].bonnes /
        b[1].total;

      return scoreA - scoreB;
    });

  const domainesARevoir =
    categoriesTriees
      .filter(
        ([, valeurs]) =>
          valeurs.bonnes /
            valeurs.total <
          0.6
      )
      .map(([nom]) => nom);

  const niveau =
    pourcentage >= 80
      ? "Excellent"
      : pourcentage >= 60
      ? "Bon niveau"
      : pourcentage >= 40
      ? "Niveau moyen"
      : "À renforcer";

  if (questionsEvaluation.length === 0) {
    return (
      <div className="container">
        <Link
          to="/formation"
          className="back-link"
        >
          ← Formation
        </Link>

        <section className="card">
          <h1>
            Évaluation indisponible
          </h1>

          <p>
            Aucune question n'est actuellement
            disponible.
          </p>
        </section>
      </div>
    );
  }

  if (terminee) {
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
            🎯
          </div>

          <h1>
            Évaluation terminée
          </h1>

          <p>
            Voici ton diagnostic.
          </p>
        </section>

        <section className="card">
          <div className="empty-content">
            <div>📊</div>

            <h2>{niveau}</h2>

            <h1>
              {score} /{" "}
              {questionsEvaluation.length}
            </h1>

            <h1>
              {pourcentage}%
            </h1>

            <p>
              {pourcentage >= 80
                ? "Tes connaissances sont solides."
                : pourcentage >= 60
                ? "Tu as de bonnes bases. Quelques notions peuvent encore être renforcées."
                : pourcentage >= 40
                ? "Certaines notions sont acquises, mais plusieurs points méritent une révision."
                : "Une révision générale est recommandée avant de poursuivre."}
            </p>
          </div>
        </section>

        <section className="card">
          <h2>
            📚 Domaines évalués
          </h2>

          {categoriesTriees.length > 0 ? (
            categoriesTriees.map(
              ([nom, valeurs]) => {
                const pourcentageCategorie =
                  Math.round(
                    (valeurs.bonnes /
                      valeurs.total) *
                      100
                  );

                return (
                  <div
                    key={nom}
                    className="progress-section"
                  >
                    <div className="progress-top">
                      <span>{nom}</span>

                      <strong>
                        {pourcentageCategorie}%
                      </strong>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${pourcentageCategorie}%`,
                        }}
                      />
                    </div>

                    <p>
                      {valeurs.bonnes} bonne
                      {valeurs.bonnes > 1
                        ? "s"
                        : ""}{" "}
                      réponse
                      {valeurs.bonnes > 1
                        ? "s"
                        : ""}{" "}
                      sur{" "}
                      {valeurs.total}
                    </p>
                  </div>
                );
              }
            )
          ) : (
            <p>
              Aucun bilan disponible.
            </p>
          )}
        </section>

        <section className="card">
          <h2>
            🧠 À renforcer
          </h2>

          {domainesARevoir.length > 0 ? (
            <>
              <p>
                Les domaines suivants méritent
                une attention particulière :
              </p>

              {domainesARevoir.map(
                (domaine) => (
                  <p key={domaine}>
                    •{" "}
                    <strong>
                      {domaine}
                    </strong>
                  </p>
                )
              )}
            </>
          ) : (
            <p>
              Aucun domaine faible détecté dans
              cette évaluation. Continue à entretenir
              tes connaissances.
            </p>
          )}
        </section>

        <section className="card">
          <button
            type="button"
            onClick={recommencer}
          >
            🔄 Refaire l'évaluation
          </button>

          <Link
            to="/revision"
            className="chapter-next-link"
          >
            Aller à la révision
            <span>→</span>
          </Link>
        </section>
      </div>
    );
  }

  const progression =
    Math.round(
      ((questionActuelle + 1) /
        questionsEvaluation.length) *
        100
    );

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
          🎯
        </div>

        <h1>Évaluation</h1>

        <p>
          Mesure ton niveau dans plusieurs domaines
          de la géologie et identifie les notions
          à renforcer.
        </p>
      </section>

      <section className="card">
        <div className="course-chapters-heading">
          <div>
            <span>DIAGNOSTIC</span>

            <h2>
              Question{" "}
              {questionActuelle + 1} /{" "}
              {questionsEvaluation.length}
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
              {progression}%
            </strong>
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
                ? "✅ Bonne réponse"
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
              questionsEvaluation.length - 1
                ? "🎯 Voir mon évaluation"
                : "Question suivante →"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Evaluation;
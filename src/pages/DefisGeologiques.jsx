import { useState } from "react";
import { Link } from "react-router-dom";
import defisGeologiques from "../data/defisGeologiques";

function DefisGeologiques() {
  const [defiActuel, setDefiActuel] = useState(0);
  const [reponseChoisie, setReponseChoisie] = useState(null);
  const [score, setScore] = useState(0);
  const [termine, setTermine] = useState(false);
  const defi = defisGeologiques[defiActuel];

  const choisirReponse = (index) => {
    if (reponseChoisie !== null) {
      return;
    }

    setReponseChoisie(index);

    if (index === defi.reponse) {
      setScore((valeur) => valeur + 1);
    }
  };

  const suivant = () => {
    if (defiActuel === defisGeologiques.length - 1) {
      setTermine(true);
      return;
    }

    setDefiActuel((valeur) => valeur + 1);
    setReponseChoisie(null);
  };

  const recommencer = () => {
    setDefiActuel(0);
    setReponseChoisie(null);
    setScore(0);
    setTermine(false);
  };

  return (
    <main className="container">
      <Link to="/formation" className="back-link">
        ← Formation
      </Link>

      <section className="welcome">
        <div className="module-icon" aria-hidden="true">🏆</div>
        <h1>Défis géologiques</h1>
        <p>
          Résous des situations courtes en minéralogie, géomorphologie,
          géochimie, hydrogéologie et exploration.
        </p>
      </section>

      {termine ? (
        <section className="card">
          <div className="empty-content">
            <div>🎯</div>
            <h2>Défi terminé</h2>
            <h1>{score} / {defisGeologiques.length}</h1>
            <p>
              {score === defisGeologiques.length
                ? "Excellent ! Tu as relevé tous les défis."
                : score >= defisGeologiques.length / 2
                ? "Bien joué ! Continue à consolider tes connaissances."
                : "Chaque explication est une occasion de progresser."}
            </p>
            <button type="button" onClick={recommencer}>
              Recommencer les défis
            </button>
          </div>
        </section>
      ) : (
        <>
          <section className="card">
            <div className="course-chapters-heading">
              <div>
                <span>DÉFI {defiActuel + 1}</span>
                <h2>{defiActuel + 1} / {defisGeologiques.length}</h2>
              </div>
              <span className="course-chapter-count">Score : {score}</span>
            </div>
            <div className="progress-section">
              <div className="progress-top">
                <span>Progression</span>
                <strong>
                  {Math.round(((defiActuel + 1) / defisGeologiques.length) * 100)}%
                </strong>
              </div>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax={defisGeologiques.length}
                aria-valuenow={defiActuel + 1}
              >
                <div
                  className="progress-fill"
                  style={{
                    width: `${((defiActuel + 1) / defisGeologiques.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </section>

          <section className="card">
            <span className="section-badge">{defi.domaine}</span>
            <h2>{defi.situation}</h2>
            <div className="formation-grid">
              {defi.options.map((option, index) => {
                const classe =
                  reponseChoisie === null
                    ? "formation-card"
                    : index === defi.reponse
                    ? "formation-card quiz-answer-correct"
                    : index === reponseChoisie
                    ? "formation-card quiz-answer-wrong"
                    : "formation-card";

                return (
                  <button
                    type="button"
                    className={classe}
                    key={option}
                    onClick={() => choisirReponse(index)}
                    disabled={reponseChoisie !== null}
                  >
                    <div className="formation-card-content">
                      <h3>{option}</h3>
                    </div>
                  </button>
                );
              })}
            </div>

            {reponseChoisie !== null && (
              <div className="card" aria-live="polite">
                <h3>
                  {reponseChoisie === defi.reponse
                    ? "✅ Bonne réponse !"
                    : "❌ Ce n'est pas la bonne réponse"}
                </h3>
                <p>{defi.explication}</p>
                <button type="button" onClick={suivant}>
                  {defiActuel === defisGeologiques.length - 1
                    ? "Voir mon résultat"
                    : "Défi suivant →"}
                </button>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default DefisGeologiques;

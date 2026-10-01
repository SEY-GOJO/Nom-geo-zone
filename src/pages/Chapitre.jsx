import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import cours from "../data/cours";
import { analyserContenuChapitre } from "../utils/courseReading";

function Chapitre() {
  const {
    categorieId,
    id,
    chapitreId,
  } = useParams();

  const coursActuel = cours.find(
    (element) => element.id === Number(id)
  );

  const chapitreIndex = coursActuel
    ? coursActuel.chapitres.findIndex(
        (chapitre) => chapitre.id === Number(chapitreId)
      )
    : -1;

  const progressKey = `geo-zone:course-progress:${id}`;

  const [chapitreValide, setChapitreValide] = useState(() => {
    if (!coursActuel || chapitreIndex === -1) {
      return false;
    }

    try {
      const progressionExistante =
        localStorage.getItem(progressKey);

      if (!progressionExistante) {
        return false;
      }

      const progressionParsee = JSON.parse(
        progressionExistante
      );

      return (
        Array.isArray(progressionParsee) &&
        progressionParsee.includes(Number(chapitreId))
      );
    } catch (error) {
      console.error(
        "Impossible de restaurer la validation du chapitre :",
        error
      );
      return false;
    }
  });

  const chapitre =
    coursActuel && chapitreIndex !== -1
      ? coursActuel.chapitres[chapitreIndex]
      : null;

  const analyseContenu = useMemo(
    () => analyserContenuChapitre(chapitre?.contenu || ""),
    [chapitre?.contenu]
  );

  const cartesVisuelles = [
    {
      icon: "🔍",
      titre: "Observation",
      texte: `Repère les éléments essentiels dans ${chapitre.titre.toLowerCase()}.`,
    },
    {
      icon: "🧭",
      titre: "Méthode",
      texte: "Relie le concept aux définitions et aux exemples pour mieux mémoriser.",
    },
    {
      icon: "✅",
      titre: "À retenir",
      texte:
        analyseContenu.pointsCle[0] ||
        "Le point clé de ce chapitre est à mémoriser pour la suite.",
    },
  ];

  const schemaExplicatif = [
    { label: "Concept", icon: "💡" },
    { label: "Exemple", icon: "🧪" },
    { label: "Application", icon: "📌" },
  ];

  if (!coursActuel) {
    return (
      <div className="container">
        <div className="card error-card">
          <div className="error-icon">📚</div>

          <h1>Cours introuvable</h1>

          <p>
            Le cours demandé n'existe pas ou n'est plus
            disponible.
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

  const totalChapitres =
    coursActuel.chapitres.length;

  const progression = Math.round(
    ((chapitreIndex + 1) / totalChapitres) * 100
  );

  const chapitrePrecedent =
    chapitreIndex > 0
      ? coursActuel.chapitres[
          chapitreIndex - 1
        ]
      : null;

  const chapitreSuivant =
    chapitreIndex < totalChapitres - 1
      ? coursActuel.chapitres[
          chapitreIndex + 1
        ]
      : null;

  const baseUrl =
    `/bibliotheque/${categorieId}/cours/${id}`;

  const lignesContenu = chapitre.contenu
    ? chapitre.contenu.split("\n")
    : [];

  const validerChapitre = () => {
    try {
      const progressionExistante =
        localStorage.getItem(progressKey);

      let chapitresTermines = [];

      if (progressionExistante) {
        const progressionParsee = JSON.parse(
          progressionExistante
        );

        if (Array.isArray(progressionParsee)) {
          chapitresTermines = progressionParsee;
        }
      }

      const chapitreIdNumerique = Number(chapitreId);

      if (
        !chapitresTermines.includes(
          chapitreIdNumerique
        )
      ) {
        chapitresTermines.push(chapitreIdNumerique);
      }

      localStorage.setItem(
        progressKey,
        JSON.stringify(chapitresTermines)
      );

      setChapitreValide(true);
    } catch (error) {
      console.error(
        "Impossible d'enregistrer la validation du chapitre :",
        error
      );
    }
  };

  return (
    <div className="container chapter-page">
      <Link
        to={baseUrl}
        className="back-link"
      >
        ← Retour au cours
      </Link>

      <section className="chapter-hero">
        <div className="chapter-hero-top">
          <div className="chapter-hero-icon">
            📖
          </div>

          <span className="chapter-label">
            CHAPITRE{" "}
            {String(chapitreIndex + 1).padStart(
              2,
              "0"
            )}
          </span>
        </div>

        <p className="chapter-course-name">
          {coursActuel.titre}
        </p>

        <h1>{chapitre.titre}</h1>

        <div className="chapter-info">
          <span>
            📖 {chapitreIndex + 1} /{" "}
            {totalChapitres}
          </span>

          <span>
            🎓 GEO ZONE
          </span>

          <span>
            ✅ Progression enregistrée
          </span>
        </div>

        <div className="progress-section">
          <div className="progress-top">
            <span>
              Progression dans le cours
            </span>

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

        <div className="chapter-reader-summary">
          <div className="summary-pill">Résumé</div>
          <p>{analyseContenu.resume}</p>

          <div className="summary-objective">
            <strong>Objectif</strong>
            <p>{analyseContenu.objectif}</p>
          </div>

          {analyseContenu.pointsCle.length > 0 && (
            <div className="summary-points">
              <strong>Points clés</strong>
              <ul>
                {analyseContenu.pointsCle.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="chapter-visual-panel" aria-label="Illustration pédagogique du chapitre">
          <div className="visual-scene">
            <div className="visual-core">
              <span className="visual-badge">Leçon</span>
              <div className="visual-icon">📘</div>
              <h3>{chapitre.titre}</h3>
            </div>

            <div className="visual-flow">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
          </div>

          <div className="visual-cards">
            {cartesVisuelles.map((carte) => (
              <div className="visual-card" key={carte.titre}>
                <div className="visual-card-icon">{carte.icon}</div>
                <div>
                  <strong>{carte.titre}</strong>
                  <p>{carte.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chapter-diagram" aria-label="Schéma explicatif du chapitre">
          <div className="diagram-header">
            <span>Schéma</span>
            <strong>Comprendre le chapitre</strong>
          </div>

          <div className="diagram-track">
            {schemaExplicatif.map((step, index) => (
              <div className="diagram-step" key={step.label}>
                <div className="diagram-node">
                  <span>{step.icon}</span>
                  <strong>{step.label}</strong>
                </div>
                {index < schemaExplicatif.length - 1 && (
                  <div className="diagram-arrow" aria-hidden="true">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="content-body">
          {chapitre.contenu ? (
            lignesContenu.map((ligne, index) => {
              const texte = ligne.trim();
              const estListe = texte.startsWith("- ");
              const estEncadre = texte.startsWith("À retenir :");
              const estIntertitre =
                texte.length > 0 &&
                texte.length < 105 &&
                texte.endsWith(":") &&
                !estListe &&
                !estEncadre;

              if (!texte) {
                return <div key={index} className="content-space" />;
              }

              if (estEncadre) {
                return (
                  <aside key={index} className="lesson-takeaway">
                    <strong>À retenir</strong>
                    <p>{texte.replace("À retenir :", "").trim()}</p>
                  </aside>
                );
              }

              if (estIntertitre) {
                return <h3 key={index}>{texte.slice(0, -1)}</h3>;
              }

              return (
                <p
                  key={index}
                  className={estListe ? "lesson-list-item" : ""}
                >
                  {estListe ? texte.slice(2) : texte}
                </p>
              );
            })
          ) : (
            <div className="empty-content">
              <div>📚</div>

              <h3>
                Contenu bientôt disponible
              </h3>

              <p>
                Le contenu de ce chapitre sera
                bientôt ajouté à GEO ZONE.
              </p>
            </div>
          )}
        </div>
      </article>

      <div className="chapter-validation">
        <div>
          <strong>Lecture terminée ?</strong>
          <p>
            Valide ce chapitre pour enregistrer ta progression et passer à la suite.
          </p>
        </div>

        <button
          type="button"
          className="chapter-validate-button"
          onClick={validerChapitre}
          disabled={chapitreValide}
        >
          {chapitreValide ? "✓ Chapitre validé" : "Valider le chapitre"}
        </button>
      </div>

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
            <Link
              className="secondary-button"
              to={baseUrl}
            >
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
            <Link
              className="chapter-next-link"
              to={baseUrl}
            >
              ✓ Terminer
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chapitre;

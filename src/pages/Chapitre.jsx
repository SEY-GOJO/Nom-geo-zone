import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import cours from "../data/cours";
import {
  calculerProgressionCours,
  lireChapitresTermines,
  validerChapitre as enregistrerValidationChapitre,
} from "../utils/courseProgress";

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

  const etatProgressionCharge = useMemo(() => {
    if (!coursActuel) {
      return {
        coursId: null,
        chapitresTermines: [],
        messageErreur: "",
      };
    }

    try {
      return {
        coursId: coursActuel.id,
        chapitresTermines: lireChapitresTermines(
          coursActuel.id,
          coursActuel.chapitres
        ),
        messageErreur: "",
      };
    } catch (error) {
      console.error(
        "Impossible de restaurer la validation du chapitre :",
        error
      );
      return {
        coursId: coursActuel.id,
        chapitresTermines: [],
        messageErreur:
          "La progression enregistrée n'a pas pu être lue sur cet appareil.",
      };
    }
  }, [coursActuel]);
  const [progressionModifiee, setProgressionModifiee] =
    useState(null);
  const etatProgression =
    progressionModifiee?.coursId === coursActuel?.id
      ? progressionModifiee
      : etatProgressionCharge;

  const chapitre =
    coursActuel && chapitreIndex !== -1
      ? coursActuel.chapitres[chapitreIndex]
      : null;

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

          <Link to="/bibliotheque" className="secondary-button">
            ← Retour à la bibliothèque
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
            className="secondary-button"
          >
            ← Retour au cours
          </Link>
        </div>
      </div>
    );
  }

  const totalChapitres =
    coursActuel.chapitres.length;

  const chapitreValide =
    etatProgression.chapitresTermines.includes(Number(chapitreId));
  const progression = calculerProgressionCours(
    coursActuel.chapitres,
    etatProgression.chapitresTermines
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

  const blocsContenu = [];

  for (let index = 0; index < lignesContenu.length; index += 1) {
    const texte = lignesContenu[index].trim();

    if (!texte) {
      continue;
    }

    if (texte.startsWith("- ")) {
      const elements = [];

      while (
        index < lignesContenu.length &&
        lignesContenu[index].trim().startsWith("- ")
      ) {
        elements.push(lignesContenu[index].trim().slice(2));
        index += 1;
      }

      index -= 1;
      blocsContenu.push(
        <ul className="chapter-list" key={`liste-${index}`}>
          {elements.map((element, elementIndex) => (
            <li key={`${index}-${elementIndex}`}>{element}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (texte.startsWith("À retenir :")) {
      blocsContenu.push(
        <aside key={index} className="lesson-takeaway">
          <strong>À retenir</strong>
          <p>{texte.replace("À retenir :", "").trim()}</p>
        </aside>
      );
      continue;
    }

    if (texte.length < 105 && texte.endsWith(":")) {
      blocsContenu.push(
        <h3 key={index}>{texte.slice(0, -1)}</h3>
      );
      continue;
    }

    blocsContenu.push(<p key={index}>{texte}</p>);
  }

  const validerChapitreActuel = () => {
    try {
      const chapitresTermines = enregistrerValidationChapitre(
        coursActuel.id,
        Number(chapitreId),
        coursActuel.chapitres
      );

      setProgressionModifiee({
        coursId: coursActuel.id,
        chapitresTermines,
        messageErreur: "",
      });
    } catch (error) {
      console.error(
        "Impossible d'enregistrer la validation du chapitre :",
        error
      );
      setProgressionModifiee((etatActuel) => ({
        ...etatActuel,
        coursId: coursActuel.id,
        messageErreur:
          "La progression n'a pas pu être enregistrée. Vérifie les réglages de stockage de ton navigateur.",
      }));
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
            {chapitreValide ? "✅ Chapitre terminé" : "À terminer"}
          </span>
        </div>

        <div className="progress-section">
          <div className="progress-top">
            <span>
              Chapitres terminés dans ce cours
            </span>

            <strong>{progression.pourcentage}%</strong>
          </div>

          <div
            className="progress-bar"
            role="progressbar"
            aria-label="Progression du cours"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progression.pourcentage}
          >
            <div
              className="progress-fill"
              style={{
                width: `${progression.pourcentage}%`,
              }}
            />
          </div>
          <p className="chapter-progress-count">
            {progression.nombreTermines} sur {totalChapitres} chapitres
            terminés
          </p>
        </div>
      </section>

      <article className="chapter-reading-card">
        <header className="chapter-reading-header">
          <div className="content-icon">
            📚
          </div>

          <div>
            <span>LEÇON {chapitreIndex + 1}</span>
            <h2>Lecture du chapitre</h2>
          </div>
        </header>

        <div className="content-body">
          {chapitre.contenu ? (
            blocsContenu
          ) : (
            <div className="empty-content">
              <h3>Aucun contenu disponible</h3>

              <p>
                Ce chapitre n'a pas encore de contenu. Reviens plus tard
                ou choisis une autre leçon du cours.
              </p>
            </div>
          )}
        </div>
      </article>

      <div className="chapter-validation">
        <div>
          <strong>
            {chapitre.contenu?.trim()
              ? "Lecture terminée ?"
              : "Leçon indisponible"}
          </strong>
          <p>
            {chapitre.contenu?.trim()
              ? "Marque cette leçon comme terminée pour mettre à jour ta progression."
              : "Cette leçon ne peut pas être validée tant que son contenu n'est pas disponible."}
          </p>
        </div>

        <button
          type="button"
          className="chapter-validate-button"
          onClick={validerChapitreActuel}
          disabled={chapitreValide || !chapitre.contenu?.trim()}
        >
          {chapitreValide
            ? "✓ Chapitre validé"
            : chapitre.contenu?.trim()
              ? "Valider le chapitre"
              : "Contenu indisponible"}
        </button>
      </div>
      {etatProgression.messageErreur && (
        <p className="chapter-progress-error" role="alert">
          {etatProgression.messageErreur}
        </p>
      )}

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

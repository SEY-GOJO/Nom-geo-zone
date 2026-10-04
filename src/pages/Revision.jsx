import { Link } from "react-router-dom";
import { useState } from "react";

import categories from "../data/categories";
import cours from "../data/cours";
import { analyserContenuChapitre } from "../utils/courseReading";

function Revision() {
  const [recherche, setRecherche] = useState("");
  const [carteActuelle, setCarteActuelle] = useState(0);
  const [versoVisible, setVersoVisible] = useState(false);
  const [categorieSelectionnee, setCategorieSelectionnee] =
    useState("Toutes");

  const texteNormalise = (valeur) =>
    String(valeur ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase()
      .trim();

  const coursFiltres = cours.filter((coursActuel) => {
    const texteRecherche = texteNormalise(recherche);

    const correspondRecherche =
      texteRecherche === "" ||
      texteNormalise([
        coursActuel.titre,
        coursActuel.matiere,
        coursActuel.description,
        ...(coursActuel.chapitres || []).flatMap((chapitre) => [
          chapitre.titre,
          chapitre.contenu,
        ]),
      ].join(" ")).includes(texteRecherche);

    const correspondCategorie =
      categorieSelectionnee === "Toutes" ||
      coursActuel.categorieId ===
        Number(categorieSelectionnee);

    return (
      correspondRecherche &&
      correspondCategorie
    );
  });

  const reinitialiser = () => {
    setRecherche("");
    setCategorieSelectionnee("Toutes");
    setCarteActuelle(0);
    setVersoVisible(false);
  };

  const cartesMemoire = cours.flatMap((coursActuel) =>
    categorieSelectionnee === "Toutes" ||
    coursActuel.categorieId === Number(categorieSelectionnee)
      ? (coursActuel.chapitres || []).map((chapitre) => ({
          id: `${coursActuel.id}-${chapitre.id}`,
          cours: coursActuel.titre,
          coursId: coursActuel.id,
          categorieId: coursActuel.categorieId,
          chapitreId: chapitre.id,
          titre: chapitre.titre,
          contenu: analyserContenuChapitre(
            chapitre.contenu || ""
          ).resume,
        }))
      : []
  );

  const carte = cartesMemoire[carteActuelle];

  const carteSuivante = () => {
    setCarteActuelle((index) => (index + 1) % cartesMemoire.length);
    setVersoVisible(false);
  };

  const cartePrecedente = () => {
    setCarteActuelle(
      (index) =>
        (index - 1 + cartesMemoire.length) %
        cartesMemoire.length
    );
    setVersoVisible(false);
  };

  return (
    <div className="container formation-page">
      <Link to="/" className="back-link">
        ← Accueil
      </Link>

      <section className="formation-hero">
        <div className="formation-hero-icon">
          🧠
        </div>

        <div className="formation-hero-content">
          <span>ESPACE D'APPRENTISSAGE</span>

          <h1>Révision</h1>

          <p>
            Recherche dans le contenu des chapitres, puis révise
            les notions avec des cartes mémoire liées aux leçons.
          </p>
        </div>
      </section>

      <section className="formation-intro">
        <div className="formation-intro-icon">
          📖
        </div>

        <div>
          <span>RÉVISE EFFICACEMENT</span>

          <h2>Choisis ce que tu veux revoir</h2>

          <p>
            La recherche couvre les titres, les matières et le texte
            des chapitres. Le filtre de matière s'applique aussi aux cartes.
          </p>
        </div>
      </section>

      {carte && (
        <section className="card revision-flashcard">
          <span className="section-badge">CARTES MÉMOIRE</span>
          <h2>🧠 Révision express</h2>
          <p className="revision-flashcard-meta">
            {carte.cours} · carte {carteActuelle + 1} / {cartesMemoire.length}
          </p>

          <button
            type="button"
            className="revision-flashcard-face"
            onClick={() => setVersoVisible((visible) => !visible)}
            aria-pressed={versoVisible}
          >
            <span>{versoVisible ? "RÉPONSE" : "NOTION À RETENIR"}</span>
            <strong>{versoVisible ? carte.contenu : carte.titre}</strong>
            <small>Cliquer pour {versoVisible ? "revoir la notion" : "voir le rappel"}</small>
          </button>

          <div className="revision-flashcard-actions">
            <button type="button" onClick={cartePrecedente}>
              ← Précédente
            </button>
            <Link
              className="chapter-link"
              to={`/bibliotheque/${carte.categorieId}/cours/${carte.coursId}/chapitre/${carte.chapitreId}`}
            >
              Ouvrir le chapitre →
            </Link>
            <button type="button" onClick={carteSuivante}>
              Suivante →
            </button>
          </div>
        </section>
      )}

      <section className="identification-panel">
        <div className="identification-panel-header">
          <div className="identification-small-icon">
            🔎
          </div>

          <div>
            <span>RECHERCHE</span>

            <h2>Rechercher un cours</h2>

            <p>
              Recherche aussi dans le contenu des chapitres.
            </p>
          </div>
        </div>

        <div className="identification-filters">
          <div className="identification-filter">
            <label htmlFor="revision-recherche">
              🔎 Cours ou notion
            </label>

            <input
              className="search"
              id="revision-recherche"
              type="search"
              placeholder="Exemple : flottation, RQD, ventilation..."
              value={recherche}
              onChange={(event) =>
                setRecherche(event.target.value)
              }
            />
          </div>

          <div className="identification-filter">
            <label htmlFor="revision-categorie">
              📚 Matière
            </label>

            <select
              id="revision-categorie"
              value={categorieSelectionnee}
              onChange={(event) => {
                setCategorieSelectionnee(event.target.value);
                setCarteActuelle(0);
                setVersoVisible(false);
              }}
            >
              <option value="Toutes">
                Toutes les matières
              </option>

              {categories.map((categorie) => (
                <option
                  key={categorie.id}
                  value={categorie.id}
                >
                  {categorie.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="identification-actions">
          <span className="identification-result-count">
            <strong>{coursFiltres.length}</strong>{" "}
            cours disponible
            {coursFiltres.length > 1 ? "s" : ""}
          </span>

          <button
            type="button"
            onClick={reinitialiser}
          >
            🔄 Réinitialiser
          </button>
        </div>
      </section>

      <section className="course-chapters">
        <div className="course-chapters-heading">
          <div>
            <span>RÉVISION</span>

            <h2>📚 Cours disponibles</h2>
          </div>

          <span className="course-chapter-count">
            {coursFiltres.length}
          </span>
        </div>

        {coursFiltres.length > 0 ? (
          <div className="course-chapters-grid">
            {coursFiltres.map(
              (coursActuel, index) => {
                const categorie = categories.find(
                  (element) =>
                    element.id ===
                    coursActuel.categorieId
                );

                return (
                  <article
                    className="chapter-card"
                    key={coursActuel.id}
                  >
                    <div className="chapter-top">
                      <div className="chapter-number">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      <span className="chapter-label">
                        {categorie?.nom ||
                          "Géologie"}
                      </span>
                    </div>

                    <div className="chapter-content">
                      <h3>
                        {coursActuel.titre}
                      </h3>

                      <p>
                        {coursActuel.description}
                      </p>

                      <p>
                        📖{" "}
                        {Array.isArray(
                          coursActuel.chapitres
                        )
                          ? coursActuel.chapitres.length
                          : 0}{" "}
                        chapitre
                        {Array.isArray(
                          coursActuel.chapitres
                        ) &&
                        coursActuel.chapitres.length > 1
                          ? "s"
                          : ""}
                      </p>
                    </div>

                    <Link
                      to={`/bibliotheque/${coursActuel.categorieId}/cours/${coursActuel.id}`}
                      className="chapter-link"
                    >
                      Réviser
                      <span>→</span>
                    </Link>
                  </article>
                );
              }
            )}
          </div>
        ) : (
          <div className="card">
            <div className="identification-empty">
              <div className="identification-empty-icon">
                🔎
              </div>

              <h2>Aucun cours trouvé</h2>

              <p>
                Aucun cours ne correspond à tes critères
                de recherche.
              </p>

              <button
                type="button"
                onClick={reinitialiser}
              >
                🔄 Réinitialiser
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Revision;

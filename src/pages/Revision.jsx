import { Link } from "react-router-dom";
import { useState } from "react";

import categories from "../data/categories";
import cours from "../data/cours";

function Revision() {
  const [recherche, setRecherche] = useState("");
  const [categorieSelectionnee, setCategorieSelectionnee] =
    useState("Toutes");

  const coursFiltres = cours.filter((coursActuel) => {
    const texteRecherche = recherche
      .toLowerCase()
      .trim();

    const correspondRecherche =
      texteRecherche === "" ||
      coursActuel.titre
        .toLowerCase()
        .includes(texteRecherche) ||
      coursActuel.description
        .toLowerCase()
        .includes(texteRecherche);

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
            Retrouvez rapidement les cours et les chapitres
            que tu veux revoir avant tes examens.
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
            Utilise la recherche ou sélectionne une matière
            pour retrouver rapidement les contenus disponibles.
          </p>
        </div>
      </section>

      <section className="identification-panel">
        <div className="identification-panel-header">
          <div className="identification-small-icon">
            🔎
          </div>

          <div>
            <span>RECHERCHE</span>

            <h2>Rechercher un cours</h2>

            <p>
              Recherche par titre, description ou matière.
            </p>
          </div>
        </div>

        <div className="identification-filters">
          <div className="identification-filter">
            <label htmlFor="revision-recherche">
              🔎 Cours
            </label>

            <input
              className="search"
              id="revision-recherche"
              type="search"
              placeholder="Exemple : pétrographie, cristallographie..."
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
              onChange={(event) =>
                setCategorieSelectionnee(
                  event.target.value
                )
              }
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
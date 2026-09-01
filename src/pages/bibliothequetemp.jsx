import { useState } from "react";
import { Link } from "react-router-dom";

import categories from "../data/categories";
import cours from "../data/cours";

function Bibliotheque() {
  const [recherche, setRecherche] = useState("");

  const categoriesFiltrees = categories.filter((categorie) =>
    categorie.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  const nombreCours = (categorieId) => {
    return cours.filter(
      (element) => element.categorieId === categorieId
    ).length;
  };

  const totalCours = cours.length;

  return (
    <div className="container library-page">

      <Link to="/" className="back-link">
        ← Accueil
      </Link>

      {/* HERO */}
      <section className="library-hero">

        <div className="library-hero-content">

          <span className="library-badge">
            GEO ZONE • RESSOURCES
          </span>

          <h1>
            📚 Bibliothèque
          </h1>

          <p>
            Explore les cours et ressources dédiés à la
            géologie, aux mines et aux sciences de la Terre.
          </p>

        </div>

        <div className="library-hero-icon">
          📖
        </div>

      </section>

      {/* STATISTIQUES */}
      <section className="library-stats">

        <div className="library-stat">
          <div className="library-stat-icon">
            📚
          </div>

          <div>
            <strong>{totalCours}</strong>
            <span>Cours</span>
          </div>
        </div>

        <div className="library-stat">
          <div className="library-stat-icon">
            🌍
          </div>

          <div>
            <strong>{categories.length}</strong>
            <span>Catégories</span>
          </div>
        </div>

        <div className="library-stat">
          <div className="library-stat-icon">
            🎓
          </div>

          <div>
            <strong>GEO</strong>
            <span>Plateforme</span>
          </div>
        </div>

      </section>

      {/* RECHERCHE */}
      <section className="library-search-section">

        <div>
          <span className="section-label">
            RECHERCHE
          </span>

          <h2>
            Trouve ton cours
          </h2>

          <p className="library-search-description">
            Recherche rapidement une catégorie ou une matière.
          </p>
        </div>

        <div className="library-search-wrapper">

          <span className="library-search-icon">
            🔎
          </span>

          <input
            className="search library-search"
            type="text"
            placeholder="Rechercher..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />

          {recherche && (
            <button
              className="clear-search"
              onClick={() => setRecherche("")}
              type="button"
            >
              ✕
            </button>
          )}

        </div>

      </section>

      {/* INFORMATION */}
      <section className="library-info">

        <div className="library-info-icon">
          🌍
        </div>

        <div>
          <h2>
            Ressources géologiques
          </h2>

          <p>
            Tes cours sont organisés par domaine pour
            faciliter ton apprentissage.
          </p>
        </div>

      </section>

      {/* TITRE DES CATÉGORIES */}
      <div className="library-section-title">

        <div>
          <span className="section-label">
            CATÉGORIES
          </span>

          <h2>
            Explore par domaine
          </h2>
        </div>

        <span className="category-count">
          {categoriesFiltrees.length}
          {categoriesFiltrees.length > 1
            ? " catégories"
            : " catégorie"}
        </span>

      </div>

      {/* CATÉGORIES */}
      {categoriesFiltrees.length > 0 ? (

        <div className="modules library-grid">

          {categoriesFiltrees.map((categorie) => {

            const totalCoursCategorie =
              nombreCours(categorie.id);

            return (
              <article
                className="card library-card"
                key={categorie.id}
              >

                <div className="library-card-top">

                  <div className="module-icon library-icon">
                    {categorie.icon}
                  </div>

                  <span className="library-card-number">
                    {String(categorie.id).padStart(2, "0")}
                  </span>

                </div>

                <h2>
                  {categorie.nom}
                </h2>

                <p className="library-card-description">
                  Cours et ressources de{" "}
                  {categorie.nom.toLowerCase()}.
                </p>

                <div className="library-card-footer">

                  <div className="course-count">

                    <span>
                      📚
                    </span>

                    <strong>
                      {totalCoursCategorie}
                    </strong>

                    <small>
                      {totalCoursCategorie > 1
                        ? "cours"
                        : "cours"}
                    </small>

                  </div>

                  {totalCoursCategorie > 0 ? (

                    <Link
                      to={`/bibliotheque/${categorie.id}`}
                      className="library-explore"
                    >
                      Explorer
                      <span>
                        →
                      </span>
                    </Link>

                  ) : (

                    <button
                      className="disabled-button"
                      type="button"
                    >
                      Bientôt
                    </button>

                  )}

                </div>

              </article>
            );
          })}

        </div>

      ) : (

        <div className="card library-empty">

          <div className="library-empty-icon">
            🔎
          </div>

          <h2>
            Aucun résultat
          </h2>

          <p>
            Aucune matière ne correspond à ta recherche.
          </p>

          <button
            type="button"
            onClick={() => setRecherche("")}
          >
            Réinitialiser
          </button>

        </div>
      )}

    </div>
  );
}

export default Bibliotheque;
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
        ← Retour à l'accueil
      </Link>

      <section className="library-hero">
        <div className="library-hero-content">
          <span className="library-badge">
            GEO ZONE • RESSOURCES
          </span>

          <h1>📚 Bibliothèque</h1>

          <p>
            Explore une collection de cours et de ressources
            dédiés à la géologie, aux mines et aux sciences de la Terre.
          </p>
        </div>

        <div className="library-hero-icon">
          📖
        </div>
      </section>

      <section className="library-stats">

        <div className="library-stat">
          <div className="library-stat-icon">📚</div>
          <div>
            <strong>{totalCours}</strong>
            <span>Cours disponibles</span>
          </div>
        </div>

        <div className="library-stat">
          <div className="library-stat-icon">🌍</div>
          <div>
            <strong>{categories.length}</strong>
            <span>Catégories</span>
          </div>
        </div>

        <div className="library-stat">
          <div className="library-stat-icon">🎓</div>
          <div>
            <strong>GEO ZONE</strong>
            <span>Plateforme éducative</span>
          </div>
        </div>

      </section>

      <section className="library-search-section">

        <div>
          <span className="section-label">
            EXPLORER LES RESSOURCES
          </span>

          <h2>
            Trouve rapidement ce que tu cherches
          </h2>

          <p>
            Recherche une catégorie ou une matière dans la bibliothèque.
          </p>
        </div>

        <div className="library-search-wrapper">
          <span className="library-search-icon">🔎</span>

          <input
            className="search library-search"
            type="text"
            placeholder="Rechercher une matière..."
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

      <section className="library-info">

        <div className="library-info-icon">
          🌍
        </div>

        <div>
          <h2>Ressources géologiques</h2>

          <p>
            GEO ZONE rassemble progressivement tes cours,
            documents, exercices et ressources dans une bibliothèque
            organisée par matière.
          </p>
        </div>

      </section>

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
          {categoriesFiltrees.length} catégorie
          {categoriesFiltrees.length > 1 ? "s" : ""}
        </span>
      </div>

      {categoriesFiltrees.length > 0 ? (
        <div className="modules library-grid">

          {categoriesFiltrees.map((categorie) => {
            const totalCoursCategorie = nombreCours(categorie.id);

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

                <p>
                  Explore les cours, documents et ressources
                  de {categorie.nom.toLowerCase()}.
                </p>

                <div className="library-card-footer">

                  <div className="course-count">
                    <span>📚</span>
                    <strong>{totalCoursCategorie}</strong>
                    <small>
                      cours
                      {totalCoursCategorie > 1 ? " disponibles" : " disponible"}
                    </small>
                  </div>

                  {totalCoursCategorie > 0 ? (
                    <Link
                      to={`/bibliotheque/${categorie.id}`}
                      className="library-explore"
                    >
                      Explorer
                      <span>→</span>
                    </Link>
                  ) : (
                    <button
                      className="disabled-button"
                      type="button"
                    >
                      Bientôt disponible
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
            Réinitialiser la recherche
          </button>

        </div>
      )}

    </div>
  );
}

export default Bibliotheque;
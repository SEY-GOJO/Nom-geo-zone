import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import categories from "../data/categories";
import cours from "../data/cours";

function Categorie() {
  const { categorieId } = useParams();
  const [recherche, setRecherche] = useState("");

  const idCategorie = Number(categorieId);

  const categorie = categories.find(
    (element) => element.id === idCategorie
  );

  const tousLesCoursCategorie = cours.filter(
    (element) => element.categorieId === idCategorie
  );

  const coursCategorie = tousLesCoursCategorie.filter(
    (element) =>
      element.titre
        .toLowerCase()
        .includes(recherche.toLowerCase())
  );

  if (!categorie) {
    return (
      <div className="container">
        <div className="card">
          <h1>❌ Catégorie introuvable</h1>

          <p>
            La catégorie demandée n'existe pas.
          </p>

          <Link to="/bibliotheque">
            <button>
              ← Retour à la bibliothèque
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const totalChapitres = tousLesCoursCategorie.reduce(
    (total, element) => total + element.chapitres.length,
    0
  );

  return (
    <div className="container">

      <Link
        to="/bibliotheque"
        className="back-link"
      >
        ← Retour à la bibliothèque
      </Link>

      <section className="category-hero">

        <div className="category-icon">
          {categorie.icon}
        </div>

        <div className="category-content">

          <span className="category-label">
            GEO ZONE • BIBLIOTHÈQUE
          </span>

          <h1>
            {categorie.nom}
          </h1>

          <p>
            Découvre les cours et ressources disponibles
            dans cette catégorie. Développe tes connaissances
            et progresse à ton rythme avec GEO ZONE.
          </p>

          <div className="category-stats">

            <div className="category-stat">

              <span className="stat-icon">
                📚
              </span>

              <div>
                <strong>
                  {tousLesCoursCategorie.length}
                </strong>

                <small>
                  Cours disponibles
                </small>
              </div>

            </div>

            <div className="category-stat">

              <span className="stat-icon">
                📖
              </span>

              <div>
                <strong>
                  {totalChapitres}
                </strong>

                <small>
                  Chapitres
                </small>
              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="category-search">

        <div className="search-title">

          <h2>
            📚 Les cours
          </h2>

          <p>
            Choisis un cours pour commencer ton apprentissage.
          </p>

        </div>

        {tousLesCoursCategorie.length > 0 && (
          <div className="search-wrapper">

            <span className="search-icon">
              🔎
            </span>

            <input
              className="search"
              type="text"
              placeholder="Rechercher un cours..."
              value={recherche}
              onChange={(e) =>
                setRecherche(e.target.value)
              }
            />

          </div>
        )}

      </section>

      <div className="modules category-courses">

        {coursCategorie.map((element, index) => (
          <div
            className="card course-card"
            key={element.id}
          >

            <div className="course-card-top">

              <span className="course-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="course-mini-icon">
                📚
              </div>

            </div>

            <div className="course-card-body">

              <span className="course-label">
                COURS DE GÉOLOGIE
              </span>

              <h2>
                {element.titre}
              </h2>

              <p>
                {element.description}
              </p>

              <div className="course-info">

                <span>
                  📖 {element.chapitres.length} chapitre
                  {element.chapitres.length > 1 ? "s" : ""}
                </span>

                <span>
                  🎓 Formation
                </span>

              </div>

            </div>

            <Link
              to={`/bibliotheque/${idCategorie}/cours/${element.id}`}
              className="course-button-link"
            >
              <span>Lire le cours</span>
              <span>→</span>
            </Link>

          </div>
        ))}

      </div>

      {coursCategorie.length === 0 && (
        <div className="card empty-courses">

          <div className="empty-icon">
            {recherche ? "🔎" : "📚"}
          </div>

          <h2>
            {recherche
              ? "Aucun cours trouvé"
              : "Aucun cours disponible"}
          </h2>

          <p>
            {recherche
              ? "Aucun cours ne correspond à ta recherche."
              : "Cette catégorie sera bientôt enrichie avec de nouvelles ressources."}
          </p>

          {recherche && (
            <button
              onClick={() => setRecherche("")}
            >
              Voir tous les cours
            </button>
          )}

        </div>
      )}

    </div>
  );
}

export default Categorie;
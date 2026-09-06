import { useState } from "react";
import { Link } from "react-router-dom";

import roches from "../data/roches";
import { getRocheIcon } from "../data/rocheIcons";

function Roches() {
  const [recherche, setRecherche] = useState("");
  const [famille, setFamille] = useState("Toutes");

  const rochesFiltrees = roches.filter((roche) => {
    const correspondRecherche = roche.nom
      .toLowerCase()
      .includes(recherche.toLowerCase());

    const correspondFamille =
      famille === "Toutes" || roche.famille === famille;

    return correspondRecherche && correspondFamille;
  });

  return (
    <div className="container rocks-page">

      <Link to="/" className="back-link">
        ← Accueil
      </Link>

      {/* HERO */}
      <div className="rocks-hero">

        <div className="rocks-hero-icon">
          ⛰️
        </div>

        <div className="rocks-label">
          BASE DE DONNÉES GÉOLOGIQUES
        </div>

        <h1>
          Roches & Minéraux
        </h1>

        <p>
          Explore, recherche et identifie les différentes
          roches étudiées en géologie.
        </p>

        <div className="rocks-stats">

          <div>
            <strong>{roches.length}</strong>
            <span>Roches</span>
          </div>

          <div>
            <strong>3</strong>
            <span>Familles</span>
          </div>

          <div>
            <strong>GEO</strong>
            <span>Base</span>
          </div>

        </div>

      </div>

      {/* RECHERCHE ET FILTRES */}
      <div className="rocks-search-section">

        <div className="rocks-search-title">
          <h2>
            🔎 Rechercher
          </h2>

          <p>
            Recherche une roche ou choisis une famille.
          </p>
        </div>

        <input
          className="search"
          type="text"
          placeholder="🔎 Rechercher par nom..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />

        <div className="filters">

          <button
            className={
              famille === "Toutes"
                ? "active-filter"
                : ""
            }
            onClick={() => setFamille("Toutes")}
            type="button"
          >
            📋 Toutes
          </button>

          <button
            className={
              famille === "Roche magmatique"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setFamille("Roche magmatique")
            }
            type="button"
          >
            🌋 Magmatiques
          </button>

          <button
            className={
              famille === "Roche métamorphique"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setFamille("Roche métamorphique")
            }
            type="button"
          >
            🏔️ Métamorphiques
          </button>

          <button
            className={
              famille === "Roche sédimentaire"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setFamille("Roche sédimentaire")
            }
            type="button"
          >
            🏜️ Sédimentaires
          </button>

        </div>

      </div>

      {/* RESULTATS */}
      <div className="rocks-result-header">

        <div>
          <h2>
            Catalogue des roches
          </h2>

          <p>
            {rochesFiltrees.length} roche
            {rochesFiltrees.length > 1 ? "s" : ""} trouvée
            {rochesFiltrees.length > 1 ? "s" : ""}
          </p>
        </div>

        {famille !== "Toutes" && (
          <span className="selected-family">
            {famille.replace("Roche ", "")}
          </span>
        )}

      </div>

      {rochesFiltrees.length > 0 ? (

        <div className="modules rocks-grid">

          {rochesFiltrees.map((roche) => (
            <div
              className="card rock-card"
              key={roche.id}
            >

              <div className="rock-card-top">

                <div className="rock-icon">
                  {getRocheIcon(roche)}
                </div>

                <span className="rock-family">
                  {roche.famille.replace("Roche ", "")}
                </span>

              </div>

              <h2>
                {roche.nom}
              </h2>

              <p className="rock-subfamily">
                {roche.sousFamille}
              </p>

              <div className="rock-details">

                <div>
                  <span>Couleur</span>
                  <strong>{roche.couleur}</strong>
                </div>

                <div>
                  <span>Texture</span>
                  <strong>{roche.texture}</strong>
                </div>

                <div>
                  <span>Structure</span>
                  <strong>{roche.structure}</strong>
                </div>

              </div>

              <div className="rock-minerals">

                <span>
                  Minéraux principaux
                </span>

                <p>
                  {roche.mineraux.join(", ")}
                </p>

              </div>

              <Link to={`/roches/${roche.id}`}>
                <button
                  className="rock-button"
                  type="button"
                >
                  Voir la fiche →
                </button>
              </Link>

            </div>
          ))}

        </div>

      ) : (

        <div className="card rock-empty">

          <div className="rock-empty-icon">
            🔎
          </div>

          <h2>
            Aucune roche trouvée
          </h2>

          <p>
            Aucune roche ne correspond à ta recherche
            ou au filtre sélectionné.
          </p>

          <button
            onClick={() => {
              setRecherche("");
              setFamille("Toutes");
            }}
            type="button"
          >
            Réinitialiser
          </button>

        </div>
      )}

    </div>
  );
}

export default Roches;
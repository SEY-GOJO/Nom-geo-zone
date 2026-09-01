import { useState } from "react";
import { Link } from "react-router-dom";
import roches from "../data/roches";

function Identification() {
  const [couleur, setCouleur] = useState("");
  const [texture, setTexture] = useState("");
  const [structure, setStructure] = useState("");

  const resultats = roches.filter((roche) => {
    const matchCouleur =
      !couleur ||
      roche.couleur.toLowerCase().includes(couleur.toLowerCase());

    const matchTexture =
      !texture ||
      roche.texture.toLowerCase().includes(texture.toLowerCase());

    const matchStructure =
      !structure ||
      roche.structure.toLowerCase().includes(structure.toLowerCase());

    return matchCouleur && matchTexture && matchStructure;
  });

  const reinitialiser = () => {
    setCouleur("");
    setTexture("");
    setStructure("");
  };

  return (
    <div className="container identification-page">
      <Link to="/" className="back-link">
        ← Retour à l'accueil
      </Link>

      <div className="identification-hero">
        <div className="identification-icon">
          🔬
        </div>

        <span className="identification-badge">
          OUTIL GÉOLOGIQUE
        </span>

        <h1>
          Identification d'une roche
        </h1>

        <p>
          Sélectionne les caractéristiques que tu observes
          sur ta roche et GEO ZONE recherchera les
          correspondances dans sa base de données.
        </p>
      </div>

      <div className="card identification-panel">
        <div className="identification-panel-header">
          <div className="identification-small-icon">
            🔎
          </div>

          <div>
            <h2>
              Caractéristiques de la roche
            </h2>

            <p>
              Utilise les filtres pour affiner ta recherche.
            </p>
          </div>
        </div>

        <div className="identification-filters">
          <div className="identification-filter">
            <label htmlFor="couleur">
              🎨 Couleur
            </label>

            <select
              id="couleur"
              value={couleur}
              onChange={(e) => setCouleur(e.target.value)}
            >
              <option value="">
                Toutes les couleurs
              </option>

              {[...new Set(roches.map((roche) => roche.couleur))].map(
                (item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="identification-filter">
            <label htmlFor="texture">
              🔎 Texture
            </label>

            <select
              id="texture"
              value={texture}
              onChange={(e) => setTexture(e.target.value)}
            >
              <option value="">
                Toutes les textures
              </option>

              {[...new Set(roches.map((roche) => roche.texture))].map(
                (item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="identification-filter">
            <label htmlFor="structure">
              🧱 Structure
            </label>

            <select
              id="structure"
              value={structure}
              onChange={(e) => setStructure(e.target.value)}
            >
              <option value="">
                Toutes les structures
              </option>

              {[...new Set(roches.map((roche) => roche.structure))].map(
                (item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div className="identification-actions">
          <button onClick={reinitialiser}>
            🔄 Réinitialiser
          </button>

          <span>
            {resultats.length} roche
            {resultats.length > 1 ? "s" : ""} trouvée
            {resultats.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="welcome identification-results-title">
        <h2>
          🔎 Résultats de l'identification
        </h2>

        <p>
          Voici les roches correspondant aux caractéristiques
          sélectionnées.
        </p>
      </div>

      {resultats.length > 0 ? (
        <div className="modules">
          {resultats.map((roche) => (
            <div
              className="card identification-card"
              key={roche.id}
            >
              <div className="identification-card-top">
                <div className="module-icon">
                  🪨
                </div>

                <span className="identification-family">
                  {roche.famille}
                </span>
              </div>

              <h2>
                {roche.nom}
              </h2>

              <div className="identification-details">
                <p>
                  <strong>🎨 Couleur</strong>
                  <span>{roche.couleur}</span>
                </p>

                <p>
                  <strong>🔎 Texture</strong>
                  <span>{roche.texture}</span>
                </p>

                <p>
                  <strong>🧱 Structure</strong>
                  <span>{roche.structure}</span>
                </p>
              </div>

              <Link to={`/roches/${roche.id}`}>
                <button>
                  Voir la fiche →
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="card identification-empty">
          <div className="identification-empty-icon">
            🔎
          </div>

          <h2>
            Aucune roche trouvée
          </h2>

          <p>
            Aucune roche ne correspond aux caractéristiques
            sélectionnées. Essaie de modifier les filtres.
          </p>

          <button onClick={reinitialiser}>
            🔄 Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}

export default Identification;
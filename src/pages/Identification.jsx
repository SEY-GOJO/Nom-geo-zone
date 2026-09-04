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
      roche.couleur
        .toLowerCase()
        .includes(couleur.toLowerCase());

    const matchTexture =
      !texture ||
      roche.texture
        .toLowerCase()
        .includes(texture.toLowerCase());

    const matchStructure =
      !structure ||
      roche.structure
        .toLowerCase()
        .includes(structure.toLowerCase());

    return matchCouleur && matchTexture && matchStructure;
  });

  const reinitialiser = () => {
    setCouleur("");
    setTexture("");
    setStructure("");
  };

  const couleurs = [
    ...new Set(roches.map((roche) => roche.couleur)),
  ];

  const textures = [
    ...new Set(roches.map((roche) => roche.texture)),
  ];

  const structures = [
    ...new Set(roches.map((roche) => roche.structure)),
  ];

  return (
    <div className="container identification-page">
      <Link to="/" className="back-link">
        ← Accueil
      </Link>

      <section className="identification-hero">
        <div className="identification-hero-content">
          <div className="identification-icon">
            🔬
          </div>

          <span className="identification-badge">
            OUTIL GÉOLOGIQUE
          </span>

          <h1>Identification</h1>

          <p>
            Sélectionne les caractéristiques observées sur ta
            roche et GEO ZONE recherchera les correspondances
            dans sa base de données.
          </p>
        </div>
      </section>

      <section className="identification-panel">
        <div className="identification-panel-header">
          <div className="identification-small-icon">
            🔎
          </div>

          <div>
            <span>ANALYSE</span>

            <h2>Caractéristiques de la roche</h2>

            <p>
              Sélectionne les propriétés que tu observes.
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
              onChange={(event) =>
                setCouleur(event.target.value)
              }
            >
              <option value="">
                Toutes les couleurs
              </option>

              {couleurs.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="identification-filter">
            <label htmlFor="texture">
              🔎 Texture
            </label>

            <select
              id="texture"
              value={texture}
              onChange={(event) =>
                setTexture(event.target.value)
              }
            >
              <option value="">
                Toutes les textures
              </option>

              {textures.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="identification-filter">
            <label htmlFor="structure">
              🧱 Structure
            </label>

            <select
              id="structure"
              value={structure}
              onChange={(event) =>
                setStructure(event.target.value)
              }
            >
              <option value="">
                Toutes les structures
              </option>

              {structures.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="identification-actions">
          <span className="identification-result-count">
            <strong>{resultats.length}</strong>{" "}
            roche{resultats.length > 1 ? "s" : ""} trouvée
            {resultats.length > 1 ? "s" : ""}
          </span>

          <button
            type="button"
            onClick={reinitialiser}
          >
            🔄 Réinitialiser
          </button>
        </div>
      </section>

      <section className="identification-results">
        <div className="identification-results-heading">
          <div>
            <span>RÉSULTATS</span>

            <h2>Roches correspondantes</h2>
          </div>

          <p>
            Les fiches correspondent aux caractéristiques
            sélectionnées.
          </p>
        </div>

        {resultats.length > 0 ? (
          <div className="identification-grid">
            {resultats.map((roche) => (
              <article
                className="identification-card"
                key={roche.id}
              >
                <div className="identification-card-top">
                  <div className="identification-rock-icon">
                    🪨
                  </div>

                  <span className="identification-family">
                    {roche.famille}
                  </span>
                </div>

                <h3>{roche.nom}</h3>

                <div className="identification-details">
                  <div>
                    <span>🎨 Couleur</span>
                    <strong>{roche.couleur}</strong>
                  </div>

                  <div>
                    <span>🔎 Texture</span>
                    <strong>{roche.texture}</strong>
                  </div>

                  <div>
                    <span>🧱 Structure</span>
                    <strong>{roche.structure}</strong>
                  </div>
                </div>

                <Link
                  to={`/roches/${roche.id}`}
                  className="identification-card-button"
                >
                  Voir la fiche
                  <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="identification-empty">
            <div className="identification-empty-icon">
              🔎
            </div>

            <h2>Aucune roche trouvée</h2>

            <p>
              Aucune roche ne correspond aux caractéristiques
              sélectionnées.
            </p>

            <button
              type="button"
              onClick={reinitialiser}
            >
              🔄 Réinitialiser les filtres
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Identification;
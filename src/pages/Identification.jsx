import { useState } from "react";
import { Link } from "react-router-dom";

import roches from "../data/roches";
import { getRocheIcon } from "../data/rocheIcons";

function Identification() {
  const [couleur, setCouleur] = useState("");
  const [texture, setTexture] = useState("");
  const [structure, setStructure] = useState("");
  const [famille, setFamille] = useState("");
  const [mineral, setMineral] = useState("");

  const critereSelectionnes =
    (couleur ? 1 : 0) +
    (texture ? 1 : 0) +
    (structure ? 1 : 0) +
    (famille ? 1 : 0) +
    (mineral ? 1 : 0);

  const resultats = roches
    .map((roche) => {
      let score = 0;

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

      const matchFamille =
        !famille ||
        roche.famille
          .toLowerCase()
          .includes(famille.toLowerCase());

      const minerauxRoche = Array.isArray(roche.mineraux)
        ? roche.mineraux
        : [];

      const matchMineral =
        !mineral ||
        minerauxRoche.some((element) =>
          String(element)
            .toLowerCase()
            .includes(mineral.toLowerCase())
        );

      if (couleur && matchCouleur) {
        score += 1;
      }

      if (texture && matchTexture) {
        score += 1;
      }

      if (structure && matchStructure) {
        score += 1;
      }

      if (famille && matchFamille) {
        score += 1;
      }

      if (mineral && matchMineral) {
        score += 1;
      }

      return {
        roche,
        score,
      };
    })
    .filter((resultat) => {
      if (critereSelectionnes === 0) {
        return true;
      }

      return resultat.score > 0;
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.roche.nom.localeCompare(b.roche.nom);
    });

  const reinitialiser = () => {
    setCouleur("");
    setTexture("");
    setStructure("");
    setFamille("");
    setMineral("");
  };

  const couleurs = [
    ...new Set(
      roches.map((roche) => roche.couleur)
    ),
  ];

  const textures = [
    ...new Set(
      roches.map((roche) => roche.texture)
    ),
  ];

  const structures = [
    ...new Set(
      roches.map((roche) => roche.structure)
    ),
  ];

  const familles = [
    ...new Set(
      roches.map((roche) => roche.famille)
    ),
  ];

  const mineraux = [
    ...new Set(
      roches.flatMap((roche) =>
        Array.isArray(roche.mineraux)
          ? roche.mineraux
          : []
      )
    ),
  ].sort((a, b) =>
    String(a).localeCompare(String(b))
  );

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
            roche et GEO ZONE classera les résultats selon leur
            niveau de correspondance.
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

          <div className="identification-filter">
            <label htmlFor="famille">
              🪨 Famille
            </label>

            <select
              id="famille"
              value={famille}
              onChange={(event) =>
                setFamille(event.target.value)
              }
            >
              <option value="">
                Toutes les familles
              </option>

              {familles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="identification-filter">
            <label htmlFor="mineral">
              💎 Minéral
            </label>

            <select
              id="mineral"
              value={mineral}
              onChange={(event) =>
                setMineral(event.target.value)
              }
            >
              <option value="">
                Tous les minéraux
              </option>

              {mineraux.map((item) => (
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

          {critereSelectionnes > 0 && (
            <span>
              {critereSelectionnes}/5 critères sélectionnés
            </span>
          )}

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
            Les roches sont classées selon leur niveau de
            correspondance avec les caractéristiques sélectionnées.
          </p>
        </div>

        {resultats.length > 0 ? (
          <div className="identification-grid">
            {resultats.map(
              ({ roche, score }, index) => (
                <article
                  className="identification-card"
                  key={roche.id}
                >
                  <div className="identification-card-top">
                    <div className="identification-rock-icon">
                      {getRocheIcon(roche)}
                    </div>

                    <span className="identification-family">
                      {roche.famille}
                    </span>
                  </div>

                  {critereSelectionnes > 0 && (
                    <div>
                      <strong>
                        {index === 0 && score > 0
                          ? "🥇 "
                          : index === 1 && score > 0
                          ? "🥈 "
                          : index === 2 && score > 0
                          ? "🥉 "
                          : ""}

                        Correspondance : {score}/
                        {critereSelectionnes}
                      </strong>
                    </div>
                  )}

                  <h3>{roche.nom}</h3>

                  <div className="identification-details">
                    <div>
                      <span>🎨 Couleur</span>

                      <strong>
                        {roche.couleur}
                      </strong>
                    </div>

                    <div>
                      <span>🔎 Texture</span>

                      <strong>
                        {roche.texture}
                      </strong>
                    </div>

                    <div>
                      <span>🧱 Structure</span>

                      <strong>
                        {roche.structure}
                      </strong>
                    </div>

                    <div>
                      <span>🪨 Famille</span>

                      <strong>
                        {roche.famille}
                      </strong>
                    </div>

                    <div>
                      <span>💎 Minéraux</span>

                      <strong>
                        {Array.isArray(roche.mineraux) &&
                        roche.mineraux.length > 0
                          ? roche.mineraux.join(", ")
                          : "Non renseigné"}
                      </strong>
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
              )
            )}
          </div>
        ) : (
          <div className="identification-empty">
            <div className="identification-empty-icon">
              🔎
            </div>

            <h2>Aucune roche trouvée</h2>

            <p>
              Aucune roche ne correspond aux critères
              sélectionnés.
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
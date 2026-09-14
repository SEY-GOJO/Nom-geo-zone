import { Link, useParams } from "react-router-dom";

import roches from "../data/roches";
import cours from "../data/cours";
import { getRocheIcon } from "../data/rocheIcons";

function RocheDetail() {
  const { id } = useParams();

  const roche = roches.find(
    (element) => element.id === Number(id)
  );

  if (!roche) {
    return (
      <div className="container">
        <div className="card">
          <h1>❌ Roche introuvable</h1>

          <p>
            La roche que tu recherches n'existe pas ou n'est
            plus disponible.
          </p>

          <Link to="/roches" className="back-link">
            ← Retour aux roches
          </Link>
        </div>
      </div>
    );
  }

  const famille = String(roche.famille || "").toLowerCase();
  const sousFamille = String(
    roche.sousFamille || ""
  ).toLowerCase();
  const nom = String(roche.nom || "").toLowerCase();

  const texteRoche = `${nom} ${famille} ${sousFamille}`;

  const estMagmatique =
    texteRoche.includes("magmat") ||
    texteRoche.includes("ignée") ||
    texteRoche.includes("ignée");

  const estSedimentaire =
    texteRoche.includes("sédiment");

  const estMetamorphique =
    texteRoche.includes("métamorph");

  let motsCles = [];

  if (estMagmatique) {
    motsCles = [
      "magmatique",
      "roches magmatiques",
      "ignée",
    ];
  }

  if (estSedimentaire) {
    motsCles = [
      "sédimentaire",
      "roches sédimentaires",
      "sédiment",
    ];
  }

  if (estMetamorphique) {
    motsCles = [
      "métamorphique",
      "roches métamorphiques",
      "métamorphisme",
    ];
  }

  const coursAssocies = cours.filter((coursActuel) => {
    const titre = String(
      coursActuel.titre || ""
    ).toLowerCase();

    const description = String(
      coursActuel.description || ""
    ).toLowerCase();

    const contenuCours = `${titre} ${description}`;

    if (
      coursActuel.categorieId !== 3
    ) {
      return false;
    }

    if (motsCles.length === 0) {
      return false;
    }

    return motsCles.some((mot) =>
      contenuCours.includes(mot)
    );
  });

  return (
    <div className="container">
      <Link to="/roches" className="back-link">
        ← Retour aux roches
      </Link>

      <div className="course-header card">
        <div className="module-icon">
          {getRocheIcon(roche)}
        </div>

        <p>FICHE ROCHE</p>

        <h1>{roche.nom}</h1>

        <p>
          {roche.famille}
        </p>

        <p>
          <strong>Sous-famille :</strong>{" "}
          {roche.sousFamille}
        </p>
      </div>

      <div className="card">
        <h2>🔬 Caractéristiques</h2>

        <p>
          <strong>Couleur :</strong>{" "}
          {roche.couleur}
        </p>

        <p>
          <strong>Texture :</strong>{" "}
          {roche.texture}
        </p>

        <p>
          <strong>Structure :</strong>{" "}
          {roche.structure}
        </p>

        <p>
          <strong>Minéraux :</strong>{" "}
          {Array.isArray(roche.mineraux)
            ? roche.mineraux.join(", ")
            : "Non renseigné"}
        </p>
      </div>

      <div className="card">
        <h2>🌋 Formation</h2>

        <p>
          {roche.origine}
        </p>
      </div>

      <div className="card">
        <h2>🏗️ Utilisations</h2>

        <p>
          {roche.utilisation}
        </p>
      </div>

      {coursAssocies.length > 0 && (
        <section className="course-chapters">
          <div className="course-chapters-heading">
            <div>
              <span>APPRENDRE DAVANTAGE</span>

              <h2>📚 Cours associés</h2>
            </div>

            <span className="course-chapter-count">
              {coursAssocies.length} cours
            </span>
          </div>

          <div className="course-chapters-grid">
            {coursAssocies.map(
              (coursActuel, index) => (
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
                      COURS
                    </span>
                  </div>

                  <div className="chapter-content">
                    <h3>
                      {coursActuel.titre}
                    </h3>

                    <p>
                      📖{" "}
                      {
                        coursActuel.chapitres
                          .length
                      }{" "}
                      chapitre
                      {coursActuel.chapitres
                        .length > 1
                        ? "s"
                        : ""}
                    </p>
                  </div>

                  <Link
                    to={`/bibliotheque/${coursActuel.categorieId}/cours/${coursActuel.id}`}
                    className="chapter-link"
                  >
                    Voir le cours
                    <span>→</span>
                  </Link>
                </article>
              )
            )}
          </div>
        </section>
      )}

      <div className="card">
        <h2>📚 Informations supplémentaires</h2>

        <p>
          Cette fiche sera progressivement enrichie avec
          davantage de données géologiques et des ressources
          pédagogiques liées à cette roche.
        </p>
      </div>
    </div>
  );
}

export default RocheDetail;
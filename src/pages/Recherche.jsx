import { Link } from "react-router-dom";
import { useState } from "react";

import categories from "../data/categories";
import cours from "../data/cours";
import roches from "../data/roches";

function Recherche() {
  const [requete, setRequete] = useState("");

  const texteNormalise = (valeur) => {
    return String(valeur ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  };

  const distanceLevenshtein = (a, b) => {
    const longueurA = a.length;
    const longueurB = b.length;

    if (a === b) {
      return 0;
    }

    if (longueurA === 0) {
      return longueurB;
    }

    if (longueurB === 0) {
      return longueurA;
    }

    let lignePrecedente = Array.from(
      { length: longueurB + 1 },
      (_, index) => index
    );

    for (let i = 1; i <= longueurA; i += 1) {
      const ligneActuelle = [i];

      for (let j = 1; j <= longueurB; j += 1) {
        const coutSubstitution =
          a[i - 1] === b[j - 1] ? 0 : 1;

        ligneActuelle[j] = Math.min(
          ligneActuelle[j - 1] + 1,
          lignePrecedente[j] + 1,
          lignePrecedente[j - 1] + coutSubstitution
        );
      }

      lignePrecedente = ligneActuelle;
    }

    return lignePrecedente[longueurB];
  };

  const correspondanceTerme = (termeRecherche, texte) => {
    const terme = texteNormalise(termeRecherche);
    const contenu = texteNormalise(texte);

    if (!terme || !contenu) {
      return false;
    }

    if (contenu.includes(terme)) {
      return true;
    }

    const mots = contenu.split(/[\s,;:/()\-]+/).filter(Boolean);

    return mots.some((mot) => {
      if (mot.includes(terme) || terme.includes(mot)) {
        return true;
      }

      if (
        terme.length >= 6 &&
        mot.length >= 6 &&
        terme.slice(0, 6) === mot.slice(0, 6)
      ) {
        return true;
      }

      if (terme.length >= 5 && mot.length >= 5) {
        const distance = distanceLevenshtein(
          terme,
          mot
        );

        const seuil =
          Math.max(2, Math.floor(terme.length / 5));

        if (distance <= seuil) {
          return true;
        }
      }

      return false;
    });
  };

  const correspondanceRecherche = (texte, recherche) => {
    const motsRecherche = texteNormalise(recherche)
      .split(/\s+/)
      .filter(Boolean);

    if (motsRecherche.length === 0) {
      return false;
    }

    return motsRecherche.every((mot) =>
      correspondanceTerme(mot, texte)
    );
  };

  const construireTexteRoche = (roche) => {
    const mineraux = Array.isArray(roche?.mineraux)
      ? roche.mineraux.join(" ")
      : "";

    return [
      roche?.nom,
      roche?.famille,
      roche?.sousFamille,
      roche?.couleur,
      roche?.texture,
      roche?.structure,
      mineraux,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const construireTexteCours = (coursActuel) => {
    const chapitres = Array.isArray(
      coursActuel?.chapitres
    )
      ? coursActuel.chapitres
          .map((chapitre) =>
            [
              chapitre?.titre,
              chapitre?.contenu,
            ]
              .filter(Boolean)
              .join(" ")
          )
          .join(" ")
      : "";

    return [
      coursActuel?.titre,
      coursActuel?.description,
      chapitres,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const recherche = texteNormalise(requete);

  const resultatsCategories =
    recherche.length > 0
      ? categories.filter((categorie) =>
          correspondanceRecherche(
            categorie?.nom,
            recherche
          )
        )
      : [];

  const resultatsCours =
    recherche.length > 0
      ? cours.filter((coursActuel) =>
          correspondanceRecherche(
            construireTexteCours(coursActuel),
            recherche
          )
        )
      : [];

  const resultatsRoches =
    recherche.length > 0
      ? roches.filter((roche) =>
          correspondanceRecherche(
            construireTexteRoche(roche),
            recherche
          )
        )
      : [];

  const totalResultats =
    resultatsCategories.length +
    resultatsCours.length +
    resultatsRoches.length;

  const effacerRecherche = () => {
    setRequete("");
  };

  return (
    <div className="container">
      <Link to="/" className="back-link">
        ← Accueil
      </Link>

      <section className="welcome">
        <div className="module-icon">
          🔎
        </div>

        <h1>Recherche</h1>

        <p>
          Recherche rapidement une roche, un cours,
          un minéral ou une catégorie dans GEO ZONE.
        </p>
      </section>

      <section className="card">
        <h2>🔎 Recherche globale</h2>

        <input
          className="search"
          type="search"
          value={requete}
          placeholder="Exemple : quartz, métamorphique, sédimentaire..."
          onChange={(event) =>
            setRequete(event.target.value)
          }
        />

        {recherche && (
          <p>
            <strong>{totalResultats}</strong>{" "}
            résultat
            {totalResultats > 1 ? "s" : ""} pour{" "}
            <strong>« {requete} »</strong>
          </p>
        )}

        {recherche && (
          <p>
            La recherche accepte les accents, les variantes
            proches et certaines fautes de frappe.
          </p>
        )}
      </section>

      {!recherche ? (
        <section className="card">
          <div className="empty-content">
            <div>🔎</div>

            <h2>Commence ta recherche</h2>

            <p>
              Tape le nom d'une roche, d'un cours,
              d'un minéral ou d'une notion géologique.
            </p>
          </div>
        </section>
      ) : totalResultats === 0 ? (
        <section className="card">
          <div className="identification-empty">
            <div className="identification-empty-icon">
              🔎
            </div>

            <h2>Aucun résultat</h2>

            <p>
              Aucun contenu ne correspond à ta recherche.
            </p>

            <button
              type="button"
              onClick={effacerRecherche}
            >
              🔄 Effacer la recherche
            </button>
          </div>
        </section>
      ) : (
        <>
          {resultatsRoches.length > 0 && (
            <section className="course-chapters">
              <div className="course-chapters-heading">
                <div>
                  <span>BASE GÉOLOGIQUE</span>

                  <h2>🪨 Roches</h2>
                </div>

                <span className="course-chapter-count">
                  {resultatsRoches.length}
                </span>
              </div>

              <div className="course-chapters-grid">
                {resultatsRoches.map((roche) => (
                  <article
                    className="chapter-card"
                    key={roche.id}
                  >
                    <div className="chapter-top">
                      <div className="chapter-number">
                        🪨
                      </div>

                      <span className="chapter-label">
                        {roche.famille || "Roche"}
                      </span>
                    </div>

                    <div className="chapter-content">
                      <h3>{roche.nom}</h3>

                      <p>
                        {roche.sousFamille ||
                          "Sous-famille non renseignée"}
                      </p>

                      <p>
                        {roche.texture ||
                          "Texture non renseignée"}
                      </p>

                      <p>
                        {Array.isArray(roche.mineraux) &&
                        roche.mineraux.length > 0
                          ? `Minéraux : ${roche.mineraux.join(
                              ", "
                            )}`
                          : ""}
                      </p>
                    </div>

                    <Link
                      to={`/roches/${roche.id}`}
                      className="chapter-link"
                    >
                      Voir la fiche
                      <span>→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}

          {resultatsCours.length > 0 && (
            <section className="course-chapters">
              <div className="course-chapters-heading">
                <div>
                  <span>BIBLIOTHÈQUE</span>

                  <h2>📚 Cours</h2>
                </div>

                <span className="course-chapter-count">
                  {resultatsCours.length}
                </span>
              </div>

              <div className="course-chapters-grid">
                {resultatsCours.map((coursActuel) => (
                  <article
                    className="chapter-card"
                    key={coursActuel.id}
                  >
                    <div className="chapter-top">
                      <div className="chapter-number">
                        📚
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
                        {coursActuel.description ||
                          "Cours de géologie"}
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
                      Voir le cours
                      <span>→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}

          {resultatsCategories.length > 0 && (
            <section className="course-chapters">
              <div className="course-chapters-heading">
                <div>
                  <span>DOMAINES</span>

                  <h2>📂 Catégories</h2>
                </div>

                <span className="course-chapter-count">
                  {resultatsCategories.length}
                </span>
              </div>

              <div className="course-chapters-grid">
                {resultatsCategories.map(
                  (categorie) => (
                    <article
                      className="chapter-card"
                      key={categorie.id}
                    >
                      <div className="chapter-top">
                        <div className="chapter-number">
                          {categorie.icon || "📂"}
                        </div>

                        <span className="chapter-label">
                          CATÉGORIE
                        </span>
                      </div>

                      <div className="chapter-content">
                        <h3>
                          {categorie.nom}
                        </h3>

                        <p>
                          Domaine de géologie
                        </p>
                      </div>

                      <Link
                        to={`/bibliotheque/${categorie.id}`}
                        className="chapter-link"
                      >
                        Explorer
                        <span>→</span>
                      </Link>
                    </article>
                  )
                )}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default Recherche;
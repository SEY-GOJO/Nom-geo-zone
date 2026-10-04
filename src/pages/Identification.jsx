import { useState } from "react";
import { Link } from "react-router-dom";

import mineraux from "../data/mineraux";
import roches from "../data/roches";
import { getRocheIcon } from "../data/rocheIcons";
import { compterCorrespondances } from "../utils/identification";

const unique = (items) =>
  [...new Set(items.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));

function Identification() {
  const [mode, setMode] = useState("roches");
  const [rocheFiltres, setRocheFiltres] = useState({
    couleur: "",
    texture: "",
    structure: "",
    famille: "",
    mineral: "",
  });
  const [mineralFiltres, setMineralFiltres] = useState({
    couleur: "",
    classe: "",
    durete: "",
    eclat: "",
    trait: "",
  });
  const estRoche = mode === "roches";
  const filtres = estRoche ? rocheFiltres : mineralFiltres;
  const setFiltres = estRoche ? setRocheFiltres : setMineralFiltres;
  const criteres = Object.values(filtres).filter(Boolean).length;

  const options = estRoche
    ? {
        couleur: unique(roches.map((item) => item.couleur)),
        texture: unique(roches.map((item) => item.texture)),
        structure: unique(roches.map((item) => item.structure)),
        famille: unique(roches.map((item) => item.famille)),
        mineral: unique(roches.flatMap((item) => item.mineraux || [])),
      }
    : {
        couleur: unique(mineraux.map((item) => item.couleur)),
        classe: unique(mineraux.map((item) => item.classe)),
        durete: unique(mineraux.map((item) => item.durete)),
        eclat: unique(mineraux.map((item) => item.eclat)),
        trait: unique(mineraux.map((item) => item.trait)),
      };
  const champs = estRoche
    ? [
        ["couleur", "🎨 Couleur", "Toutes les couleurs"],
        ["texture", "🔎 Texture", "Toutes les textures"],
        ["structure", "🧱 Structure", "Toutes les structures"],
        ["famille", "🪨 Famille", "Toutes les familles"],
        ["mineral", "💎 Minéral principal", "Tous les minéraux"],
      ]
    : [
        ["couleur", "🎨 Couleur", "Toutes les couleurs"],
        ["classe", "🧪 Classe minérale", "Toutes les classes"],
        ["durete", "💪 Dureté de Mohs", "Toutes les duretés"],
        ["eclat", "✨ Éclat", "Tous les éclats"],
        ["trait", "🖍️ Trait", "Toutes les traces"],
      ];
  const valeursRoche = (item) => ({
    couleur: item.couleur,
    texture: item.texture,
    structure: item.structure,
    famille: item.famille,
    mineral: item.mineraux || [],
  });
  const source = estRoche ? roches : mineraux;
  const resultats = source
    .map((item) => {
      const valeurs = estRoche ? valeursRoche(item) : item;
      return {
        item,
        score: compterCorrespondances(valeurs, filtres),
      };
    })
    .filter(({ score }) => score === criteres)
    .sort((a, b) => a.item.nom.localeCompare(b.item.nom));

  const changer = (cle, valeur) =>
    setFiltres((anciens) => ({ ...anciens, [cle]: valeur }));
  const reinitialiser = () =>
    setFiltres(Object.fromEntries(Object.keys(filtres).map((cle) => [cle, ""])));

  return (
    <main className="container identification-page">
      <Link to="/" className="back-link">
        ← Accueil
      </Link>
      <section className="identification-hero">
        <div className="identification-hero-content">
          <div className="identification-icon">🔬</div>
          <span className="identification-badge">OUTIL GÉOLOGIQUE</span>
          <h1>Identification</h1>
          <p>
            Compare les caractéristiques observées pour trouver une roche ou un
            minéral probable.
          </p>
        </div>
      </section>
      <section className="identification-panel">
        <div className="identification-panel-header">
          <div className="identification-small-icon">🔎</div>
          <div>
            <span>ANALYSE</span>
            <h2>Que souhaitez-vous identifier ?</h2>
            <p>
              Choisissez un type d’échantillon puis renseignez vos observations.
            </p>
          </div>
        </div>
        <div
          className="identification-mode-tabs"
          role="tablist"
          aria-label="Type d'échantillon"
        >
          <button
            type="button"
            className={estRoche ? "active" : ""}
            onClick={() => setMode("roches")}
            role="tab"
            aria-selected={estRoche}
          >
            🪨 Roche
          </button>
          <button
            type="button"
            className={!estRoche ? "active" : ""}
            onClick={() => setMode("mineraux")}
            role="tab"
            aria-selected={!estRoche}
          >
            💎 Minéral
          </button>
        </div>
        <div className="identification-filters">
          {champs.map(([cle, label, placeholder]) => (
            <div className="identification-filter" key={cle}>
              <label htmlFor={`${mode}-${cle}`}>{label}</label>
              <select
                id={`${mode}-${cle}`}
                value={filtres[cle]}
                onChange={(event) => changer(cle, event.target.value)}
              >
                <option value="">{placeholder}</option>
                {options[cle].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="identification-actions">
          <span className="identification-result-count">
            <strong>{resultats.length}</strong>{" "}
            {estRoche ? "roche" : "minéral"}
            {resultats.length !== 1 ? (estRoche ? "s" : "ux") : ""} correspondant
            {resultats.length !== 1 ? "s" : ""}
          </span>
          {criteres > 0 && (
            <span>{criteres}/5 critères sélectionnés</span>
          )}
          <button type="button" onClick={reinitialiser}>
            🔄 Réinitialiser
          </button>
        </div>
        <p className="identification-method-note">
          Tous les critères choisis doivent correspondre. Une ressemblance ne
          confirme pas l’identification : compare plusieurs propriétés et
          examine un échantillon frais lorsque c’est possible.
        </p>
      </section>
      <section className="identification-results">
        <div className="identification-results-heading">
          <div>
            <span>RÉSULTATS</span>
            <h2>{estRoche ? "Roches correspondantes" : "Minéraux correspondants"}</h2>
          </div>
          <p>
            {criteres
              ? "Seules les fiches qui réunissent tous les critères sont affichées."
              : "Choisis une ou plusieurs observations pour affiner les résultats."}
          </p>
        </div>
        {resultats.length ? (
          <div className="identification-grid">
            {resultats.map(({ item, score }) =>
              estRoche ? (
                <RocheCard
                  key={item.id}
                  item={item}
                  score={score}
                  criteres={criteres}
                />
              ) : (
                <MineralCard
                  key={item.id}
                  item={item}
                  score={score}
                  criteres={criteres}
                />
              )
            )}
          </div>
        ) : (
          <div className="identification-empty">
            <div className="identification-empty-icon">🔎</div>
            <h2>Aucune correspondance exacte</h2>
            <p>
              Aucune fiche ne réunit tous ces critères. Vérifie tes observations
              ou retire un filtre.
            </p>
            <button type="button" onClick={reinitialiser}>
              🔄 Réinitialiser les filtres
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

function Score({ score, criteres }) {
  return criteres ? (
    <strong className="identification-score">
      Correspondance : {score}/{criteres}
    </strong>
  ) : null;
}

function RocheCard({ item, score, criteres }) {
  return (
    <article className="identification-card">
      <div className="identification-card-top">
        <div className="identification-rock-icon">{getRocheIcon(item)}</div>
        <span className="identification-family">{item.famille}</span>
      </div>
      <Score score={score} criteres={criteres} />
      <h3>{item.nom}</h3>
      <div className="identification-details">
        <div>
          <span>🎨 Couleur</span>
          <strong>{item.couleur}</strong>
        </div>
        <div>
          <span>🔎 Texture</span>
          <strong>{item.texture}</strong>
        </div>
        <div>
          <span>💎 Minéraux</span>
          <strong>{item.mineraux.join(", ")}</strong>
        </div>
      </div>
      <Link to={`/roches/${item.id}`} className="identification-card-button">
        Voir la fiche <span>→</span>
      </Link>
    </article>
  );
}

function MineralCard({ item, score, criteres }) {
  return (
    <article className="identification-card identification-mineral-card">
      <div className="identification-card-top">
        <div className="identification-rock-icon">{item.icon}</div>
        <span className="identification-family">{item.classe}</span>
      </div>
      <Score score={score} criteres={criteres} />
      <h3>{item.nom}</h3>
      <p className="identification-formula">{item.formule}</p>
      <div className="identification-details">
        <div>
          <span>💪 Dureté</span>
          <strong>{item.durete}</strong>
        </div>
        <div>
          <span>✨ Éclat</span>
          <strong>{item.eclat}</strong>
        </div>
        <div>
          <span>🖍️ Trait</span>
          <strong>{item.trait}</strong>
        </div>
      </div>
      <Link to={`/mineraux/${item.id}`} className="identification-card-button">
        Voir la fiche <span>→</span>
      </Link>
    </article>
  );
}

export default Identification;

import { useState } from "react";
import { Link } from "react-router-dom";

import mineraux from "../data/mineraux";

const tonsParClasse = {
  Silicate: "teal",
  Sulfure: "gold",
  Carbonate: "mint",
  Halogénure: "violet",
  Oxyde: "rust",
  "Élément natif": "slate",
  Sulfate: "rose",
  Phosphate: "blue",
};

function Mineraux() {
  const [recherche, setRecherche] = useState("");
  const [classe, setClasse] = useState("Toutes");
  const classes = ["Toutes", ...new Set(mineraux.map((mineral) => mineral.classe))];
  const echelleMohs = [
    "Talc", "Gypse", "Calcite", "Fluorite", "Apatite",
    "Orthoclase", "Quartz", "Topaze", "Corindon", "Diamant",
  ].map((nom) => mineraux.find((mineral) => mineral.nom === nom));
  const resultats = mineraux.filter((mineral) =>
    (classe === "Toutes" || mineral.classe === classe) &&
    `${mineral.nom} ${mineral.formule} ${mineral.classe}`.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <main className="container minerals-page">
      <Link to="/" className="back-link">← Accueil</Link>
      <section className="minerals-hero">
        <div className="minerals-hero-icon">💎</div>
        <span>BASE DE DONNÉES GÉOLOGIQUES</span>
        <h1>Minéraux</h1>
        <p>Observe les propriétés qui permettent de reconnaître les minéraux et de comprendre leurs usages.</p>
        <div className="minerals-stats">
          <div><strong>{mineraux.length}</strong><span>Fiches</span></div>
          <div><strong>{classes.length - 1}</strong><span>Classes</span></div>
          <div><strong>Mohs</strong><span>Dureté</span></div>
        </div>
      </section>
      <section className="mohs-scale" aria-label="Échelle de dureté de Mohs">
        <div>
          <span>REPÈRE D'IDENTIFICATION</span>
          <h2>Échelle de Mohs</h2>
          <p>Du plus tendre au plus dur : un minéral raye ceux qui se situent avant lui.</p>
        </div>
        <ol>
          {echelleMohs.map((mineral, index) => (
            <li key={mineral.id} title={`${mineral.nom} — dureté ${index + 1}`}>
              <span>{index + 1}</span>
              <Link to={`/mineraux/${mineral.id}`}>{mineral.nom}</Link>
            </li>
          ))}
        </ol>
      </section>
      <section className="minerals-search card">
        <div>
          <h2>🔎 Rechercher un minéral</h2>
          <p>Filtre par nom, formule chimique ou grande classe minérale.</p>
        </div>
        <input className="search" value={recherche} onChange={(event) => setRecherche(event.target.value)} placeholder="Ex. quartz, Fe₂O₃, oxyde…" />
        <div className="filters">
          {classes.map((item) => <button key={item} type="button" className={classe === item ? "active-filter" : ""} onClick={() => setClasse(item)}>{item}</button>)}
        </div>
      </section>
      <section className="minerals-result-header">
        <div><h2>Catalogue des minéraux</h2><p>{resultats.length} minéral{resultats.length > 1 ? "ux" : ""} trouvé{resultats.length > 1 ? "s" : ""}</p></div>
        <Link to="/identification" className="minerals-identify-link">🔬 Identifier une roche</Link>
      </section>
      <section className="minerals-grid">
        {resultats.map((mineral) => (
          <article
            className={`mineral-card tone-${tonsParClasse[mineral.classe] || "teal"}`}
            key={mineral.id}
          >
            {mineral.image && <img className="mineral-card-image" src={mineral.image.src} alt="" loading="lazy" />}
            <div className="mineral-card-top"><span className="mineral-icon">{mineral.icon}</span><span>{mineral.classe}</span></div>
            <h2>{mineral.nom}</h2><p className="mineral-formula">{mineral.formule}</p>
            <div className="mineral-properties"><div><span>Dureté</span><strong>{mineral.durete}</strong></div><div><span>Éclat</span><strong>{mineral.eclat}</strong></div><div><span>Trait</span><strong>{mineral.trait}</strong></div></div>
            <p>{mineral.description}</p>
            <Link to={`/mineraux/${mineral.id}`} className="mineral-card-link">Voir la fiche <span>→</span></Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Mineraux;

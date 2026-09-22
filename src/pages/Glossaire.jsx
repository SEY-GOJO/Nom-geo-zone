import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import glossaire from "../data/glossaire";

function Glossaire() {
  const [recherche, setRecherche] = useState("");
  const [categorie, setCategorie] = useState("Toutes");
  const categories = ["Toutes", ...new Set(glossaire.map((item) => item.categorie))];
  const termes = useMemo(() => glossaire.filter((item) => {
    const texte = `${item.terme} ${item.definition} ${item.categorie}`.toLocaleLowerCase();
    return (categorie === "Toutes" || item.categorie === categorie) && texte.includes(recherche.toLocaleLowerCase().trim());
  }), [recherche, categorie]);

  return (
    <main className="container glossary-page">
      <Link to="/" className="back-link">← Accueil</Link>
      <section className="glossary-hero"><div>📖</div><span>RÉFÉRENCE GEO ZONE</span><h1>Glossaire géologique</h1><p>Retrouvez rapidement les définitions essentielles de la géologie, de la minéralogie et des mines.</p></section>
      <section className="glossary-controls card"><input className="search" type="search" placeholder="Rechercher un terme : clivage, magma, porosité…" value={recherche} onChange={(event) => setRecherche(event.target.value)} /><div className="filters">{categories.map((item) => <button key={item} type="button" className={categorie === item ? "active-filter" : ""} onClick={() => setCategorie(item)}>{item}</button>)}</div></section>
      <section className="glossary-results"><div className="glossary-heading"><div><span>DÉFINITIONS</span><h2>{termes.length} terme{termes.length > 1 ? "s" : ""}</h2></div><Link to="/recherche">🔎 Recherche globale</Link></div><div className="glossary-grid">{termes.map((item) => <article className="glossary-card" key={item.terme}><span>{item.categorie}</span><h2>{item.terme}</h2><p>{item.definition}</p></article>)}</div>{!termes.length && <div className="identification-empty"><div className="identification-empty-icon">📖</div><h2>Aucun terme trouvé</h2><p>Essayez un autre mot-clé ou une autre catégorie.</p></div>}</section>
    </main>
  );
}

export default Glossaire;

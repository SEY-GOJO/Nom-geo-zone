import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import mineraux from "../data/mineraux";
import { basculerFavori, enregistrerConsultation, estFavori } from "../utils/favoris";

const tonsParClasse = {
  Silicate: "teal", Sulfure: "gold", Carbonate: "mint",
  Halogénure: "violet", Oxyde: "rust", "Élément natif": "slate",
  Sulfate: "rose", Phosphate: "blue",
};

function MineralDetail() {
  const { id } = useParams();
  const mineral = mineraux.find((item) => item.id === Number(id));
  const [favori, setFavori] = useState(() => estFavori("mineral", Number(id)));

  useEffect(() => {
    if (mineral) {
      enregistrerConsultation({ type: "mineral", id: mineral.id, nom: mineral.nom, icon: mineral.icon, detail: mineral.classe });
    }
  }, [mineral]);
  if (!mineral) return <main className="container"><div className="card"><h1>Minéral introuvable</h1><Link to="/mineraux">← Retour aux minéraux</Link></div></main>;
  const proprietes = [["Classe", mineral.classe], ["Formule", mineral.formule], ["Couleur", mineral.couleur], ["Éclat", mineral.eclat], ["Dureté (Mohs)", mineral.durete], ["Trait", mineral.trait], ["Clivage", mineral.clivage], ["Système cristallin", mineral.systeme], ["Densité relative", mineral.densite]];
  return (
    <main className="container mineral-detail-page">
      <Link to="/mineraux" className="back-link">← Retour aux minéraux</Link>
      <section className={`mineral-detail-hero card tone-${tonsParClasse[mineral.classe] || "teal"}`}><button type="button" className={`favorite-button ${favori ? "is-favorite" : ""}`} onClick={() => { basculerFavori({ type: "mineral", id: mineral.id, nom: mineral.nom, icon: mineral.icon, detail: mineral.classe }); setFavori((etat) => !etat); }} aria-pressed={favori}>{favori ? "★" : "☆"} {favori ? "Favori" : "Ajouter aux favoris"}</button><div className="mineral-detail-icon">{mineral.icon}</div><span>FICHE MINÉRAL</span><h1>{mineral.nom}</h1><p>{mineral.description}</p></section>
      {mineral.image && <figure className="mineral-photo card"><img src={mineral.image.src} alt={mineral.image.alt} /><figcaption>Photo : <a href={mineral.image.source} target="_blank" rel="noreferrer">{mineral.image.credit}</a> — {mineral.image.licence}.</figcaption></figure>}
      <section className="mineral-detail-grid">
        <article className="card"><h2>🔬 Propriétés d’identification</h2><dl className="mineral-definition-list">{proprietes.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></article>
        <article className="card"><h2>⛏️ Utilisations</h2><p>{mineral.usage}</p><h2>À retenir</h2><p>Pour identifier ce minéral, combine plusieurs observations : couleur, éclat, trace, dureté, clivage et, si nécessaire, magnétisme ou réaction à l’acide.</p><Link to="/identification" className="mineral-card-link">Accéder à l’identification <span>→</span></Link><Link to="/quiz" className="quiz-review-link">📝 Tester mes connaissances <span>→</span></Link></article>
      </section>
    </main>
  );
}

export default MineralDetail;

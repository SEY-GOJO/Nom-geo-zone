import { Link } from "react-router-dom";
import { useState } from "react";
import {
  convertir,
  unitesConversion,
} from "../utils/conversions";

const familles = [
  {
    value: "longueur",
    label: "📏 Longueur",
  },
  {
    value: "masse",
    label: "⚖️ Masse",
  },
  {
    value: "volume",
    label: "🧊 Volume",
  },
  {
    value: "masseVolumique",
    label: "🧱 Masse volumique",
  },
  {
    value: "concentration",
    label: "🧪 Concentration",
  },
];

function Convertisseur() {
  const [famille, setFamille] = useState("longueur");
  const [valeur, setValeur] = useState("");
  const [uniteDepart, setUniteDepart] = useState("m");
  const [uniteArrivee, setUniteArrivee] = useState("km");

  const unitesActuelles = unitesConversion[famille];

  const changerFamille = (nouvelleFamille) => {
    const nouvellesUnites = unitesConversion[nouvelleFamille];

    setFamille(nouvelleFamille);
    setValeur("");
    setUniteDepart(nouvellesUnites[0].value);
    setUniteArrivee(
      nouvellesUnites[1]?.value ?? nouvellesUnites[0].value
    );
  };

  const calculerConversion = () => {
    if (valeur === "") {
      return "";
    }

    const nombre = Number(valeur);

    if (!Number.isFinite(nombre)) {
      return null;
    }

    try {
      return convertir(
        nombre,
        famille,
        uniteDepart,
        uniteArrivee
      );
    } catch {
      return null;
    }
  };

  const resultat = calculerConversion();

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">
          📐
        </div>

        <h1>
          Conversion des unités
        </h1>

        <p>
          Convertis les principales unités utilisées en
          géologie, hydrogéologie, laboratoire et mining.
        </p>
      </div>

      <div className="card">
        <h2>
          🔄 Convertisseur GEO ZONE
        </h2>

        <label htmlFor="conversion-famille">
          Type de conversion
        </label>

        <select
          id="conversion-famille"
          value={famille}
          onChange={(e) => changerFamille(e.target.value)}
        >
          {familles.map((element) => (
            <option
              key={element.value}
              value={element.value}
            >
              {element.label}
            </option>
          ))}
        </select>

        <label htmlFor="conversion-valeur">
          Valeur
        </label>

        <input
          className="search"
          id="conversion-valeur"
          type="number"
          placeholder="Exemple : 1500"
          value={valeur}
          onChange={(e) => setValeur(e.target.value)}
        />

        <label htmlFor="conversion-depart">
          Unité de départ
        </label>

        <select
          id="conversion-depart"
          value={uniteDepart}
          onChange={(e) => setUniteDepart(e.target.value)}
        >
          {unitesActuelles.map((unite) => (
            <option
              key={unite.value}
              value={unite.value}
            >
              {unite.label}
            </option>
          ))}
        </select>

        <label htmlFor="conversion-arrivee">
          Unité d'arrivée
        </label>

        <select
          id="conversion-arrivee"
          value={uniteArrivee}
          onChange={(e) => setUniteArrivee(e.target.value)}
        >
          {unitesActuelles.map((unite) => (
            <option
              key={unite.value}
              value={unite.value}
            >
              {unite.label}
            </option>
          ))}
        </select>

        {valeur !== "" && resultat !== null && (
          <div className="card">
            <h2>
              Résultat
            </h2>

            <p>
              {valeur} {uniteDepart} =
            </p>

            <h1>
              {resultat} {uniteArrivee}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Convertisseur;
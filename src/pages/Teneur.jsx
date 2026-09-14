import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
  convertir,
  unitesConversion,
} from "../utils/conversions";

function Teneur() {
    const [searchParams] = useSearchParams();

const tonnageTransmis = searchParams.get("tonnage");
const [tonnage, setTonnage] = useState(
  tonnageTransmis || ""
);
  const [valeur, setValeur] = useState("");
  const [uniteDepart, setUniteDepart] = useState("%");
  const [uniteArrivee, setUniteArrivee] = useState("ppm");

  const unites = unitesConversion.concentration;

  const calculerTeneur = () => {
    if (valeur === "") {
      return "";
    }

    const nombre = Number(valeur);

    if (!Number.isFinite(nombre) || nombre < 0) {
      return null;
    }

    try {
      return convertir(
        nombre,
        "concentration",
        uniteDepart,
        uniteArrivee
      );
    } catch {
      return null;
    }
  };

  const resultat = calculerTeneur();

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">
          🧪
        </div>

        <h1>
          Calculateur de teneur
        </h1>

        <p>
          Convertis les principales unités de teneur utilisées
          en géologie, géochimie et mining.
        </p>
      </div>

      <div className="card">
        <h2>
          🧪 Conversion de teneur
        </h2>

        <label htmlFor="teneur-valeur">
          Valeur
        </label>

        <input
          className="search"
          id="teneur-valeur"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 0.25"
          value={valeur}
          onChange={(e) => setValeur(e.target.value)}
        />

        <label htmlFor="teneur-depart">
          Unité de départ
        </label>

        <select
          id="teneur-depart"
          value={uniteDepart}
          onChange={(e) => setUniteDepart(e.target.value)}
        >
          {unites.map((unite) => (
            <option
              key={unite.value}
              value={unite.value}
            >
              {unite.label}
            </option>
          ))}
        </select>

        <label htmlFor="teneur-arrivee">
          Unité d'arrivée
        </label>

        <select
          id="teneur-arrivee"
          value={uniteArrivee}
          onChange={(e) => setUniteArrivee(e.target.value)}
        >
          {unites.map((unite) => (
            <option
              key={unite.value}
              value={unite.value}
            >
              {unite.label}
            </option>
          ))}
        </select>
        <label htmlFor="teneur-tonnage">
  Tonnage
</label>

<input
  className="search"
  id="teneur-tonnage"
  type="number"
  min="0"
  step="any"
  placeholder="Exemple : 6360"
  value={tonnage}
  onChange={(e) => setTonnage(e.target.value)}
/>

<p>
  Unité : tonnes (t)
</p>

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

      <div className="card">
        <h2>
          📚 Comprendre la teneur
        </h2>

        <p>
          La teneur exprime la quantité d'un constituant
          recherché dans un matériau ou un minerai.
        </p>

        <p>
          Pour les conversions massiques usuelles utilisées
          ici, 1 g/t correspond numériquement à 1 ppm.
        </p>

        <p>
          Exemple : 0,25 % = 2 500 ppm.
        </p>
      </div>
    </div>
  );
}

export default Teneur;
import { Link } from "react-router-dom";
import { useState } from "react";

function Convertisseur() {
  const [valeur, setValeur] = useState("");
  const [uniteDepart, setUniteDepart] = useState("m");
  const [uniteArrivee, setUniteArrivee] = useState("km");

  const convertir = () => {
    if (valeur === "") {
      return "";
    }

    const nombre = Number(valeur);

    if (!Number.isFinite(nombre)) {
      return null;
    }

    const enMetres = {
      mm: nombre / 1000,
      cm: nombre / 100,
      m: nombre,
      km: nombre * 1000,
    };

    const metres = enMetres[uniteDepart];

    const depuisMetres = {
      mm: metres * 1000,
      cm: metres * 100,
      m: metres,
      km: metres / 1000,
    };

    return depuisMetres[uniteArrivee];
  };

  const resultat = convertir();

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
          Convertis rapidement les principales unités de
          longueur utilisées en géologie et en mining.
        </p>
      </div>

      <div className="card">
        <h2>
          📏 Convertisseur de longueur
        </h2>

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

        <label>
          Unité de départ
        </label>

        <select
          value={uniteDepart}
          onChange={(e) => setUniteDepart(e.target.value)}
        >
          <option value="mm">Millimètre (mm)</option>
          <option value="cm">Centimètre (cm)</option>
          <option value="m">Mètre (m)</option>
          <option value="km">Kilomètre (km)</option>
        </select>

        <label>
          Unité d'arrivée
        </label>

        <select
          value={uniteArrivee}
          onChange={(e) => setUniteArrivee(e.target.value)}
        >
          <option value="mm">Millimètre (mm)</option>
          <option value="cm">Centimètre (cm)</option>
          <option value="m">Mètre (m)</option>
          <option value="km">Kilomètre (km)</option>
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
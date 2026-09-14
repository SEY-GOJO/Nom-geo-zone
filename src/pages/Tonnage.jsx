import { Link } from "react-router-dom";
import { useState } from "react";

function Tonnage() {
  const [volume, setVolume] = useState("");
  const [densite, setDensite] = useState("");

  const calculerTonnage = () => {
    if (volume === "" || densite === "") {
      return null;
    }

    const volumeNombre = Number(volume);
    const densiteNombre = Number(densite);

    if (
      !Number.isFinite(volumeNombre) ||
      !Number.isFinite(densiteNombre) ||
      volumeNombre < 0 ||
      densiteNombre <= 0
    ) {
      return null;
    }

    return volumeNombre * densiteNombre;
  };

  const tonnage = calculerTonnage();

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">
          ⛏️
        </div>

        <h1>
          Tonnage minier
        </h1>

        <p>
          Calcule le tonnage théorique d'un matériau à partir
          de son volume et de sa masse volumique.
        </p>
      </div>

      <div className="card">
        <h2>
          🧱 Calcul du tonnage
        </h2>

        <label htmlFor="tonnage-volume">
          Volume
        </label>

        <input
          className="search"
          id="tonnage-volume"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 2400"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />

        <p>
          Unité : m³
        </p>

        <label htmlFor="tonnage-densite">
          Masse volumique
        </label>

        <input
          className="search"
          id="tonnage-densite"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 2.65"
          value={densite}
          onChange={(e) => setDensite(e.target.value)}
        />

        <p>
          Unité : t/m³
        </p>

        {tonnage !== null && (
          <div className="card">
            <h2>
              Résultat
            </h2>

            <p>
              {volume} m³ × {densite} t/m³ =
            </p>

            <h1>
              {tonnage} t
            </h1>
          </div>
        )}
      </div>
      <Link
  to={`/outils/metal-contenu?tonnage=${tonnage}`}
  className="hero-button primary"
>
  Continuer vers le métal contenu →
</Link>

      <div className="card">
        <h2>
          📚 Comprendre
        </h2>

        <p>
          Le tonnage est obtenu en multipliant le volume du
          matériau par sa masse volumique exprimée en tonnes
          par mètre cube.
        </p>

        <p>
          Exemple : pour 2 400 m³ et une masse volumique de
          2,65 t/m³, le tonnage calculé est de 6 360 tonnes.
        </p>
      </div>
    </div>
  );
}

export default Tonnage;
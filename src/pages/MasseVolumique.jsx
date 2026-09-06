import { Link } from "react-router-dom";
import { useState } from "react";

function MasseVolumique() {
  const [masse, setMasse] = useState("");
  const [volume, setVolume] = useState("");
  const [uniteMasse, setUniteMasse] = useState("kg");
  const [uniteVolume, setUniteVolume] = useState("m3");

  const calculer = () => {
    const masseSaisie = Number(masse);
    const volumeSaisi = Number(volume);

    if (
      masse === "" ||
      volume === "" ||
      !Number.isFinite(masseSaisie) ||
      !Number.isFinite(volumeSaisi) ||
      masseSaisie < 0 ||
      volumeSaisi <= 0
    ) {
      return null;
    }

    let masseEnKg = masseSaisie;

    if (uniteMasse === "g") {
      masseEnKg = masseEnKg / 1000;
    }

    let volumeEnM3 = volumeSaisi;

    if (uniteVolume === "cm3") {
      volumeEnM3 = volumeEnM3 / 1000000;
    }

    return masseEnKg / volumeEnM3;
  };

  const resultat = calculer();

  const reinitialiser = () => {
    setMasse("");
    setVolume("");
    setUniteMasse("kg");
    setUniteVolume("m3");
  };

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">
          ⚖️
        </div>

        <h1>
          Masse volumique
        </h1>

        <p>
          Calcule la masse volumique d'un matériau à partir
          de sa masse et de son volume.
        </p>
      </div>

      <div className="card">
        <h2>
          🧮 Calculateur
        </h2>

        <label htmlFor="masse-valeur">
          Masse
        </label>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className="search"
            id="masse-valeur"
            type="number"
            placeholder="Exemple : 2500"
            value={masse}
            onChange={(e) => setMasse(e.target.value)}
          />

          <select
            value={uniteMasse}
            onChange={(e) => setUniteMasse(e.target.value)}
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
          </select>
        </div>

        <label htmlFor="volume-valeur">
          Volume
        </label>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className="search"
            id="volume-valeur"
            type="number"
            placeholder="Exemple : 1"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />

          <select
            value={uniteVolume}
            onChange={(e) => setUniteVolume(e.target.value)}
          >
            <option value="m3">m³</option>
            <option value="cm3">cm³</option>
          </select>
        </div>

        {resultat !== null && (
          <div className="card">
            <h2>
              📊 Résultat
            </h2>

            <p>
              La masse volumique du matériau est :
            </p>

            <h1>
              {resultat.toLocaleString("fr-FR", {
                maximumFractionDigits: 4
              })} kg/m³
            </h1>
          </div>
        )}

        <button onClick={reinitialiser}>
          🔄 Réinitialiser
        </button>
      </div>

      <div className="card">
        <h2>
          📚 Exemple
        </h2>

        <p>
          Si un échantillon possède une masse de 2 700 kg
          et un volume de 1 m³, sa masse volumique est de
          2 700 kg/m³.
        </p>
      </div>
    </div>
  );
}

export default MasseVolumique;
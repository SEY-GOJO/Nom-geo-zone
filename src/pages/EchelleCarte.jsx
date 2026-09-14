import { Link } from "react-router-dom";
import { useState } from "react";
import { convertir } from "../utils/conversions";

const unitesCarte = [
  { value: "mm", label: "Millimètre (mm)" },
  { value: "cm", label: "Centimètre (cm)" },
  { value: "m", label: "Mètre (m)" },
];

const unitesTerrain = [
  { value: "m", label: "Mètre (m)" },
  { value: "km", label: "Kilomètre (km)" },
];

function EchelleCarte() {
  const [mode, setMode] = useState("carteVersTerrain");
  const [distance, setDistance] = useState("");
  const [unite, setUnite] = useState("cm");
  const [echelle, setEchelle] = useState("25000");
  const [uniteResultat, setUniteResultat] = useState("m");

  const calculer = () => {
    if (distance === "" || echelle === "") {
      return null;
    }

    const distanceNombre = Number(distance);
    const echelleNombre = Number(echelle);

    if (
      !Number.isFinite(distanceNombre) ||
      !Number.isFinite(echelleNombre) ||
      distanceNombre < 0 ||
      echelleNombre <= 0
    ) {
      return null;
    }

    try {
      if (mode === "carteVersTerrain") {
        const distanceCarteEnMetres = convertir(
          distanceNombre,
          "longueur",
          unite,
          "m"
        );

        const distanceTerrainEnMetres =
          distanceCarteEnMetres * echelleNombre;

        const resultat = convertir(
          distanceTerrainEnMetres,
          "longueur",
          "m",
          uniteResultat
        );

        return {
          valeur: resultat,
          unite: uniteResultat,
        };
      }

      const distanceTerrainEnMetres = convertir(
        distanceNombre,
        "longueur",
        unite,
        "m"
      );

      const distanceCarteEnMetres =
        distanceTerrainEnMetres / echelleNombre;

      const resultat = convertir(
        distanceCarteEnMetres,
        "longueur",
        "m",
        uniteResultat
      );

      return {
        valeur: resultat,
        unite: uniteResultat,
      };
    } catch {
      return null;
    }
  };

  const resultat = calculer();

  const changerMode = (nouveauMode) => {
    setMode(nouveauMode);
    setDistance("");

    if (nouveauMode === "carteVersTerrain") {
      setUnite("cm");
      setUniteResultat("m");
    } else {
      setUnite("m");
      setUniteResultat("cm");
    }
  };

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">
          🗺️
        </div>

        <h1>
          Échelle cartographique
        </h1>

        <p>
          Utilise l'échelle réelle de ta carte pour convertir
          une distance mesurée sur la carte en distance sur le
          terrain, ou l'inverse.
        </p>
      </div>

      <div className="card">
        <h2>
          🗺️ Calculateur d'échelle
        </h2>

        <label htmlFor="echelle-value">
          Échelle de la carte
        </label>

        <div>
          <span>
            1 :
          </span>

          <input
            className="search"
            id="echelle-value"
            type="number"
            min="1"
            step="1"
            placeholder="Exemple : 25000"
            value={echelle}
            onChange={(e) => setEchelle(e.target.value)}
          />
        </div>

        <p>
          Exemple : pour une carte au 1 : 25 000, entre
          <strong> 25000</strong>.
        </p>

        <label htmlFor="echelle-mode">
          Que veux-tu calculer ?
        </label>

        <select
          id="echelle-mode"
          value={mode}
          onChange={(e) => changerMode(e.target.value)}
        >
          <option value="carteVersTerrain">
            Distance sur la carte → Distance terrain
          </option>

          <option value="terrainVersCarte">
            Distance terrain → Distance sur la carte
          </option>
        </select>

        <label htmlFor="echelle-distance">
          {mode === "carteVersTerrain"
            ? "Distance mesurée sur la carte"
            : "Distance mesurée sur le terrain"}
        </label>

        <input
          className="search"
          id="echelle-distance"
          type="number"
          min="0"
          step="any"
          placeholder={
            mode === "carteVersTerrain"
              ? "Exemple : 4"
              : "Exemple : 1000"
          }
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />

        <label htmlFor="echelle-unite">
          Unité de la distance
        </label>

        <select
          id="echelle-unite"
          value={unite}
          onChange={(e) => setUnite(e.target.value)}
        >
          {(mode === "carteVersTerrain"
            ? unitesCarte
            : unitesTerrain
          ).map((element) => (
            <option
              key={element.value}
              value={element.value}
            >
              {element.label}
            </option>
          ))}
        </select>

        <label htmlFor="echelle-resultat">
          Unité du résultat
        </label>

        <select
          id="echelle-resultat"
          value={uniteResultat}
          onChange={(e) =>
            setUniteResultat(e.target.value)
          }
        >
          {(mode === "carteVersTerrain"
            ? unitesTerrain
            : unitesCarte
          ).map((element) => (
            <option
              key={element.value}
              value={element.value}
            >
              {element.label}
            </option>
          ))}
        </select>

        {resultat !== null && (
          <div className="card">
            <h2>
              Résultat
            </h2>

            <p>
              Échelle :
            </p>

            <h2>
              1 : {echelle}
            </h2>

            <p>
              Distance calculée :
            </p>

            <h1>
              {resultat.valeur} {resultat.unite}
            </h1>
          </div>
        )}

        {distance !== "" &&
          resultat === null && (
            <p>
              Vérifie la distance et l'échelle saisies.
            </p>
          )}
      </div>

      <div className="card">
        <h2>
          📚 Comprendre
        </h2>

        <p>
          Une échelle 1 : 25 000 signifie qu'une unité mesurée
          sur la carte représente 25 000 unités identiques sur
          le terrain.
        </p>

        <p>
          Exemple : 4 cm sur une carte au 1 : 25 000
          correspondent à 100 000 cm, soit 1 000 m sur le
          terrain.
        </p>

        <p>
          Dans le sens inverse, 1 000 m sur le terrain
          correspondent à 4 cm sur une carte au 1 : 25 000.
        </p>

        <p>
          L'échelle peut être personnalisée : 1 : 10 000,
          1 : 25 000, 1 : 50 000, 1 : 100 000, etc.
        </p>
      </div>
    </div>
  );
}

export default EchelleCarte;
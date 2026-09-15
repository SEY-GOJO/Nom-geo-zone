import { Link } from "react-router-dom";
import { useState } from "react";
import { analyserProjetMinier } from "../utils/miningCalculations.js";

const STORAGE_KEY = "geo-zone:mining-project:v1";

function MiningCalculator() {
  const [nomProjet, setNomProjet] = useState("");

  const [volume, setVolume] = useState("");
  const [densite, setDensite] = useState("");

  const [tauxDilution, setTauxDilution] = useState("0");
  const [tonnageSterile, setTonnageSterile] = useState("");

  const [teneurMinerai, setTeneurMinerai] = useState("");
  const [teneurSterile, setTeneurSterile] = useState("0");
  const [uniteTeneur, setUniteTeneur] = useState("g/t");

  const [recuperation, setRecuperation] = useState("");

  const [messageSauvegarde, setMessageSauvegarde] =
    useState("");

  const analyse = analyserProjetMinier({
    nomProjet,
    volume,
    densite,
    teneurMinerai,
    teneurSterile,
    uniteTeneur,
    tauxDilution,
    tonnageSterile,
    recuperation,
  });

  const tonnageMinerai = analyse.tonnageMinerai;
  const teneurMineraiGParTonne = analyse.teneurMineraiGParTonne;
  const dilution = analyse.dilution;
  const strippingRatio = analyse.strippingRatio;
  const metalContenu = analyse.metalContenu;
  const metalRecupere = analyse.metalRecupere;

  /* =========================
     SAUVEGARDE
  ========================= */

  const sauvegarderProjet = () => {
    const projet = {
      version: 1,
      nomProjet,
      volume,
      densite,
      tauxDilution,
      tonnageSterile,
      teneurMinerai,
      teneurSterile,
      uniteTeneur,
      recuperation,
      dateSauvegarde: new Date().toISOString(),
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(projet)
    );

    setMessageSauvegarde(
      "Projet enregistré sur cet appareil."
    );
  };

  const chargerProjet = () => {
    const donnees =
      localStorage.getItem(STORAGE_KEY);

    if (!donnees) {
      setMessageSauvegarde(
        "Aucun projet sauvegardé sur cet appareil."
      );
      return;
    }

    try {
      const projet = JSON.parse(donnees);

      setNomProjet(projet.nomProjet || "");
      setVolume(projet.volume || "");
      setDensite(projet.densite || "");
      setTauxDilution(
        projet.tauxDilution ?? "0"
      );
      setTonnageSterile(
        projet.tonnageSterile || ""
      );
      setTeneurMinerai(
        projet.teneurMinerai || ""
      );
      setTeneurSterile(
        projet.teneurSterile ?? "0"
      );
      setUniteTeneur(
        projet.uniteTeneur || "g/t"
      );
      setRecuperation(
        projet.recuperation || ""
      );

      setMessageSauvegarde(
        "Projet chargé."
      );
    } catch {
      setMessageSauvegarde(
        "Impossible de charger le projet sauvegardé."
      );
    }
  };

  const nouveauProjet = () => {
    setNomProjet("");
    setVolume("");
    setDensite("");
    setTauxDilution("0");
    setTonnageSterile("");
    setTeneurMinerai("");
    setTeneurSterile("0");
    setUniteTeneur("g/t");
    setRecuperation("");

    setMessageSauvegarde(
      "Nouveau projet."
    );
  };

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
          Mining Calculator
        </h1>

        <p>
          Un espace intégré pour étudier un projet minier à
          travers le tonnage, la dilution, la teneur, le
          stripping ratio, le métal contenu et la récupération.
        </p>
      </div>

      {/* PROJET */}

      <div className="card">
        <h2>
          📁 Projet minier
        </h2>

        <label htmlFor="mining-project-name">
          Nom du projet
        </label>

        <input
          className="search"
          id="mining-project-name"
          type="text"
          placeholder="Exemple : Projet aurifère"
          value={nomProjet}
          onChange={(e) =>
            setNomProjet(e.target.value)
          }
        />

        <div className="hero-buttons">
          <button
            type="button"
            className="hero-button primary"
            onClick={sauvegarderProjet}
          >
            💾 Enregistrer
          </button>

          <button
            type="button"
            className="hero-button secondary"
            onClick={chargerProjet}
          >
            📂 Charger
          </button>

          <button
            type="button"
            className="hero-button secondary"
            onClick={nouveauProjet}
          >
            🆕 Nouveau
          </button>
        </div>

        {messageSauvegarde !== "" && (
          <p>
            {messageSauvegarde}
          </p>
        )}
      </div>

      {/* TONNAGE */}

      <div className="card">
        <h2>
          1. 📦 Tonnage du minerai
        </h2>

        <label htmlFor="mining-volume">
          Volume du minerai
        </label>

        <input
          className="search"
          id="mining-volume"
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

        <label htmlFor="mining-density">
          Masse volumique
        </label>

        <input
          className="search"
          id="mining-density"
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

        {tonnageMinerai !== null && (
          <div className="card">
            <h3>
              Tonnage du minerai
            </h3>

            <h1>
              {tonnageMinerai} t
            </h1>
          </div>
        )}
      </div>

      {/* TENEUR */}

      <div className="card">
        <h2>
          2. 🧪 Teneur
        </h2>

        <label htmlFor="mining-grade">
          Teneur du minerai
        </label>

        <input
          className="search"
          id="mining-grade"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 3.2"
          value={teneurMinerai}
          onChange={(e) =>
            setTeneurMinerai(e.target.value)
          }
        />

        <label htmlFor="mining-grade-unit">
          Unité de teneur
        </label>

        <select
          id="mining-grade-unit"
          value={uniteTeneur}
          onChange={(e) =>
            setUniteTeneur(e.target.value)
          }
        >
          <option value="g/t">
            Gramme par tonne (g/t)
          </option>

          <option value="ppm">
            Partie par million (ppm)
          </option>

          <option value="%">
            Pourcentage (%)
          </option>

          <option value="ppb">
            Partie par milliard (ppb)
          </option>
        </select>

        {teneurMineraiGParTonne !== null && (
          <div className="card">
            <h3>
              Teneur normalisée
            </h3>

            <h2>
              {teneurMineraiGParTonne} g/t
            </h2>
          </div>
        )}
      </div>

      {/* DILUTION */}

      <div className="card">
        <h2>
          3. ⚠️ Dilution
        </h2>

        <label htmlFor="mining-dilution">
          Taux de dilution
        </label>

        <input
          className="search"
          id="mining-dilution"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 10"
          value={tauxDilution}
          onChange={(e) =>
            setTauxDilution(e.target.value)
          }
        />

        <p>
          Définition : stérile / minerai × 100.
        </p>

        <label htmlFor="mining-waste-grade">
          Teneur du stérile
        </label>

        <input
          className="search"
          id="mining-waste-grade"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 0"
          value={teneurSterile}
          onChange={(e) =>
            setTeneurSterile(e.target.value)
          }
        />

        <p>
          Unité : {uniteTeneur}
        </p>

        {dilution !== null && (
          <div className="card">
            <h3>
              Résultats de la dilution
            </h3>

            <p>
              Stérile ajouté
            </p>

            <h2>
              {dilution.sterileAjoute} t
            </h2>

            <p>
              Tonnage total
            </p>

            <h2>
              {dilution.tonnageTotal} t
            </h2>

            <p>
              Teneur diluée
            </p>

            <h2>
              {dilution.teneurDiluee} g/t
            </h2>
          </div>
        )}
      </div>

      {/* STRIPPING RATIO */}

      <div className="card">
        <h2>
          4. ⛰️ Stripping Ratio
        </h2>

        <label htmlFor="mining-sterile">
          Tonnage du stérile
        </label>

        <input
          className="search"
          id="mining-sterile"
          type="number"
          min="0"
          step="any"
          placeholder="Laisser vide pour utiliser la dilution"
          value={tonnageSterile}
          onChange={(e) =>
            setTonnageSterile(e.target.value)
          }
        />

        <p>
          Unité : tonnes (t)
        </p>

        {strippingRatio !== null && (
          <div className="card">
            <h3>
              Stripping Ratio
            </h3>

            <h1>
              {strippingRatio.toFixed(3)}
            </h1>

            <p>
              Rapport : {strippingRatio.toFixed(3)} : 1
            </p>
          </div>
        )}

        <p>
          Le calcul utilisé est : tonnage du stérile /
          tonnage du minerai.
        </p>
      </div>

      {/* METAL CONTENU */}

      <div className="card">
        <h2>
          5. 🥇 Métal contenu
        </h2>

        {metalContenu !== null ? (
          <>
            <p>
              Métal contenu théorique après prise en compte de
              la dilution :
            </p>

            <h1>
              {metalContenu.tonnes} t
            </h1>

            <p>
              {metalContenu.kilogrammes} kg
            </p>

            <p>
              {metalContenu.grammes} g
            </p>
          </>
        ) : (
          <p>
            Renseigne le tonnage, la teneur et les paramètres
            de dilution.
          </p>
        )}
      </div>

      {/* RECUPERATION */}

      <div className="card">
        <h2>
          6. ♻️ Récupération
        </h2>

        <label htmlFor="mining-recovery">
          Taux de récupération
        </label>

        <input
          className="search"
          id="mining-recovery"
          type="number"
          min="0"
          max="100"
          step="any"
          placeholder="Exemple : 85"
          value={recuperation}
          onChange={(e) =>
            setRecuperation(e.target.value)
          }
        />

        <p>
          Unité : %
        </p>

        {metalRecupere !== null ? (
          <div className="card">
            <h3>
              Métal récupéré théorique
            </h3>

            <h1>
              {metalRecupere.recupere} t
            </h1>

            <p>
              Métal non récupéré :{" "}
              {metalRecupere.nonRecupere} t
            </p>
          </div>
        ) : (
          <p>
            Renseigne le taux de récupération pour obtenir le
            métal récupéré théorique.
          </p>
        )}
      </div>

      {/* SYNTHESE */}

      <div className="card">
        <h2>
          📋 Synthèse du projet
        </h2>

        <p>
          {nomProjet !== ""
            ? `Projet : ${nomProjet}`
            : "Aucun nom de projet renseigné."}
        </p>

        <p>
          La chaîne de calcul est :
          volume → tonnage → dilution → teneur diluée →
          stripping ratio → métal contenu → récupération.
        </p>

        {tonnageMinerai !== null && (
          <p>
            Tonnage minerai : {tonnageMinerai} t
          </p>
        )}

        {dilution !== null && (
          <p>
            Tonnage total après dilution :{" "}
            {dilution.tonnageTotal} t
          </p>
        )}

        {strippingRatio !== null && (
          <p>
            Stripping Ratio :{" "}
            {strippingRatio.toFixed(3)} : 1
          </p>
        )}

        {metalContenu !== null && (
          <p>
            Métal contenu :{" "}
            {metalContenu.kilogrammes} kg
          </p>
        )}

        {metalRecupere !== null && (
          <p>
            Métal récupéré :{" "}
            {metalRecupere.recupere} t
          </p>
        )}

        <p>
          Ces calculs sont des modèles pédagogiques simplifiés
          et ne remplacent pas une étude technique ou
          économique réelle.
        </p>
      </div>
    </div>
  );
}

export default MiningCalculator;

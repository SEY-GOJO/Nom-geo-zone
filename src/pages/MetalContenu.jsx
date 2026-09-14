import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

function MetalContenu() {
  const [searchParams] = useSearchParams();

  const tonnageTransmis = searchParams.get("tonnage");
  const teneurTransmise = searchParams.get("teneur");
  const uniteTransmise = searchParams.get("unite");

  const [tonnage, setTonnage] = useState(
    tonnageTransmis || ""
  );

  const [teneur, setTeneur] = useState(
    teneurTransmise || ""
  );

  const [uniteTeneur, setUniteTeneur] = useState(
    uniteTransmise || "g/t"
  );

  const calculerMetalContenu = () => {
    if (tonnage === "" || teneur === "") {
      return null;
    }

    const tonnageNombre = Number(tonnage);
    const teneurNombre = Number(teneur);

    if (
      !Number.isFinite(tonnageNombre) ||
      !Number.isFinite(teneurNombre) ||
      tonnageNombre < 0 ||
      teneurNombre < 0
    ) {
      return null;
    }

    let metalEnTonnes;

    switch (uniteTeneur) {
      case "%":
        metalEnTonnes =
          tonnageNombre * (teneurNombre / 100);
        break;

      case "ppm":
        metalEnTonnes =
          tonnageNombre * (teneurNombre / 1_000_000);
        break;

      case "g/t":
        metalEnTonnes =
          (tonnageNombre * teneurNombre) / 1_000_000;
        break;

      default:
        return null;
    }

    return {
      tonnes: metalEnTonnes,
      kilogrammes: metalEnTonnes * 1000,
      grammes: metalEnTonnes * 1_000_000,
    };
  };

  const resultat = calculerMetalContenu();

  return (
    <div className="container">
      <Link to="/outils" className="back-link">
        ← Retour aux outils
      </Link>

      <div className="welcome">
        <div className="module-icon">
          🥇
        </div>

        <h1>
          Métal contenu
        </h1>

        <p>
          Estime la quantité théorique de métal contenue dans
          un tonnage donné à partir de sa teneur.
        </p>
      </div>

      <div className="card">
        <h2>
          ⛏️ Calcul du métal contenu
        </h2>

        <label htmlFor="metal-tonnage">
          Tonnage
        </label>

        <input
          className="search"
          id="metal-tonnage"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 10000"
          value={tonnage}
          onChange={(e) => setTonnage(e.target.value)}
        />

        <p>
          Unité : tonnes (t)
        </p>

        <label htmlFor="metal-teneur">
          Teneur
        </label>

        <input
          className="search"
          id="metal-teneur"
          type="number"
          min="0"
          step="any"
          placeholder="Exemple : 3.2"
          value={teneur}
          onChange={(e) => setTeneur(e.target.value)}
        />

        <label htmlFor="metal-unite-teneur">
          Unité de teneur
        </label>

        <select
          id="metal-unite-teneur"
          value={uniteTeneur}
          onChange={(e) => setUniteTeneur(e.target.value)}
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
        </select>

        {resultat !== null && (
          <>
            <div className="card">
              <h2>
                Résultat
              </h2>

              <p>
                Métal contenu théorique
              </p>

              <h1>
                {resultat.tonnes} t
              </h1>

              <p>
                Soit {resultat.kilogrammes} kg
              </p>

              <p>
                Soit {resultat.grammes} g
              </p>
            </div>

            <Link
              to={`/outils/recuperation?metal=${resultat.tonnes}`}
              className="hero-button primary"
            >
              Calculer la récupération →
            </Link>
          </>
        )}
      </div>

      <div className="card">
        <h2>
          📚 Comprendre
        </h2>

        <p>
          La quantité de métal contenu dépend du tonnage du
          matériau et de sa teneur.
        </p>

        <p>
          Pour une teneur exprimée en g/t, on multiplie le
          tonnage par la teneur en g/t puis on convertit le
          résultat en tonnes, kilogrammes ou grammes.
        </p>

        <p>
          Exemple : 10 000 t à 3,2 g/t correspondent à
          32 000 g, soit 32 kg de métal contenu théorique.
        </p>

        <p>
          Le résultat est théorique et ne tient pas encore
          compte de la récupération métallurgique, des pertes
          ou de la dilution.
        </p>
      </div>
    </div>
  );
}

export default MetalContenu;
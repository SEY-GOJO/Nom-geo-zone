import { Link, useParams } from "react-router-dom";
import roches from "../data/roches";

function RocheDetail() {
  const { id } = useParams();

  const roche = roches.find(
    (roche) => roche.id === Number(id)
  );

  if (!roche) {
    return (
      <div className="container">
        <div className="card">
          <h1>❌ Roche introuvable</h1>

          <Link to="/roches" className="back-link">
            ← Retour aux roches
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">

      <Link to="/roches" className="back-link">
        ← Retour aux roches
      </Link>

      <div className="course-header card">

        <div className="module-icon">
          🪨
        </div>

        <h1>{roche.nom}</h1>

        <p>
          {roche.famille}
        </p>

        <p>
          <strong>
            Sous-famille :
          </strong>{" "}
          {roche.sousFamille}
        </p>

      </div>

      <div className="card">

        <h2>🔬 Caractéristiques</h2>

        <p>
          <strong>Couleur :</strong>{" "}
          {roche.couleur}
        </p>

        <p>
          <strong>Texture :</strong>{" "}
          {roche.texture}
        </p>

        <p>
          <strong>Structure :</strong>{" "}
          {roche.structure}
        </p>

        <p>
          <strong>Minéraux :</strong>{" "}
          {roche.mineraux.join(", ")}
        </p>

      </div>

      <div className="card">

        <h2>🌋 Formation</h2>

        <p>
          {roche.origine}
        </p>

      </div>

      <div className="card">

        <h2>🏗️ Utilisations</h2>

        <p>
          {roche.utilisation}
        </p>

      </div>

      <div className="card">

        <h2>📚 Informations supplémentaires</h2>

        <p>
          Cette fiche sera enrichie avec les données
          provenant de tes documents géologiques.
        </p>

      </div>

    </div>
  );
}

export default RocheDetail;
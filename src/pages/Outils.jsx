import { Link } from "react-router-dom";

function Outils() {
  return (
    <div className="container">
      <Link to="/" className="back-link">
        ← Retour à l'accueil
      </Link>

      <div className="welcome">
        <div className="module-icon">
          🧮
        </div>

        <h1>
          Outils géologiques
        </h1>

        <p>
          Des outils et calculateurs pratiques pour tes travaux
          en géologie et en mining.
        </p>
      </div>

      <div className="modules">

        <div className="card">
          <h2>
            📐 Conversion des unités
          </h2>

          <p>
            Convertis rapidement les principales unités utilisées
            en géologie.
          </p>

          <Link to="/outils/convertisseur">
            <button>
              Ouvrir →
            </button>
          </Link>
        </div>

        <div className="card">
          <h2>
            ⚖️ Masse volumique
          </h2>

          <p>
            Calcule la masse volumique d'un matériau à partir de
            sa masse et de son volume.
          </p>

          <Link to="/outils/masse-volumique">
            <button>
              Ouvrir →
            </button>
          </Link>
        </div>

        <div className="card">
          <h2>
            📊 Pourcentage
          </h2>

          <p>
            Effectue rapidement différents calculs de pourcentage.
          </p>

          <Link to="/outils/pourcentage">
            <button>
              Ouvrir →
            </button>
          </Link>
        </div>

        <div className="card">
          <h2>
            🧭 Azimut
          </h2>

          <p>
            Outil pour effectuer des calculs simples liés aux
            directions et aux orientations.
          </p>

          <Link to="/outils/azimut">
            <button>
              Ouvrir →
            </button>
          </Link>
        </div>

        <div className="card">
          <h2>
            📏 Pendage
          </h2>

          <p>
            Outils destinés aux calculs de direction et de pendage
            des structures géologiques.
          </p>

          <Link to="/outils/pendage">
            <button>
              Ouvrir →
            </button>
          </Link>
        </div>

        <div className="card">
          <h2>
            ⛏️ Mining
          </h2>

          <p>
            Calculs liés à l'exploitation minière, au forage et
            au blasting.
          </p>

          <button>
            Bientôt disponible
          </button>
        </div>

      </div>
    </div>
  );
}

export default Outils;
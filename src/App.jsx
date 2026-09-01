import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import BibliothequeTemp from "./pages/bibliothequetemp";
import Categorie from "./pages/Categorie";
import CoursDetail from "./pages/CoursDetail";
import Chapitre from "./pages/Chapitre";
import Formation from "./pages/Formation";
import GeoAI from "./pages/GeoAI";
import Identification from "./pages/Identification";
import Mining from "./pages/Mining";
import Outils from "./pages/Outils";
import Roches from "./pages/Roches";
import RocheDetail from "./pages/RocheDetail";
import Convertisseur from "./pages/Convertisseur";
import MasseVolumique from "./pages/MasseVolumique";
import Pourcentage from "./pages/Pourcentage";
import Azimut from "./pages/Azimut";
import Pendage from "./pages/Pendage";
import Drilling from "./pages/Drilling";
import Blasting from "./pages/Blasting";
import ChargementTransport from "./pages/ChargementTransport";
import MinePlanning from "./pages/MinePlanning";
import ExplorationMiniere from "./pages/ExplorationMiniere";
import ExploitationMiniere from "./pages/ExploitationMiniere";

import "./App.css";

function Accueil() {
  const modules = [
    {
      icon: "📚",
      title: "Bibliothèque",
      description:
        "Cours de géologie, chapitres et ressources pédagogiques.",
      link: "/bibliotheque",
    },
    {
      icon: "🎓",
      title: "Formation",
      description:
        "Développe tes connaissances grâce à des contenus adaptés.",
      link: "/formation",
    },
    {
      icon: "🤖",
      title: "GEO AI",
      description:
        "Un assistant intelligent pour tes études en géologie et mines.",
      link: "/geo-ai",
    },
    {
      icon: "⛏️",
      title: "Mining",
      description:
        "Explore l'exploitation minière et ses principales disciplines.",
      link: "/mining",
    },
    {
      icon: "🪨",
      title: "Roches",
      description:
        "Découvre les familles de roches et leurs caractéristiques.",
      link: "/roches",
    },
    {
      icon: "🔬",
      title: "Identification",
      description:
        "Apprends à identifier les roches et les minéraux.",
      link: "/identification",
    },
    {
      icon: "🛠️",
      title: "Outils",
      description:
        "Découvre les outils utiles au géologue sur le terrain.",
      link: "/outils",
    },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-background-circle circle-one"></div>
        <div className="hero-background-circle circle-two"></div>

        <div className="hero-content">
          <div className="hero-badge">
            🌍 PLATEFORME D'APPRENTISSAGE
          </div>

          <h1>
            GEO <span>ZONE</span>
          </h1>

          <p className="hero-subtitle">
            L'espace numérique dédié à la géologie,
            aux mines et aux sciences de la Terre.
          </p>

          <p className="hero-description">
            Apprends, explore et développe tes connaissances
            grâce à une plateforme pensée pour les étudiants
            et passionnés des sciences de la Terre.
          </p>

          <div className="hero-buttons">
            <Link
              to="/bibliotheque"
              className="hero-button primary"
            >
              📚 Bibliothèque
            </Link>

            <Link
              to="/roches"
              className="hero-button secondary"
            >
              🪨 Roches
            </Link>
          </div>
        </div>
      </section>

      <main className="home-container">
        <section className="intro-section">
          <div className="section-label">
            GEO ZONE
          </div>

          <h2>
            Tout ton univers géologique,
            <br />
            <span>au même endroit.</span>
          </h2>

          <p>
            GEO ZONE rassemble progressivement les ressources
            essentielles pour apprendre la géologie et les mines :
            cours, roches, identification, outils, formation et
            intelligence artificielle.
          </p>
        </section>

        <section className="modules-section">
          <div className="section-heading">
            <div>
              <span className="section-small-title">
                EXPLORE LA PLATEFORME
              </span>

              <h2>
                Découvre nos espaces
              </h2>
            </div>

            <p>
              Choisis un espace et commence ton exploration.
            </p>
          </div>

          <div className="home-modules">
            {modules.map((module, index) => (
              <Link
                to={module.link}
                className={`home-module-card ${
                  index === 0 ? "featured-module" : ""
                }`}
                key={module.title}
              >
                <div className="module-top">
                  <div className="home-module-icon">
                    {module.icon}
                  </div>

                  <span className="module-arrow">
                    →
                  </span>
                </div>

                <h3>
                  {module.title}
                </h3>

                <p>
                  {module.description}
                </p>

                <span className="module-link">
                  Découvrir →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-quote">
          <div className="quote-icon">
            🌍
          </div>

          <div>
            <h2>
              Comprendre la Terre,
              c'est mieux comprendre notre monde.
            </h2>

            <p>
              GEO ZONE — Apprendre aujourd'hui pour construire
              les compétences de demain.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link
          to="/"
          className="nav-logo"
          onClick={() => setMenuOuvert(false)}
        >
          🌍 GEO ZONE
        </Link>

        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setMenuOuvert(!menuOuvert)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOuvert}
        >
          {menuOuvert ? "✕" : "☰"}
        </button>

        <div
          className={`nav-links ${
            menuOuvert ? "mobile-menu-open" : ""
          }`}
        >
          <Link
            to="/"
            onClick={() => setMenuOuvert(false)}
          >
            Accueil
          </Link>

          <Link
            to="/bibliotheque"
            onClick={() => setMenuOuvert(false)}
          >
            Bibliothèque
          </Link>

          <Link
            to="/formation"
            onClick={() => setMenuOuvert(false)}
          >
            Formation
          </Link>

          <Link
            to="/geo-ai"
            onClick={() => setMenuOuvert(false)}
          >
            GEO AI
          </Link>

          <Link
            to="/mining"
            onClick={() => setMenuOuvert(false)}
          >
            Mining
          </Link>

          <Link
            to="/roches"
            onClick={() => setMenuOuvert(false)}
          >
            Roches
          </Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Accueil />}
        />

        <Route
          path="/bibliotheque"
          element={<BibliothequeTemp />}
        />

        <Route
          path="/bibliotheque/:categorieId"
          element={<Categorie />}
        />

        <Route
          path="/bibliotheque/:categorieId/cours/:id"
          element={<CoursDetail />}
        />

        <Route
          path="/bibliotheque/:categorieId/cours/:id/chapitre/:chapitreId"
          element={<Chapitre />}
        />

        <Route
          path="/formation"
          element={<Formation />}
        />

        <Route
          path="/geo-ai"
          element={<GeoAI />}
        />

        <Route
          path="/identification"
          element={<Identification />}
        />

        <Route
          path="/mining"
          element={<Mining />}
        />

        <Route
          path="/outils"
          element={<Outils />}
        />

        <Route
          path="/outils/convertisseur"
          element={<Convertisseur />}
        />

        <Route
          path="/outils/masse-volumique"
          element={<MasseVolumique />}
        />

        <Route
          path="/outils/pourcentage"
          element={<Pourcentage />}
        />

        <Route
          path="/outils/azimut"
          element={<Azimut />}
        />

        <Route
          path="/outils/pendage"
          element={<Pendage />}
        />

        <Route
          path="/roches"
          element={<Roches />}
        />

        <Route
          path="/roches/:id"
          element={<RocheDetail />}
        />

        <Route
          path="/mining/drilling"
          element={<Drilling />}
        />

        <Route
          path="/mining/blasting"
          element={<Blasting />}
        />

        <Route
          path="/mining/chargement-transport"
          element={<ChargementTransport />}
        />

        <Route
          path="/mining/mine-planning"
          element={<MinePlanning />}
        />

        <Route
          path="/mining/exploration"
          element={<ExplorationMiniere />}
        />

        <Route
          path="/mining/exploitation"
          element={<ExploitationMiniere />}
        />

        <Route
          path="*"
          element={
            <div className="container">
              <div className="card">
                <h1>404</h1>

                <p>
                  Cette page n'existe pas.
                </p>

                <Link to="/">
                  ← Retour à l'accueil
                </Link>
              </div>
            </div>
          }
        />
      </Routes>

      <footer className="geo-footer">
        <div className="geo-footer-content">
          <div className="geo-footer-brand">
            <div className="geo-footer-logo">
              🌍 GEO ZONE
            </div>

            <p>
              La plateforme dédiée à la géologie,
              aux mines et aux sciences de la Terre.
            </p>
          </div>

          <div className="geo-footer-links">
            <h3>
              Navigation
            </h3>

            <Link to="/">
              Accueil
            </Link>

            <Link to="/bibliotheque">
              Bibliothèque
            </Link>

            <Link to="/formation">
              Formation
            </Link>

            <Link to="/roches">
              Roches
            </Link>
          </div>

          <div className="geo-footer-links">
            <h3>
              Explorer
            </h3>

            <Link to="/geo-ai">
              GEO AI
            </Link>

            <Link to="/mining">
              Mining
            </Link>

            <Link to="/identification">
              Identification
            </Link>

            <Link to="/outils">
              Outils
            </Link>
          </div>
        </div>

        <div className="geo-footer-bottom">
          <p>
            © 2026 GEO ZONE. Tous droits réservés.
          </p>

          <p>
            Apprendre • Explorer • Comprendre
          </p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
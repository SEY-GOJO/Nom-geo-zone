import { useEffect, useState } from "react";
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
import Tonnage from "./pages/Tonnage";
import Teneur from "./pages/Teneur";
import MetalContenu from "./pages/MetalContenu";
import Recuperation from "./pages/Recuperation";
import Dilution from "./pages/Dilution";
import MiningCalculator from "./pages/MiningCalculator";
import StrippingRatio from "./pages/StrippingRatio";
import StrikeDip from "./pages/StrikeDip";
import Pente from "./pages/Pente";
import DistanceTerrain from "./pages/DistanceTerrain";
import EchelleCarte from "./pages/EchelleCarte";
import Porosite from "./pages/Porosite";
import GradientHydraulique from "./pages/GradientHydraulique";
import DebitDarcy from "./pages/DebitDarcy";
import ConductiviteHydraulique from "./pages/ConductiviteHydraulique";
import Transmissivite from "./pages/Transmissivite";
import CoefficientEmmagasinement from "./pages/CoefficientEmmagasinement";
import OutilsCategorie from "./pages/OutilsCategorie";
import Progression from "./pages/Progression";
import Recherche from "./pages/Recherche";
import Quiz from "./pages/Quiz";
import Revision from "./pages/Revision";
import Evaluation from "./pages/Evaluation";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function BrandLogo() {
  return (
    <span className="brand-logo">
      <svg className="brand-logo-mark" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="23" />
        <path d="M8 34 19.5 17 26 26l4.5-6L40 34" />
        <path className="brand-logo-line" d="M10 35h28" />
        <circle className="brand-logo-star" cx="35" cy="13" r="2.5" />
      </svg>
      <span className="brand-logo-wordmark">GEO <b>ZONE</b></span>
    </span>
  );
}

function Accueil() {
  const modules = [
    {
      icon: "📚",
      title: "Bibliothèque",
      description: "Cours, chapitres et ressources pédagogiques.",
      link: "/bibliotheque",
      className: "library",
    },
    {
      icon: "🎓",
      title: "Formation",
      description: "Développe tes connaissances en sciences de la Terre.",
      link: "/formation",
      className: "formation",
    },
    {
      icon: "🤖",
      title: "GEO AI",
      description: "Ton assistant intelligent pour apprendre la géologie.",
      link: "/geo-ai",
      className: "geo-ai",
    },
    {
      icon: "⛏️",
      title: "Mining",
      description: "Explore les principales disciplines minières.",
      link: "/mining",
      className: "mining",
    },
    {
      icon: "⛰️",
      title: "Roches",
      description: "Découvre les familles et caractéristiques des roches.",
      link: "/roches",
      className: "rocks",
    },
    {
      icon: "🔬",
      title: "Identification",
      description: "Apprends à identifier les roches et minéraux.",
      link: "/identification",
      className: "identification",
    },
    {
  icon: "📊",
  title: "Dashboard",
  description: "Suis ta progression, tes résultats et tes objectifs.",
  link: "/dashboard",
  className: "dashboard",
},
    {
      icon: "🛠️",
      title: "Outils",
      description: "Calculs et outils utiles au géologue.",
      link: "/outils",
      className: "tools",
    },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-background-circle circle-one"></div>
        <div className="hero-background-circle circle-two"></div>

        <div className="hero-content">
          <div className="hero-badge">🌍 PLATEFORME D'APPRENTISSAGE</div>

          <h1>
            GEO <span>ZONE</span>
          </h1>

          <p className="hero-subtitle">
            L'univers numérique de la géologie et des mines.
          </p>

          <p className="hero-description">
            Apprends, explore et développe tes connaissances grâce à une
            plateforme pensée pour les étudiants et passionnés des sciences
            de la Terre.
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
              ⛰️ Explorer les roches
            </Link>
          </div>
        </div>
      </section>

      <main className="home-container">
        <section className="intro-section home-intro">
          <div className="section-label">GEO ZONE</div>

          <h2>
            Tout ton univers géologique,
            <br />
            <span>au même endroit.</span>
          </h2>

          <p>
            Cours, roches, formation, outils, identification, mining et
            intelligence artificielle : GEO ZONE rassemble progressivement
            les ressources essentielles pour apprendre et progresser.
          </p>
        </section>

        <section className="modules-section">
          <div className="section-heading">
            <div>
              <span className="section-small-title">
                EXPLORE LA PLATEFORME
              </span>

              <h2>Nos espaces</h2>
            </div>

            <p>
              Choisis un espace et commence ton exploration.
            </p>
          </div>

          <div className="home-modules">
            {modules.map((module) => (
              <Link
                key={module.title}
                to={module.link}
                className={`home-module-card ${module.className}`}
              >
                <div className="module-top">
                  <div className="home-module-icon">
                    {module.icon}
                  </div>

                  <span className="module-arrow">↗</span>
                </div>

                <h3>{module.title}</h3>

                <p>{module.description}</p>

                <span className="module-link">
                  Ouvrir <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

       <section className="home-quick-access">
  <div className="home-quick-icon">⚡</div>

  <div className="home-quick-content">
    <span>ACCÈS RAPIDE</span>

    <h2>Commence ton exploration</h2>

    <p>
      Accède directement aux ressources les plus utiles.
    </p>
  </div>

  <div className="home-quick-actions">
    <Link to="/bibliotheque">📚 Cours</Link>
    <Link to="/roches">⛰️ Roches</Link>
    <Link to="/outils">🛠️ Outils</Link>
    <Link to="/dashboard">📊 Dashboard</Link>
  </div>
</section>

        <section className="home-quote">
          <div className="quote-icon">🌍</div>

          <div>
            <h2>
              Comprendre la Terre,
              <br />
              c'est mieux comprendre notre monde.
            </h2>

            <p>
              GEO ZONE — Apprendre aujourd'hui pour construire les compétences
              de demain.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  useEffect(() => {
    if (!menuOuvert) {
      document.body.style.overflow = "";
      return undefined;
    }

    const fermerAvecEchap = (event) => {
      if (event.key === "Escape") {
        setMenuOuvert(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", fermerAvecEchap);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", fermerAvecEchap);
    };
  }, [menuOuvert]);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link
          to="/"
          className="nav-logo"
          onClick={() => setMenuOuvert(false)}
        >
          <BrandLogo />
        </Link>

        <button
          className="mobile-menu-button"
          type="button"
          onClick={() =>
            setMenuOuvert((ancienEtat) => !ancienEtat)
          }
          aria-label={
            menuOuvert ? "Fermer le menu" : "Ouvrir le menu"
          }
          aria-expanded={menuOuvert}
          aria-controls="navigation-principale"
        >
          {menuOuvert ? "✕" : "☰"}
        </button>

        {menuOuvert && (
          <div
            className="mobile-menu-overlay"
            onClick={() => setMenuOuvert(false)}
          ></div>
        )}

        <div
          id="navigation-principale"
          className={`nav-links ${
            menuOuvert ? "mobile-menu-open" : ""
          }`}
        >
          <div className="mobile-menu-header">
            <div>
              <span className="mobile-menu-eyebrow">
                NAVIGATION
              </span>

              <strong><BrandLogo /></strong>
            </div>

            <button
              type="button"
              className="mobile-menu-close"
              onClick={() => setMenuOuvert(false)}
              aria-label="Fermer le menu"
            >
              ✕
            </button>
          </div>

          <div className="mobile-menu-section">
            <span className="mobile-menu-section-title">
              PRINCIPAL
            </span>

            <Link
              to="/"
              onClick={() => setMenuOuvert(false)}
            >
              <span className="mobile-menu-icon">🏠</span>

              <span className="mobile-menu-text">
                <strong>Accueil</strong>
                <small>Page principale</small>
              </span>
            </Link>

            <Link
              to="/bibliotheque"
              onClick={() => setMenuOuvert(false)}
            >
              <span className="mobile-menu-icon">📚</span>

              <span className="mobile-menu-text">
                <strong>Bibliothèque</strong>
                <small>Cours et ressources</small>
              </span>
            </Link>

            <Link
              to="/formation"
              onClick={() => setMenuOuvert(false)}
            >
              <span className="mobile-menu-icon">🎓</span>

              <span className="mobile-menu-text">
                <strong>Formation</strong>
                <small>Apprendre et progresser</small>
              </span>
            </Link>
            <Link
  to="/dashboard"
  onClick={() => setMenuOuvert(false)}
>
  <span className="mobile-menu-icon">📊</span>

  <span className="mobile-menu-text">
    <strong>Dashboard</strong>
    <small>Ma progression et mes résultats</small>
  </span>
</Link>

            <Link
              to="/geo-ai"
              onClick={() => setMenuOuvert(false)}
            >
              <span className="mobile-menu-icon">🤖</span>

              <span className="mobile-menu-text">
                <strong>GEO AI</strong>
                <small>Assistant géologique</small>
              </span>
            </Link>
          </div>

          <div className="mobile-menu-divider"></div>

          <div className="mobile-menu-section">
            <span className="mobile-menu-section-title">
              EXPLORER
            </span>

            <Link
              to="/mining"
              onClick={() => setMenuOuvert(false)}
            >
              <span className="mobile-menu-icon">⛏️</span>

              <span className="mobile-menu-text">
                <strong>Mining</strong>
                <small>Univers minier</small>
              </span>
            </Link>

            <Link
              to="/roches"
              onClick={() => setMenuOuvert(false)}
            >
              <span className="mobile-menu-icon">⛰️</span>

              <span className="mobile-menu-text">
                <strong>Roches</strong>
                <small>Base de données</small>
              </span>
            </Link>

            <Link
              to="/identification"
              onClick={() => setMenuOuvert(false)}
            >
              <span className="mobile-menu-icon">🔬</span>

              <span className="mobile-menu-text">
                <strong>Identification</strong>
                <small>Identifier les roches</small>
              </span>
            </Link>

            <Link
              to="/outils"
              onClick={() => setMenuOuvert(false)}
            >
              <span className="mobile-menu-icon">🛠️</span>

              <span className="mobile-menu-text">
                <strong>Outils</strong>
                <small>Outils du géologue</small>
              </span>
            </Link>
          </div>

          <div className="mobile-menu-footer">
            <span>🌍</span>

            <div>
              <strong>GEO ZONE</strong>
              <small>Apprendre • Explorer • Comprendre</small>
            </div>
          </div>
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
  path="/outils/teneur"
  element={<Teneur />}
/>
<Route
  path="/outils/metal-contenu"
  element={<MetalContenu />}
/>

        <Route
          path="/bibliotheque/:categorieId"
          element={<Categorie />}
        />
        <Route
  path="/revision"
  element={<Revision />}
/>
<Route
  path="/evaluation"
  element={<Evaluation />}
/>
<Route
  path="/dashboard"
  element={<Dashboard />}
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
  path="/outils/groupe/:categorie"
  element={<OutilsCategorie />}
/>
<Route
  path="/progression"
  element={<Progression />}
/>
<Route
  path="/recherche"
  element={<Recherche />}
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
  path="/outils/tonnage"
  element={<Tonnage />}
/>
<Route
  path="/outils/recuperation"
  element={<Recuperation />}
/>
<Route
  path="/outils/dilution"
  element={<Dilution />}
/>
<Route
  path="/outils/mining-calculator"
  element={<MiningCalculator />}
/>
<Route
  path="/outils/stripping-ratio"
  element={<StrippingRatio />}
/>
<Route
  path="/outils/strike-dip"
  element={<StrikeDip />}
/>
<Route
  path="/outils/pente"
  element={<Pente />}
/>
<Route
  path="/outils/distance-terrain"
  element={<DistanceTerrain />}
/>
<Route
  path="/outils/echelle-carte"
  element={<EchelleCarte />}
/>
      <Route
  path="/outils/porosite"
  element={<Porosite />}
/>
<Route
  path="/outils/gradient-hydraulique"
  element={<GradientHydraulique />}
/>
<Route
  path="/outils/debit-darcy"
  element={<DebitDarcy />}
/>
<Route
  path="/quiz"
  element={<Quiz />}
/>
<Route
  path="/outils/conductivite-hydraulique"
  element={<ConductiviteHydraulique />}
/>
<Route
  path="/outils/transmissivite"
  element={<Transmissivite />}
/>
<Route
  path="/outils/coefficient-emmagasinement"
  element={<CoefficientEmmagasinement />}
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
              <BrandLogo />
            </div>

            <p>
              La plateforme dédiée à la géologie, aux mines et aux sciences
              de la Terre.
            </p>
          </div>

          <div className="geo-footer-links">
            <h3>Navigation</h3>

            <Link to="/">Accueil</Link>
            <Link to="/bibliotheque">Bibliothèque</Link>
            <Link to="/formation">Formation</Link>
            <Link to="/roches">Roches</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>

          <div className="geo-footer-links">
            <h3>Explorer</h3>

            <Link to="/geo-ai">GEO AI</Link>
            <Link to="/mining">Mining</Link>

            <Link to="/identification">
              Identification
            </Link>

            <Link to="/outils">Outils</Link>
          </div>
        </div>

        <div className="geo-footer-bottom">
          <p>© 2026 GEO ZONE. Tous droits réservés.</p>

          <p>
            Apprendre • Explorer • Comprendre
          </p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;

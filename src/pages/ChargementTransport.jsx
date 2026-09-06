import { Link } from "react-router-dom";

function ChargementTransport() {
  return (
    <div className="container">
      <Link to="/mining" className="back-link">
        ← Retour au Mining
      </Link>

      <div className="welcome">
        <div className="module-icon">
          🚜
        </div>

        <h1>
          Chargement & transport
        </h1>

        <p>
          Découvre les principes du chargement et du transport
          des matériaux dans une exploitation minière.
        </p>
      </div>

      <div className="card">
        <h2>
          🚜 Introduction
        </h2>

        <p>
          Le chargement et le transport constituent des étapes
          essentielles du cycle de production minière. Après
          l'abattage ou l'extraction, les matériaux doivent être
          chargés puis transportés vers leur destination.
        </p>

        <p>
          Le choix des équipements et l'organisation du cycle
          influencent directement la productivité d'une exploitation.
        </p>
      </div>

      <div className="modules">

        <div className="card">
          <div className="module-icon">
            🚜
          </div>

          <h2>
            Équipements de chargement
          </h2>

          <p>
            Découvre les principaux équipements utilisés pour
            charger les matériaux extraits.
          </p>

          <div className="lesson-takeaway">
            <strong>Exemples</strong>
            <p>
              Les chargeuses, pelles hydrauliques et pelles à câble
              sont choisies selon le matériau et le volume à déplacer.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="module-icon">
            🚛
          </div>

          <h2>
            Équipements de transport
          </h2>

          <p>
            Découvre les différents moyens utilisés pour déplacer
            les matériaux dans une exploitation minière.
          </p>

          <div className="lesson-takeaway">
            <strong>Choix du transport</strong>
            <p>
              Les tombereaux, convoyeurs ou systèmes sur rails sont
              comparés selon la distance, la pente et la capacité.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="module-icon">
            🔄
          </div>

          <h2>
            Cycle de production
          </h2>

          <p>
            Comprends les principales étapes du cycle de chargement,
            transport, déchargement et retour.
          </p>

          <div className="lesson-takeaway">
            <strong>Cycle type</strong>
            <p>
              Le cycle comprend le chargement, le trajet chargé, le
              déchargement et le retour à vide.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="module-icon">
            📊
          </div>

          <h2>
            Productivité
          </h2>

          <p>
            Découvre les facteurs qui influencent la productivité
            des opérations de chargement et de transport.
          </p>

          <div className="lesson-takeaway">
            <strong>Mesure</strong>
            <p>
              Le temps de cycle, la disponibilité et le taux de charge
              permettent d'estimer la capacité de production.
            </p>
          </div>
        </div>

      </div>

      <div className="card">
        <h2>
          📚 Notions à retenir
        </h2>

        <p>
          La performance du système dépend notamment de la capacité
          des équipements, du temps de cycle, des distances de
          transport, des conditions du terrain et de l'organisation
          des opérations.
        </p>
      </div>
    </div>
  );
}

export default ChargementTransport;
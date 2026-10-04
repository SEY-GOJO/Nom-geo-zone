import { Link } from "react-router-dom";

const methodesExploration = [
  {
    icon: "🗺️",
    title: "Cartographie géologique",
    description:
      "Observe, décris et cartographie les formations géologiques pour comprendre le contexte d'un secteur.",
    objectif:
      "Construire un modèle géologique de surface et repérer les structures ou lithologies favorables à une minéralisation.",
    etapes: [
      "Rassembler les cartes, images et données géologiques déjà disponibles.",
      "Décrire les affleurements, les roches, les altérations et les structures observées.",
      "Reporter les observations avec leur position et leur niveau de confiance.",
      "Élaborer une carte interprétative et formuler des hypothèses à vérifier.",
    ],
    limites:
      "Les affleurements peuvent être rares ou masqués par les sols et la végétation ; une carte de surface ne décrit pas directement tout le sous-sol.",
  },
  {
    icon: "🧪",
    title: "Exploration géochimique",
    description:
      "Utilise les analyses géochimiques pour rechercher des anomalies associées à certains gisements.",
    objectif:
      "Détecter des concentrations inhabituelles d'éléments et vérifier si elles sont liées à un contexte géologique favorable.",
    etapes: [
      "Définir le milieu et le protocole d'échantillonnage selon l'objectif.",
      "Prélever, identifier et documenter les échantillons de façon traçable.",
      "Faire analyser les échantillons avec des contrôles de qualité adaptés.",
      "Comparer les résultats au fond géochimique et cartographier les anomalies.",
    ],
    limites:
      "Une anomalie n'est pas une preuve de gisement : elle peut être naturelle, liée à la contamination ou à un biais d'échantillonnage.",
  },
  {
    icon: "📡",
    title: "Exploration géophysique",
    description:
      "Découvre les méthodes géophysiques utilisées pour étudier les propriétés du sous-sol.",
    objectif:
      "Mesurer à distance des contrastes physiques du sous-sol afin de guider l'interprétation géologique.",
    etapes: [
      "Choisir une méthode en fonction du contraste physique recherché.",
      "Acquérir les mesures selon un plan et des paramètres documentés.",
      "Contrôler, corriger et traiter les données avant leur interprétation.",
      "Comparer les anomalies aux observations géologiques et aux autres données.",
    ],
    limites:
      "Les résultats sont indirects et souvent non uniques : des corps différents peuvent produire des réponses similaires.",
  },
  {
    icon: "🕳️",
    title: "Sondage et forage d'exploration",
    description:
      "Comprends le rôle des sondages et des forages dans la reconnaissance directe du sous-sol.",
    objectif:
      "Vérifier les hypothèses formulées à partir de la géologie, de la géochimie et de la géophysique, puis décrire les terrains en profondeur.",
    etapes: [
      "Définir les cibles, les objectifs et l'implantation des sondages.",
      "Choisir une méthode et un type d'échantillon adaptés au terrain.",
      "Décrire les couches et les échantillons en conservant leur profondeur et leur ordre.",
      "Intégrer les résultats aux coupes et au modèle géologique du secteur.",
    ],
    limites:
      "Un forage n'échantillonne qu'un volume restreint ; son emplacement, la récupération et la qualité de la description influencent les conclusions.",
  },
];

function ExplorationMiniere() {
  return (
    <main className="container">
      <Link to="/mining" className="back-link">
        ← Retour au Mining
      </Link>

      <div className="welcome">
        <div className="module-icon">
          🌍
        </div>

        <h1>
          Exploration minière
        </h1>

        <p>
          Découvre les principales méthodes utilisées pour
          rechercher, identifier et évaluer les ressources
          minérales.
        </p>
      </div>

      <section className="card" aria-labelledby="introduction-exploration">
        <h2>
          <span id="introduction-exploration">
          🌍 Introduction à l'exploration minière
          </span>
        </h2>

        <p>
          L'exploration minière regroupe l'ensemble des méthodes
          permettant de rechercher des concentrations de minerais,
          de déterminer leur extension et d'évaluer leur potentiel.
        </p>

        <p>
          Elle fait intervenir notamment la géologie, la
          géochimie, la géophysique, la télédétection et les
          travaux de terrain.
        </p>
      </section>

      <section className="modules" aria-label="Méthodes d'exploration minière">
        {methodesExploration.map((methode) => (
          <article className="card" key={methode.title}>
            <div className="module-icon" aria-hidden="true">
              {methode.icon}
            </div>

            <h2>{methode.title}</h2>
            <p>{methode.description}</p>

            <h3>Objectif</h3>
            <p>{methode.objectif}</p>

            <h3>Démarche générale</h3>
            <ol>
              {methode.etapes.map((etape) => (
                <li key={etape}>{etape}</li>
              ))}
            </ol>

            <h3>Limite à garder en tête</h3>
            <p>{methode.limites}</p>
          </article>
        ))}
      </section>

      <section className="card" aria-labelledby="notions-exploration">
        <h2>
          <span id="notions-exploration">
          📚 Notions à retenir
          </span>
        </h2>

        <p>
          L'exploration minière commence généralement par
          l'identification d'un contexte géologique favorable,
          puis utilise différentes méthodes de reconnaissance
          pour réduire progressivement l'incertitude sur le
          potentiel du secteur étudié.
        </p>
        <p>
          Les résultats se complètent : les méthodes indirectes
          orientent les travaux de terrain, tandis que les sondages
          vérifient localement les interprétations. La qualité des
          données, la traçabilité et le respect des règles
          environnementales sont essentiels à chaque étape.
        </p>
      </section>
    </main>
  );
}

export default ExplorationMiniere;
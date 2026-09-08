import { GoogleGenAI } from "@google/genai";
import roches from "../src/data/roches.js";
import cours from "../src/data/cours.js";

function normaliserTexte(texte) {
  return String(texte || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function extraireMots(question) {
  const motsExclus = new Set([
    "quel",
    "quelle",
    "quels",
    "quelles",
    "est",
    "sont",
    "une",
    "des",
    "les",
    "du",
    "de",
    "la",
    "le",
    "un",
    "dans",
    "pour",
    "avec",
    "sur",
    "que",
    "qui",
    "quoi",
    "comment",
    "explique",
    "expliquer",
    "donne",
    "donner",
    "moi",
    "peux",
    "tu",
    "difference",
    "entre",
    "faire",
    "fait",
    "font",
    "qu",
    "estce",
  ]);

  return normaliserTexte(question)
    .split(/[^a-z0-9]+/)
    .filter(
      (mot) => mot.length >= 3 && !motsExclus.has(mot)
    );
}

function rechercherRocheExacte(question) {
  const questionNormalisee = normaliserTexte(question);

  return roches.find((roche) => {
    const nomNormalise = normaliserTexte(roche.nom);

    return (
      questionNormalisee.includes(nomNormalise) ||
      nomNormalise.includes(questionNormalisee)
    );
  });
}

function calculerScoreRoche(question, roche) {
  const questionNormalisee = normaliserTexte(question);
  const mots = extraireMots(question);

  const nom = normaliserTexte(roche.nom);
  const famille = normaliserTexte(roche.famille);
  const sousFamille = normaliserTexte(roche.sousFamille);
  const mineraux = normaliserTexte(
    roche.mineraux?.join(" ")
  );
  const origine = normaliserTexte(roche.origine);
  const utilisation = normaliserTexte(roche.utilisation);

  let score = 0;

  if (questionNormalisee.includes(nom)) {
    score += 1000;
  }

  if (mots.includes(nom)) {
    score += 500;
  }

  for (const mot of mots) {
    if (nom.includes(mot)) {
      score += 50;
    }

    if (famille.includes(mot)) {
      score += 8;
    }

    if (sousFamille.includes(mot)) {
      score += 8;
    }

    if (mineraux.includes(mot)) {
      score += 5;
    }

    if (origine.includes(mot)) {
      score += 2;
    }

    if (utilisation.includes(mot)) {
      score += 2;
    }
  }

  return score;
}

function rechercherRoches(question) {
  const rocheExacte = rechercherRocheExacte(question);

  if (rocheExacte) {
    return [
      {
        roche: rocheExacte,
        score: 1000,
      },
    ];
  }

  return roches
    .map((roche) => ({
      roche,
      score: calculerScoreRoche(question, roche),
    }))
    .filter((resultat) => resultat.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
}

function calculerScoreChapitre(
  question,
  coursItem,
  chapitre
) {
  const questionNormalisee = normaliserTexte(question);
  const mots = extraireMots(question);

  const titreCours = normaliserTexte(coursItem.titre);
  const matiere = normaliserTexte(coursItem.matiere);
  const description = normaliserTexte(
    coursItem.description
  );
  const titreChapitre = normaliserTexte(chapitre.titre);
  const contenu = normaliserTexte(chapitre.contenu);

  let score = 0;

  if (questionNormalisee.includes(titreChapitre)) {
    score += 1000;
  }

  if (questionNormalisee.includes(titreCours)) {
    score += 700;
  }

  for (const mot of mots) {
    if (titreChapitre.includes(mot)) {
      score += 25;
    }

    if (titreCours.includes(mot)) {
      score += 15;
    }

    if (matiere.includes(mot)) {
      score += 8;
    }

    if (description.includes(mot)) {
      score += 5;
    }

    if (contenu.includes(mot)) {
      score += 1;
    }
  }

  return score;
}

function rechercherCours(question) {
  const resultats = [];

  for (const coursItem of cours) {
    for (const chapitre of coursItem.chapitres || []) {
      const score = calculerScoreChapitre(
        question,
        coursItem,
        chapitre
      );

      if (score > 0) {
        resultats.push({
          cours: coursItem,
          chapitre,
          score,
        });
      }
    }
  }

  return resultats
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
}

function construireContexte(question) {
  const resultatsRoches = rechercherRoches(question);
  const resultatsCours = rechercherCours(question);

  const sections = [];

  if (resultatsRoches.length > 0) {
    sections.push("=== DONNEES GEO ZONE : ROCHES ===");

    for (const resultat of resultatsRoches) {
      const roche = resultat.roche;

      sections.push(
        [
          `Nom : ${roche.nom}`,
          `Famille : ${roche.famille}`,
          `Sous-famille : ${roche.sousFamille}`,
          `Couleur : ${roche.couleur}`,
          `Texture : ${roche.texture}`,
          `Structure : ${roche.structure}`,
          `Mineraux : ${
            roche.mineraux?.join(", ") ||
            "Non renseignes"
          }`,
          `Origine : ${roche.origine}`,
          `Utilisation : ${roche.utilisation}`,
        ].join("\n")
      );
    }
  }

  if (resultatsCours.length > 0) {
    sections.push("=== DONNEES GEO ZONE : COURS ===");

    for (const resultat of resultatsCours) {
      const contenu = String(
        resultat.chapitre.contenu || ""
      ).slice(0, 5000);

      sections.push(
        [
          `Cours : ${resultat.cours.titre}`,
          `Matiere : ${resultat.cours.matiere}`,
          `Chapitre : ${resultat.chapitre.titre}`,
          "Contenu :",
          contenu,
        ].join("\n")
      );
    }
  }

  return {
    contexte: sections.join("\n\n"),
    nombreRoches: resultatsRoches.length,
    nombreChapitres: resultatsCours.length,
  };
}

function nettoyerHistorique(history) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter(
      (message) =>
        message &&
        (message.role === "user" ||
          message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim()
    )
    .slice(-12)
    .map((message) => ({
      role:
        message.role === "assistant"
          ? "model"
          : "user",
      parts: [
        {
          text: message.content.trim(),
        },
      ],
    }));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Methode non autorisee",
    });
  }

  try {
    const question = req.body?.question?.trim();
    const history = nettoyerHistorique(
      req.body?.history
    );

    if (!question) {
      return res.status(400).json({
        error: "La question est vide.",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "La cle API Gemini n'est pas configuree.",
      });
    }

    const {
      contexte,
      nombreRoches,
      nombreChapitres,
    } = construireContexte(question);

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const promptActuel = `
Question actuelle de l'utilisateur :
${question}

Informations pertinentes trouvées dans GEO ZONE :
${
  contexte ||
  "Aucune information pertinente n'a été trouvée dans GEO ZONE."
}

Consignes pour cette réponse :
- Réponds toujours en français.
- Utilise en priorité les informations de GEO ZONE lorsqu'elles sont disponibles.
- Tiens compte de l'historique précédent de la conversation.
- Si l'utilisateur fait référence à une réponse précédente, utilise cet historique pour comprendre sa demande.
- Si une fiche de roche correspond directement à la question actuelle, utilise cette fiche comme source principale.
- Si un chapitre correspond directement à la question actuelle, utilise ce chapitre comme source principale.
- Ne prétends jamais qu'une information vient de GEO ZONE si elle n'est pas présente dans les données fournies.
- Si les données GEO ZONE sont insuffisantes, tu peux compléter avec tes connaissances générales.
- Indique clairement lorsqu'une information est un complément général et non une donnée directe de GEO ZONE.
- Réponds de manière claire, structurée et pédagogique.
- Adapte ton explication au niveau d'un étudiant.
- Pour les sujets dangereux liés aux explosifs ou aux opérations minières dangereuses, reste théorique et pédagogique.
`;

    const contents = [
      ...history,
      {
        role: "user",
        parts: [
          {
            text: promptActuel,
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents,
      config: {
        systemInstruction:
          "Tu es GEO AI, l'assistant intelligent de GEO ZONE. " +
          "Tu es spécialisé en géologie, minéralogie, pétrographie, " +
          "géomorphologie, géologie structurale, géochimie, hydrogéologie, " +
          "géologie minière, exploration minière, exploitation minière, " +
          "sciences de la Terre et apprentissage. " +
          "Tu privilégies les données fournies par GEO ZONE et tu dois " +
          "tenir compte du contexte de la conversation.",
      },
    });

    const usage = response.usageMetadata || {};

    return res.status(200).json({
      reponse:
        response.text ||
        "Je n'ai pas pu générer de réponse.",
      sources: {
        roches: nombreRoches,
        chapitres: nombreChapitres,
      },
      tokens: {
        entree: usage.promptTokenCount || 0,
        sortie: usage.candidatesTokenCount || 0,
        total: usage.totalTokenCount || 0,
      },
    });
  } catch (error) {
    console.error("Erreur GEO AI :", error);

    return res.status(500).json({
      error: error?.message || "Erreur inconnue",
      status: error?.status || null,
    });
  }
}
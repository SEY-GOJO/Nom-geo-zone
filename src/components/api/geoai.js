import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
if (req.method !== "POST") {
return res.status(405).json({
error: "Méthode non autorisée"
});
}

try {
const question = req.body?.question?.trim();

if (!question) {
  return res.status(400).json({
    error: "La question est vide."
  });
}

if (!process.env.GEMINI_API_KEY) {
  return res.status(500).json({
    error: "La clé API Gemini n'est pas configurée."
  });
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash-lite",
  contents: question,
  config: {
    systemInstruction:
      "Tu es GEO AI, l'assistant intelligent de GEO ZONE. " +
      "Tu es spécialisé en géologie, minéralogie, pétrographie, " +
      "géomorphologie, géologie structurale, géochimie, hydrogéologie, " +
      "géologie minière, exploration minière, exploitation minière, " +
      "sciences de la Terre, apprentissage et révision. " +
      "Ta mission est d'aider principalement les étudiants à comprendre " +
      "leurs cours. Réponds toujours en français. Explique clairement " +
      "et progressivement. Utilise des exemples simples lorsque cela " +
      "aide. Pour une notion scientifique, commence par une définition " +
      "puis développe. Si une question est ambiguë, indique clairement " +
      "ce qui manque. Ne prétends jamais connaître une information que " +
      "tu n'as pas."
  }
});

return res.status(200).json({
  reponse: response.text || "Je n'ai pas pu générer de réponse."
});

} catch (error) {
console.error("Erreur GEO AI :", error);

return res.status(500).json({
  error: "Une erreur est survenue lors de la communication avec Gemini."
});

}
}
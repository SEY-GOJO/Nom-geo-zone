const iconesParRoche = {
  Granite: "⛰️",
  Basalte: "🌋",
  Gabbro: "⚫",
  Gneiss: "🏔️",
  Schiste: "📄",
  Grès: "🏜️",
  Calcaire: "🧱",
  Brèche: "🔶",
  Conglomérat: "🟤",
  Tillite: "❄️",
  Fanglomérat: "🟤",
  Poudingue: "🟤",
  Arénite: "🏜️",
  Arkose: "🟠",
  Argilite: "🟫",
  Bentonite: "🟫",
  Marne: "⚪",
  Lœss: "🌬️",
  Kaolin: "⚪",
  Dolomie: "⬜",
  Diatomite: "🔬",
  Kieselguhr: "🔬",
  Rhyolite: "🌋",
  Diorite: "⚪",
  Péridotite: "🟢",
  Syénite: "🟠",
  Andésite: "🌋",
  Dacite: "🌋",
  Trachyte: "🔸",
  Phonolite: "🔔",
  Dolérite: "⚫",
  Picrite: "🟢",
  Néphélinite: "🟣",
  Téphrite: "🟤",
  Obsidienne: "🖤",
  "Pierre ponce": "🫧",
  "Tuf volcanique": "🌫️",
  "Agglomérat volcanique": "💥",
  Travertin: "🏛️",
  "Calcaire fossilifère": "🐚",
  Kimberlite: "💎",
  Septaria: "🟤",
};

const iconesParFamille = {
  "Roche magmatique": "🌋",
  "Roche métamorphique": "🏔️",
  "Roche sédimentaire": "🏜️",
};

export function getRocheIcon(roche) {
  return (
    iconesParRoche[roche.nom] ||
    iconesParFamille[roche.famille] ||
    "⛰️"
  );
}

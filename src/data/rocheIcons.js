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

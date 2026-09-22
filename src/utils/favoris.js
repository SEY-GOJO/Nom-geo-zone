const FAVORIS_KEY = "geo-zone:favoris:v1";
const CONSULTATIONS_KEY = "geo-zone:consultations:v1";

export function lireFavoris() {
  try {
    const favoris = JSON.parse(localStorage.getItem(FAVORIS_KEY) || "[]");
    return Array.isArray(favoris) ? favoris : [];
  } catch {
    return [];
  }
}

export function estFavori(type, id) {
  return lireFavoris().some((favori) => favori.type === type && favori.id === id);
}

export function basculerFavori(favori) {
  const favoris = lireFavoris();
  const existe = favoris.some((item) => item.type === favori.type && item.id === favori.id);
  const nouveauxFavoris = existe
    ? favoris.filter((item) => !(item.type === favori.type && item.id === favori.id))
    : [{ ...favori, ajouteLe: new Date().toISOString() }, ...favoris].slice(0, 30);

  localStorage.setItem(FAVORIS_KEY, JSON.stringify(nouveauxFavoris));
  return nouveauxFavoris;
}

export function lireConsultations() {
  try {
    const consultations = JSON.parse(
      localStorage.getItem(CONSULTATIONS_KEY) || "[]"
    );
    return Array.isArray(consultations) ? consultations : [];
  } catch {
    return [];
  }
}

export function enregistrerConsultation(element) {
  const anciennes = lireConsultations().filter(
    (item) => !(item.type === element.type && item.id === element.id)
  );
  const consultations = [
    { ...element, consulteLe: new Date().toISOString() },
    ...anciennes,
  ].slice(0, 12);

  localStorage.setItem(CONSULTATIONS_KEY, JSON.stringify(consultations));
  return consultations;
}

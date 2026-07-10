const KEY = "favorites";

export function getFavorites(): number[] {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function saveFavorites(ids: number[]) {
  localStorage.setItem(KEY, JSON.stringify(ids));
}

export function toggleFavorite(id: number) {
  const favorites = getFavorites();

  const updated = favorites.includes(id)
    ? favorites.filter((item) => item !== id)
    : [...favorites, id];

  saveFavorites(updated);

  return updated;
}
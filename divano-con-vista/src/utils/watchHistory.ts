import type { WatchedEpisode } from "../types/watch";

const KEY = "watchHistory";

export function getWatchHistory(): WatchedEpisode[] {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function saveWatchHistory(history: WatchedEpisode[]) {
  localStorage.setItem(KEY, JSON.stringify(history));
}

export function addWatchedEpisode(item: WatchedEpisode) {
  const history = getWatchHistory();

  const exists = history.some(
    (ep) => ep.episodeId === item.episodeId
  );

  if (exists) return;

  history.push(item);

  saveWatchHistory(history);
}

export function removeWatchedEpisode(episodeId: number) {
  saveWatchHistory(
    getWatchHistory().filter(
      (ep) => ep.episodeId !== episodeId
    )
  );
}
export function getContinueWatching() {
  const history = getWatchHistory();

  if (!history.length) return null;

  return history
    .slice()
    .sort(
      (a, b) =>
        new Date(b.watchedAt).getTime() -
        new Date(a.watchedAt).getTime()
    )[0];
}
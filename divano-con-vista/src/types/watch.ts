export type WatchedEpisode = {
  episodeId: number;
  seriesId: number;
  season: number;
  episode: number;
  watchedAt: string;
};

export type ContinueWatching = {
  episodeId: number;
  seriesId: number;
  season: number;
  episode: number;
  watchedAt: string;
};
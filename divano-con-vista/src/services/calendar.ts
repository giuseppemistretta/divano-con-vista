const API_KEY = "adbbe879f8a4d0d0e36c7d572021fd55";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getUpcomingEpisodes(seriesIds: number[]) {
  const episodes = [];

  for (const id of seriesIds) {
    const res = await fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=it-IT`
    );

    const serie = await res.json();

    if (
      serie.next_episode_to_air &&
      serie.next_episode_to_air.air_date
    ) {
      episodes.push({
        id: serie.id,
        title: serie.name,
        season: serie.next_episode_to_air.season_number,
        episode: serie.next_episode_to_air.episode_number,
        date: serie.next_episode_to_air.air_date,
        image: serie.poster_path
          ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
          : "",
      });
    }
  }

  episodes.sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  );

  return episodes;
}

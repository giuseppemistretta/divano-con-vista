const API_KEY = "adbbe879f8a4d0d0e36c7d572021fd55";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE = "https://image.tmdb.org/t/p/w500";
const BACKDROP = "https://image.tmdb.org/t/p/w780";

export async function searchSeries(query) {
  const res = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&language=it-IT&query=${encodeURIComponent(query)}`
  );

  const data = await res.json();

  return data.results.map((item) => ({
    id: item.id,
    title: item.name,
    subtitle: item.first_air_date
      ? item.first_air_date.slice(0, 4)
      : "Serie TV",
    description: item.overview,
    image: item.poster_path
      ? IMAGE + item.poster_path
      : "https://placehold.co/300x450?text=No+Image",
    backdrop: item.backdrop_path
      ? BACKDROP + item.backdrop_path
      : item.poster_path
      ? IMAGE + item.poster_path
      : "https://placehold.co/1280x720?text=No+Image",
  }));
}

export async function getSeries(id) {
  const res = await fetch(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=it-IT&append_to_response=credits,watch/providers`
  );

  const item = await res.json();

  return {
    id: item.id,
    title: item.name,
    subtitle: item.first_air_date
      ? item.first_air_date.slice(0, 4)
      : "Serie TV",
    description: item.overview,
    image: item.poster_path
      ? IMAGE + item.poster_path
      : "https://placehold.co/300x450?text=No+Image",
    backdrop: item.backdrop_path
      ? BACKDROP + item.backdrop_path
      : item.poster_path
      ? IMAGE + item.poster_path
      : "https://placehold.co/1280x720?text=No+Image",
    rating: item.vote_average,
    seasons: item.number_of_seasons,
    episodes: item.number_of_episodes,
    status: item.status,
    genres: item.genres,
    seasonsList: item.seasons,
    cast:
      item.credits?.cast?.slice(0, 10).map((person) => ({
        id: person.id,
        name: person.name,
        character: person.character,
        image: person.profile_path
          ? IMAGE + person.profile_path
          : "https://placehold.co/300x450?text=No+Image",
      })) || [],
    providers:
      item["watch/providers"]?.results?.IT?.flatrate?.map((provider) => ({
        id: provider.provider_id,
        name: provider.provider_name,
        logo: provider.logo_path ? IMAGE + provider.logo_path : null,
      })) || [],
  };
}

export async function getSeason(seriesId, seasonNumber) {
  const res = await fetch(
    `${BASE_URL}/tv/${seriesId}/season/${seasonNumber}?api_key=${API_KEY}&language=it-IT`
  );

  const data = await res.json();

  return data.episodes.map((ep) => ({
    id: ep.id,
    number: ep.episode_number,
    title: ep.name,
    overview: ep.overview,
    airDate: ep.air_date,
    runtime: ep.runtime,
    rating: ep.vote_average,
    image: ep.still_path
      ? BACKDROP + ep.still_path
      : null,
  }));
}

async function fetchList(endpoint) {
  const res = await fetch(
    `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=it-IT`
  );

  const data = await res.json();

  return data.results.slice(0, 10).map((item) => ({
    id: item.id,
    title: item.name,
    subtitle: item.first_air_date
      ? item.first_air_date.slice(0, 4)
      : "",
    description: item.overview,
    image: item.poster_path
      ? IMAGE + item.poster_path
      : "https://placehold.co/300x450?text=No+Image",
    backdrop: item.backdrop_path
      ? BACKDROP + item.backdrop_path
      : item.poster_path
      ? IMAGE + item.poster_path
      : "https://placehold.co/1280x720?text=No+Image",
  }));
}

export function getTrendingSeries() {
  return fetchList("/trending/tv/week");
}

export function getTopRatedSeries() {
  return fetchList("/tv/top_rated");
}

export function getPopularSeries() {
  return fetchList("/tv/popular");
}
export async function getRecommendations(id) {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}&language=it-IT`
  );

  const data = await res.json();

  return data.results.slice(0, 10).map((item) => ({
    id: item.id,
    title: item.name,
    subtitle: item.first_air_date
      ? item.first_air_date.slice(0, 4)
      : "",
    description: item.overview,
    image: item.poster_path
      ? IMAGE + item.poster_path
      : "https://placehold.co/300x450",
    backdrop: item.backdrop_path
      ? BACKDROP + item.backdrop_path
      : item.poster_path
      ? IMAGE + item.poster_path
      : "https://placehold.co/1280x720",
  }));
}
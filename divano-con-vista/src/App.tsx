import { getUpcomingEpisodes } from './services/calendar';
import Calendar from './pages/Calendar';

import { useEffect, useState } from 'react';

import {
  getPopularSeries,
  getRecommendations,
  getSeason,
  getSeries,
  getTopRatedSeries,
  getTrendingSeries,
  searchSeries,
} from './services/tmdb';

import {
  addWatchedEpisode,
  getWatchHistory,
  removeWatchedEpisode,
  type WatchedEpisode,
} from './utils/watchHistory';

import { getFavorites, toggleFavorite } from './utils/favorites';

import './App.css';

import BottomNav from './components/BottomNav';
import Discover from './pages/Discover';
import Home from './pages/Home';
import Library from './pages/Library';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Series from './pages/Series';

import type { Episode } from './types/episode';
import type { Serie, SerieStatus } from './types/serie';

const statuses: SerieStatus[] = [
  'Da vedere',
  'In corso',
  'Completata',
  'Abbandonata',
];

function App() {
  const [activePage, setActivePage] = useState('home');
  const [query, setQuery] = useState('');

  const [results, setResults] = useState<Serie[]>([]);
  const [trending, setTrending] = useState<Serie[]>([]);
  const [topRated, setTopRated] = useState<Serie[]>([]);
  const [popular, setPopular] = useState<Serie[]>([]);
  const [recommendations, setRecommendations] = useState<Serie[]>([]);
  const [upcomingEpisodes, setUpcomingEpisodes] = useState<any[]>([]);
  const [calendarLoading, setCalendarLoading] = useState(false);

  const [favoriteIds, setFavoriteIds] = useState<number[]>(() =>
    getFavorites()
  );

  const [library, setLibrary] = useState<Serie[]>(() => {
    const saved = localStorage.getItem('library');
    return saved ? JSON.parse(saved) : [];
  });

  const [watchHistory, setWatchHistory] = useState<WatchedEpisode[]>(() =>
    getWatchHistory()
  );

  const [selected, setSelected] = useState<Serie | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [showSeasons, setShowSeasons] = useState(false);
  const [currentSeason, setCurrentSeason] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('library', JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    async function loadCalendar() {
      if (!library.length) {
        setUpcomingEpisodes([]);
        return;
      }

      setCalendarLoading(true);

      try {
        const data = await getUpcomingEpisodes(
          library.map((serie) => serie.id)
        );

        setUpcomingEpisodes(data);
      } finally {
        setCalendarLoading(false);
      }
    }

    loadCalendar();
  }, [library]);

  useEffect(() => {
    async function loadHome() {
      const trendingData = await getTrendingSeries();
      const topRatedData = await getTopRatedSeries();
      const popularData = await getPopularSeries();

      setTrending(trendingData);
      setTopRated(topRatedData);
      setPopular(popularData);

      const current =
        library.find((serie) => serie.userStatus === 'In corso') || library[0];

      if (current) {
        const recommendationsData = await getRecommendations(current.id);

        const filteredRecommendations = recommendationsData.filter(
          (serie) =>
            !library.some((librarySerie) => librarySerie.id === serie.id)
        );

        setRecommendations(filteredRecommendations);
      } else {
        setRecommendations(topRatedData.slice(0, 10));
      }
    }

    loadHome();
  }, [library]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      const data = await searchSeries(query);
      setResults(data);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  async function openSerie(serie: Serie) {
    const details = await getSeries(serie.id);
    const saved = library.find((item) => item.id === serie.id);

    setSelected({
      ...details,
      userStatus: saved?.userStatus || 'Da vedere',
    });

    const history = getWatchHistory()
      .filter((item) => item.seriesId === serie.id)
      .sort(
        (a, b) =>
          new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime()
      );

    if (history.length) {
      const season = history[0].season;

      const data = await getSeason(serie.id, season);

      setEpisodes(data);
      setCurrentSeason(season);
      setShowSeasons(true);
    } else {
      setEpisodes([]);
      setCurrentSeason(null);
      setShowSeasons(false);
    }
  }
  async function openSeason(seasonNumber: number) {
    if (!selected) return;

    const data = await getSeason(selected.id, seasonNumber);

    setEpisodes(data);
    setCurrentSeason(seasonNumber);
  }
  function updateAutomaticStatus(nextHistory: WatchedEpisode[]) {
    if (!selected) return;

    const watchedCount = nextHistory.filter(
      (item) => item.seriesId === selected.id
    ).length;

    let newStatus: SerieStatus = 'Da vedere';

    if (watchedCount > 0) {
      newStatus =
        selected.episodes && watchedCount >= selected.episodes
          ? 'Completata'
          : 'In corso';
    }

    setSelected((previous) =>
      previous
        ? {
            ...previous,
            userStatus: newStatus,
          }
        : previous
    );

    setLibrary((previous) =>
      previous.map((serie) =>
        serie.id === selected.id
          ? {
              ...serie,
              userStatus: newStatus,
            }
          : serie
      )
    );
  }
  function toggleEpisode(id: number) {
    if (!selected || currentSeason === null) return;

    const exists = watchHistory.some((item) => item.episodeId === id);

    if (exists) {
      removeWatchedEpisode(id);
    } else {
      const episode = episodes.find((item) => item.id === id);

      addWatchedEpisode({
        episodeId: id,
        seriesId: selected.id,
        season: currentSeason,
        episode: episode?.number || 0,
        watchedAt: new Date().toISOString(),
      });
    }

    const nextHistory = getWatchHistory();

    setWatchHistory(nextHistory);
    updateAutomaticStatus(nextHistory);
  }

  function toggleWholeSeason() {
    if (!selected || currentSeason === null || episodes.length === 0) {
      return;
    }

    const allWatched = episodes.every((episode) =>
      watchHistory.some((item) => item.episodeId === episode.id)
    );

    if (allWatched) {
      episodes.forEach((episode) => {
        removeWatchedEpisode(episode.id);
      });
    } else {
      episodes.forEach((episode) => {
        addWatchedEpisode({
          episodeId: episode.id,
          seriesId: selected.id,
          season: currentSeason,
          episode: episode.number,
          watchedAt: new Date().toISOString(),
        });
      });
    }

    const nextHistory = getWatchHistory();

    setWatchHistory(nextHistory);
    updateAutomaticStatus(nextHistory);
  }

  function handleToggleFavorite(id: number) {
    setFavoriteIds(toggleFavorite(id));
  }

  function addToLibrary(serie: Serie) {
    if (library.some((item) => item.id === serie.id)) return;

    const newSerie: Serie = {
      ...serie,
      userStatus: 'Da vedere',
    };

    setLibrary((previous) => [...previous, newSerie]);
    setSelected(newSerie);
    setResults([]);
    setQuery('');
  }

  function removeFromLibrary(id: number) {
    setLibrary((previous) => previous.filter((item) => item.id !== id));

    setSelected(null);
  }

  function updateStatus(status: SerieStatus) {
    if (!selected) return;

    setSelected({
      ...selected,
      userStatus: status,
    });

    setLibrary((previous) =>
      previous.map((item) =>
        item.id === selected.id ? { ...item, userStatus: status } : item
      )
    );
  }
  const selectedWatchedEpisodeIds = selected
    ? watchHistory
        .filter((item) => item.seriesId === selected.id)
        .map((item) => item.episodeId)
    : [];

  const seasonAllWatched =
    episodes.length > 0 &&
    episodes.every((episode) => selectedWatchedEpisodeIds.includes(episode.id));

  const latestWatched = [...watchHistory].sort(
    (a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime()
  )[0];

  const continueSerie = latestWatched
    ? library.find((serie) => serie.id === latestWatched.seriesId)
    : null;

  const continueWatchedCount = continueSerie
    ? watchHistory.filter((item) => item.seriesId === continueSerie.id).length
    : 0;

  const continueProgress =
    continueSerie && continueSerie.episodes
      ? Math.round((continueWatchedCount / continueSerie.episodes) * 100)
      : null;

  const featured =
    continueSerie ||
    library.find((serie) => serie.userStatus === 'In corso') ||
    library[0];

  if (selected) {
    return (
      <Series
        selected={selected}
        library={library}
        episodes={episodes}
        watchedEpisodes={selectedWatchedEpisodeIds}
        showSeasons={showSeasons}
        statuses={statuses}
        favoriteIds={favoriteIds}
        seasonAllWatched={seasonAllWatched}
        onBack={() => setSelected(null)}
        onAdd={addToLibrary}
        onRemove={removeFromLibrary}
        onStatusChange={updateStatus}
        onToggleSeasons={() => setShowSeasons(!showSeasons)}
        onOpenSeason={openSeason}
        onToggleEpisode={toggleEpisode}
        onToggleWholeSeason={toggleWholeSeason}
        onToggleFavorite={handleToggleFavorite}
      />
    );
  }

  return (
    <main className="app">
      {activePage === 'home' && (
        <Home
          featured={featured}
          continueInfo={latestWatched}
          continueProgress={continueProgress}
          favorites={library.filter((serie) => favoriteIds.includes(serie.id))}
          trending={trending}
          topRated={topRated}
          popular={popular}
          onOpen={openSerie}
          upcomingCount={upcomingEpisodes.length}
          onOpenCalendar={() => setActivePage('calendar')}
        />
      )}

      {activePage === 'discover' && (
        <Discover
          recommendations={recommendations}
          trending={trending}
          topRated={topRated}
          onOpen={openSerie}
        />
      )}

      {activePage === 'calendar' && (
        <Calendar episodes={upcomingEpisodes} loading={calendarLoading} />
      )}

      {activePage === 'search' && (
        <Search
          query={query}
          setQuery={setQuery}
          results={results}
          onOpen={openSerie}
        />
      )}

      {activePage === 'library' && (
        <Library
          library={library}
          watchHistory={watchHistory}
          onOpen={openSerie}
        />
      )}

      {activePage === 'profile' && (
        <Profile
          total={library.length}
          watched={watchHistory.length}
          watching={
            library.filter((serie) => serie.userStatus === 'In corso').length
          }
          completed={
            library.filter((serie) => serie.userStatus === 'Completata').length
          }
          favorites={favoriteIds.length}
          library={library}
        />
      )}

      <BottomNav activePage={activePage} setActivePage={setActivePage} />
    </main>
  );
}

export default App;

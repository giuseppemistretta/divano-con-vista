import { useMemo, useState } from "react";

import type { Serie } from "../types/serie";
import type { WatchedEpisode } from "../types/watch";

type Props = {
  library: Serie[];
  watchHistory: WatchedEpisode[];
  onOpen: (serie: Serie) => void;
};

const filters = [
  "Tutte",
  "In corso",
  "Completata",
  "Da vedere",
  "Abbandonata",
];

export default function Library({
  library,
  watchHistory,
  onOpen,
}: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tutte");
  const [sort, setSort] = useState("recenti");

  const filteredLibrary = useMemo(() => {
    const items = [...library];

    const filtered = items.filter((serie) => {
      const matchesFilter =
        filter === "Tutte" || serie.userStatus === filter;

      const matchesSearch = serie.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return matchesFilter && matchesSearch;
    });

    if (sort === "az") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "anno") {
      filtered.sort(
        (a, b) => Number(b.subtitle) - Number(a.subtitle)
      );
    }

    if (sort === "voto") {
      filtered.sort(
        (a, b) => (b.rating || 0) - (a.rating || 0)
      );
    }

    return filtered;
  }, [library, search, filter, sort]);

  function getSerieProgress(serie: Serie) {
    const history = watchHistory
      .filter((item) => item.seriesId === serie.id)
      .sort(
        (a, b) =>
          new Date(b.watchedAt).getTime() -
          new Date(a.watchedAt).getTime()
      );

    const watchedCount = history.length;
    const total = serie.episodes || 0;

    const percentage =
      total > 0
        ? Math.min(Math.round((watchedCount / total) * 100), 100)
        : 0;

    return {
      watchedCount,
      total,
      percentage,
      lastEpisode: history[0] || null,
    };
  }

  return (
    <>
      <header className="hero">
        <h1>Libreria</h1>
        <p>Le serie che hai salvato.</p>
      </header>

      <div className="searchBox">
        <input
          className="searchInput"
          placeholder="Cerca nella libreria..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="filterRow">
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? "activeFilter" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <select
        className="sortSelect"
        value={sort}
        onChange={(event) => setSort(event.target.value)}
      >
        <option value="recenti">Ultima aggiunta</option>
        <option value="az">A-Z</option>
        <option value="anno">Anno</option>
        <option value="voto">Voto TMDB</option>
      </select>

      {filteredLibrary.length === 0 ? (
        <div className="empty">Nessuna serie trovata.</div>
      ) : (
        <div className="libraryList">
          {filteredLibrary.map((serie) => {
            const progress = getSerieProgress(serie);

            return (
              <article
                key={serie.id}
                className="libraryItem"
                onClick={() => onOpen(serie)}
              >
                <img src={serie.image} alt={serie.title} />

                <div className="libraryItemContent">
                  <div className="libraryItemHeader">
                    <h3>{serie.title}</h3>

                    <span className="libraryStatus">
                      {serie.userStatus || "Da vedere"}
                    </span>
                  </div>

                  {progress.lastEpisode && (
                    <p className="libraryLastEpisode">
                      Ultimo visto: S{progress.lastEpisode.season} · E
                      {progress.lastEpisode.episode}
                    </p>
                  )}

                  <div className="libraryProgressHeader">
                    <span>
                      {progress.watchedCount} / {progress.total} episodi
                    </span>

                    <strong>{progress.percentage}%</strong>
                  </div>

                  <div className="libraryProgressTrack">
                    <div
                      style={{
                        width: `${progress.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
import Hero from "../components/series/Hero";
import Stats from "../components/series/Stats";
import Actions from "../components/series/Actions";
import Seasons from "../components/series/Seasons";
import Episodes from "../components/series/Episodes";
import Cast from "../components/series/Cast";
import Providers from "../components/series/Providers";
import Progress from "../components/series/Progress";

import type { Serie, SerieStatus } from "../types/serie";
import type { Episode } from "../types/episode";

type Props = {
  selected: Serie;
  library: Serie[];
  episodes: Episode[];
  watchedEpisodes: number[];
  showSeasons: boolean;
  statuses: SerieStatus[];
  favoriteIds: number[];
  seasonAllWatched: boolean;
  onBack: () => void;
  onAdd: (serie: Serie) => void;
  onRemove: (id: number) => void;
  onStatusChange: (status: SerieStatus) => void;
  onToggleSeasons: () => void;
  onOpenSeason: (seasonNumber: number) => void;
  onToggleEpisode: (id: number) => void;
  onToggleWholeSeason: () => void;
  onToggleFavorite: (id: number) => void;
};

export default function Series({
  selected,
  library,
  episodes,
  watchedEpisodes,
  showSeasons,
  statuses,
  favoriteIds,
  seasonAllWatched,
  onBack,
  onAdd,
  onRemove,
  onStatusChange,
  onToggleSeasons,
  onOpenSeason,
  onToggleEpisode,
  onToggleWholeSeason,
  onToggleFavorite,
}: Props) {
  const isInLibrary = library.some((item) => item.id === selected.id);
  const isFavorite = favoriteIds.includes(selected.id);

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        Indietro
      </button>

      <section className="seriePage">
        <Hero serie={selected} />

        <Stats serie={selected} />

        <Progress
          watched={watchedEpisodes.length}
          total={selected.episodes}
        />

        <button
          className={
            isFavorite
              ? "favoriteButton activeFavorite"
              : "favoriteButton"
          }
          onClick={() => onToggleFavorite(selected.id)}
        >
          {isFavorite
            ? "Rimuovi dai preferiti"
            : "Aggiungi ai preferiti"}
        </button>

        <p className="description">
          {selected.description || "Nessuna descrizione disponibile."}
        </p>

        <Actions
          isInLibrary={isInLibrary}
          userStatus={selected.userStatus}
          statuses={statuses}
          onAdd={() => onAdd(selected)}
          onRemove={() => onRemove(selected.id)}
          onStatusChange={onStatusChange}
        />

        {selected.genres && selected.genres.length > 0 && (
          <div className="genreList">
            {selected.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
        )}

        <Providers providers={selected.providers} />

        <Seasons
          show={showSeasons}
          seasons={selected.seasonsList}
          onToggle={onToggleSeasons}
          onOpen={onOpenSeason}
        />

        <Episodes
          episodes={episodes}
          watched={watchedEpisodes}
          allWatched={seasonAllWatched}
          onToggle={onToggleEpisode}
          onToggleAll={onToggleWholeSeason}
        />

        <Cast cast={selected.cast} />
      </section>
    </main>
  );
}
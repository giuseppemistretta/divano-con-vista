import type { Episode } from "../../types/episode";

type Props = {
  episodes: Episode[];
  watched: number[];
  allWatched: boolean;
  onToggle: (id: number) => void;
  onToggleAll: () => void;
};

export default function Episodes({
  episodes,
  watched,
  allWatched,
  onToggle,
  onToggleAll,
}: Props) {
  if (!episodes.length) return null;

  return (
    <div className="episodesList">
      <button className="seasonWatchedButton" onClick={onToggleAll}>
        {allWatched
          ? "Segna tutta la stagione come non vista"
          : "Segna tutta la stagione come vista"}
      </button>

      {episodes.map((episode) => {
        const seen = watched.includes(episode.id);

        return (
          <article className="episodeCard" key={episode.id}>
            {episode.image && (
              <img
                className="episodeImage"
                src={episode.image}
                alt={episode.title}
              />
            )}

            <div className="episodeContent">
              <div className="episodeTopRow">
                <div>
                  <h3>
                    {episode.number}. {episode.title}
                  </h3>

                  <p className="episodeMeta">
                    {episode.runtime
                      ? `${episode.runtime} min`
                      : "Durata non disponibile"}

                    {episode.rating
                      ? ` · Voto ${episode.rating.toFixed(1)}`
                      : ""}
                  </p>
                </div>

                <button
                  className={seen ? "episodeWatched" : ""}
                  onClick={() => onToggle(episode.id)}
                >
                  {seen ? "Visto" : "Segna visto"}
                </button>
              </div>

              {episode.overview && (
                <p className="episodeOverview">{episode.overview}</p>
              )}

              <p className="episodeDate">
                {episode.airDate || "Data non disponibile"}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
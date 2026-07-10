import type { Serie } from "../types/serie";
import type { ContinueWatching } from "../types/watch";

type Props = {
  featured?: Serie | null;
  continueInfo?: ContinueWatching;
  continueProgress?: number | null;
  upcomingCount: number;
  favorites: Serie[];
  trending: Serie[];
  topRated: Serie[];
  popular: Serie[];
  onOpen: (serie: Serie) => void;
  onOpenCalendar: () => void;
};

function Row({
  title,
  items,
  onOpen,
}: {
  title: string;
  items: Serie[];
  onOpen: (serie: Serie) => void;
}) {
  if (!items.length) return null;

  return (
    <section>
      <h2>{title}</h2>

      <div className="horizontalRow">
        {items.map((serie) => (
          <article
            key={serie.id}
            className="horizontalCard"
            onClick={() => onOpen(serie)}
          >
            <img src={serie.image} alt={serie.title} />
            <h3>{serie.title}</h3>
            <p>{serie.subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Home({
  featured,
  continueInfo,
  continueProgress,
  upcomingCount,
  favorites,
  trending,
  topRated,
  popular,
  onOpen,
  onOpenCalendar,
}: Props) {
  return (
    <>
      <header className="hero">
        <h1>Bentornato Giuseppe</h1>
        <p>Pronto per il prossimo episodio?</p>
      </header>

      {featured && (
        <section>
          <h2>Continua a guardare</h2>

          <article className="heroCard" onClick={() => onOpen(featured)}>
            <img
              src={featured.backdrop || featured.image}
              alt={featured.title}
            />

            <div className="heroCardOverlay">
              <h3>{featured.title}</h3>

              {continueInfo ? (
                <div className="continueDetails">
                  <p>
                    Ultimo visto: S{continueInfo.season} · E
                    {continueInfo.episode}
                  </p>

                  <p>Riprendi dalla stagione corrente.</p>
                </div>
              ) : (
                <p>{featured.userStatus || featured.subtitle}</p>
              )}

              {continueProgress !== null &&
                continueProgress !== undefined && (
                  <>
                    <div className="heroProgress">
                      <div
                        style={{
                          width: `${Math.min(continueProgress, 100)}%`,
                        }}
                      />
                    </div>

                    <span className="heroProgressLabel">
                      {Math.min(continueProgress, 100)}% completata
                    </span>
                  </>
                )}

              <button>Riprendi</button>
            </div>
          </article>
        </section>
      )}

      <button className="calendarHomeCard" onClick={onOpenCalendar}>
        <span>
          <strong>Prossime uscite</strong>
          <small>
            {upcomingCount === 1
              ? "1 episodio in arrivo"
              : `${upcomingCount} episodi in arrivo`}
          </small>
        </span>

        <span>Apri calendario</span>
      </button>

      <Row title="Preferiti" items={favorites} onOpen={onOpen} />
      <Row title="In tendenza" items={trending} onOpen={onOpen} />
      <Row title="Più votate" items={topRated} onOpen={onOpen} />
      <Row title="Popolari" items={popular} onOpen={onOpen} />
    </>
  );
}
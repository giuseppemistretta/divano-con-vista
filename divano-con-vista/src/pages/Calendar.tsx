type CalendarEpisode = {
  id: number;
  title: string;
  season: number;
  episode: number;
  date: string;
  image: string;
};

type Props = {
  episodes: CalendarEpisode[];
  loading: boolean;
};

export default function Calendar({ episodes, loading }: Props) {
  return (
    <>
      <header className="hero">
        <h1>Calendario</h1>
        <p>I prossimi episodi delle serie nella tua libreria.</p>
      </header>

      {loading && <div className="empty">Caricamento...</div>}

      {!loading && episodes.length === 0 && (
        <div className="empty">
          Nessun episodio in arrivo trovato.
        </div>
      )}

      {!loading && episodes.length > 0 && (
        <div className="calendarList">
          {episodes.map((item) => (
            <article className="calendarItem" key={`${item.id}-${item.date}`}>
              {item.image && (
                <img src={item.image} alt={item.title} />
              )}

              <div>
                <h3>{item.title}</h3>
                <p>
                  Stagione {item.season}, episodio {item.episode}
                </p>
                <strong>
                  {new Date(item.date).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
type Serie = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

type Props = {
  query: string;
  setQuery: (value: string) => void;
  results: Serie[];
  onOpen: (serie: Serie) => void;
};

export default function Search({ query, setQuery, results, onOpen }: Props) {
  return (
    <>
      <header className="hero">
        <h1>Cerca</h1>
        <p>Trova nuove serie da aggiungere alla tua libreria.</p>
      </header>

      <div className="searchBox">
        <input
          className="searchInput"
          placeholder="Cerca serie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {results.length > 0 && (
        <section>
          <h2>Risultati</h2>

          <div className="posterRow">
            {results.map((serie) => (
              <article
                key={serie.id}
                className="posterCard"
                onClick={() => onOpen(serie)}
              >
                <img src={serie.image} alt={serie.title} />
                <h3>{serie.title}</h3>
                <p>{serie.subtitle}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
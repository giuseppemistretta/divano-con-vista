import type { Serie } from "../types/serie";

type Props = {
  recommendations: Serie[];
  trending: Serie[];
  topRated: Serie[];
  onOpen: (serie: Serie) => void;
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

export default function Discover({
  recommendations,
  trending,
  topRated,
  onOpen,
}: Props) {
  return (
    <>
      <header className="hero">
        <h1>Scopri</h1>
        <p>Trova la tua prossima serie.</p>
      </header>

      <Row
        title="Consigliate per te"
        items={recommendations}
        onOpen={onOpen}
      />

      <Row
        title="In tendenza"
        items={trending}
        onOpen={onOpen}
      />

      <Row
        title="Più votate"
        items={topRated}
        onOpen={onOpen}
      />
    </>
  );
}
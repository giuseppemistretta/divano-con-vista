import type { Actor } from "../../types/actor";

type Props = {
  cast?: Actor[];
};

export default function Cast({ cast = [] }: Props) {
  if (!cast.length) return null;

  return (
    <section style={{ marginTop: 30 }}>
      <h2>Cast</h2>

      <div className="castRow">
        {cast.map((actor) => (
          <article className="castCard" key={actor.id}>
            <img src={actor.image} alt={actor.name} />

            <strong>{actor.name}</strong>

            <p>{actor.character}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
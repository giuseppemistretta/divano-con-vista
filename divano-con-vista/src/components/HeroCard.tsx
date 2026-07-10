type Serie = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

type Props = {
  serie: Serie;
  onClick: (serie: Serie) => void;
};

function HeroCard({ serie, onClick }: Props) {
  return (
    <article className="heroCard" onClick={() => onClick(serie)}>
      <img src={serie.image} alt={serie.title} />

      <div className="heroCardOverlay">
        <h3>{serie.title}</h3>
        <p>{serie.subtitle}</p>

        <button>Riprendi</button>
      </div>
    </article>
  );
}

export default HeroCard;
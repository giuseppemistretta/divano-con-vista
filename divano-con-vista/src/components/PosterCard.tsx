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

function PosterCard({ serie, onClick }: Props) {
  return (
    <article className="posterCard" onClick={() => onClick(serie)}>
      <img src={serie.image} alt={serie.title} />
      <h3>{serie.title}</h3>
      <p>{serie.subtitle}</p>
    </article>
  );
}

export default PosterCard;
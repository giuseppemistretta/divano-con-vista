type Serie = {
  title: string;
  subtitle: string;
  image: string;
  backdrop?: string;
};

type Props = {
  serie: Serie;
};

export default function Hero({ serie }: Props) {
  return (
    <>
      <div className="heroBackdrop">
        <img
          src={serie.backdrop || serie.image}
          alt={serie.title}
        />

        <img
          className="posterFloating"
          src={serie.image}
          alt={serie.title}
        />
      </div>

      <div className="serieContent">
        <h1>{serie.title}</h1>

        <p className="year">{serie.subtitle}</p>

        <button className="playButton">
          ▶ Riprendi
        </button>
      </div>
    </>
  );
}

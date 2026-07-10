type Serie = {
  rating?: number;
  seasons?: number;
  episodes?: number;
  status?: string;
};

type Props = {
  serie: Serie;
};

export default function Stats({ serie }: Props) {
  return (
    <div className="detailStats">
      <span>Voto {serie.rating ? serie.rating.toFixed(1) : "N/D"}</span>
      <span>{serie.seasons || 0} stagioni</span>
      <span>{serie.episodes || 0} episodi</span>
      <span>{serie.status || "Stato non disponibile"}</span>
    </div>
  );
}
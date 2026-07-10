type Season = {
  id: number;
  name: string;
  season_number: number;
};

type Props = {
  show: boolean;
  seasons?: Season[];
  onToggle: () => void;
  onOpen: (season: number) => void;
};

export default function Seasons({
  show,
  seasons,
  onToggle,
  onOpen,
}: Props) {
  return (
    <>
      <button
        className="seasonsButton"
        onClick={onToggle}
      >
        {show ? "Nascondi stagioni" : "Vedi stagioni"}
      </button>

      {show && seasons && (
        <div className="seasonsList">
          {seasons
            .filter((season) => season.season_number > 0)
            .map((season) => (
              <button
                key={season.id}
                onClick={() => onOpen(season.season_number)}
              >
                {season.name}
              </button>
            ))}
        </div>
      )}
    </>
  );
}
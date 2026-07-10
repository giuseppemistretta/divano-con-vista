type Props = {
  watched: number;
  total?: number;
};

export default function Progress({ watched, total = 0 }: Props) {
  if (!total) return null;

  const percent = Math.round((watched / total) * 100);

  return (
    <div className="progressBox">
      <div className="progressHeader">
        <strong>{watched} / {total} episodi visti</strong>
        <span>{percent}%</span>
      </div>

      <div className="progressTrack">
        <div
          className="progressFill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
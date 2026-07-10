type SerieStatus = "Da vedere" | "In corso" | "Completata" | "Abbandonata";

type Props = {
  isInLibrary: boolean;
  userStatus?: SerieStatus;
  statuses: SerieStatus[];
  onAdd: () => void;
  onRemove: () => void;
  onStatusChange: (status: SerieStatus) => void;
};

export default function Actions({
  isInLibrary,
  userStatus,
  statuses,
  onAdd,
  onRemove,
  onStatusChange,
}: Props) {
  return (
    <>
      <div className="statusPicker">
        {statuses.map((status) => (
          <button
            key={status}
            className={userStatus === status ? "selectedStatus" : ""}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {isInLibrary ? (
        <button className="dangerButton" onClick={onRemove}>
          Rimuovi dalla libreria
        </button>
      ) : (
        <button className="primaryButton" onClick={onAdd}>
          Aggiungi alla libreria
        </button>
      )}
    </>
  );
}

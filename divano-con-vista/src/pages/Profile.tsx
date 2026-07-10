import { useState } from "react";
import { exportBackup, importBackup } from "../utils/backup";
import type { Serie } from "../types/serie";

type Props = {
  total: number;
  watched: number;
  watching: number;
  completed: number;
  favorites: number;
  library: Serie[];
};

export default function Profile({
  total,
  watched,
  watching,
  completed,
  favorites,
  library,
}: Props) {
  const [message, setMessage] = useState("");

  async function handleImport(file?: File) {
    if (!file) return;

    const confirmed = window.confirm(
      "L'importazione sostituirà i dati attuali. Vuoi continuare?"
    );

    if (!confirmed) return;

    try {
      setMessage("Importazione in corso...");
      await importBackup(file);
    } catch {
      setMessage("Il file selezionato non è un backup valido.");
    }
  }

  return (
    <>
      <header className="hero">
        <h1>Profilo</h1>
        <p>Le tue statistiche.</p>
      </header>

      <section>
        <div className="statsGrid">
          <div className="statsCard">
            <h2>{total}</h2>
            <p>Serie salvate</p>
          </div>

          <div className="statsCard">
            <h2>{watching}</h2>
            <p>In corso</p>
          </div>

          <div className="statsCard">
            <h2>{completed}</h2>
            <p>Completate</p>
          </div>

          <div className="statsCard">
            <h2>{watched}</h2>
            <p>Episodi visti</p>
          </div>

          <div className="statsCard">
            <h2>{favorites}</h2>
            <p>Preferiti</p>
          </div>
        </div>

        <div className="profileActions">
          <button
            className="primaryButton"
            onClick={() => exportBackup(library)}
          >
            Esporta backup
          </button>

          <label className="importBackupButton">
            Importa backup

            <input
              type="file"
              accept=".json,application/json"
              onChange={(event) => {
                handleImport(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
          </label>

          {message && <p className="backupMessage">{message}</p>}
        </div>
      </section>
    </>
  );
}
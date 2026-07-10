import { getFavorites } from "./favorites";
import { getWatchHistory } from "./watchHistory";
import type { Serie } from "../types/serie";
import type { WatchedEpisode } from "../types/watch";

type BackupData = {
  version: number;
  exportedAt: string;
  library: Serie[];
  favorites: number[];
  watchHistory: WatchedEpisode[];
};

export function exportBackup(library: Serie[]) {
  const backup: BackupData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    library,
    favorites: getFavorites(),
    watchHistory: getWatchHistory(),
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "divano-con-vista-backup.json";
  link.click();

  URL.revokeObjectURL(url);
}

export async function importBackup(file: File) {
  const text = await file.text();
  const backup = JSON.parse(text) as Partial<BackupData>;

  if (
    !Array.isArray(backup.library) ||
    !Array.isArray(backup.favorites) ||
    !Array.isArray(backup.watchHistory)
  ) {
    throw new Error("File di backup non valido.");
  }

  localStorage.setItem("library", JSON.stringify(backup.library));
  localStorage.setItem("favorites", JSON.stringify(backup.favorites));
  localStorage.setItem("watchHistory", JSON.stringify(backup.watchHistory));

  window.location.reload();
}
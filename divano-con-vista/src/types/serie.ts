export type SerieStatus =
  | "Da vedere"
  | "In corso"
  | "Completata"
  | "Abbandonata";

export type Genre = {
  id: number;
  name: string;
};

export type Season = {
  id: number;
  name: string;
  season_number: number;
};

export type Actor = {
  id: number;
  name: string;
  character: string;
  image: string;
};

export type Provider = {
  id: number;
  name: string;
  logo: string | null;
};

export type Serie = {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  backdrop?: string;
  rating?: number;
  seasons?: number;
  episodes?: number;
  status?: string;
  userStatus?: SerieStatus;
  genres?: Genre[];
  seasonsList?: Season[];
  cast?: Actor[];
  providers?: Provider[];
};
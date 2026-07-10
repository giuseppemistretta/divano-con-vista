export type Episode = {
  id: number;
  number: number;
  title: string;
  overview: string;
  airDate: string;
  runtime?: number;
  rating?: number;
  image?: string | null;
};
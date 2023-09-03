export interface ResponseData {
  results: Array<Movie | TVSerie>;
}
export interface Result {
  id: number;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
  original_language: string;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  image?: string;
  poster?: string;
}
export interface Movie extends Result {
  adult: boolean;
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}
export interface TVSerie extends Result {
  name: string;
  original_language: string;
  original_name: string;
  first_air_date: string;
}
export interface TouchMovement {
  start: number;
  end: number;
}
export interface CenterPosition {
  x: number;
  y: number;
  width: number;
}
export type FirebaseClient = {
  apiKey: string;
};
export type FirebaseServer = {
  projectId: string;
  privateKey: string;
  clientEmail: string;
};
export type UserData = {
  avatar: string;
  email: string;
};

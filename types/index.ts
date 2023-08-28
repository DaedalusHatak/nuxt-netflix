export interface Movies {
  results: Movie[];
}
export interface Movie {
  [k: string]: any;
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

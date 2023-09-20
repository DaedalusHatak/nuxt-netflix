import { MovieCard, UserProfile } from "~/types";

let userProfile: UserProfile;
let useUserUser: any;
const movieCard: MovieCard = { element: {}, target: undefined };


export const useProfile = () =>
  useState<UserProfile>("useProfile", () => userProfile);

export const useMovieCard = () =>
  useState<MovieCard>("movieCard", () => movieCard);
  
export const useUser = () => useState("useUser", () => useUserUser);

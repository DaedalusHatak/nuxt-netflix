import { ref } from "vue";
import { Movie, UserData } from "~/types";
interface UserProfile {
  photo: string;
  email: string;
}
interface MediaItem {
  [k: string]: any;
}
interface MovieCard {
  element: MediaItem;
  target: any;
}
const userProfile = { photo: "", email: "" };
const movieCard: MovieCard = { element: {}, target: undefined };
export const useProfile = () =>
  useState<UserProfile>("userProfile", () => userProfile);
export const useMovieCard = () =>
  useState<MovieCard>("movieCard", () => movieCard);

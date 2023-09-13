import { Movie, UserData } from "~/types";
interface UserProfile {
  photoURL: string;
  email: string;
  providerData: ProviderData[];
}
interface ProviderData {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}
interface MediaItem {
  [k: string]: any;
}
interface MovieCard {
  element: MediaItem;
  target: any;
}
let userProfile: UserProfile;
let useUserUser: any;
const movieCard: MovieCard = { element: {}, target: undefined };
export const useProfile = () =>
  useState<UserProfile>("useProfile", () => userProfile);
export const useMovieCard = () =>
  useState<MovieCard>("movieCard", () => movieCard);
export const useUser = () => useState("useUser", () => useUserUser);

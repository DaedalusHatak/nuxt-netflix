import { ref } from 'vue';
import { Movie, UserData } from '~/types';
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
const movieCard: MovieCard = { element: {}, target: undefined };
export const useProfile = () =>
	useState<UserProfile>('userProfile', () => userProfile);
export const useMovieCard = () =>
	useState<MovieCard>('movieCard', () => movieCard);

import { RecaptchaVerifier } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
declare global {
  interface APISession {
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
  interface Question {
    name: string;
    answer: string;
    isActive: boolean;
  }

  interface Modal {
    show: boolean;
    message: string;
  }

  interface Phone {
    applicationVerifier?: RecaptchaVerifier;
    changePhone: boolean;
    buttonCaptcha: boolean;
    verificationId: string;
    number: string;
    newNumber: string;
    firstNumber: string;
    verCode: string;
  }

  interface Section {
    header: string;
    desc: string;
    comp: Component;
    reverse?: boolean;
  }
  interface ResponseData {
    results: Array<Movie | TVSerie>;
  }
  interface Post {
    user: string;
    createdAt: Timestamp;
    post: string;
    id?: string;
  }
  interface UserProfile {
    photoURL?: string;
    email: string;
    phoneNumber?: string;
    providerData?: ProviderData[];
  }

  interface MediaItem {
    [k: string]: any;
  }
  interface MovieCard {
    element: MediaItem;
    target: any;
  }

  interface Result {
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
  interface Movie extends Result {
    adult: boolean;
    original_title: string;
    release_date: string;
    title: string;
    video: boolean;
  }
  interface TVSerie extends Result {
    name: string;
    original_language: string;
    original_name: string;
    first_air_date: string;
  }
  interface TouchMovement {
    start: number;
    end: number;
  }
  interface CenterPosition {
    x: number;
    y: number;
    width: number;
  }
  type FirebaseClient = {
    apiKey: string;
  };
  type FirebaseServer = {
    projectId: string;
    privateKey: string;
    clientEmail: string;
  };
  type UserData = {
    avatar: string;
    email: string;
  };
}
export {};

import { RecaptchaVerifier } from "firebase/auth";
import { MovieCard, UserProfile } from "~/types";
interface Modal{
  show: boolean;
  message: string;
}

interface Phone{
  applicationVerifier?: RecaptchaVerifier
  changePhone: boolean;
  buttonCaptcha: boolean;
  verificationId: string;
  number:string;
  newNumber:string;
  firstNumber:string;
  verCode:string;
}
let userProfile: UserProfile;
let useUserUser: any;
let phoneValue: Phone = {
  changePhone:false,
  buttonCaptcha: false,
  verificationId: "",
  number: "",
  newNumber: "",
  firstNumber:"",
  verCode: ""

};
let modalValue:Modal = {show: false,message:""}
const movieCard: MovieCard = { element: {}, target: undefined };


export const useProfile = () =>
  useState<UserProfile>("useProfile", () => userProfile);

export const useMovieCard = () =>
  useState<MovieCard>("movieCard", () => movieCard);
  
export const useUser = () => useState("useUser", () => useUserUser);


export const useModal = () => useState("useModal", () => modalValue);


export const usePhone = () => useState("usePhone", () => phoneValue);
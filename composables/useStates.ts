

let useUserUser: any;
let modalValue: Modal = { show: false, message: "" };
const movieCard: MovieCard = { element: {}, target: undefined };
let phoneValue: Phone = {
  changePhone: false,
  buttonCaptcha: false,
  verificationId: "",
  number: "",
  newNumber: "",
  firstNumber: "",
  verCode: "",
};


export const useProfile = () =>
  useState<UserProfile>("useProfile");

export const useMovieCard = () =>
  useState<MovieCard>("movieCard", () => movieCard);

export const useUser = () => useState("useUser", () => useUserUser);

export const useModal = () => useState("useModal", () => modalValue);

export const usePhone = () => useState("usePhone", () => phoneValue);
``
import { ref } from "vue";
import { UserData } from "~/types";
export const useProfile = () => useState<string>("userProfile", () => "");

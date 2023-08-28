import { ref } from "vue";
import { UserData } from "~/types";
interface UserProfile{
    photo:string,
    email:string
}
const userProfile = {photo:"",email:""}
export const useProfile = () => useState<UserProfile>("userProfile", () => userProfile);

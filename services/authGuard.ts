import router from "next/router";
import { AUTH_KEY } from "./constants";
import { utils } from "./utility";

export const AuthGuard = () => {
    const loggedIn = utils.getUserLoginStatus(AUTH_KEY);
    if (!loggedIn) {
        router.push({ pathname: '/' });
    }
}
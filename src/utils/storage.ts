export const saveToken = (token: string) =>
    localStorage.setItem("token", token);

export const getToken = () =>
    localStorage.getItem("token");

export const removeToken = () =>
    localStorage.removeItem("token");


// HOW TO USE !
// 1. import { saveToken, getToken, removeToken } from "./storage";
// 2. saveToken("my-jwt-token");
// 3. getToken();
// 4. removeToken();
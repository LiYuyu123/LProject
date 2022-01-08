import Cookies from "js-cookie";
const toenKey = "TOKEN";
const userKey = "USERNAME";
const passwordKey = "PASSWORD";

// token
export const getToken = () => {
    return Cookies.get(toenKey);
};
export const setToken = (token) => {
    return Cookies.set(toenKey, token, { expires: 7 });
};
export const removeToken = () => {
    return Cookies.remove(toenKey);
};

// username
export const getUsername = () => {
    return Cookies.get(userKey);
};
export const setUsername = (username) => {
    return Cookies.set(userKey, username);
};
export const removeUsername = () => {
    return Cookies.remove(userKey);
};

// password
export const getPassword = () => {
    return Cookies.get(passwordKey);
};
export const setPassword = (password) => {
    return Cookies.set(passwordKey, password);
};
export const removePassword = () => {
    return Cookies.remove(passwordKey);
};
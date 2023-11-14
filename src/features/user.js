import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie/es6";

const decodeToken = (token) => {
    const decodedToken = jwtDecode(token);
    return decodedToken;
};

export const signin = (token) => {
    const userData = decodeToken(token);
    console.log("userData: ", JSON.stringify(userData))
    console.log("cookie: ", token)
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("cookie", token);
}
export const singout = () => {

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("cookie")
}

export const getUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
}
export const getCookies = () => {
    return sessionStorage.getItem("cookie");
}
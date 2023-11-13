import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie/es6";

const decodeToken = (token) => {
    const decodedToken = jwtDecode(token);
    return decodedToken;
};

export const signin = (token) => {
    const userData = decodeToken(token);
    console.log("userData: ", JSON.stringify(userData))
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("cookie", token);
}
export const singout = () => {
    const cookie = new Cookies()
    cookie.remove(sessionStorage.getItem("cookie"))
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("cookie")
}

export const getUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
}
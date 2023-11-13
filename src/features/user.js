import jwtDecode from "jwt-decode";


const decodeToken = (token) => {
    const decodedToken = jwtDecode(token);
    return decodedToken;
};

export const signin = (token) => {
    const userData = decodeToken(token);
    console.log("userData: ", JSON.stringify(userData))
    sessionStorage.setItem("user", JSON.stringify(userData));
}
export const singout = () => {
    sessionStorage.removeItem("user");
}

export const getUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
}
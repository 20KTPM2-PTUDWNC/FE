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
    sessionStorage.setItem("user", JSON.stringify(userData))
    sessionStorage.setItem("cookie", token);
    return userData;
}
// export const storePassword = (token, password) => {
//     const userData = decodeToken(token);
//     const hashedPassword = userData.password

//     // Example candidate password
//     const candidatePassword = password;

//     // Compare the candidate password with the stored hash
//     bcrypt.compare(candidatePassword, hashedPassword)
//         .then(result => {
//             if (result) {
//                 console.log('Password is correct');
//                 sessionStorage.setItem("password", candidatePassword)
//             } else {
//                 console.log('Password is incorrect');
//             }
//         })
//         .catch(err => {
//             console.error('Error comparing passwords:', err);
//         });
// }
export const storeEmail = (email) => {
    sessionStorage.setItem("email", email)
}
export const getEmail = () => {
    sessionStorage.getItem("email")
}
export const removeEmail = () => {
    sessionStorage.removeItem("email")
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
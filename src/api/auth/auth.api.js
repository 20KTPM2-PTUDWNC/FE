import { axiosPrivate } from "../api";

export const signIn = async (data) => {
    try {
        return await axiosPrivate.post("/v1/signIn", data);
    } catch (error) {
        throw error;
    }
};

export const signUp = async (data) => {
    console.log(data);
    try {
        return await axiosPrivate.post("/v1/signUp", data);
    } catch (error) {
        throw error;
    }
};
export const signOut = async () => {
    try {
        return await axiosPrivate.get("/v1/signOut");
    } catch (error) {
        throw error;
    }
};

export const forgotPassword = async (data) => {
    try {
        return await axiosPrivate.post("/api/v1/auth/forgotPassword", data);
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (data) => {
    try {
        return await axiosPrivate.post("/api/v1/auth/resetPassword", data);
    } catch (error) {
        throw error;
    }
};

export const signInFB = async () => {
    try {
        return await axiosPrivate.get("/v1/auth/facebook");
    } catch (error) {
        throw error;
    }
};
export const signInGG = async () => {
    try {
        return await axiosPrivate.get("/v1/auth/google");
    } catch (error) {
        throw error;
    }
};
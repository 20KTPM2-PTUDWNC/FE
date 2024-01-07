import { axiosPrivate } from "../api";
import { getCookies } from "../../features/user";

export const updateProfile = async (id, data) => {

    try {
        return await axiosPrivate.put(`/v1/user/${id}`, data, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};
export const updateAvatar = async (id, data) => {

    try {
        return await axiosPrivate.post(`/v1/user/uploadPhoto/${id}`, data, {

            headers: {
                'Content-Type': 'multipart/form-data',

                "Authorization": getCookies()

            },

        });
    } catch (err) {
        throw err;
    }
};

export const getProfile = async (id) => {

    try {
        return await axiosPrivate.get(`/v1/user/${id}`, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (error) {
        throw error;
    }
};
export const getAvatar = async (id) => {

    try {
        return await axiosPrivate.get(`/v1/user/${id}`, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (error) {
        throw error;
    }
};
export const updateId = async (data) => {

    try {
        return await axiosPrivate.post(`/v1/user/mappingStudentId`, data, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (error) {
        throw error;
    }
};

export const getAllUser = async () => {

    try {
        return await axiosPrivate.get(`/v1/user`, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (error) {
        throw error;
    }
};

export const banAcc = async (id) => {

    try {
        return await axiosPrivate.patch(`/v1/user/lockAccount/${id}`, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (error) {
        throw error;
    }
};
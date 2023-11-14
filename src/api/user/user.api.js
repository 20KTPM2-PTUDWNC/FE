import { axiosPrivate } from "../api";

export const updateProfile = async (id, data) => {

    try {
        return await axiosPrivate.put(`/v1/user/${id}`, data, {
            withCredentials: true,
        });
    } catch (err) {
        throw err;
    }
};
export const updateAvatar = async (id, data) => {

    try {
        return await axiosPrivate.post(`/v1/user/uploadPhoto/${id}`, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (err) {
        throw err;
    }
};

export const getProfile = async (id) => {

    try {
        console.log("getProfile: ", id);
        return await axiosPrivate.get(`/v1/user/${id}`, {
            withCredentials: true,
        });
    } catch (error) {
        throw error;
    }
};
export const getAvatar = async (id) => {

    try {
        console.log("getProfile: ", id);
        return await axiosPrivate.get(`/v1/user/${id}`, { withCredentials: true });
    } catch (error) {
        throw error;
    }
};
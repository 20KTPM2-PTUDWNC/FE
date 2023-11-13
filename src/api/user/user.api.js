import { axiosPrivate } from "../api";

export const updateProfile = async (params) => {
    const { id, data } = params || {};
    try {
        return await axiosPrivate.put(`/v1/user/${id}`, data);
    } catch (err) {
        throw err;
    }
};

export const getProfile = async (id) => {
    try {
        console.log("getProfile: ",id);
        return await axiosPrivate.get(`/v1/user/${id}`);
    } catch (error) {
        throw error;
    }
};

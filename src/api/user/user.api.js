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

// <<<<<<< HEAD
// export const banAcc = async (id) => {

//     try {
//         return await axiosPrivate.patch(`/v1/user/lockAccount/${id}`, {
// =======
export const lockAccount = async (userId) => {

    try {
        return await axiosPrivate.put(`/v1/user/lockAccount/${userId}`, {}, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (error) {
        throw error;
    }
};

export const unmapStudentId = async (userId) => {

    try {
        return await axiosPrivate.patch(`/v1/user/unmappingStudentId/${userId}`, {}, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (error) {
        throw error;
    }
};

export const updateIdByFile = async (data) => {

    try {
        return await axiosPrivate.post(`/v1/user/mappingStudentIdByCsv`, data, {

            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (error) {
        throw error;
    }
};


export const userReview = async (data) => {

    try {
        return await axiosPrivate.post(`/v1/user/reviewStudentId`, data, {

            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (error) {
        throw error;
    }
};
export const userReviewList = async (id) => {

    try {
        return await axiosPrivate.get(`/v1/user/studentIdReviewDetail/${id}`, {

            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (error) {
        throw error;
    }
};
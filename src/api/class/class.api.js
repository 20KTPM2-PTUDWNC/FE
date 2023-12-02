import { getCookies } from "../../features/user";
import { axiosPrivate } from "../api";

export const createClass = async (data) => {

    try {
        return await axiosPrivate.post('/v1/class/createClass', data, {
            headers: {
                'Authorization': getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const getAllClassById = async (data) => {

    try {
        return await axiosPrivate.get('/v1/class/getAllClassById', data, {
            headers: {
                'Authorization': getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const showClassDetail = async (id, data) => {

    try {
        return await axiosPrivate.get(`/v1/class/showClassDetail/${id}`, data, {
            headers: {
                'Authorization': getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const showMemberList = async (id, data) => {

    try {
        return await axiosPrivate.get(`/v1/userClass/${id}`, data, {
            headers: {
                'Authorization': getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};
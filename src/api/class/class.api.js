import { getCookies } from "../../features/user";
import { axiosPrivate } from "../api";

export const createClass = async (data) => {

    try {
        return await axiosPrivate.post('/v1/class/createClass', data, {
            "Authorization": getCookies()
        });
    } catch (err) {
        throw err;
    }
};

export const getAllClassById = async (data) => {

    try {
        return await axiosPrivate.get('/v1/class/getAllClassById', data, {
            "Authorization": getCookies()
        });
    } catch (err) {
        throw err;
    }
};

export const showClassDetail = async (id, data) => {

    try {
        return await axiosPrivate.get(`/v1/class/showClassDetail/${id}`, data, {
            "Authorization": getCookies()
        });
    } catch (err) {
        throw err;
    }
};

export const showMemberList = async (id, data) => {

    try {
        return await axiosPrivate.get(`/v1/userClass/${id}`, data, {
            "Authorization": getCookies()
        });
    } catch (err) {
        throw err;
    }
};
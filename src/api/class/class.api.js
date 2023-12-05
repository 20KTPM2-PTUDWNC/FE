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

export const getAllClassById = async () => {

    try {
        return await axiosPrivate.get('/v1/class/getAllClassById', {
            "Authorization": getCookies()
        });
    } catch (err) {
        throw err;
    }
};

export const showClassDetail = async (id) => {

    try {
        return await axiosPrivate.get(`/v1/class/showClassDetail/${id}`, {
            "Authorization": getCookies()
        });
    } catch (err) {
        throw err;
    }
};

export const showMemberList = async (id) => {

    try {
        return await axiosPrivate.get(`/v1/userClass/${id}`, {
            "Authorization": getCookies()
        });
    } catch (err) {
        throw err;
    }
};

export const joinClass = async (data) => {

    try {
        return await axiosPrivate.post('/v1/class/joinClass', data, {
            "Authorization": getCookies()
        });
    } catch (err) {
        throw err;
    }
};
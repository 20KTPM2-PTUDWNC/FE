import { axiosPrivate } from "../api";

export const createClass = async (data) => {

    try {
        return await axiosPrivate.post('/v1/class/createClass', data);
    } catch (err) {
        throw err;
    }
};

export const getAllClassById = async () => {

    try {
        return await axiosPrivate.get('/v1/class/getAllClassById');
    } catch (err) {
        throw err;
    }
};

export const showClassDetail = async (id, data) => {

    try {
        return await axiosPrivate.get(`/v1/class/showClassDetail/${id}`);
    } catch (err) {
        throw err;
    }
};

export const showMemberList = async (id, data) => {

    try {
        return await axiosPrivate.get(`/v1/userClass/${id}`);
    } catch (err) {
        throw err;
    }
};
import { getCookies } from "../../features/user";
import { axiosPrivate } from "../api";

export const createClass = async (data) => {

    try {
        console.log(getCookies())
        return await axiosPrivate.post('/v1/class/createClass', data, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const getAllClassById = async () => {

    try {
        return await axiosPrivate.get('/v1/class/getAllClassById', {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const showClassDetail = async (id) => {

    try {
        return await axiosPrivate.get(`/v1/class/showClassDetail/${id}`, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const showMemberList = async (id) => {

    try {
        return await axiosPrivate.get(`/v1/userClass/${id}`, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const exportStudentList = async (id) => {

    try {
        console.log(id)
        return await axiosPrivate.get(`/v1/grade/exportStudentList/${id}`, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const joinClass = async (data) => {

    try {
        return await axiosPrivate.post('/v1/class/joinClass', data, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const createInvitationLink = async (data) => {

    try {
        return await axiosPrivate.post('/v1/class/createInvitationLink', data, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const acceptInvitation = async (data) => {

    try {
        return await axiosPrivate.post('/v1/class/acceptInvitation', data, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const invitationByEmail = async (data) => {

    try {
        return await axiosPrivate.post('/v1/class/invitationByEmail', data, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const getAllClass = async () => {

    try {
        return await axiosPrivate.get('/v1/class/getAllClass', {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const activeClass = async (id, data) => {

    try {
        console.log(id)
        return await axiosPrivate.put(`/v1/class/activeClass/${id}`, data, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const showStudentList = async (id) => {

    try {
        return await axiosPrivate.get(`/v1/class/showStudentList/${id}`, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};
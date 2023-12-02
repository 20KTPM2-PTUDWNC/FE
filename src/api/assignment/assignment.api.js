import { axiosPrivate } from "../api";

export const addAssignment = async (id, data) => {

    try {
        return await axiosPrivate.post(`/v1/assignment/addAssignment/${id}`, data, {
            "Authorization": getCookies()
        });
    } catch (err) {
        throw err;
    }
};

export const showAssignmentList = async (id, data) => {

    try {
        return await axiosPrivate.get(`/v1/assignment/showAssignmentList/${id}`, data, {
            "Authorization": getCookies()
        });
    } catch (err) {
        throw err;
    }
};
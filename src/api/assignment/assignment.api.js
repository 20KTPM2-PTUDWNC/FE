import { axiosPrivate } from "../api";
import { getCookies } from "../../features/user";

export const addAssignment = async (id, data) => {

    try {
        return await axiosPrivate.post(`/v1/assignment/addAssignment/${id}`, data, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const showAssignmentList = async (id) => {

    try {
        console.log("Auth assigment",getCookies())
        return await axiosPrivate.get(`/v1/assignment/showAssignmentList/${id}`, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};
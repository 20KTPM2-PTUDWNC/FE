import { axiosPrivate } from "../api";
import { getCookies } from "../../features/user";

export const addGradeComposition = async (id, data) => {

    try {
        return await axiosPrivate.post(`/v1/grade/addGradeStructure/${id}`, data, {
            headers: {
                Authorization: getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const showGradeStructure = async (id, data) => {

    try {
        return await axiosPrivate.get(`/v1/grade/showGradeStructure/${id}`, data, {
            headers: {
                Authorization: getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const updateGradeComposition = async (classId, gradeId, data) => {

    try {
        return await axiosPrivate.put(`/v1/grade/${classId}/updateGradeComposition/${gradeId}`, data, {
            headers: {
                Authorization: getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const deleteGradeComposition = async (classId, gradeId, data) => {

    try {
        return await axiosPrivate.delete(`/v1/grade/${classId}/deleteteGradeComposition/${gradeId}`, data, {
            headers: {
                Authorization: getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const arrangeGradeComposition = async (classId, gradeId, position, data) => {

    try {
        return await axiosPrivate.delete(`/v1/grade/${classId}/arrangeGradeComposition/${gradeId}/position/${position}`, data, {
            headers: {
                Authorization: getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

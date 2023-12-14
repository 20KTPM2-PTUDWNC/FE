import { axiosPrivate } from "../api";
import { getCookies } from "../../features/user";

export const addGradeComposition = async (id, data) => {

    try {
        return await axiosPrivate.post(`/v1/grade/addGradeStructure/${id}`, data, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const showGradeStructure = async (id) => {

    try {
        return await axiosPrivate.get(`/v1/grade/showGradeStructure/${id}`, {
            headers: {
                "Authorization": getCookies()
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
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const deleteGradeComposition = async (classId, gradeId) => {

    try {
        return await axiosPrivate.delete(`/v1/grade/${classId}/deleteGradeComposition/${gradeId}`, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

export const arrangeGradeComposition = async (classId, gradeId, position) => {

    try {
        return await axiosPrivate.delete(`/v1/grade/${classId}/arrangeGradeComposition/${gradeId}/position/${position}`, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};

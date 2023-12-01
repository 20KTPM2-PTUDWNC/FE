import { axiosPrivate } from "../api";

export const addGradeComposition = async (id, data) => {

    try {
        return await axiosPrivate.post(`/v1/grade/addGradeStructure/${id}`, data);
    } catch (err) {
        throw err;
    }
};

export const showGradeStructure = async (id, data) => {

    try {
        return await axiosPrivate.get(`/v1/grade/showGradeStructure/${id}`, data);
    } catch (err) {
        throw err;
    }
};

export const updateGradeComposition = async (classId, gradeId, data) => {

    try {
        return await axiosPrivate.put(`/v1/grade/${classId}/updateGradeComposition/${gradeId}`, data);
    } catch (err) {
        throw err;
    }
};

export const deleteGradeComposition = async (classId, gradeId, data) => {

    try {
        return await axiosPrivate.delete(`/v1/grade/${classId}/deleteteGradeComposition/${gradeId}`, data);
    } catch (err) {
        throw err;
    }
};

export const arrangeGradeComposition = async (classId, gradeId, position, data) => {

    try {
        return await axiosPrivate.delete(`/v1/grade/${classId}/arrangeGradeComposition/${gradeId}/position/${position}`, data);
    } catch (err) {
        throw err;
    }
};

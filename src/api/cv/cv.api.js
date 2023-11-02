import { axiosPrivate } from "../api";

export const createCV = async (params) => {
    const { formData, authToken } = params || {};

    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    try {
        return await axiosPrivate.post("/api/v1/cvs", formData, {
            headers: {
                "auth-token": authToken,
                "Content-Type": "multipart/form-data", // Thêm tùy chọn Content-Type
            },
        });
    } catch (error) {
        throw error;
    }
};

export const getCVByPostId = async (params) => {
    const { status, sortOption, userId, postId, authToken } = params || {};
    try {
        return await axiosPrivate.get("/api/v1/cvs", {
            params: { status, sortOption, userId, postId },
            headers: { "auth-token": authToken },
        });
    } catch (error) {
        throw error;
    }
};

export const getCVByUserId = async (id, token) => {
    try {
        return await axiosPrivate.get(`/api/v1/cvs/jobseeker?sortOption=desc&userId=${id}`, {
            headers: {
                "auth-token": `${token}`,
            },
        });
    } catch (err) {
        throw err;
    }
};

export const pendingCV = async (params) => {
    const { id, authToken } = params || {};
    try {
        return await axiosPrivate.put(
            `/api/v1/cvs/${id}`,
            {
                status: 1,
            },
            {
                headers: {
                    "auth-token": `${authToken}`,
                },
            }
        );
    } catch (error) {
        throw error;
    }
};

export const rejectCV = async (params) => {
    const { id, authToken } = params || {};
    try {
        return await axiosPrivate.put(
            `/api/v1/cvs/${id}`,
            {
                status: 2,
            },
            {
                headers: {
                    "auth-token": `${authToken}`,
                },
            }
        );
    } catch (error) {
        throw error;
    }
};

export const approveCV = async (params) => {
    const { id, authToken } = params || {};
    try {
        return await axiosPrivate.put(
            `/api/v1/cvs/${id}`,
            {
                status: 3,
            },
            {
                headers: {
                    "auth-token": `${authToken}`,
                },
            }
        );
    } catch (error) {
        throw error;
    }
};

export const inviteCV = async (params) => {
    const { id, authToken } = params || {};
    try {
        return await axiosPrivate.put(
            `/api/v1/cvs/${id}`,
            {
                status: 4,
            },
            {
                headers: {
                    "auth-token": `${authToken}`,
                },
            }
        );
    } catch (error) {
        throw error;
    }
};

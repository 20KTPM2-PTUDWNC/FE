import { axiosPrivate } from "../api";

export const createJob = async (params) => {
    const { data, authToken } = params || {};
    try {
        return await axiosPrivate.post(
            "/api/v1/posts",
            {
                ...data,
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

export const getJobs = async (params) => {
    const { page, search, minSalary, maxSalary, address, userId } = params || {};
    try {
        return await axiosPrivate.get(`/api/v1/posts`, {
            params: {
                page,
                search,
                minSalary,
                maxSalary,
                address,
                userId,
            },
        });
    } catch (error) {
        throw error;
    }
};

export const getJob = async (id) => {
    try {
        return await axiosPrivate.get(`/api/v1/posts/${id}`);
    } catch (error) {
        throw error;
    }
};

export const updateJob = async (params) => {
    const { id, data, authToken } = params || {};
    try {
        return await axiosPrivate.patch(
            `/api/v1/posts/${id}`,
            {
                ...data,
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

export const deleteJob = async (params) => {
    const { id, authToken } = params || {};
    try {
        return await axiosPrivate.delete(`/api/v1/posts/${id}`, {
            headers: {
                "auth-token": `${authToken}`,
            },
        });
    } catch (error) {
        throw error;
    }
};

export const closeJobEmployer = async (params) => {
    const { id, authToken } = params || {};
    try {
        return await axiosPrivate.put(
            `/api/v1/posts/close/${id}`,
            {},
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

export const openJobEmployer = async (params) => {
    const { id, authToken } = params || {};
    try {
        return await axiosPrivate.put(
            `/api/v1/posts/open/${id}`,
            {},
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

export const getHotJobs = async () => {
    try {
        return await axiosPrivate.get("/api/v1/posts/hot-jobs");
    } catch (error) {
        throw error;
    }
};

export const getPostsByEmployer = async (params) => {
    const { status, page, authToken } = params || {};
    try {
        return await axiosPrivate.get("/api/v1/posts/employer", {
            params: {
                page,
                status,
            },
            headers: {
                "auth-token": `${authToken}`,
            },
        });
    } catch (error) {
        throw error;
    }
};

export const getPostsByAdmin = async (params) => {
    const { status, authToken } = params || {};
    try {
        return await axiosPrivate.get("/api/v1/posts/admin", {
            params: {
                status,
            },
            headers: {
                "auth-token": `${authToken}`,
            },
        });
    } catch (error) {
        throw error;
    }
};

export const pendingPost = async (params) => {
    const { id, authToken } = params || {};
    try {
        return await axiosPrivate.put(
            `/api/v1/posts/${id}`,
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

export const rejectPost = async (params) => {
    const { id, authToken } = params || {};
    try {
        return await axiosPrivate.put(
            `/api/v1/posts/${id}`,
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

export const approvePost = async (params) => {
    const { id, authToken } = params || {};
    try {
        return await axiosPrivate.put(
            `/api/v1/posts/${id}`,
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

export const closeJob = async (params) => {
    const { id, authToken } = params || {};
    try {
        return await axiosPrivate.put(
            `/api/v1/posts/${id}`,
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

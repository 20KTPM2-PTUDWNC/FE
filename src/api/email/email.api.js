import { axiosPrivate } from "../api";

export const sendEmail = async (data) => {
    try {
        return await axiosPrivate.post("/api/v1/email/sendmail", data, {
            "Authorization": getCookies()
        });
    } catch (error) {
        throw error;
    }
};

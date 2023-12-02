import { axiosPrivate } from "../api";
import { getCookies } from "../../features/user";

export const sendEmail = async (data) => {
    try {
        return await axiosPrivate.post("/api/v1/email/sendmail", data, {
            headers: {
                'Authorization': getCookies()
            }
        });
    } catch (error) {
        throw error;
    }
};

import { axiosPrivate } from "../api";
import { getCookies } from "../../features/user";
export const getNoti = async (id) => {

    try {
        return await axiosPrivate.get(`/v1/user/notification/${id}`, {
            headers: {
                "Authorization": getCookies()
            }
        });
    } catch (err) {
        throw err;
    }
};
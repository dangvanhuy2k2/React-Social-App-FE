import axios from "axios";
import { toast } from "react-toastify";

import jwt_decode from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN, URL_BE } from "../contants";
import { getLocalStorage } from "../helpers";



const instance = axios.create({
    baseURL: URL_BE + "v1/api",
});


const isTimeExpire = (token) => {
    if (!token) {
        return true;
    }
    const date = new Date();
    const { exp } = jwt_decode(token);
    return exp < date.getTime() / 1000
}




let refreshTokenRequest = null;
const handleRefreshToken = async () => {
    try {
        let refreshToken = getLocalStorage(REFRESH_TOKEN);
        if (isTimeExpire(refreshToken)) throw new Error("Refresh token invalid");
        const response = await axios.post("/auth/refresh-token", { refreshToken });
        return response;
    } catch (err) {
        throw err;
    }
};

instance.interceptors.request.use(
    async (request) => {
        let accessToken = getLocalStorage(ACCESS_TOKEN);

        if (!accessToken) {
            throw new Error("Please login");
        }

        if (isTimeExpire(accessToken)) {
            try {
                refreshTokenRequest = refreshTokenRequest
                    ? refreshTokenRequest
                    : handleRefreshToken();

                const response = await refreshTokenRequest;

                const { newAccessToken } = response.data;

                localStorage.setItem(ACCESS_TOKEN, JSON.stringify(newAccessToken));
                accessToken = newAccessToken;
            } catch (err) {
                throw new Error("Refresh Token failed");
            }
        }

        request.headers["Authorization"] = "Bearer " + accessToken;
        return request;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        console.log("error on respon", error);
        const message = error?.response?.data?.message || error.message;

        toast.error(message, { autoClose: 1000 });
        return Promise.reject(message);
    }
);

export default instance;

import axios from "axios";

const api = axios.create({

    baseURL: "http://127.0.0.1:5000/api",

    headers: {

        "Content-Type": "application/json"

    },

    timeout: 60000

});

// ============================
// Request Interceptor
// ============================

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);

// ============================
// Response Interceptor
// ============================

api.interceptors.response.use(

    (response) => {

        return response;

    },

    (error) => {

        if (error.response) {

            switch (error.response.status) {

                case 401:

                    console.warn("Session expired. Logging out...");

                    localStorage.removeItem("token");

                    localStorage.removeItem("user");

                    if (window.location.pathname !== "/login") {

                        window.location.href = "/login";

                    }

                    break;

                case 403:

                    console.warn("Access denied.");

                    break;

                case 500:

                    console.error("Internal Server Error.");

                    break;

                default:

                    break;

            }

        }

        return Promise.reject(error);

    }

);

export default api;
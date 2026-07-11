import api from "./api";

// ----------------------
// Register
// ----------------------
export const registerUser = async (name, email, password) => {

    const response = await api.post("/auth/register", {

        name,

        email,

        password

    });

    return response.data;

};

// ----------------------
// Login
// ----------------------
export const loginUser = async (email, password) => {

    const response = await api.post("/auth/login", {

        email,

        password

    });

    return response.data;

};

// ----------------------
// Get Profile
// ----------------------
export const getProfile = async () => {

    const response = await api.get("/auth/profile");

    return response.data;

};

// ----------------------
// Update Profile
// ----------------------
export const updateProfile = async (name, email) => {

    const response = await api.put("/auth/profile", {

        name,

        email

    });

    return response.data;

};

export const changePassword = async (

    current_password,

    new_password

) => {

    const response = await api.put(

        "/auth/change-password",

        {

            current_password,

            new_password

        }

    );

    return response.data;

};
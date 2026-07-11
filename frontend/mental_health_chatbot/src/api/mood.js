import api from "./api";

export const saveMood = async (mood, note) => {

    const response = await api.post("/mood", {

        mood,

        note

    });

    return response.data;

};

export const getMoodHistory = async () => {

    const response = await api.get("/mood/history");

    return response.data;

};

export const getMoodStats = async () => {

    const response = await api.get("/mood/stats");

    return response.data;

};
import api from "./api";

export const getMoodStats = async () => {

    const response = await api.get("/mood/stats");

    return response.data;

};
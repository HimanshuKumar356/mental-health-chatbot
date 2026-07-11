import api from "./api";

export const getJournalStats = async () => {

    const response = await api.get("/journal/stats");

    return response.data;

};
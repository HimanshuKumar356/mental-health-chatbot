import api from "./api";

export const saveJournal = async (title, content) => {

    const response = await api.post("/journal", {

        title,

        content

    });

    return response.data;

};

export const getJournalHistory = async () => {

    const response = await api.get("/journal/history");

    return response.data;

};

export const getJournalStats = async () => {

    const response = await api.get("/journal/stats");

    return response.data;

};

export const getJournalDetails = async (id) => {

    const response = await api.get(`/journal/${id}`);

    return response.data;

};
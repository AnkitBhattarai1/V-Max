import axios from "axios";
import { BASE_URL } from "../Constants/Urls";

// Create a new episode
export const createepisode = async (episodeData) => {
    try {
        const response = await axios.post(`${BASE_URL}/episode`, episodeData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating episode:", error);
        throw error;
    }
};

export const getepisodebyid = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/episode/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching episode by ID:", error);
        throw error;
    }
};

export const getallepisodes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/episode/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all episodes:", error);
        throw error;
    }
};

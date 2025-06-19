import axios from "axios";
import { BASE_URL } from "../Constants/Urls";

// Create a new season
export const createseason = async (seasonData) => {
    try {
        const response = await axios.post(`${BASE_URL}/season`, seasonData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating season:", error);
        throw error;
    }
};

export const getseasonbyid = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/season/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching season by ID:", error);
        throw error;
    }
};

export const getallseasons = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/season/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all seasons:", error);
        throw error;
    }
};

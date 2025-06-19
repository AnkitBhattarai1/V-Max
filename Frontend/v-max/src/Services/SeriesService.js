import axios from "axios";
import { BASE_URL } from "../Constants/Urls";

// Create a new series
export const createseries = async (seriesData) => {
    try {
        const response = await axios.post(`${BASE_URL}/series`, seriesData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating series:", error);
        throw error;
    }
};

// Get a series by ID
export const getseriesbyid = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/series/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching series by ID:", error);
        throw error;
    }
};

// Get multiple series by IDs
export const getseriesbyids = async (ids) => {
    try {
        const response = await axios.get(`${BASE_URL}/series`, {
            params: { ids },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching series by IDs:", error);
        throw error;
    }
};

export const getallseries = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/series/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all series:", error);
        throw error;
    }
};

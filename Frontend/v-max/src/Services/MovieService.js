import axios from "axios";
import { BASE_URL } from "/src/Constants/Urls.js"; // Ensure BASE_URL is defined correctly
import apiClient from "./ApiClient";
// Create a new movie
export const createmovie = async (movieData) => {
    try {
        const response = await apiClient.post(`movie`, movieData, {
            headers: {
                "Content-Type": "application/json", // JSON format for movie creation
            },
        });
        return response.data; // MovieResponse object
    } catch (error) {
        console.error("Error creating movie:", error);
        throw error;
    }
};

// Get a movie by ID
export const getmoviebyid = async (id) => {
    try {
        const response = await apiClient.get(`/movie/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie by ID:", error);
        throw error;
    }
};
export const getmoviesbyids= async (ids) => {
    try {
        const response = await apiClient.get(`movie`, {
            params: { ids }, // List of movie IDs as query parameters
        });
        return response.data; // List of MovieResponse objects
    } catch (error) {
        console.error("Error fetching movies by IDs:", error);
        throw error;
    }
};
// Get all movies
export const getallmovies = async () => {
    try {
        //axios.get(`${BASE_URL}/movie/all`);
        const response = await apiClient.get("/movie/all");
        return response.data;
    } catch (error) {
        console.error("Error fetching all movies:", error);
        throw error;
    }
};
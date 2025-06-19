import axios from "/node_modules/.vite/deps/axios.js?v=e56cf084";
import { BASE_URL } from "/src/Constants/Urls.js"; // Ensure BASE_URL is defined correctly

// Create a new movie
export const createmovie = async (movieData) => {
    try {
        const response = await axios.post(`${BASE_URL}/movie`, movieData, {
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
export const getmoviebyid= async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`);
        return response.data; // MovieResponse object
    } catch (error) {
        console.error("Error fetching movie by ID:", error);
        throw error;
    }
};

// Get multiple movies by IDs
export const getmoviesbyids= async (ids) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie`, {
            params: { ids }, // List of movie IDs as query parameters
        });
        return response.data; // List of MovieResponse objects
    } catch (error) {
        console.error("Error fetching movies by IDs:", error);
        throw error;
    }
};

export const getallmovies= async () => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/all`);
        return response.data; // List of MovieResponse objects
    } catch (error) {
        console.error("Error fetching all movies:", error);
        throw error;
    }
};


import axios from "axios";
import { BASE_URL } from "../Constants/Urls"; // Ensure BASE_URL is defined correctly

// Create a new video
export const createVideo = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/video/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Ensure multipart for video and thumbnail
            },
        });
        return response.data; // VideoResponse object
    } catch (error) {
        console.error("Error creating video:", error);
        throw error;
    }
};



// Get all videos
export const getAllVideos = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/video/all`);
        return response.data; // List of VideoResponse objects
    } catch (error) {
        console.error("Error fetching all videos:", error);
        throw error;
    }
};






// Get a video by ID
export const getVideoById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/video/${id}`);
        return response.data; // VideoResponse object
    } catch (error) {
        console.error("Error fetching video by ID:", error);
        throw error;
    }
};





// Delete a video by ID
export const deleteVideo = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/video/${id}`);
        return response.data; // Success message
    } catch (error) {
        console.error("Error deleting video:", error);
        throw error;
    }
};





// Stream a video by ID
export const streamVideo = async (videoId) => {
    try {
        const response = await axios.get(`${BASE_URL}/video/stream/${videoId}`, {
            responseType: "blob", // Ensures video is handled as a binary file
        });
        return response.data; // Video binary data
    } catch (error) {
        console.error("Error streaming video:", error);
        throw error;
    }
};







// Get a thumbnail by video ID
export const getThumbnail = async (videoId) => {
    try {
        const response = await axios.get(`${BASE_URL}/video/thumbnail/${videoId}`, {
            responseType: "blob", // Ensures thumbnail is handled as an image binary file
        });
        return response.data; // Thumbnail binary data
    } catch (error) {
        console.error("Error fetching thumbnail:", error);
        throw error;
    }
};







// Get multiple videos by IDs
export const getVideosByIds = async (ids) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/video/getByIds`,
            ids, // Request body: list of video IDs
            {
                headers: {
                    "Content-Type": "application/json", // Ensure JSON format
                },
            }
        );
        return response.data; // List of VideoResponse objects
    } catch (error) {
        console.error("Error fetching videos by IDs:", error);
        throw error;
    }
};

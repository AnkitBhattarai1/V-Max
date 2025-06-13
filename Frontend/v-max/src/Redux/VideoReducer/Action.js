
import axios from "axios";
import { CREATE_VIDEO_SUCCESS, DELETE_VIDEO_SUCCESS, GET_VIDEO_SUCCESS, GET_VIDEOS_BY_IDS_SUCCESS, STREAM_VIDEO_SUCCESS, VIDEO_FAILURE, VIDEO_REQUEST } from "./ActionTypes";
import { createVideo, getAllVideos, getVideoById, deleteVideo, streamVideo, getThumbnail, getVideosByIds } from "../../Services/VideoService";

// Action to fetch all videos
export const getVideos = () => (dispatch) => {
    dispatch({ type: VIDEO_REQUEST });
    
    getAllVideos()
        .then((res) => {
            dispatch({ type: GET_VIDEO_SUCCESS, payload: res });
        })
        .catch((err) => {
            dispatch({ type: VIDEO_FAILURE });
        });
};

// Action to fetch a video by ID
export const getVideo = (id) => (dispatch) => {
    
    dispatch({ type: VIDEO_REQUEST });

    getVideoById(id)
        .then((res) => {
            dispatch({ type: GET_VIDEO_SUCCESS, payload: res });
        })
        .catch((err) => {
            dispatch({ type: VIDEO_FAILURE });
        });
};

// Action to create a new video
export const addVideo = (formData) => (dispatch) => {
    dispatch({ type: VIDEO_REQUEST });

    createVideo(formData)
        .then((res) => {
            dispatch({ type: CREATE_VIDEO_SUCCESS, payload: res });
        })
        .catch((err) => {
            dispatch({ type: VIDEO_FAILURE });
        });
};

// Action to delete a video by ID
export const deleteVideoById = (id) => (dispatch) => {
    dispatch({ type: VIDEO_REQUEST });

    deleteVideo(id)
        .then((res) => {
            dispatch({ type: DELETE_VIDEO_SUCCESS, payload: id });
        })
        .catch((err) => {
            dispatch({ type: VIDEO_FAILURE });
        });
};

// Action to stream a video
export const streamVideoById = (videoId) => (dispatch) => {
    dispatch({ type: VIDEO_REQUEST });

    streamVideo(videoId)
        .then((res) => {
            dispatch({ type: STREAM_VIDEO_SUCCESS, payload: res });
        })
        .catch((err) => {
            dispatch({ type: VIDEO_FAILURE });
        });
};

// Action to get a thumbnail by video ID
export const getVideoThumbnail = (videoId) => (dispatch) => {
    dispatch({ type: VIDEO_REQUEST });

    getThumbnail(videoId)
        .then((res) => {
            dispatch({ type: GET_THUMBNAIL_SUCCESS, payload: res });
        })
        .catch((err) => {
            dispatch({ type: VIDEO_FAILURE });
        });
};

// Action to fetch multiple videos by IDs
export const getvideosbyids= (ids) => (dispatch) => {
    dispatch({ type: VIDEO_REQUEST });

    getVideosByIds(ids)
        .then((res) => {
            dispatch({ type: GET_VIDEOS_BY_IDS_SUCCESS, payload: res });
        })
        .catch((err) => {
            dispatch({ type: VIDEO_FAILURE });
        });
};

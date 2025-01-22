
import { CREATE_VIDEO_SUCCESS, DELETE_VIDEO_SUCCESS, GET_VIDEO_SUCCESS, GET_VIDEOS_BY_IDS_SUCCESS, STREAM_VIDEO_SUCCESS, GET_THUMBNAIL_SUCCESS, VIDEO_FAILURE, VIDEO_REQUEST } from "./ActionTypes";

const initialState = {
    videos: [],
    isLoading: false,
    isError: false,
    video: null, // To store individual video data
    thumbnail: null, // To store video thumbnail
};

export const videoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case VIDEO_REQUEST:
            return { ...state, isLoading: true, isError: false };

        case VIDEO_FAILURE:
            return { ...state, isError: true, isLoading: false };

        case GET_VIDEO_SUCCESS:
            return { ...state, isLoading: false, videos:[...state.videos, payload] };

        case CREATE_VIDEO_SUCCESS:
            return { ...state, isLoading: false, videos: [...state.videos, payload] };

        case DELETE_VIDEO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                videos: state.videos.filter((video) => video.id !== payload),
            };

        case STREAM_VIDEO_SUCCESS:
            return { ...state, isLoading: false, videoStream: payload };

        case GET_THUMBNAIL_SUCCESS:
            return { ...state, isLoading: false, thumbnail: payload };

        case GET_VIDEOS_BY_IDS_SUCCESS:
            return { ...state, isLoading: false, videos: payload };

        default:
            return state;
    }
};

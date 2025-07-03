import {
  CREATE_VIDEO_SUCCESS,
  DELETE_VIDEO_SUCCESS,
  GET_VIDEO_SUCCESS,
  GET_VIDEOS_BY_IDS_SUCCESS,
  STREAM_VIDEO_SUCCESS,
  GET_THUMBNAIL_SUCCESS,
  VIDEO_FAILURE,
  VIDEO_REQUEST,
  RECOMMENDATION_REQUEST,
  RECOMMENDATION_SUCCESS,
  RECOMMENDATION_FAILURE,
} from "./ActionTypes";

const initialState = {
  recommendedvideos: [],  // Array of recommended videos
  videos: {},             // Map of videoId -> video data
  isLoading: false,
  isError: false,
  video: null,
  thumbnail: null,
};

export const videoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case VIDEO_REQUEST:
    case RECOMMENDATION_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case VIDEO_FAILURE:
    case RECOMMENDATION_FAILURE:
      return { ...state, isError: true, isLoading: false };

    case GET_VIDEO_SUCCESS:
    case CREATE_VIDEO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        videos: {
          ...state.videos,
          [payload.id]: payload,
        },
      };

    case DELETE_VIDEO_SUCCESS:
      const updatedVideos = { ...state.videos };
      delete updatedVideos[payload];
      return {
        ...state,
        isLoading: false,
        videos: updatedVideos,
      };

    case STREAM_VIDEO_SUCCESS:
      return { ...state, isLoading: false, videoStream: payload };

    case GET_THUMBNAIL_SUCCESS:
      return { ...state, isLoading: false, thumbnail: payload };

    case GET_VIDEOS_BY_IDS_SUCCESS:
      const videoMap = {};
      payload.forEach((video) => {
        videoMap[video.id] = video;
      });
      return {
        ...state,
        isLoading: false,
        videos: {
          ...state.videos,
          ...videoMap,
        },
      };

    case RECOMMENDATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recommendedvideos: payload, // payload expected to be array of video objects
      };

    default:
      return state;
  }
};

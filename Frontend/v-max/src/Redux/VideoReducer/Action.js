// /Redux/VideoReducer/Action.js

import {
  CREATE_VIDEO_SUCCESS,
  DELETE_VIDEO_SUCCESS,
  GET_VIDEO_SUCCESS,
  GET_VIDEOS_BY_IDS_SUCCESS,
  STREAM_VIDEO_SUCCESS,
  VIDEO_FAILURE,
  VIDEO_REQUEST,
  RECOMMENDATION_REQUEST,
RECOMMENDATION_SUCCESS,
RECOMMENDATION_FAILURE,
GET_THUMBNAIL_SUCCESS,
} from "./ActionTypes";

import {
  createVideo,
  getAllVideos,
  getVideoById,
  deleteVideo,
  streamVideo,
  getThumbnail,
  getVideosByIds,
} from "../../Services/VideoService";
import { getRecommendations } from "../../Services/RatingandRecommendation";

export const getVideos = () => (dispatch) => {
  dispatch({ type: VIDEO_REQUEST });

  getAllVideos()
    .then((res) => {
      dispatch({ type: GET_VIDEO_SUCCESS, payload: res });
    })
    .catch(() => {
      dispatch({ type: VIDEO_FAILURE });
    });
};

export const getVideo = (id) => (dispatch) => {
  dispatch({ type: VIDEO_REQUEST });

  getVideoById(id)
    .then((res) => {
      dispatch({ type: GET_VIDEO_SUCCESS, payload: res });
    })
    .catch(() => {
      dispatch({ type: VIDEO_FAILURE });
    });
};

export const addVideo = (formData) => async (dispatch) => {
  dispatch({ type: VIDEO_REQUEST });

  try {
    const res = await createVideo(formData);
    dispatch({ type: CREATE_VIDEO_SUCCESS, payload: res });
    return res;
  } catch (err) {
    dispatch({ type: VIDEO_FAILURE });
    throw err;
  }
};

export const deleteVideoById = (id) => (dispatch) => {
  dispatch({ type: VIDEO_REQUEST });

  deleteVideo(id)
    .then(() => {
      dispatch({ type: DELETE_VIDEO_SUCCESS, payload: id });
    })
    .catch(() => {
      dispatch({ type: VIDEO_FAILURE });
    });
};

export const streamVideoById = (videoId) => (dispatch) => {
  dispatch({ type: VIDEO_REQUEST });

  streamVideo(videoId)
    .then((res) => {
      dispatch({ type: STREAM_VIDEO_SUCCESS, payload: res });
    })
    .catch(() => {
      dispatch({ type: VIDEO_FAILURE });
    });
};

export const getVideoThumbnail = (videoId) => (dispatch) => {
  dispatch({ type: VIDEO_REQUEST });

  getThumbnail(videoId)
    .then((res) => {
      dispatch({ type: GET_THUMBNAIL_SUCCESS, payload: res });
    })
    .catch(() => {
      dispatch({ type: VIDEO_FAILURE });
    });
};

export const getvideosbyids = (ids) => (dispatch) => {
  dispatch({ type: VIDEO_REQUEST });

  getVideosByIds(ids)
    .then((res) => {
      dispatch({ type: GET_VIDEOS_BY_IDS_SUCCESS, payload: res });
    })
    .catch(() => {
      dispatch({ type: VIDEO_FAILURE });
    });
};
export const fetchRecommendations = (userId, N) => async (dispatch) => {
  dispatch({ type: RECOMMENDATION_REQUEST });

  try {
    const recommendedIds = await getRecommendations(userId, N); // just an array of IDs

    if (recommendedIds.length > 0) {
      const videoObjs = await getVideosByIds(recommendedIds); // fetch full video data
      dispatch({ type: RECOMMENDATION_SUCCESS, payload: videoObjs });
    } else {
      dispatch({ type: RECOMMENDATION_SUCCESS, payload: [] }); // No recs
    }
  } catch (err) {
    dispatch({ type: RECOMMENDATION_FAILURE });
  }
};
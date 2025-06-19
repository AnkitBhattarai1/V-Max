// src/Redux/EpisodeReducer/Action.js
import { 
  EPISODE_REQUEST,
  EPISODE_FAILURE,
  CREATE_EPISODE_SUCCESS,
  GET_ALL_EPISODES_SUCCESS
} from "./ActionTypes";

import { createepisode, getallepisodes } from "../../Services/EpisodeService";

// Create episode
export const addEpisode = (episodedata) => (dispatch) => {
  dispatch({ type: EPISODE_REQUEST });

  createepisode(episodedata)
    .then((res) => {
      dispatch({ type: CREATE_EPISODE_SUCCESS, payload: res });
    })
    .catch((err) => {
      console.error("Error creating episode:", err);
      dispatch({ type: EPISODE_FAILURE });
    });
};

// Fetch all episodes
export const fetchallepisodes = () => (dispatch) => {
  dispatch({ type: EPISODE_REQUEST });

  getallepisodes()
    .then((res) => {
      dispatch({ type: GET_ALL_EPISODES_SUCCESS, payload: res });
    })
    .catch((err) => {
      console.error("Error fetching all episodes:", err);
      dispatch({ type: EPISODE_FAILURE });
    });
};

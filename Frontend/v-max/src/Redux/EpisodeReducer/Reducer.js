import {
  EPISODE_REQUEST,
  EPISODE_FAILURE,
  CREATE_EPISODE_SUCCESS,
  GET_ALL_EPISODES_SUCCESS
} from "./ActionTypes";

const initialState = {
  episodeList: [],
  isLoading: false,
  isError: false,
};

export const episodeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case EPISODE_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case EPISODE_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case CREATE_EPISODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        episodeList: [...state.episodeList, payload],
      };

    case GET_ALL_EPISODES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        episodeList: payload,
      };

    default:
      return state;
  }
};

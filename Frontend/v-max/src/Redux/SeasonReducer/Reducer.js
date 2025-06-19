import {
  SEASON_REQUEST,
  SEASON_FAILURE,
  CREATE_SEASON_SUCCESS,
  GET_ALL_SEASONS_SUCCESS
} from "./ActionTypes";

const initialState = {
  seasonList: [],
  isLoading: false,
  isError: false,
};

export const seasonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEASON_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case SEASON_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case CREATE_SEASON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        seasonList: [...state.seasonList, payload],
      };

    case GET_ALL_SEASONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        seasonList: payload,
      };

    default:
      return state;
  }
};

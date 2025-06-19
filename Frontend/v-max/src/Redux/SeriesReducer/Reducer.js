import {
  SERIES_REQUEST,
  SERIES_FAILURE,
  CREATE_SERIES_SUCCESS,
  GET_ALL_SERIES_SUCCESS
} from "./ActionTypes";

const initialState = {
  seriesList: [],
  isLoading: false,
  isError: false,
};

export const seriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SERIES_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case SERIES_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case CREATE_SERIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        seriesList: [...state.seriesList, payload],
      };

    case GET_ALL_SERIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        seriesList: payload,
      };

    default:
      return state;
  }
};

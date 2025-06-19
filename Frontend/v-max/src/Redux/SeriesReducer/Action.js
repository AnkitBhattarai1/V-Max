// /src/Redux/SeriesReducer/Action.js

import {
  SERIES_REQUEST,
  SERIES_FAILURE,
  CREATE_SERIES_SUCCESS,
  GET_ALL_SERIES_SUCCESS
} from "./ActionTypes";

import { createseries, getallseries } from "../../Services/SeriesService";

// create a series
export const addSeries = (seriesdata) => (dispatch) => {
  dispatch({ type: SERIES_REQUEST });

  createseries(seriesdata)
    .then((res) => {
      dispatch({ type: CREATE_SERIES_SUCCESS, payload: res });
    })
    .catch((err) => {
      console.error("error creating series:", err);
      dispatch({ type: SERIES_FAILURE });
    });
};

// fetch all series
export const fetchAllSeries = () => (dispatch) => {
  dispatch({ type: SERIES_REQUEST });

  getallseries()
    .then((res) => {
      dispatch({ type: GET_ALL_SERIES_SUCCESS, payload: res });
    })
    .catch((err) => {
      console.error("error fetching all series:", err);
      dispatch({ type: SERIES_FAILURE });
    });
};

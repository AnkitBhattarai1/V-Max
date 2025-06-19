import {
  SEASON_REQUEST,
  SEASON_FAILURE,
  CREATE_SEASON_SUCCESS,
  GET_ALL_SEASONS_SUCCESS
} from "./ActionTypes";

import { createseason, getallseasons } from "../../Services/SeasonService";

// create a season
export const addSeason = (seasondata) => (dispatch) => {
  dispatch({ type: SEASON_REQUEST });

  createseason(seasondata)
    .then((res) => {
      dispatch({ type: CREATE_SEASON_SUCCESS, payload: res });
    })
    .catch((err) => {
      console.error("error creating season:", err);
      dispatch({ type: SEASON_FAILURE });
    });
};

// fetch all seasons
export const fetchallseasons = () => (dispatch) => {
  dispatch({ type: SEASON_REQUEST });

  getallseasons()
    .then((res) => {
      dispatch({ type: GET_ALL_SEASONS_SUCCESS, payload: res });
    })
    .catch((err) => {
      console.error("error fetching all seasons:", err);
      dispatch({ type: SEASON_FAILURE });
    });
};

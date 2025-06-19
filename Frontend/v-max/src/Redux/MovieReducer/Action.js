
import {
    CREATE_MOVIE_SUCCESS,
    GET_MOVIE_SUCCESS,
    GET_MOVIES_BY_IDS_SUCCESS,
    GET_ALL_MOVIES_SUCCESS,
    MOVIE_REQUEST,
    MOVIE_FAILURE
} from "./ActionTypes";

import { createmovie, getmoviebyid, getmoviesbyids, getallmovies } from "../../Services/MovieService";

// action to create a new movie
export const addmovie = (moviedata) => (dispatch) => {
    dispatch({ type: MOVIE_REQUEST});

    createmovie(moviedata)
        .then((res) => {
            dispatch({ type: CREATE_MOVIE_SUCCESS, payload: res });
        })
        .catch((err) => {
            console.error("error creating movie:", err);
            dispatch({ type: MOVIE_FAILURE });
        });
};

// action to fetch a movie by id
export const fetchmoviebyid = (id) => (dispatch) => {
    dispatch({ type: MOVIE_REQUEST });

    getmoviebyid(id)
        .then((res) => {
            dispatch({ type: GET_MOVIE_SUCCESS, payload: res });
        })
        .catch((err) => {
            console.error("error fetching movie by id:", err);
            dispatch({ type: MOVIE_FAILURE});
        });
};

// action to fetch multiple movies by ids
export const fetchmoviesbyids = (ids) => (dispatch) => {
    dispatch({ type: MOVIE_REQUEST });

    getmoviesbyids(ids)
        .then((res) => {
            dispatch({ type: GET_MOVIES_BY_IDS_SUCCESS, payload: res });
        })
        .catch((err) => {
            console.error("error fetching movies by ids:", err);
            dispatch({ type: MOVIE_FAILURE});
        });
};

// action to fetch all movies
export const fetchallmovies = () => (dispatch) => {
    dispatch({ type: MOVIE_REQUEST });

    getallmovies()
        .then((res) => {
            dispatch({ type: GET_ALL_MOVIES_SUCCESS, payload: res });
        })
        .catch((err) => {
            console.error("error fetching all movies:", err);
            dispatch({ type: MOVIE_FAILURE });
        });
};
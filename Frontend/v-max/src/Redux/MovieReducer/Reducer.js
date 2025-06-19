

import { 
    CREATE_MOVIE_SUCCESS, 
    GET_MOVIE_SUCCESS, 
    GET_MOVIES_BY_IDS_SUCCESS, 
    GET_ALL_MOVIES_SUCCESS, 
    MOVIE_FAILURE, 
    MOVIE_REQUEST 
} from "./ActionTypes";

const initialState = {
    movies: [],
    isLoading: false,
    isError: false,
    movie: null, // To store individual movie data
};

export const movieReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case MOVIE_REQUEST:
            return { ...state, isLoading: true, isError: false };

        case MOVIE_FAILURE:
            return { ...state, isLoading: false, isError: true };

        case CREATE_MOVIE_SUCCESS:
            return { ...state, isLoading: false, movies: [...state.movies, payload] };

        case GET_MOVIE_SUCCESS:
            return { ...state, isLoading: false, movie: payload };

        case GET_MOVIES_BY_IDS_SUCCESS:
            return { ...state, isLoading: false, movies: payload };

        case GET_ALL_MOVIES_SUCCESS:
            return { ...state, isLoading: false, movies: payload };

        default:
            return state;
    }
};
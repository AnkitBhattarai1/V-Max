import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { Reducer as authReducer } from "./Auth/Reducer";
import { movieReducer } from "./MovieReducer/Reducer";
import { videoReducer } from "./VideoReducer/Reducer";

// NEW: Import your new reducers
import { seriesReducer } from "./SeriesReducer/Reducer";
import { seasonReducer } from "./SeasonReducer/Reducer";
import { episodeReducer } from "./EpisodeReducer/Reducer";

import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  authReducer,
  movieReducer,
  videoReducer,

  // NEW: Add these
  seriesReducer,
  seasonReducer,
  episodeReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

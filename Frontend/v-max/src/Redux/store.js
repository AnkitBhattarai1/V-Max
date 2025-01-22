import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import { Reducer as authReducer } from "./Auth/Reducer"
import { movieReducer as movieReducer } from "./MovieReducer/Reducer"
import { videoReducer as videoReducer} from "./VideoReducer/Reducer"

import {thunk} from "redux-thunk"

const rootReducer = combineReducers({authReducer, movieReducer,videoReducer})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))


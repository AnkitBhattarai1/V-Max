import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import { Reducer as authReducer } from "./Auth/Reducer"
import { Reducer as productReducer } from "./MovieReducer/Reducer"
import {thunk} from "redux-thunk"

const rootReducer = combineReducers({authReducer, productReducer})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))


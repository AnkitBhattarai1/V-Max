import { GET_PRODUCT_SUCCESS, PATCH_PRODUCT_SUCCESS, POST_PRODUCT_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST } from "./ActionTypes"

const initialState={
    movies:[],
    isLoading:false,
    isError:false
}


export const Reducer = (state = initialState,{type,payload}) => {
  switch(type){
    case PRODUCT_REQUEST:{
      return {...state, isLoading:true}
    }
    case PRODUCT_FAILURE:{
      return {...state, isError:true, isLoading:false}
    }
    case POST_PRODUCT_SUCCESS:{
      return {...state, isError:false, isLoading:false,  movies:[...state.movies, payload]}
    }
    case GET_PRODUCT_SUCCESS:{
      return {...state, isError:false, isLoading:false, movies:payload}
    }
    case PATCH_PRODUCT_SUCCESS:
      return {...state, isLoading:false, }
    default : return state

  }
}

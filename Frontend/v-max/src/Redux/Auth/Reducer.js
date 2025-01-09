import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, MYSPACE_UPDATE, POST_SIGN_SUCCESS, } from "./ActionTypes"

const initialState={
    users:[],
    Account_info:[],
    UserId:"",
    Name:"",
    isAuth:false,
    token:"",
    isLoading:false,
    isError:false
}

export const Reducer =(state=initialState,{type,payload,UserId,Account_info,Name})=>{
    switch(type){
        case LOGIN_REQUEST:{
            return {...state, isLoading:true}
        }

        case LOGIN_SUCCESS:{
           
            return {...state, isLoading:false, isAuth:true, token :payload, Name:Name, isError:false, UserId:UserId, Account_info:Account_info}
            
        }
        case MYSPACE_UPDATE:{
            return {...state,Account_info:payload}
        }
        case LOGOUT_SUCCESS:{
            return {...state, isLoading:false, isAuth:false, token :localStorage.removeItem('accessToken'), isError:false}
        }
        case POST_SIGN_SUCCESS:{
            return {...state, isError:false, isLoading:false,  users:[...state.users, payload]}
          }
        case LOGIN_FAILURE:{
            return {...state, isError:true, errorMessage:payload,isLoading:false}
        }
        default : return state
    }
}


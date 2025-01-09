import axios from "axios"
import { DELETE_PRODUCT_SUCCESS, GET_PRODUCT_SUCCESS, PATCH_PRODUCT_SUCCESS, POST_PRODUCT_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST } from "./ActionTypes"

export const getMovies = (obj)=>(dispatch)=>{
    dispatch({type:PRODUCT_REQUEST})
    axios.get(`https://movies-data-fdb6.onrender.com/movies/movie`,obj)
    .then((res)=>{
        dispatch({type:GET_PRODUCT_SUCCESS, payload :res.data})
    })
    .catch((err)=>{
        dispatch({type:PRODUCT_FAILURE})
    })
}


// //Edit the product on page patch request
export const editProduct =({_id, data})=> (dispatch)=>{
    console.log(data )
    dispatch({type:PRODUCT_REQUEST})
    axios.patch(`https://movies-data-fdb6.onrender.com/movies/movie/${_id}`, data)
    .then((res)=>{
        console.log(res)
       dispatch({type:PATCH_PRODUCT_SUCCESS})

    })
    .catch((err)=>{
        dispatch({type:PRODUCT_FAILURE})
    })

}

//addMovie
export const addMovie =(movieData)=> (dispatch)=>{
    console.log(movieData )
    dispatch({type:PRODUCT_REQUEST})
    axios.post(`https://movies-data-fdb6.onrender.com/movies/movie`, movieData)
    .then((res)=>{
        console.log(res)
       dispatch({type:POST_PRODUCT_SUCCESS})

    })
    .catch((err)=>{
        dispatch({type:PRODUCT_FAILURE})
    })

}


export const deleteMovie =(_id)=> (dispatch)=>{
    dispatch({type:PRODUCT_REQUEST})
    axios.delete(`https://movies-data-fdb6.onrender.com/movies/movie/${_id}`)
    .then((res)=>{
        console.log(res)
       dispatch({type:DELETE_PRODUCT_SUCCESS})

    })
    .catch((err)=>{
        dispatch({type:PRODUCT_FAILURE})
    })

}



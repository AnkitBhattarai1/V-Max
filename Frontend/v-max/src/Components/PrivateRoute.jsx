import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export const PrivateRoute = ({children}) => {
   const auth=useSelector((store)=>store.authReducer.isAuth)
   const location=useLocation()

   console.log(location)

   
  return auth ? children : <Navigate state={location.pathname} to={'/Login'}/>
}

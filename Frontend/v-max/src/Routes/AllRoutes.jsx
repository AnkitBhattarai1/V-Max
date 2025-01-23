import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../Pages/Home'
import { SignUp } from '../Pages/SignUp'
import { Login } from '../Pages/Login'
import { Admin } from '../Pages/Admin'
import { AdminPage } from '../Pages/AdminPage'
import {VideoUpload} from '../Pages/VideoUpload'
import { VideoPlayerPage } from '../Pages/VideoPlayerPage'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <Home/>} ></Route>
        <Route path="/Login" element={<Login/>} ></Route>
        <Route path="/SignUp" element={<SignUp/>} ></Route>
        <Route path="/Admin" element={<Admin/>} ></Route>
        <Route path="/AdminPage" element={<AdminPage/>} ></Route>
        <Route path="/videoUpload" element={<VideoUpload/>}></Route>
        <Route path="/video" element ={<VideoPlayerPage/>}></Route>

      </Routes>
  )
}

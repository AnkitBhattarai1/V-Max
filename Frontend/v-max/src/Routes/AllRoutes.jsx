import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MySpace } from '../Pages/MySpace'
import { Explore } from '../Pages/Explore'
import { Home } from '../Pages/Home'
import { Shows } from '../Pages/Shows'
import { Movies } from '../Pages/Movies'
import { Categories } from '../Pages/Categories'
import { SignUp } from '../Pages/SignUp'
import { MovieSinglePage } from '../Pages/MovieSinglePage'
import { Login } from '../Pages/Login'
import { PrivateRoute } from '../Components/PrivateRoute'
import { Admin } from '../Pages/Admin'
import { AdminPage } from '../Pages/AdminPage'
import { EditMovie } from '../Pages/EditMovie'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <Home/>} ></Route>
        <Route path="/Private" element={<MySpace/>} ></Route>
        <Route path="/Login" element={<Login/>} ></Route>
        <Route path="/SignUp" element={<SignUp/>} ></Route>
        <Route path="/Admin" element={<Admin/>} ></Route>
        <Route path="/explore" element={<Explore/>} ></Route>
        <Route path="/AdminPage" element={<AdminPage/>} ></Route>
        <Route path="/shows" element={<Shows/>} ></Route>
        <Route path="/movies" element={<Movies/>} ></Route>
        <Route path="/movie/:_id" element={<PrivateRoute><MovieSinglePage/></PrivateRoute>} ></Route>
        <Route path="/editmovie/:_id" element={<EditMovie/>} ></Route>
        <Route path="/categories" element={<Categories/>} ></Route>
    </Routes>
  )
}

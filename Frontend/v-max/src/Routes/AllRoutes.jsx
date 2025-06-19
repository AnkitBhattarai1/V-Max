import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../Pages/Home';
import { SignUp } from '../Pages/SignUp';
import { Login } from '../Pages/Login';
import { Admin } from '../Pages/Admin';
import { AdminPage } from '../Pages/AdminPage';
import { VideoUpload } from '../Pages/VideoUpload';
import { VideoPlayerPage } from '../Pages/VideoPlayerPage';
import { Movie } from '../Pages/Movie';
import { Shows } from '../Pages/Shows';
import { Season } from '../Pages/Season';
import { Episode } from '../Pages/Episode';
import {Category} from '../Pages/category';
import {Initialpage} from '../Pages/Initialpage';


export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Initialpage/>}/>
      <Route path="/Home" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/AdminPage" element={<AdminPage />} />
      <Route path="/videoUpload" element={<VideoUpload />} />
      <Route path="/video" element={<VideoPlayerPage />} />
      <Route path="/movie" element={<Movie />} />
       <Route path="/Category" element={<Category />} />
      
      {/* SHOWS NESTED ROUTES */}
      <Route path="/shows" element={<Shows />}>
        <Route path=":seriesId" element={<Season />} />
        <Route path=":seriesId/:seasonId" element={<Episode />} />
      </Route>
    </Routes>
  );
};

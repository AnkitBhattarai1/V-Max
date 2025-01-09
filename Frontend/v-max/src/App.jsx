import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Pages/Navbar'
import { AllRoutes } from './Routes/AllRoutes'
import Navbar2 from './Pages/Navbar2'


function App() {


  return (
    <>
    <Navbar/>
    {/* <Navbar2/> */}
    <AllRoutes/>
    
    </>
  )
}

export default App

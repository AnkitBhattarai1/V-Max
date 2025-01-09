import { Box, Center, Heading, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../Redux/MovieReducer/Action'
import { MoviesCard } from '../Components/MoviesCard'
import "./Navbar.css"
import Logo from "../Imges/PLY.png"
import plyvideo from "../Imges/Home3.mp4"
import Postermovie from "../Imges/MoviePosterscreen.png"

export const Shows = () => {
  const dispatch=useDispatch()
  const Movies=useSelector((store)=> store.productReducer.movies)
  useEffect(()=>{
    dispatch(getMovies())
  },[])

  return (
    <Box as="main"  height="auto" w={"100%"} paddingLeft={"13%"} id='mainDiv'  bg={useColorModeValue('#000014', 'gray.800')}>
       <Box >
        <div id='Heading'>
        <h1 >Welcome !</h1>
        <img  src={Logo} alt="" />
        </div>
       
        <video
           style={{ width: "100%", maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))" }}
           loop
           playsInline
           autoPlay
          muted   // Add the muted attribute to enable autoplay on mobile devices
           poster={Postermovie}
         >
           <source
            src={plyvideo}
             type="video/mp4"
           />
        </video> 
      </Box>
    <Box className='Movies'>
   {
     Movies.length>0 && Movies.map((e)=>{
       return <MoviesCard  key={e.id} {...e}/>
     }  )
   }
   </Box>
 </Box>
  )
}

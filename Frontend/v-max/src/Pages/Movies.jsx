import { Box, Center, CircularProgress, Heading, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../Redux/MovieReducer/Action'
import { MoviesCard } from '../Components/MoviesCard'
import plyvideo from "../Imges/Home1.mp4"
import Postermovie from "../Imges/MoviePosterscreen.png"
import './Movie.css'
import "./Navbar.css"
import Logo from "../Imges/PLY.png"


export const Movies = () => {
  const dispatch=useDispatch()
  const Movies=useSelector((store)=> store.productReducer.movies)
  const isLoading=useSelector((store)=> store.productReducer.isLoading)


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
        isLoading ? <Box as="main"  height="700px" w={"100%"} paddingLeft={"500px"} mt={"200px"} bg={useColorModeValue('black', 'gray.800')} ><CircularProgress isIndeterminate color='blue.300' /><Text fontSize={"xx-large"} color={"gray"} ml={"-20px"}>Loading...</Text></Box> :Movies.length>0 && Movies?.map((e)=>{
          return <MoviesCard  key={e.id} {...e}/>
        }  )  

        
      }
      </Box>
    </Box>
  )
}

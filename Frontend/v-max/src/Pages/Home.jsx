
import { Box, Center, CircularProgress, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../Redux/MovieReducer/Action'
import { MoviesCard } from '../Components/MoviesCard'
import plyvideo from "../Imges/Home.mp4"
import Postermovie from "../Imges/MoviePosterscreen.png"
import "./Navbar.css"
import Logo from "../Imges/PLY.png"

export const Home = () => {
  const [data,setData]=useState([])
  const dispatch=useDispatch()
  const Movies=useSelector((store)=> store.productReducer.movies)
  const isLoading=useSelector((store)=> store.productReducer.isLoading)
  
  const videoId = new URL("https://www.youtube.com/embed/tABlzTH8G9o?si=frgn1yoLc3W6RwJS").searchParams.get("v");

console.log(videoId)


  useEffect(()=>{
    dispatch(getMovies())
  },[])

  console.log(Movies)


  return (
    <Box as="main"  height="auto" w={"100%"} paddingLeft={"13%"} id='mainDiv'     bg={useColorModeValue('#000014', 'gray.800')} >
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
         <Box   className='Movies'> 
         {

           isLoading ?  <Box  as="main"  minHeight="500px" w={"100%"} paddingLeft={"500px"} mt={"80px"} bg={useColorModeValue('#000014', '#000014')} ><CircularProgress isIndeterminate color='blue.300' /><Text fontSize={"xx-large"} color={"gray"} ml={"-20px"}>Loading...</Text></Box> : Movies.length>0 && Movies?.map((e)=>{
            return <MoviesCard  key={e.id} {...e}/>
          }  ) 

           
          } 
          

         {/* //Cards Render */}
        </Box> 
    </Box>
         
  )
}

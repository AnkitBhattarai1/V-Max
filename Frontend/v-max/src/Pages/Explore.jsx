import { Box, InputGroup, InputLeftElement, Input, useColorModeValue, CircularProgress, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { CiAirportSign1, CiSearch } from "react-icons/ci"
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../Redux/MovieReducer/Action'
import { MoviesCard } from '../Components/MoviesCard'
import { useSearchParams } from 'react-router-dom'

export const Explore = () => {
  const dispatch=useDispatch()
  const Movies=useSelector((store)=> store.productReducer.movies)
  const [searchParms]=useSearchParams()
  const [query,setQuery]=useState("")
  const [Search, setSearch] = useState("");
  const isLoading=useSelector((store)=> store.productReducer.isLoading)

  // useEffect(()=>{
  //   dispatch(getMovies())
  // },[])

  let ref=useRef()


  //Search Results 
  const parmobj={
    params:{
      q:query && query,

    }
  }

  useEffect(()=>{
    if(ref.current){
      clearTimeout(ref.current)
    }
    ref.current=setTimeout(()=>{
      dispatch(getMovies(parmobj))
      },1000)

  },[query])

  const handleChange=(value)=>{
   setSearch(value)
  }

  const filtredData=Movies.filter((e)=> e.Title.toLowerCase().includes(Search.toLowerCase()))


  return (
    <Box as="main"  minH="1000px" w={"100%"} paddingLeft={"13%"}  bg={useColorModeValue('#000014', 'gray.800')}  >
      <Box >
         <InputGroup>
    <InputLeftElement pointerEvents='none'  mt="25px" >
   {/* <Box > <CiSearch  display={{ base: 'none', md: 'unset' }} style={{color:"white", fontSize:"30px", marginLeft:"125px"}} /></Box> */}
    </InputLeftElement>
    <Input background="gray.800" w="75%" height="50px" color="white" ml="5%" type='text' placeholder='Movies, shows and more' mt="20px" onChange={(e)=>handleChange(e.target.value)} />
  </InputGroup>
    </Box>
    <Box className='Movies'> 
         {
          isLoading ? <Box  as="main"  minHeight="500px" w={"100%"} paddingLeft={"500px"} mt={"80px"} bg={useColorModeValue('black', 'gray.800')} ><CircularProgress isIndeterminate color='blue.300' /><Text fontSize={"xx-large"} color={"gray"} ml={"-20px"}>Loading...</Text></Box> :
        filtredData.length>0 && filtredData.map((e)=>{
          return <MoviesCard  key={e.id} {...e}/>
        }  )
      } 

         {/* //Cards Render */}
         </Box> 
    </Box>
  )
}
// (e)=>setQuery(e.target.value)
import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import './MoviesCard.css'

export const MoviesCard = ({_id,Average_Rating,Description,Poster_Image,Release_Date,Runtime,Title,Trailer_URL}) => {
  return (
    <Box className='movie_Card' key={_id}>
        <img width={"100%"} height={"100px"}  className="zoom-image" src={Poster_Image} alt="" />
      <Box className='details'>
          <h4 >{Title}</h4>
          <p >RunTime:{Runtime}</p>
          <p >{Description}</p>
          <div id='moviebtn'>
          <Link to={`/movie/${_id}`}>
           <Button  colorScheme='gray'   >
    Watch Now
  </Button></Link>
  {/* <Button colorScheme='black' >
   +
  </Button> */}
          </div>
         
      </Box>
    </Box>
  )
}

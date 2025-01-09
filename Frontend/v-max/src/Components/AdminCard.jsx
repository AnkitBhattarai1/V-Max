import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import './MoviesCard.css'
import { deleteMovie } from '../Redux/MovieReducer/Action'
import { useDispatch } from 'react-redux'

export const AdminCard = ({_id,Average_Rating,Description,Poster_Image,Release_Date,Runtime,Title,Trailer_URL}) => {
  const dispatch = useDispatch();

    //from action.js
    const handleDelete=()=>{
      console.log("IAM DELETE Button")
      dispatch(deleteMovie(_id))

    }


  return (
    <Box className='movie_Card' key={_id}>
        <img width={"100%"} height={"100px"}  className="zoom-image" src={Poster_Image} alt="" />
      <Box className='details'>
          <h4 >{Title}</h4>
          <p >RunTime:{Runtime}</p>
          <p >{Description}</p>
          <div id='moviebtn'>
          <Link to={`/editmovie/${_id}`}>
           <Button  colorScheme='gray'   >
   Edit
  </Button></Link>
  
           <Button  colorScheme='gray' onClick={handleDelete}   >
    Delete
  </Button>
  {/* <Button colorScheme='black' >
   +
  </Button> */}
          </div>
          
         
      </Box>
    </Box>
  )
}

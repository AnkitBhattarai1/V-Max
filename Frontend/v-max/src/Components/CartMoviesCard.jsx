import { Box, Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './MoviesCard.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMovieCard } from '../Redux/Auth/Action'
import { getMovies } from '../Redux/MovieReducer/Action'
import { useEffect } from 'react'
import { MYSPACE_UPDATE } from '../Redux/Auth/ActionTypes'


export const CartMoviesCard = ({_id,Average_Rating,Description,Poster_Image,Release_Date,Runtime,Title,Trailer_URL}) => {
  console.log("Description", Description)
  const Account_info = useSelector((store) => store.authReducer.Account_info)
  const movies = useSelector((store) => store.productReducer.movies);
  const dispatch = useDispatch();
  const toast = useToast()
    
 
    const UserId = useSelector((store) => store.authReducer.UserId);
    console.log("userId", UserId)
    



   const handleRemove= async ()=>{
   
  
    console.log("Movie ID:", _id);


    try {
        const response = await fetch(`https://movies-data-fdb6.onrender.com/users/movie/${_id}/remove-from-my-space`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${yourAuthToken}`, // Uncomment and add your auth token if required
            },
            body: JSON.stringify({ accountId: `${UserId}` }) // Replace with actual account ID
        });

        if (response.ok) {
            const result = await response.json();
            let filteredMovies=Account_info.filter((movie)=> movie !==_id)
            dispatch({type:MYSPACE_UPDATE, payload:filteredMovies})
            console.log('Successfully removed from My Space:', result);
        } else {
            console.error('Failed to remove from My Space');
        }
    } catch (error) {
        console.error('Error:', error);
    }
    
    toast({
      title: `Movie Removed from My space Successfully`,
      position: "top",
      isClosable: true,
    })

   }

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
        Watch 
      </Button></Link>
      <Button  colorScheme='gray' onClick={handleRemove}   >
    Remove
  </Button>
              </div>
             
          </Box>
        </Box>
      )
}

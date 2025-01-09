import { Box, Button, CircularProgress, Image, Input, Stack, Text, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, getMovies } from '../Redux/MovieReducer/Action';
import { AdminCard } from '../Components/AdminCard';

export const AdminPage = () => {
  const [movieData, setMovieData] = useState({
    MovieID: '',
    Title: '',
    Release_Date: '',
    Description: '',
    Poster_Image: '',
    Average_Rating: '',
    Trailer_URL: '',
    Runtime: ''
  });

  const dispatch = useDispatch();
  const Movies = useSelector((store) => store.productReducer.movies);
  const isLoading = useSelector((store) => store.productReducer.isLoading);
  const toast = useToast()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: name=="MovieID"? +value : value });
  };

  const handleAddMovie = () => {
    // Normally, you would dispatch the addMovie action here.
    dispatch(addMovie(movieData));
    toast({
      title: `Movie Added Successfully`,
      position: "top",
      isClosable: true,
    })
    dispatch(getMovies())
    setMovieData({
      MovieID: '',
      Title: '',
      Release_Date: '',
      Description: '',
      Poster_Image: '',
      Average_Rating: '',
      Trailer_URL: '',
      Runtime: ''
    });
  };

  return (
    <Box as="main" w={"98.5vw"} paddingLeft={"13%"} height={"auto"} id='mainDiv' bg={useColorModeValue('#000014', 'gray.800')}>
      <Text fontSize={"xxx-large"} color={"gray"} paddingLeft={"30%"}>Total number of Movies: {Movies.length}</Text>
      
      <Stack direction="row" spacing={10} align="flex-start">
        {/* Left Side: Input Form */}
        <Box  width="40%">
          <VStack spacing={4} align="start" p={4}  bg={useColorModeValue('#000014', 'gray.800')} border={"1px solid gray"} borderRadius="md" boxShadow="md" >
          <Text fontSize="sm" fontWeight="bold" mb={4} color="teal.200">Enter Movie Details:</Text>
            <Input placeholder="Movie ID" name="MovieID" value={movieData.MovieID} onChange={handleChange} />
            <Input placeholder="Title" name="Title" value={movieData.Title} onChange={handleChange} />
            <Input placeholder="Release Date" name="Release_Date" value={movieData.Release_Date} onChange={handleChange} />
            <Input placeholder="Description" name="Description" value={movieData.Description} onChange={handleChange} />
            <Input placeholder="Poster Image URL" name="Poster_Image" value={movieData.Poster_Image} onChange={handleChange} />
            <Input placeholder="Average Rating" name="Average_Rating" value={movieData.Average_Rating} onChange={handleChange} />
            <Input placeholder="Trailer URL" name="Trailer_URL" value={movieData.Trailer_URL} onChange={handleChange} />
            <Input placeholder="Runtime" name="Runtime" value={movieData.Runtime} onChange={handleChange} />
            <Button colorScheme="blue" onClick={handleAddMovie}>Add Movie</Button>
          </VStack>
        </Box>

        {/* Right Side: Displaying Entered Data */}
        <Box p={5}  bg={useColorModeValue('#000014', 'gray.800')} border={"1px solid gray"} borderRadius="md" boxShadow="md" width="50%">
          <Text fontSize="sm" fontWeight="bold" mb={4} color="teal.200">Entered Movie Details:</Text>
          <Text color="gray.200"><strong>Movie ID:</strong> {movieData.MovieID}</Text>
          <Text color="gray.200"><strong>Title:</strong> {movieData.Title}</Text>
          <Text color="gray.200"><strong>Release Date:</strong> {movieData.Release_Date}</Text>
          <Text color="gray.200"><strong>Description:</strong> {movieData.Description}</Text>
          <Text color="gray.200"><strong>Poster Image URL:</strong></Text>
          <Image boxSize='300px' src={movieData.Poster_Image} alt='Movie-image here...' onChange={handleChange} />
          <Text color="gray.200"><strong>Average Rating:</strong> {movieData.Average_Rating}</Text>
          <Text color="gray.200"><strong>Trailer URL:</strong> {movieData.Trailer_URL}</Text>
          <Text color="gray.200"><strong>Runtime:</strong> {movieData.Runtime}</Text>
        </Box>
      </Stack>

      {/* Existing Movies Rendering */}
      <Box className='Movies' mt={10}>
        {isLoading ? (
          <Box as="main" minHeight="500px" w={"100%"} paddingLeft={"500px"} mt={"80px"} bg={useColorModeValue('#000014', '#000014')}>
            <CircularProgress isIndeterminate color='blue.300' />
          </Box>
        ) : (
          Movies.length > 0 && Movies.map((e) => <AdminCard key={e.id} {...e} />)
        )}
      </Box>
    </Box>
  );
};

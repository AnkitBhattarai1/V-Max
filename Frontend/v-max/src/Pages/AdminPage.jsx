
import { Box, Button, CircularProgress, Input, Stack, Text, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addmovie, fetchallmovies } from '../Redux/MovieReducer/Action';
import { AdminCard } from '../Components/AdminCard';
import { getVideo } from '../Redux/VideoReducer/Action';  // To fetch video details
import Logo from "../Imges/PLY.png";
import Postermovie from "../Imges/MoviePosterscreen.png";  // Placeholder for poster image
import plyvideo from "../Imges/Home.mp4"; // Video source for the background

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
  const Movies = useSelector((store) => store.movieReducer.movies);
  const isLoading = useSelector((store) => store.movieReducer.isLoading);
  const videos = useSelector((store) => store.videoReducer.videos);

  const toast = useToast();
  
  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: name === "MovieID" ? +value : value });
  };

  // Add new movie
  const handleAddMovie = () => {
    dispatch(addmovie(movieData));
    toast({
      title: `Movie Added Successfully`,
      position: "top",
      isClosable: true,
    });
    dispatch(fetchallmovies());
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

  // Fetch videos based on movie IDs when the movies list is populated
  useEffect(() => {
    if (Movies && Movies.length > 0) {
      Movies.forEach((movie) => {
        dispatch(getVideo(movie.videoId));  // Fetching video details based on movie ID
      });
    }
  }, [Movies, dispatch]);

  return (
    <Box as="main" w={"100%"} height="auto" paddingLeft={"13%"} bg={useColorModeValue("#000014", "gray.800")}>
      <Box id="Heading" textAlign="center" mb={6}>
        <h1>Admin Panel</h1>
        <img src={Logo} alt="PLY Logo" width={200} />
      </Box>

      {/* Background Video Section */}
      <video 
        style={{ width: "100%", maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))" }}
        loop 
        autoPlay 
        muted 
        playsInline
        poster={Postermovie}
      >
        <source src={plyvideo} type="video/mp4" />
      </video>

      <Stack direction="row" spacing={10} align="flex-start" mb={10}>
        {/* Left Side: Movie Input Form */}
        <Box width="40%">
          <VStack spacing={4} align="start" p={4} bg={useColorModeValue('#000014', 'gray.800')} border={"1px solid gray"} borderRadius="md" boxShadow="md">
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

        {/* Right Side: Displaying Entered Movie Data */}
        <Box p={5} bg={useColorModeValue('#000014', 'gray.800')} border={"1px solid gray"} borderRadius="md" boxShadow="md" width="50%">
          <Text fontSize="sm" fontWeight="bold" mb={4} color="teal.200">Entered Movie Details:</Text>
          <Text color="gray.200"><strong>Movie ID:</strong> {movieData.MovieID}</Text>
          <Text color="gray.200"><strong>Title:</strong> {movieData.Title}</Text>
          <Text color="gray.200"><strong>Release Date:</strong> {movieData.Release_Date}</Text>
          <Text color="gray.200"><strong>Description:</strong> {movieData.Description}</Text>
          <Text color="gray.200"><strong>Poster Image URL:</strong></Text>
          <Image boxSize='300px' src={movieData.Poster_Image} alt='Movie Image' />
          <Text color="gray.200"><strong>Average Rating:</strong> {movieData.Average_Rating}</Text>
          <Text color="gray.200"><strong>Trailer URL:</strong> {movieData.Trailer_URL}</Text>
          <Text color="gray.200"><strong>Runtime:</strong> {movieData.Runtime}</Text>
        </Box>
      </Stack>

      {/* Existing Movies Rendering */}
      <Box className='Movies' mt={10}>
        {isLoading ? (
          <Box minHeight="500px" w={"100%"} paddingLeft={"500px"} mt={"80px"} bg={useColorModeValue('#000014', '#000014')}>
            <CircularProgress isIndeterminate color='blue.300' />
            <Text fontSize="xx-large" color={"gray"} ml={"-20px"}>Loading...</Text>
          </Box>
        ) : (
          videos.length > 0 ? (
            videos.map((movie) => <AdminCard key={movie.id} {...movie} />)
          ) : (
            <Text fontSize="xl" color="gray.300" textAlign="center">No movies available.</Text>
          )
        )}
      </Box>
    </Box>
  );
};

import { Box, Button, CircularProgress, Input, Stack, Text, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

import { createVideo } from '../Services/VideoService';

import { createmovie } from '../Services/MovieService';

import { useDispatch, useSelector } from 'react-redux';

export const VideoUpload = () => {
  const [movieData, setMovieData] = useState({
    Title: '',
    Release_Date: '',
    Description: '',
    Runtime: '',
  });

  const dispatch = useDispatch();

  // Accessing movies and loading state from Redux store
  const movies = useSelector((store) => store.movieReducer.movies); // Ensure the reducer is named correctly
  const isLoading = useSelector((store) => store.movieReducer.isLoading);
  const videos = useSelector((store) => store.videoReducer.videos);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Runtime" && !/^\d*$/.test(value)) {
      return; // Prevent non-numeric input
    }

    setMovieData({ ...movieData, [name]: value });
  };

  const handleDateChange = (e) => {
    let value = e.target.value;

    // Remove slashes to simplify formatting
    value = value.replace(/\//g, '');

    // Add slashes dynamically based on length
    let formattedDate = '';
    if (value.length > 0) {
      formattedDate += value.substring(0, 2); // Day
    }
    if (value.length > 2) {
      formattedDate += '/' + value.substring(2, 4); // Month
    }
    if (value.length > 4) {
      formattedDate += '/' + value.substring(4, 8); // Year
    }

    // Update state with the formatted value
    setMovieData({ ...movieData, Release_Date: formattedDate });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'video') {
      setSelectedVideo(file);
      toast({ title: `Video selected: ${file.name}`, status: "info", duration: 3000, isClosable: true });
    } else if (type === 'image') {
      setSelectedImage(file);
      toast({ title: `Image selected: ${file.name}`, status: "info", duration: 3000, isClosable: true });
    }
  };

  const handleSubmit = async () => {
    if (!selectedVideo || !selectedImage) {
      toast({ title: "Please select both a video and an image.", status: "error", duration: 3000, isClosable: true });
      return;
    }

    const formData = new FormData();
    formData.append("request", new Blob([JSON.stringify({
      title: movieData.Title,
      description: movieData.Description,
      trailerUrl: "", // Add if applicable
      releaseDate: movieData.Release_Date,
      duration: movieData.Runtime,
      videoType: "MOVIE", // Example, update if needed
      ageRating: "PG-13", // Example, update if needed
      language: "English", // Example, update if needed
      metadata: "{}" // Example, update if needed
    })], { type: "application/json" }));
    formData.append("video", selectedVideo);
    formData.append("thumbnail", selectedImage);

    setIsSubmitting(true);

    const videoResponse = await createVideo(formData);
    const videoId = videoResponse.id;
    console.log(videoResponse);

    const moviePayload = {
      Video_id: videoId,
      director: "Director Name",
      cast: "Actor1, Actor2",
      metaData: "Some metadata",
      genres: ["Action", "Comedy"], // Example genres
    };

    const movieResponse = await createmovie(moviePayload);
  };

  return (
    <Box as="main" w={"98.5vw"} paddingLeft={"13%"} height={"800px"} bg={useColorModeValue('#000014', 'gray.800')}>
      <Stack direction="row" spacing={10} align="flex-start">
        {/* Left side for movie details input */}
        <Box width="40%">
          <VStack spacing={4} align="start" p={4} bg={useColorModeValue('#000014', 'gray.800')} border="1px solid gray" borderRadius="md" boxShadow="md">
            <Text fontSize="sm" fontWeight="bold" mb={4} color="teal.200">Enter Movie Details:</Text>
            <Input color="teal.300" placeholder="Title" name="Title" value={movieData.Title} onChange={handleChange} />
            <Input color="teal.300" placeholder="Release Date (DD/MM/YYYY)" name="Release_Date" value={movieData.Release_Date} onChange={handleDateChange} />
            <Input color="teal.300" placeholder="Description" name="Description" value={movieData.Description} onChange={handleChange} />
            <Input color="teal.300" placeholder="Runtime (mins)" name="Runtime" value={movieData.Runtime} onChange={handleChange} />

            <Box w="100%">
              <Text color="teal.200" fontSize="sm" fontWeight="bold">Upload Poster Image:</Text>
              <Input type="file" accept="image/*" hidden id="image-upload" onChange={(e) => handleFileChange(e, 'image')} />
              <Button colorScheme="teal" onClick={() => document.getElementById("image-upload").click()} mt={2}>Choose Poster Image</Button>
            </Box>

            <Box w="100%" mt={4}>
              <Text color="teal.200" fontSize="sm" fontWeight="bold">Upload Video:</Text>
              <Input type="file" accept="video/*" hidden id="video-upload" onChange={(e) => handleFileChange(e, 'video')} />
              <Button colorScheme="teal" onClick={() => document.getElementById("video-upload").click()} mt={2}>Choose Video File</Button>
            </Box>

            <Button colorScheme="blue" onClick={handleSubmit} isLoading={isSubmitting}>Add Movie</Button>
          </VStack>
        </Box>

        {/* Right side for displaying entered movie details */}
        <Box width="40%" p={10} bg={useColorModeValue('#000014', 'gray.800')} border="1px solid gray" borderRadius="md" boxShadow="md">
          <Text fontSize="sm" fontWeight="bold" mb={7} color="teal.200">Entered Movie Details:</Text>
          <VStack spacing={4} align="start">
            <Text fontSize="md" color="teal.200"><strong>Title:</strong> {movieData.Title}</Text>
            <Text fontSize="md" color="teal.200"><strong>Release Date:</strong> {movieData.Release_Date}</Text>
            <Text fontSize="md" color="teal.200"><strong>Description:</strong> {movieData.Description}</Text>
            <Text fontSize="md" color="teal.200"><strong>Runtime:</strong> {movieData.Runtime} mins</Text>
            <Text color="teal.200"><strong>Poster Image:</strong> {selectedImage ? selectedImage.name : "None"}</Text>
            <Text color="teal.200"><strong>Selected Video:</strong> {selectedVideo ? selectedVideo.name : "None"}</Text>
          </VStack>
        </Box>
      </Stack>
    </Box>
  );
};

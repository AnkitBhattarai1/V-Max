
import { Box, Button, CircularProgress, Input, Stack, Text, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { createVideo } from '../Services/MovieServices';

export const VideoUpload = () => {
  const [movieData, setMovieData] = useState({
    Title: '',
    Release_Date: 'DD-MM-YYYY',
    Description: '',
    Runtime: '',
  });

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
    setMovieData({ ...movieData, Release_Date: value });
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
/*
    try {
      const response = await axios.post("/video/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast({ title: "Movie uploaded successfully!", status: "success", duration: 3000, isClosable: true });
      setMovieData({ Title: '', Release_Date: 'DD/MM/YYYY', Description: '', Runtime: '' });
      setSelectedVideo(null);
      setSelectedImage(null);
    } catch (error) {
      toast({ title: "Error uploading movie. Please try again.", status: "error", duration: 3000, isClosable: true });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  */
          const response = await createVideo(formData);
  };

  return (
    <Box as="main" w={"98.5vw"} paddingLeft={"13%"} height={"auto"} bg={useColorModeValue('#000014', 'gray.800')}>
      <Stack direction="row" spacing={10} align="flex-start">
        <Box width="40%">
          <VStack spacing={4} align="start" p={4} bg={useColorModeValue('#000014', 'gray.800')} border="1px solid gray" borderRadius="md" boxShadow="md">
            <Text fontSize="sm" fontWeight="bold" mb={4} color="teal.200">Enter Movie Details:</Text>
            <Input placeholder="Title" name="Title" value={movieData.Title} onChange={handleChange} />
            <Input placeholder="Release Date (DD/MM/YYYY)" name="Release_Date" value={movieData.Release_Date} onChange={handleDateChange} />
            <Input placeholder="Description" name="Description" value={movieData.Description} onChange={handleChange} />
            <Input placeholder="Runtime (mins)" name="Runtime" value={movieData.Runtime} onChange={handleChange} />

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
      </Stack>
    </Box>
  );
};

import React, { useEffect, useState } from "react";
import { Box, Heading, Text, SimpleGrid, CircularProgress, Center } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchallmovies } from "../Redux/MovieReducer/Action";
import { getVideo } from "../Redux/VideoReducer/Action";
import { VideoCard } from "../Components/VideoCard"; // Adjusted to use video prop directly
import { TopNavbar } from "./topnavbar";
import "./Category.css";

export const Category = () => {
  const { categoryName } = useParams(); // Extract categoryName from URL params
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movieReducer.movies);
  const videosMap = useSelector((store) => store.videoReducer.videos);
  const isLoading = useSelector((store) => store.movieReducer.isLoading);
  const [categoryVideos, setCategoryVideos] = useState([]);

  useEffect(() => {
    dispatch(fetchallmovies());
  }, [dispatch]);

  useEffect(() => {
    if (movies && movies.length > 0) {
      movies.forEach((movie) => {
        if (movie.videoId) {
          dispatch(getVideo(movie.videoId));
        }
      });
    }
  }, [dispatch, movies]);

  useEffect(() => {
    // Filtering movies by category
    const filteredVideos = movies
      .filter((movie) => {
        const movieGenres = movie.genres || []; // Default to empty array if genres is undefined
        if (categoryName && movieGenres.length > 0) {
          return movieGenres.some((genre) =>
            genre.toLowerCase().includes(categoryName.toLowerCase())
          );
        }
        return false;
      })
      .map((movie) => {
        const video = videosMap[movie.videoId] || {};
        return {
          id: movie.videoId,
          title: video.title || "Untitled",
          thumbnailUrl: video.thumbnailUrl || "https://via.placeholder.com/300x170?text=No+Thumbnail",
        };
      });

    setCategoryVideos(filteredVideos);
  }, [movies, videosMap, categoryName]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <CircularProgress isIndeterminate color="green.400" />
      </Center>
    );
  }

  return (
    <>
      <TopNavbar />
      <Box pt="70px" p={4} className="category-container">
        <Heading mb={4} color="teal.300">
          Category: {categoryName}
        </Heading>
        {categoryVideos.length === 0 ? (
          <Text>No videos found in this category.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {categoryVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
};

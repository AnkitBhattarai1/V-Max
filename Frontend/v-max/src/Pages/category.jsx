import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  CircularProgress,
  Center,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallmovies } from "../Redux/MovieReducer/Action";
import { getVideo } from "../Redux/VideoReducer/Action";
import { VideoCard } from "../Components/VideoCard";
import { TopNavbar } from "./topnavbar";
import "./Category.css";

export const Category = () => {
  const dispatch = useDispatch();

  const movies = useSelector((store) => store.movieReducer.movies);
  const videosMap = useSelector((store) => store.videoReducer.videos);
  const isLoading = useSelector((store) => store.movieReducer.isLoading);

  // State to hold genre -> videos mapping
  const [genreMap, setGenreMap] = useState({});

  // Fetch all movies on mount
  useEffect(() => {
    dispatch(fetchallmovies());
  }, [dispatch]);

  // Fetch videos for each movie videoId
  useEffect(() => {
    if (movies && movies.length > 0) {
      movies.forEach((movie) => {
        if (movie.videoId && !videosMap[movie.videoId]) {
          dispatch(getVideo(movie.videoId));
        }
      });
    }
  }, [dispatch, movies, videosMap]);

  // Build genre map when movies or videosMap changes
  useEffect(() => {
    if (movies.length === 0) {
      setGenreMap({});
      return;
    }

    // Create a map of genreName -> array of videos
    const map = {};

    movies.forEach((movie) => {
      const genres = movie.genres || [];
      genres.forEach((genre) => {
        if (!map[genre]) map[genre] = [];

        const video = videosMap[movie.videoId] || {};
        map[genre].push({
          id: movie.videoId,
          title: video.title || movie.title || "Untitled",
          thumbnailUrl:
            video.thumbnailUrl ||
            "https://via.placeholder.com/300x170?text=No+Thumbnail",
        });
      });
    });

    setGenreMap(map);
  }, [movies, videosMap]);

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
      <Box pt="70px" px={4} className="category-container">
        {Object.keys(genreMap).length === 0 ? (
          <Text fontSize="lg" color="gray.500">
            No genres or videos available.
          </Text>
        ) : (
          Object.entries(genreMap).map(([genre, videos]) => (
            <Box key={genre} mb={12}>
              <Heading mb={4} color="teal.400" fontSize="2xl" textTransform="capitalize">
                {genre}
              </Heading>
              {videos.length === 0 ? (
                <Text>No videos in this genre.</Text>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </SimpleGrid>
              )}
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

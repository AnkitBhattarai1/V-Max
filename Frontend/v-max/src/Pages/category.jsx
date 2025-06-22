import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  CircularProgress,
  Center,
  Button,
  HStack,
  IconButton,
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
  const [genreMap, setGenreMap] = useState({});
  const [selectedGenre, setSelectedGenre] = useState("All");
  const genreList = ["All", ...Object.keys(genreMap)];

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
          <>
            <HStack spacing={3} overflowX="auto" pb={6} className="genre-scrollbar">
              {genreList.map((genre) => (
                <Button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  variant={selectedGenre === genre ? "solid" : "outline"}
                  colorScheme={selectedGenre === genre ? "teal" : "gray"}
                  borderRadius="full"
                  px={6}
                  py={2}
                  fontWeight={selectedGenre === genre ? "bold" : "normal"}
                  bg={selectedGenre === genre ? "teal.500" : "gray.100"}
                  color={selectedGenre === genre ? "white" : "black"}
                  _hover={{ bg: selectedGenre === genre ? "teal.600" : "gray.200" }}
                  minW="max-content"
                >
                  {genre}
                </Button>
              ))}
            </HStack>
            {selectedGenre === "All"
              ? genreList.slice(1).map((genre) => (
                  <Box key={genre} mb={12}>
                    {/* Removed genre heading below genre buttons */}
                    {genreMap[genre].length === 0 ? (
                      <Text>No videos in this genre.</Text>
                    ) : (
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        {genreMap[genre].map((video) => (
                          <VideoCard key={video.id} video={video} />
                        ))}
                      </SimpleGrid>
                    )}
                  </Box>
                ))
              : (
                <Box mb={12}>
                  {/* Removed genre heading below genre buttons */}
                  {genreMap[selectedGenre] && genreMap[selectedGenre].length === 0 ? (
                    <Text>No videos in this genre.</Text>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                      {genreMap[selectedGenre] && genreMap[selectedGenre].map((video) => (
                        <VideoCard key={video.id} video={video} />
                      ))}
                    </SimpleGrid>
                  )}
                </Box>
              )}
          </>
        )}
      </Box>
    </>
  );
};

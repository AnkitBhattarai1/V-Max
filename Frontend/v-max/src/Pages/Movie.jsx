import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallmovies } from "../Redux/MovieReducer/Action";
import { getVideo } from "../Redux/VideoReducer/Action";
import {
  Box,
  Text,
  SimpleGrid,
  CircularProgress,
  Center,
} from "@chakra-ui/react";
import { TopNavbar } from "./topnavbar";
import { VideoCard } from "../Components/VideoCard";
import "./Movie.css";

export const Movie = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movieReducer.movies);
  const videosMap = useSelector((store) => store.videoReducer.videos);
  const isLoading = useSelector((store) => store.movieReducer.isLoading);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchallmovies());
  }, [dispatch]);

  useEffect(() => {
    if (movies && movies.length > 0) {
      movies.forEach((movie) => {
        if (movie.videoId) dispatch(getVideo(movie.videoId));
      });
    }
  }, [dispatch, movies]);

  const combinedVideos = movies
    .filter((movie) => movie.videoId && videosMap[movie.videoId])
    .map((movie) => {
      const v = videosMap[movie.videoId];
      return {
        id: movie.videoId,
        title: v.title || "Untitled",
        thumbnailUrl:
          v.thumbnailUrl ||
          "https://via.placeholder.com/300x170?text=No+Thumbnail",
      };
    });

  const filteredVideos = searchTerm
    ? combinedVideos.filter((v) =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : combinedVideos;

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (isLoading) {
    return (
      <Center h="100vh" ml="200px">
        <CircularProgress isIndeterminate color="green.400" />
      </Center>
    );
  }

  return (
    <>
      <TopNavbar onSearch={handleSearch} />
      <Box ml="200px" pt="70px" px={4} className="movie-container">
        <Text fontSize="2xl" fontWeight="bold" mb={4} color="teal.300">
          Movies
        </Text>
        {filteredVideos.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </SimpleGrid>
        ) : (
          <Text color="gray.400">No movies found.</Text>
        )}
      </Box>
    </>
  );
};

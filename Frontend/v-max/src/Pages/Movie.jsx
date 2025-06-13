import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallmovies } from "../Redux/MovieReducer/Action";
import { getVideo } from "../Redux/VideoReducer/Action";
import { Box, Text, SimpleGrid, CircularProgress, Center } from "@chakra-ui/react";
import { TopNavbar } from "./topnavbar";
import { VideoCard } from "../Components/VideoCard";
import "./Movie.css";

export const Movie = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movieReducer.movies);
  const videosMap = useSelector((store) => store.videoReducer.videos);
  const isLoading = useSelector((store) => store.movieReducer.isLoading);
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    dispatch(fetchallmovies());
  }, [dispatch]);

  useEffect(() => {
    if (movies && movies.length > 0) {
      movies.forEach((movie) => {
        if (movie.videoId) dispatch(getVideo(movie.videoId));
      });
    }
    console.log("[DEBUG] movies (from Redux):", movies);
  }, [dispatch, movies]);

  const combinedVideos = movies.map((movie) => {
    const v = videosMap[movie.videoId] || {};
    return {
      id: movie.videoId,
      title: v.title || "Untitled",
      duration: v.duration || "N/A",
      views: v.views || "N/A",
      category: movie.genres?.join(", ") || "Uncategorized",
      uploadDate: v.uploadDate || "Unknown",
    };
  });

  const handleSearch = (searchTerm) => {
    setFilteredVideos(
      combinedVideos.filter((v) =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setFilteredVideos(combinedVideos);
  }, [combinedVideos]);

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
      <Box ml="200px" pt="70px" p={4} className="movie-container">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Movies
        </Text>
        {filteredVideos.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} title={video.title} id={video.id}>
                <Box mt={3}>
                  <Box className="movie-info-box">
                    <Text><strong>Duration:</strong> {video.duration}</Text>
                  </Box>
                  <Box className="movie-info-box">
                    <Text><strong>Views:</strong> {video.views}</Text>
                  </Box>
                  <Box className="movie-info-box">
                    <Text><strong>Category:</strong> {video.category}</Text>
                  </Box>
                  <Box className="movie-info-box">
                    <Text><strong>Uploaded:</strong> {video.uploadDate}</Text>
                  </Box>
                </Box>
              </VideoCard>
            ))}
          </SimpleGrid>
        ) : (
          <Text>No movies found. (Check console for fetched movies.)</Text>
        )}
      </Box>
    </>
  );
};

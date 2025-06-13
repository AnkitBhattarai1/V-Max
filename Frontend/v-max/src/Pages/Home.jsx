import React, { useState, useEffect } from "react";
import { TopNavbar } from "./topnavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchallmovies } from "../Redux/MovieReducer/Action";
import { getVideo } from "../Redux/VideoReducer/Action";
import { SimpleGrid, Box, Text, Center, CircularProgress } from "@chakra-ui/react";
import { VideoCard } from "../Components/VideoCard";

export const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movieReducer.movies);
  const isLoading = useSelector((store) => store.movieReducer.isLoading);
  const videosMap = useSelector((store) => store.videoReducer.videos);

  const [filteredVideos, setFilteredVideos] = useState([]);

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

  // ===== TEMPORARY TEST DATA =====
  const testVideos = [
    {
      id: "test1",
      title: "Sample Test Video",
      duration: "12 min",
      views: 1200,
      uploadDate: "2025-06-01",
      category: "Drama, Action",
    },
    {
      id: "test2",
      title: "Demo Movie Clip",
      duration: "8 min",
      views: 900,
      uploadDate: "2025-06-02",
      category: "Adventure",
    },
  ];
  // ===== END TEST DATA =====

  const combinedVideos = movies.length > 0
    ? movies.map((movie) => {
        const videoData = videosMap[movie.videoId] || {};
        return {
          id: movie.videoId || "no-id",
          title: videoData.title || "Untitled",
          duration: videoData.duration || "N/A",
          views: videoData.views || "N/A",
          uploadDate: videoData.uploadDate || "N/A",
          category: movie.genres?.join(", ") || "Uncategorized",
        };
      })
    : testVideos; // Use test videos if no real movies

  // Search
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredVideos(combinedVideos);
      return;
    }
    const filtered = combinedVideos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVideos(filtered);
  };

  useEffect(() => {
    setFilteredVideos(combinedVideos);
  }, [movies, videosMap]);

  if (isLoading) {
    return (
      <Center h="100vh" ml="200px">
        <CircularProgress isIndeterminate color="blue.400" />
      </Center>
    );
  }

  return (
    <>
      <TopNavbar onSearch={handleSearch} />
      <Box ml="200px" pt="70px" p={4} minH="100vh" width="calc(100% - 250px)">
        {filteredVideos.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} title={video.title} id={video.id}>
                <Box mt={3}>
                  <Box bg="gray.100" p={3} borderRadius="xl" mb={2}>
                    <Text>
                      <strong>Duration:</strong> {video.duration}
                    </Text>
                  </Box>
                  <Box bg="gray.100" p={3} borderRadius="xl" mb={2}>
                    <Text>
                      <strong>Views:</strong> {video.views}
                    </Text>
                  </Box>
                  <Box bg="gray.100" p={3} borderRadius="xl" mb={2}>
                    <Text>
                      <strong>Category:</strong> {video.category}
                    </Text>
                  </Box>
                  <Box bg="gray.100" p={3} borderRadius="xl">
                    <Text>
                      <strong>Uploaded:</strong> {video.uploadDate}
                    </Text>
                  </Box>
                </Box>
              </VideoCard>
            ))}
          </SimpleGrid>
        ) : (
          <Text>No videos found.</Text>
        )}
      </Box>
    </>
  );
};

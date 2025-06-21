import React, { useState, useEffect, useRef } from "react";
import { TopNavbar } from "./topnavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchallmovies } from "../Redux/MovieReducer/Action";
import { getVideo } from "../Redux/VideoReducer/Action";
import {
  SimpleGrid,
  Box,
  Text,
  Center,
  CircularProgress,
} from "@chakra-ui/react";
import { VideoCard } from "../Components/VideoCard";

import home from "../Imges/Home.mp4";
import home1 from "../Imges/Home1.mp4";
import home2 from "../Imges/Home2.mp4";
import home3 from "../Imges/Home3.mp4";

import "./Home.css";

const videoFiles = [home, home1, home2, home3];

export const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movieReducer.movies);
  const isLoading = useSelector((store) => store.movieReducer.isLoading);
  const videosMap = useSelector((store) => store.videoReducer.videos);

  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const videoRefs = useRef([]);

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

  const fallbackVideos = [
    {
      id: "1",
      title: "Test Movie 1",
      duration: "2:30",
      views: "1.2k",
      uploadDate: "2023-01-01",
      category: "Action",
    },
    {
      id: "2",
      title: "Test Movie 2",
      duration: "3:45",
      views: "980",
      uploadDate: "2023-02-15",
      category: "Drama",
    },
  ];

  const combinedVideos =
    movies && movies.length > 0
      ? movies.map((movie) => {
          const videoData = videosMap[movie.videoId] || {};
          return {
            id: movie.videoId || "no-id",
            title: videoData.title || movie.title || "Untitled",
            thumbnailUrl: videoData.thumbnailUrl || "https://via.placeholder.com/300x170?text=No+Thumbnail",
            duration: videoData.duration || "N/A",
            views: videoData.views || "N/A",
            uploadDate: videoData.uploadDate || "N/A",
            category: movie.genres?.join(", ") || "Uncategorized",
          };
        })
      : fallbackVideos;

  useEffect(() => {
    if (!searchTerm) {
      setFilteredVideos(combinedVideos);
    } else {
      const filtered = combinedVideos.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  }, [combinedVideos, searchTerm]);

  const handleVideoEnd = (index) => {
    const nextIndex = index + 1;
    if (nextIndex < videoRefs.current.length) {
      videoRefs.current[nextIndex].parentElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      videoRefs.current[nextIndex].play();
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

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

      <Box ml="190px" pt="30px" px={4} width="calc(110% - 250px)">
        {/* Top Welcome Video Section */}
        {!searchTerm && (
          <div className="video-section">
            <div style={{ display: "flex", gap: "1rem" }}>
              {videoFiles.map((file, index) => (
                <div key={index} className="video-wrapper">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={file}
                    className="video-element"
                    autoPlay
                    muted
                    loop={false}
                    playsInline
                    onEnded={() => handleVideoEnd(index)}
                  />
                  <div className="video-text">
                    <div>Welcome to V-MAX,</div>
                    <div>Your Ultimate Video Partner</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Movie Section */}
        <div className="video-card-container">
          {filteredVideos.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </SimpleGrid>
          ) : (
            <div className="no-videos-text">No videos found.</div>
          )}
        </div>
      </Box>
    </>
  );
};

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchallmovies } from "../Redux/MovieReducer/Action";
import { getVideo } from "../Redux/VideoReducer/Action";
import { VideoCard } from "../Components/VideoCard";
import "./Category.css";

export const Category = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movieReducer.movies);
  const videosMap = useSelector((store) => store.videoReducer.videos);
  const bgColor = useColorModeValue("gray.100", "gray.700");

  const [categoryVideos, setCategoryVideos] = useState([]);

  useEffect(() => {
    dispatch(fetchallmovies());
  }, [dispatch]);

  useEffect(() => {
    if (movies && movies.length > 0) {
      movies.forEach((movie) => {
        dispatch(getVideo(movie.videoId));
      });
    }
  }, [dispatch, movies]);

  useEffect(() => {
    const filtered = movies
      .filter((movie) =>
        movie.genres?.map((g) => g.toLowerCase()).includes(categoryName.toLowerCase())
      )
      .map((movie) => {
        const video = videosMap[movie.videoId] || {};
        return {
          id: movie.videoId || "unknown",
          title: video.title || "Untitled",
          duration: video.duration || "N/A",
          views: video.views || 0,
          uploadDate: video.uploadDate || "Unknown",
          category: movie.genres?.join(", ") || "Uncategorized",
        };
      });

    // ==== TEST FALLBACK DATA ====
    const testFallback = [
      {
        id: "testcat1",
        title: `Test Video in ${categoryName}`,
        duration: "9 min",
        views: 888,
        uploadDate: "2025-06-01",
        category: categoryName,
      },
      {
        id: "testcat2",
        title: `Another ${categoryName} Sample`,
        duration: "7 min",
        views: 555,
        uploadDate: "2025-06-02",
        category: categoryName,
      },
    ];
    // =============================

    setCategoryVideos(filtered.length > 0 ? filtered : testFallback);
  }, [movies, videosMap, categoryName]);

  return (
    <Box className="category-container">
      <Heading className="category-title" mb={4}>
        Category: {categoryName}
      </Heading>
      {categoryVideos.length === 0 ? (
        <Text className="no-videos">No videos found in this category.</Text>
      ) : (
        <Box className="video-row">
          {categoryVideos.map((video) => (
            <VideoCard key={video.id} title={video.title} id={video.id}>
              <Box className="info-box" bg={bgColor}>
                <Text>
                  <strong>Duration:</strong> {video.duration}
                </Text>
                <Text>
                  <strong>Views:</strong> {video.views}
                </Text>
                <Text>
                  <strong>Uploaded:</strong> {video.uploadDate}
                </Text>
              </Box>
            </VideoCard>
          ))}
        </Box>
      )}
    </Box>
  );
};

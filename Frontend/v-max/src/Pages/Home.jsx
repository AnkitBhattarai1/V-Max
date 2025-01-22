

import { 
  Box, 
  Center, 
  CircularProgress, 
  Flex, 
  Heading, 
  Text, 
  useColorModeValue 
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallmovies} from "../Redux/MovieReducer/Action"; // Updated action import
import plyvideo from "../Imges/Home.mp4";
import Postermovie from "../Imges/MoviePosterscreen.png";
import "./Navbar.css";
import Logo from "../Imges/PLY.png";
import { VideoCard } from "../Components/VideoCard";
import { getVideo,getVideos} from "../Redux/VideoReducer/Action";
export const Home = () => {

  const dispatch = useDispatch();

  // Accessing movies and loading state from Redux store
  const movies = useSelector((store) => store.movieReducer.movies); // Ensure the reducer is named correctly
  const isLoading = useSelector((store) => store.movieReducer.isLoading);
  const videos = useSelector((store) => store.videoReducer.videos);

 // Fetching all movies on component mount
/*  useEffect(() => {
    dispatch(fetchallmovies());
  }, [dispatch]);
*/
  // Fetching the actual video data based on the movie IDs
  useEffect(() => {
    if (movies && movies.length > 0) {
      movies.forEach((movie) => {
    dispatch(getVideo(movie.videoId)); // Dispatch getVideo action with videoId from movie
      });
    }
  }, [dispatch]);
  return (
    <Box
      as="main"
      height="auto"
      w={"100%"}
      paddingLeft={"13%"}
      id="mainDiv"
      bg={useColorModeValue("#000014", "gray.800")}
    >
      <Box>
        <div id="Heading">
          <h1>Welcome!</h1>
          <img src={Logo} alt="PLY Logo" />
        </div>

        <video
          style={{
            width: "100%",
            maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
          }}
          loop
          playsInline
          autoPlay
          muted // Add the muted attribute to enable autoplay on mobile devices
          poster={Postermovie}
        >
          <source src={plyvideo} type="video/mp4" />
        </video>
      </Box>

      <Box className="Movies">
        {isLoading ? (
          // Show loading spinner when data is being fetched
          <Box
            as="main"
            minHeight="500px"
            w={"100%"}
            paddingLeft={"500px"}
            mt={"80px"}
            bg={useColorModeValue("#000014", "#000014")}
          >
            <CircularProgress isIndeterminate color="blue.300" />
            <Text fontSize={"xx-large"} color={"gray"} ml={"-20px"}>
              Loading...
            </Text>
          </Box>
        ) : videos && videos.length > 0 ? (
          // Render movies if data is available
          videos.map((video) => <VideoCard key={video.id} {...video} />)
        ) : (
          // Show message if no movies are found
          <Center>
            <Text fontSize="xl" color="gray.300">
              No movies available. Please check back later.
            </Text>
          </Center>
        )}
      </Box>
    </Box>
  );
};

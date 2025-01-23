

import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const VideoCard = ({ id, title, description, thumbnailUrl, duration, originalVideoUrl }) => {
  const navigate = useNavigate();

  const handleWatchNow = () => {
    navigate("/video", { state: { videoUrl: originalVideoUrl, title } });
  };

  return (
    <Box className="movie_Card" key={id}>
      <img
        width="100%"
        height="150px"
        className="zoom-image"
        src={thumbnailUrl}
        alt={title}
      />
      <Box className="details">
        <h4>{title}</h4>
        <p>Runtime: {duration} mins</p>
        <p>{description}</p>
        <div>
          <Button colorScheme="blue" onClick={handleWatchNow}>
            Watch Now
          </Button>
        </div>
      </Box>
    </Box>
  );
};


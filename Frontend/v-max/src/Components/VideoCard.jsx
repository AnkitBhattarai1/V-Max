import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import "./VideoCard.css";

export const VideoCard = ({ video }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="#111"
      boxShadow="lg"
      className="video-card"
      _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
    >
      <Image
        src={video.thumbnailUrl}
        alt={video.title}
        width="100%"
        height="170px"
        objectFit="cover"
      />
      <Box p={4}>
        <Text fontSize="lg" fontWeight="bold" color="teal.300" mb={2}>
          {video.title}
        </Text>
      </Box>
    </Box>
  );
};

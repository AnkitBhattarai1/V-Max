
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  ButtonGroup,
  Button,
  useToast,
  Container,
} from "@chakra-ui/react";
import { VideoPlayer } from "./VideoPlayer";

export const VideoPlayerPage = () => {
  const location = useLocation();
  const { videoUrl, title } = location.state || {}; // Fallback if state is undefined
  const [rating, setRating] = useState(null);
  const toast = useToast();

  const handleRating = (value) => {
    setRating(value);
    toast({
      title: "Thank you!",
      description: `You rated this video ${value} out of 5.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (!videoUrl) {
    return (
      <Box textAlign="center" mt={10}>
        <Text fontSize="lg" color="red.500">
          No video URL provided. Please go back and select a video.
        </Text>
      </Box>
    );
  }

  return (
    <Box
      bg="gray.900"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={4}
    >
      <Container maxW="900px" p={0}> {/* Match maxWidth to VideoPlayer */}
        <VStack spacing={6} w="100%">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="teal.500"
            textAlign="center"
          >
            {title}
          </Text>
          <VideoPlayer videoUrl={videoUrl} posterUrl={""} />
          <Box textAlign="center" mt={4}>
            <Text fontSize="lg" color="white" mb={2}>
              Rate this video
            </Text>
            <ButtonGroup size="sm" isAttached variant="outline">
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  colorScheme={value === rating ? "teal" : "gray"}
                  onClick={() => handleRating(value)}
                >
                  {value}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

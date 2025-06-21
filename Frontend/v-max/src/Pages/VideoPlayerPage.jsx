import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Tag,
  Divider,
} from '@chakra-ui/react';
import './VideoPlayerPage.css';

export const VideoPlayerPage = () => {
  const { videoId } = useParams();

  const movies = useSelector((state) => state.movieReducer.movies);
  const videosMap = useSelector((state) => state.videoReducer.videos);

  const movie = movies.find((m) => m.videoId === videoId);
  const video = videosMap[videoId];

  if (!movie || !video) {
    return (
      <Box className="video-player-container">
        <Text fontSize="xl" color="red.500">
          Video or Movie not found.
        </Text>
      </Box>
    );
  }

  return (
    <Box className="video-player-container">
      <Box mb={6}>
        <video
          controls
          src={video.originalVideoUrl || video.videoUrl || video.url || ''}
          poster={video.thumbnailUrl}
        >
          Sorry, your browser doesn't support embedded videos.
        </video>
      </Box>

      <VStack align="start" spacing={4} className="video-metadata">
        <Heading size="lg" className="video-title">{video.title || movie.title}</Heading>

        <Text className="video-description">{movie.description || video.description || "No description available."}</Text>

        <HStack spacing={2} wrap="wrap" className="video-genres">
          {(movie.genres && movie.genres.length > 0) ? (
            movie.genres.map((g) => (
              <Tag key={g} colorScheme="teal" variant="subtle">
                {g}
              </Tag>
            ))
          ) : (
            <Tag colorScheme="gray" variant="subtle">No genres</Tag>
          )}
        </HStack>

        <Divider />

        <Text><strong>Cast:</strong> {movie.cast || "N/A"}</Text>
        <Text><strong>Director:</strong> {movie.director || "N/A"}</Text>
        <Text><strong>Release Date:</strong> {video.releaseDate || "N/A"}</Text>
        <Text>
          <strong>Runtime:</strong> {video.duration ? video.duration : "N/A"} minutes

        </Text>
        <Text><strong>Language:</strong> {video.language || "N/A"}</Text>
        <Text><strong>Age Rating:</strong> {video.ageRating || "N/A"}</Text>
      </VStack>
    </Box>
  );
};

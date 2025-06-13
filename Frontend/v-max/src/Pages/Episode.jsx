import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export const Episode = () => {
  const { seriesId, seasonId } = useParams();

  const episodes = [
    { number: 1, title: 'Episode 1: The Beginning' },
    { number: 2, title: 'Episode 2: The Journey' }
  ];

  return (
    <Box mt={8} p={4} bg="gray.600" borderRadius="md" color="white">
      <Text fontSize="lg">Episodes for Season: {seasonId} (Series: {seriesId})</Text>
      {episodes.map((episode) => (
        <Box key={episode.number} mt={2} p={3} bg="gray.500" borderRadius="md">
          {episode.title}
        </Box>
      ))}
    </Box>
  );
};

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

export const Season = () => {
  const { seriesId } = useParams();
  const navigate = useNavigate();

  const seasons = [
    { id: 'season1', number: 1 },
    { id: 'season2', number: 2 }
  ];

  const handleSeasonClick = (seasonId) => {
    navigate(`/shows/${seriesId}/${seasonId}`);
  };

  return (
    <Box mt={8} p={4} bg="gray.700" borderRadius="md" color="white">
      <Text fontSize="xl">Seasons for Series: {seriesId}</Text>
      {seasons.map((season) => (
        <Box
          key={season.id}
          mt={2}
          p={3}
          bg="gray.600"
          borderRadius="md"
          cursor="pointer"
          onClick={() => handleSeasonClick(season.id)}
        >
          Season {season.number}
        </Box>
      ))}
    </Box>
  );
};

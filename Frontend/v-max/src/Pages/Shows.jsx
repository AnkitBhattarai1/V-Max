import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';

export const Shows = () => {
  const navigate = useNavigate();

  // Simulate list of series
  const seriesList = [
    { id: 'series1', title: 'Test Series 1' },
    { id: 'series2', title: 'Test Series 2' }
  ];

  const handleSeriesClick = (seriesId) => {
    navigate(`/shows/${seriesId}`);
  };

  return (
    <Box ml="200px" pt="70px" p={4} minH="100vh">
      <Text fontSize="2xl" mb={4} color="white">Series List</Text>
      {seriesList.map((series) => (
        <Box
          key={series.id}
          p={4}
          mb={2}
          bg="gray.800"
          borderRadius="md"
          color="white"
          cursor="pointer"
          onClick={() => handleSeriesClick(series.id)}
        >
          {series.title}
        </Box>
      ))}
      <Outlet />
    </Box>
  );
};

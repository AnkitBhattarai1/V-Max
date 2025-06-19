import React, { useState } from 'react';
import { Box, Button, VStack, useColorModeValue } from '@chakra-ui/react';
import { AdminMovieManager } from '../Components/AdminMovieManager';
import { AdminSeriesManager } from '../Components/AdminSeriesManager';

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('movies');

  return (
    <Box ml="190px" pt="30px" width="calc(110% - 250px)"  bg={useColorModeValue('#000014', 'gray.800')} minH="100vh" >
      <VStack spacing={4}>
        <Box>
          <Button
            colorScheme={activeTab === 'movies' ? 'blue' : 'gray'}
            onClick={() => setActiveTab('movies')}
            mr={4}
          >
            Manage Movies
          </Button>
          <Button
            colorScheme={activeTab === 'series' ? 'green' : 'gray'}
            onClick={() => setActiveTab('series')}
          >
            Manage Series
          </Button>
        </Box>
        {activeTab === 'movies' ? <AdminMovieManager /> : <AdminSeriesManager />}
      </VStack>
    </Box>
  );
};

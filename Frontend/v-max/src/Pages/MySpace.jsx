import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { CartMoviesCard } from '../Components/CartMoviesCard';

export const MySpace = () => {
  const Movies = useSelector((store) => store.productReducer.movies);
  const Account_info = useSelector((store) => store.authReducer.Account_info);
  const Name = useSelector((store) => store.authReducer.Name);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const movies = Movies.filter((movie) =>
      Account_info.includes(movie._id)
    );
    setFilteredMovies(movies);
    console.log("filteredMovies", movies);
  }, [Movies, Account_info]);

  return (
    <Box as="main" w={"98.5vw"} paddingLeft={"13%"} height={"100vh"} bg={useColorModeValue('#000014', 'gray.800')}>
      <Text fontSize={"xxx-large"} color={"gray"} paddingLeft={"30%"}>
        Welcome 
      </Text>
      {/* Render filtered movies */}
      {filteredMovies.length > 0 ? (
        <Box className='Movies'>
          {filteredMovies.map((movie) => (
            <CartMoviesCard key={movie._id} {...movie} />
          ))}
        </Box>
      ) : (
        <Box>
          <Text fontSize="xx-large" color="gray" mt={4} ml={3}>
            Please Signup or Login to Continue
          </Text>
          <Flex mt={4} ml={3} align="center">
            <Text fontSize="large" color="gray" mr={4}>
              Don’t have an account? <a style={{color:"blue"}} href='/SignUp'>Click here</a>
            </Text>
            <Text fontSize="large" color="gray">
              Already have an account? <a style={{color:"blue"}} href='/Login'>Click here</a>
            </Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

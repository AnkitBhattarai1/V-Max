import { Box, useColorModeValue, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../Redux/MovieReducer/Action';
import { MoviesCard } from '../Components/MoviesCard';
import "./Navbar.css";

export const Categories = () => {
  const dispatch = useDispatch();
  const Movies = useSelector((store) => store.productReducer.movies);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(Movies);
  }, [Movies]);

  const handleChange = (value) => {
    if (value === '') {
      setFilteredData(Movies);
    } else {
      let sortData = [...Movies];
      if (value === 'Run_Time') {
        sortData.sort((a, b) => a.Runtime - b.Runtime);
      } else if (value === 'Rating') {
        sortData.sort((a, b) => a.Average_Rating - b.Average_Rating);
      } else if (value === 'Release_Date') {
        sortData.sort((a, b) => new Date(a.Release_Date) - new Date(b.Release_Date));
      }
      setFilteredData(sortData);
    }
  };

  return (
    <Box as="main" height="auto" w="100%" paddingLeft="13%" bg={useColorModeValue('#000014', 'gray.800')}>
      <Box w="25%" color="gray" pt="20px" display="flex">
        <Select placeholder="Select" onChange={(e) => handleChange(e.target.value)}>
          <option value="Run_Time">Run Time</option>
          <option value="Rating">Rating</option>
          <option value="Release_Date">Release Date</option>
        </Select>
      </Box>
      <Box className="Movies">
        {filteredData.length > 0 && filteredData.map((e) => (
          <MoviesCard key={e.id} {...e} />
        ))}
      </Box>
    </Box>
  );
};

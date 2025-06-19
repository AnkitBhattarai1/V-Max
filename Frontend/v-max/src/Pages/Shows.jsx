import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { TopNavbar } from "./topnavbar";  // import your search bar component

export const Shows = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Simulate list of series
  const seriesList = [
    { id: "series1", title: "Test Series 1" },
    { id: "series2", title: "Test Series 2" },
  ];

  const handleSeriesClick = (seriesId) => {
    navigate(`/shows/${seriesId}`);
  };

  // Optional: handle search input (currently just sets state)
  const handleSearch = (term) => {
    setSearchTerm(term);
    // You can filter seriesList here if you want
  };

  return (
    <>
      <TopNavbar onSearch={handleSearch} />

      <Box ml="200px" pt="90px" p={4} minH="100vh">
        <Text fontSize="2xl" mb={4} color="white">
          Series List
        </Text>

        {seriesList
          .filter((series) =>
            series.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((series) => (
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
    </>
  );
};

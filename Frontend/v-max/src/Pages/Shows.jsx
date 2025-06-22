import React, { useState } from "react";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { TopNavbar } from "./topnavbar";
import { VideoCard } from "../Components/VideoCard";

export const Shows = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Simulate list of series
  const seriesList = [
    { id: "series1", title: "Test Series 1", thumbnailUrl: "https://dummyimage.com/300x170/005bea/fff&text=Series+1" },
    { id: "series2", title: "Test Series 2", thumbnailUrl: "https://dummyimage.com/300x170/00c6fb/fff&text=Series+2" },
  ];

  const handleSeriesClick = (seriesId) => {
    navigate(`/shows/${seriesId}`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredSeries = seriesList.filter((series) =>
    series.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TopNavbar onSearch={handleSearch} />
      <Box ml="200px" pt="90px" px={4} minH="100vh">
        <Text fontSize="2xl" mb={4} color="white">
          Series List
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredSeries.map((series) => (
            <div key={series.id} onClick={() => handleSeriesClick(series.id)} style={{ cursor: "pointer" }}>
              <VideoCard video={{ id: series.id, title: series.title, thumbnailUrl: series.thumbnailUrl }} />
            </div>
          ))}
        </SimpleGrid>
        <Outlet />
      </Box>
    </>
  );
};

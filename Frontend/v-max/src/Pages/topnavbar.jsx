import React, { useState } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

export const TopNavbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      as="header"
      pos="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="sticky"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="sm"
      px={4}
      py={3}
      ml={{ base: 0, md: "200px" }} // Adjust if sidebar width is different
    >
      <Flex maxW="1200px" mx="auto" align="center" gap={4}>
        <InputGroup>
          <Input
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            bg={useColorModeValue("gray.100", "gray.700")}
          />
          <InputRightElement>
            <IconButton
              aria-label="Search movies"
              icon={<CiSearch />}
              size="sm"
              onClick={handleSearch}
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
};

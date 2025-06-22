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
      bg={useColorModeValue("rgba(251, 247, 247, 0.7)", "rgba(26,32,44,0.7)")}
      boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
      style={{backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'}}
      borderRadius="0 0 24px 24px"
      border="1px solid rgba(255,255,255,0.18)"
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
            bg={useColorModeValue("rgba(255,255,255,0.6)", "rgba(45,55,72,0.6)")}
            color="black"
            borderRadius="full"
            borderWidth="2px"
            borderColor={useColorModeValue("#005bea", "#2a4365")}
            fontWeight="500"
            fontSize="1.1rem"
            px={6}
            py={2}
            boxShadow="0 4px 24px rgba(0,198,251,0.10)"
            _placeholder={{ color: "#555", fontWeight: "400" }}
            _focus={{ borderColor: "#00c6fb", boxShadow: "0 0 0 2px #00c6fb33" }}
            transition="background 0.3s, box-shadow 0.3s"
          />
          <InputRightElement>
            <IconButton
              aria-label="Search movies"
              icon={<CiSearch />}
              size="md"
              onClick={handleSearch}
              bgGradient="linear(to-r, #00c6fb, #005bea)"
              color="white"
              borderRadius="full"
              _hover={{ bgGradient: "linear(to-r, #005bea, #00c6fb)", boxShadow: "0 2px 16px #00c6fb55" }}
              boxShadow="0 2px 8px rgba(0,198,251,0.08)"
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
};

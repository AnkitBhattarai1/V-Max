import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export const VideoCard = ({ title, id, children }) => {
  return (
    <Box
      p={5}
      bg="white"
      borderRadius="2xl"
      shadow="lg"
      border="1px solid #E2E8F0"
      width="150%"
      minH="200px"
    >
      <VStack align="start" spacing={3}>
        <Heading fontSize="xl">{title}</Heading>
        <Text fontSize="sm" color="gray.500">ID: {id}</Text>
        {children}
      </VStack>
    </Box>
  );
};

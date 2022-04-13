import { Flex } from "@chakra-ui/react"; // verbose
import { Box, Text } from "@chakra-ui/react";
export const Testing = () => {
  return (
    <div>
      {/* buat coba2 component */}
      <h1>testing</h1>
      <Box w="100%" h="200px" bgGradient="linear(to-t, green.200, pink.500)" />
      <Box w="100%" h="200px" bgGradient="radial(gray.300, yellow.400, pink.200)" />
      <Text bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text" fontSize="6xl" fontWeight="extrabold">
        Welcome to Chakra UI
      </Text>
      Flex Container
      <Flex align="center" border="2px" justify="center">
        <Box border="1px" w="30%">
          Box with Flex props
        </Box>
        <Box border="1px" w="50%">
          Box with Flex props
        </Box>
      </Flex>
      {/* buat coba2 component */}
    </div>
  );
};

export default Testing;

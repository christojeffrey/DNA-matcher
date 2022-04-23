import { Link, useLocation } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
const Navigation = () => {
  let location = useLocation().pathname;
  const navbarWidth = "24";
  return (
    <Flex fontSize="md" fontWeight="medium" textAlign="center" flexDirection="column" p={5} h="100vh" w={navbarWidth} position="fixed" bg="rgba(0,90,99,0.75)" backdropFilter="auto" backdropBlur="3px" boxShadow="navbar" zIndex="1000">
      <Box color={location === "/" ? "teal.light" : "main.100"} _hover={{ color: "teal.light" }} transitionDuration="0.2s">
        <Link to="/">Home</Link>
      </Box>
      {/* <Box color={location === "/input" ? "teal.light" : "main.100"} _hover={{ color: "teal.light" }} transitionDuration="0.2s">
        <Link to="/input">Input</Link>
      </Box> */}
      <Box color={location === "/search" ? "teal.light" : "main.100"} _hover={{ color: "teal.light" }} transitionDuration="0.2s">
        <Link to="/search">Search</Link>
      </Box>
      {/* <Box color={location === "/algo" ? "teal.light" : "main.100"} _hover={{ color: "teal.light" }} transitionDuration="0.2s">
        <Link to="/algo">Algo</Link>
      </Box> */}
      <Box color={location === "/about" ? "teal.light" : "main.100"} _hover={{ color: "teal.light" }} transitionDuration="0.2s">
        <Link to="/about">About</Link>
      </Box>
    </Flex>
  );
};

export default Navigation;

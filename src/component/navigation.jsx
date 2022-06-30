import { Link, useLocation } from "react-router-dom";
import { Box, Flex, Icon, Switch } from "@chakra-ui/react";
import { IoHome, IoSearch, IoCode, IoInformationCircle, IoAddCircle } from "react-icons/io5";
import { useEffect } from "react";
const Navigation = ({ setSecondaryTheme }) => {
  let location = useLocation().pathname;
  const navbarWidth = "24";
  return (
    <Flex fontSize="md" fontWeight="medium" textAlign="center" flexDirection="column" p={5} h="100vh" w={navbarWidth} position="fixed" bg="navbar" backdropFilter="auto" backdropBlur="3px" boxShadow="navbar" zIndex="1000">
      <Box color={location === "/" ? "teal.light" : "main.100"} _hover={{ color: "teal.light" }} transitionDuration="0.2s" my={7}>
        <Link to="/">
          <Icon as={IoHome} boxSize="2rem" />
          Home
        </Link>
      </Box>
      <Box color={location === "/input" ? "teal.light" : "main.100"} _hover={{ color: "teal.light" }} transitionDuration="0.2s" my={7}>
        <Link to="/input">
          <Icon as={IoAddCircle} boxSize="2rem" />
          Input
        </Link>
      </Box>
      <Box color={location === "/search" ? "teal.light" : "main.100"} _hover={{ color: "teal.light" }} transitionDuration="0.2s" my={7}>
        <Link to="/search">
          <Icon as={IoSearch} boxSize="2rem" />
          Search
        </Link>
      </Box>
      {/* <Box color={location === "/algo" ? "teal.light" : "main.100"} _hover={{ color: "teal.light" }} transitionDuration="0.2s">
        <Link to="/algo">
          <Icon as={IoCode} size="2rem" />
          Algo
        </Link>
      </Box> */}
      <Box color={location === "/about" ? "teal.light" : "main.100"} _hover={{ color: "teal.light" }} transitionDuration="0.2s" my={7}>
        <Link to="/about">
          <Icon as={IoInformationCircle} boxSize="2rem" />
          About
        </Link>
      </Box>
      <Switch
        size="lg"
        onChange={(e) => {
          setSecondaryTheme(e.target.checked);
        }}
        colorScheme="green"
      />
    </Flex>
  );
};

export default Navigation;

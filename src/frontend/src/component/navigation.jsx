import { Link, useLocation } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
const Navigation = () => {
  let location = useLocation().pathname;
  console.log(location);
  return (
    <Flex fontSize="x-large" flexDirection="column" m={5}>
      <Box color={location === "/" ? "tomato" : "black"}>
        <Link to="/">home</Link>
      </Box>
      <Box color={location === "/search" ? "tomato" : "black"}>
        <Link to="/search">search</Link>
      </Box>
      <Box color={location === "/algo" ? "tomato" : "black"}>
        <Link to="/algo">KMP and Boyer-Moore</Link>
      </Box>
      <Box color={location === "/about" ? "tomato" : "black"}>
        <Link to="/about">about</Link>
      </Box>
    </Flex>
  );
};

export default Navigation;

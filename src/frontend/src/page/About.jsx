import { useEffect } from "react";
import { Box, Heading, Text, Center, SlideFade, useDisclosure } from "@chakra-ui/react";

const About = () => {
  const { isOpen, onOpen } = useDisclosure();

  useEffect(() => {
    document.title = "About";
    onOpen();
  }, []);

  return (
    <>
      {/* CONTENT */}
      <SlideFade in={isOpen}>
        <Center>
          <Box p={24} pl={48} w="80%" position="relative" align="center">
            <Heading>About</Heading>
          </Box>
        </Center>
      </SlideFade>
    </>
  );
};
export default About;

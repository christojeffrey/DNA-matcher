import { Box, Flex, Heading, Text, Input, Center, Code, Button } from "@chakra-ui/react";
import FileUploader from "../component/FileUploader";
import { useState, useCallback, useEffect, useContext } from "react";

const InputDisease = () => {
  // Change page on scroll
  // var scrollable = true;
  // useEffect(() => {
  //   const handleScroll = (e) => {
  //     var delta = e.deltaY;
  //     if (scrollable) {
  //       if (delta > 0) {
  //         window.location.href = "/search";
  //       } else {
  //         window.location.href = "/";
  //       }
  //     }
  //   };
  //   window.addEventListener("wheel", handleScroll);

  //   // on unmount
  //   return () => window.removeEventListener("wheel", handleScroll);
  // }, []);    
  const dnaCtx = useContext(DNAContext);

  return (
    <Box p={24} pl={48} w="100%" position="relative" >
      <Heading>Input New Disease</Heading>
      <Text as="h2" mt="12">DNA sequence</Text>
      <FileUploader />
      <Flex mt="12" w="100%">
        <Text as="h2" w="60">Disease name</Text>
        <Input w="100%" id="dName" bg="teal.dark" color="main.100" placeholder="Input disease name" />
      </Flex>

      <Button mt="12">Submit</Button>
    </Box>
  );
};

export default InputDisease;
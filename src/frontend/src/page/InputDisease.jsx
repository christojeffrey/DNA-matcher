import { Box, Flex, Heading, Text, Input, Center, Code, Button, SlideFade, useDisclosure } from "@chakra-ui/react";
import DNAFileUploaderComponent from "../component/FileUploader";
import { useState, useContext, useEffect } from "react";
import { DNAContext } from "../component/Provider";
import axios from "axios";
import { BE_URL } from "../config";

const InputDisease = () => {
  const { isOpen, onOpen } = useDisclosure();
  const [inputtedName, setInputtedName] = useState("");
  const [inputtedData, setInputtedData] = useState("");
  useEffect(() => {
    onOpen();
  }, []);
  const upload = () => {
    const data = new FormData();
    console.log(inputtedName, inputtedData);
    if (inputtedName == "" || inputtedData == "") {
      alert("Please make sure all data is inserted!");
    } else {
      data.append("name", inputtedName);
      data.append("data", inputtedData);
      console.log(data);
      axios
        .put(BE_URL + "api/add", data, {
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          alert("Successfully added new data!");
        })
        .catch(() => {
          alert("Please make sure your text is valid and disease hasn't existed before!");
        });
    }
  };

  const handleName = (event) => {
    console.log("name");
    console.log(event.target.value);
    setInputtedName(event.target.value);
  };

  return (
    <SlideFade in={isOpen}>
      <Center>
        <Box p={24} pl={48} w="80%" position="relative">
          <Heading>Input New Disease</Heading>
          <Text as="h2" mt="12">
            DNA sequence
          </Text>
          <DNAFileUploaderComponent setDNA={setInputtedData} setTitle={setInputtedName} />
          <Flex mt="12" w="100%">
            <Text as="h2" w="60">
              Disease name
            </Text>
            <Input value={inputtedName} onChange={handleName} w="100%" id="dName" bg="teal.dark" color="main.100" placeholder="Input disease name" />
          </Flex>
          <Button onClick={upload} mt="12">
            Submit
          </Button>
        </Box>
      </Center>
    </SlideFade>
  );
};

export default InputDisease;

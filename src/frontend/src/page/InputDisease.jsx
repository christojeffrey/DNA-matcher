import { Box, Flex, Heading, Text, Input, Center, Button, SlideFade, useDisclosure, Image, Spacer } from "@chakra-ui/react";
import DNAFileUploaderComponent from "../component/FileUploader";
import { useState, useContext, useEffect } from "react";
import { DNAContext } from "../component/Provider";
import axios from "axios";
import { BE_URL } from "../config";
import Front from '../image/front.svg';
import Mid from '../image/mid.svg';
import Back from '../image/back.svg';

const InputDisease = () => {
  const { isOpen, onOpen } = useDisclosure();
  const [inputtedName, setInputtedName] = useState("");
  const [inputtedData, setInputtedData] = useState("");
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  onmousemove = function(e) { setMouseX(e.clientX/window.innerWidth); setMouseY(e.clientY/window.innerHeight); console.log(mouseX); }
  // const [motion, setMotion] = useState(true);

  // useEffect(() => {
  //   if (motion) {
  //     onmousemove = function(e) { setMouseX(e.clientX/window.innerWidth); setMouseY(e.clientY/window.innerHeight); console.log(mouseX); }
  //   }
  // }, [motion]);

  useEffect(() => {
    onOpen();
  }, []);

  const upload = () => {
    const data = new FormData();
    console.log(inputtedName, inputtedData);
    if (inputtedName == "" || inputtedData == "") {
      alert("Please make sure all data is inserted!");
    } else if (inputtedData.length > 255){
      alert("Please make sure DNA string length is less than 255!")
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
    setInputtedName(event.target.value);
  };

  return (
    <SlideFade in={isOpen} position="relative" zIndex="10">
      <Center>
        <Box position="absolute" w="100%" h="133vh" objectFit="cover" overflow="hidden">
          {/* <Switch
            size="lg"
            onChange={(e) => {
              setMotion(e.target.checked);
            }}
            colorScheme="green"
            position="absolute"
            bottom="4"
            left="6"
            zIndex={1000}
          /> */}
          <Image src={Back} position="absolute" top={0} left={0} w="100%" h="100%" backgroundRepeat={false} objectFit="cover" zIndex={0} transform="auto" scale={1.2} translateX={-mouseX*10+100} translateY={-mouseY*10}/>
          <Image src={Mid} position="absolute" top={0} left={0} w="100%" h="100%" backgroundRepeat={false} objectFit="cover" zIndex={0} transform="auto" scale={1.2} translateX={-mouseX*50+100} translateY={-mouseY*50} />
          <Image src={Front} position="absolute" top={0} left={0} w="100%" h="100%" backgroundRepeat={false} objectFit="cover" zIndex={0} transform="auto" scale={1.2} translateX={-mouseX*100+100} translateY={-mouseY*100}/>
        </Box>
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
          <Flex>
          <Spacer />
          <Button onClick={upload} mt="12" bg="accent" color="main.100" _hover={{bg:"teal.light", color:"teal.dark"}}>
            Submit
          </Button>
          </Flex>
        </Box>
      </Center>
    </SlideFade>
  );
};

export default InputDisease;

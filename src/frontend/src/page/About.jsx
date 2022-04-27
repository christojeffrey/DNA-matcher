import { useState, useEffect } from "react";
import { Box, Heading, Text, Center, SlideFade, useDisclosure, Image } from "@chakra-ui/react";
import Front from '../image/front.svg';
import Mid from '../image/mid.svg';
import Back from '../image/back.svg';

const About = () => {
  const { isOpen, onOpen } = useDisclosure();

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    if (motion) {
      onmousemove = function(e) { setMouseX(e.clientX/window.innerWidth); setMouseY(e.clientY/window.innerHeight); console.log(mouseX); }
    }
  }, [motion]);

  useEffect(() => {
    document.title = "About";
    onOpen();
  }, []);



  return (
    <>
      {/* CONTENT */}
      <SlideFade in={isOpen}>
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
          <Box p={24} pl={48} w="80%" position="relative" align="center">
            <Heading>About</Heading>
          </Box>
        </Center>
      </SlideFade>
    </>
  );
};
export default About;

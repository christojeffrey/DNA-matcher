import { useState, useEffect } from "react";
import { Box, Heading, Text, Center, SlideFade, useDisclosure, Image } from "@chakra-ui/react";
import Front from '../image/front.svg';
import Mid from '../image/mid.svg';
import Back from '../image/back.svg';

const About = () => {
  const { isOpen, onOpen } = useDisclosure();

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  onmousemove = function(e) { setMouseX(e.clientX/window.innerWidth); setMouseY(e.clientY/window.innerHeight); }
  // const [motion, setMotion] = useState(true);

  // useEffect(() => {
  //   if (motion) {
  //     onmousemove = function(e) { setMouseX(e.clientX/window.innerWidth); setMouseY(e.clientY/window.innerHeight); console.log(mouseX); }
  //   }
  // }, [motion]);

  useEffect(() => {
    document.title = "About";
    onOpen();
  }, []);



  return (
    <>
      {/* CONTENT */}
      <SlideFade in={isOpen} position="relative" zIndex="10">
        <Center>
        <Box position="fixed" w="100%" h="100vh" top="0" objectFit="cover" overflow="hidden">
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
          <Image src={Back} position="absolute" top={0} left={0} w="100%" h="100vh" backgroundRepeat={false} objectFit="cover" zIndex={0} transform="auto" scale={1.2} translateX={-mouseX*10+100} translateY={-mouseY*10}/>
          <Image src={Mid} position="absolute" top={0} left={0} w="100%" h="100vh" backgroundRepeat={false} objectFit="cover" zIndex={0} transform="auto" scale={1.2} translateX={-mouseX*50+100} translateY={-mouseY*50} />
          <Image src={Front} position="absolute" top={0} left={0} w="100%" h="100vh" backgroundRepeat={false} objectFit="cover" zIndex={0} transform="auto" scale={1.2} translateX={-mouseX*100+100} translateY={-mouseY*100}/>
        </Box>
          <Box p={24} pl={48} w="80%" position="relative">
            <Heading>About</Heading>
            <Box m="1rem">
              hello!
              <ol>
                <li>
                  so what is this website? <br />
                  this site is a website that can help you to detect diesease that you might have.
                </li>
                <li>
                  how does it work? <br />
                  the idea is if your DNA has a 'disease pattern' in it, quite certainly you have that disease. it works by checking the pattern in your DNA, and matching it with the 'DNA disease pattern' we have.
                </li>
                <li>
                  who made this? <br />
                  this site was made by
                  <a href="https://github.com/FelineJTD/"> Felicia Sutandijo</a>, <a href="https://github.com/christojeffrey">Christopher Jeffrey</a>, and
                  <a href="https://github.com/clumsyyyy"> Owen Christian Wijaya</a>
                </li>
                <li>
                  what do you use to make this site? we use <br />
                  <a href="https://chakra-ui.com/">chakra-ui</a> and <a href="https://reactjs.org/">react</a> for frontend and <a href="https://www.npmjs.com/package/axios">axios</a> for backend. for deploying, we use{" "}
                  <a href="https://www.netlify.com/">netlify</a> and <a href="https://cloud.google.com/compute">google cloud engine</a>.
                </li>
                <li>
                  is it real? <br />
                  no it's not. the DNA disease pattern that we have is not real. the concept of DNA pattern maching maybe real, but that is a very dubious answer that we give.
                </li>
                <li>
                  where can i see the code of this site? <br />
                  you can see the code of this site on <a href="https://github.com/clumsyyyy/Tubes3_13520050">github</a>
                </li>
              </ol>
            </Box>
          </Box>
        </Center>
      </SlideFade>
    </>
  );
};
export default About;

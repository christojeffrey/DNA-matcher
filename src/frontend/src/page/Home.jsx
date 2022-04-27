import { Box, Radio, RadioGroup, Heading, Text, Input, Center, Code, Button, Stack, Select, SlideFade, useDisclosure, Image } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { DNAContext } from "../component/Provider";
import axios from "axios";
import { BE_URL } from "../config";
import DNAFileUploaderComponent from "../component/FileUploader";
import Front from '../image/front.svg';
import Mid from '../image/mid.svg';
import Back from '../image/back.svg';

const Home = () => {
  const dnaCtx = useContext(DNAContext);
  const { isOpen, onOpen } = useDisclosure();
  // // Change page on scroll
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
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  onmousemove = function(e) { setMouseX(e.clientX/window.innerWidth); setMouseY(e.clientY/window.innerHeight); console.log(mouseX); }

  useEffect(() => {
    document.title = "Deoxyde";
    onOpen();
    axios
      .get(BE_URL + "api/alldiseases", {
        responseType: "json",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        dnaCtx.setDiseaseList(res["data"]["name"]);
      });
  }, []);

  // Drag and drop DNA sequence file

  const uploadRecord = () => {
    const data = new FormData();
    console.log(dnaCtx.Text, dnaCtx.Username, dnaCtx.Disease, dnaCtx.Method);
    if (dnaCtx.Text == "" || dnaCtx.Username == "" || dnaCtx.Disease == "" || dnaCtx.Method == "") {
      alert("Please make sure all data is inserted!");
    } else {
      dnaCtx.setText(dnaCtx.Text);
      data.append("username", dnaCtx.Username);
      data.append("disease", dnaCtx.Disease);
      data.append("text", dnaCtx.Text);
      data.append("method", dnaCtx.Method);
      console.log(data);
      axios
        .post(BE_URL + "api/match", data, {
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          dnaCtx.setLoading(false);
          console.log(res);
          console.log(res["data"]);
          var response = res["data"];
          dnaCtx.setData(response["time"] + " - " + response["name"] + " - " + response["disease"] + " - " + (response["found"] ? "Terdeteksi" : "Tidak Terdeteksi") + " - " + response["similarity"] + "%");
        })
        .catch((err) => {
          console.log(err);
          alert("Please make sure your text is valid! (no spaces or characters beside character A, C, G, T)");
          dnaCtx.setData(null);
        });
    }
  };

  const handleUsername = (event) => dnaCtx.setUsername(event.target.value);
  const handleDisease = (event) => dnaCtx.setDisease(event.target.value);

  return (
    <>
      {/* CONTENT */}
      <SlideFade in={isOpen}>
        <Center>
        <Box position="absolute" w="100%" h="100vh" objectFit="cover" overflow="hidden">
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
            <Heading>Deoxyde</Heading>
            <Text as="h2" mt="12">
              DNA sequence
            </Text>
            <DNAFileUploaderComponent setDNA={dnaCtx.setText} setTitle={dnaCtx.setUsername} />

            <Stack mt="12" w="100%">
              <Text as="h2" w="60">
                Username
              </Text>
              <Input w="100%" id="dName" bg="teal.dark" color="main.100" placeholder="Input username" value={dnaCtx.Username} onChange={handleUsername} />
              <Text as="h2" w="60">
                Disease
              </Text>

              <Select bg="teal.dark" color="main.100" placeholder="Select disease" value={dnaCtx.Disease} onChange={handleDisease}>
                {dnaCtx.diseaseList != null &&
                  dnaCtx.diseaseList.map((disease, idx) => {
                    return (
                      <option key={idx} style={{ color: "black" }} value={disease}>
                        {disease}
                      </option>
                    );
                  })}
              </Select>
              <RadioGroup value={dnaCtx.Method} onChange={dnaCtx.setMethod}>
                <Stack direction="row">
                  <Radio value="BM">Boyer-Moore</Radio>
                  <Radio value="KMP">KMP</Radio>
                </Stack>
              </RadioGroup>
            </Stack>

            <Button
              onClick={() => {
                dnaCtx.setLoading(true);
                uploadRecord();
              }}
              mt="12"
            >
              Submit
            </Button>

            {dnaCtx.data && (
              <div>
                {" "}
                <Text fontSize="xl" py="3">
                  {dnaCtx.data}
                </Text>
              </div>
            )}
          </Box>
        </Center>
      </SlideFade>
    </>
  );
};

export default Home;

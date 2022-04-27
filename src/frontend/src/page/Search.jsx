import { Box, Heading, Stack, Input, Button, Text, Center, Table, Thead, Tbody, Tr, Th, TableContainer, useDisclosure, SlideFade, Image } from "@chakra-ui/react";

import { useContext, useEffect, useState } from "react";
import { DNAContext } from "../component/Provider";
import axios from "axios";
import { BE_URL } from "../config";

import Front from '../image/front.svg';
import Mid from '../image/mid.svg';
import Back from '../image/back.svg';

const Search = () => {
  const dnaCtx = useContext(DNAContext);
  const handleSearchData = (event) => dnaCtx.setSearchData(event.target.value);
  const { isOpen, onOpen } = useDisclosure();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  onmousemove = function(e) { setMouseX(e.clientX/window.innerWidth); setMouseY(e.clientY/window.innerHeight); console.log(mouseX); }

  useEffect(() => {
    onOpen();
  });
  const upload = () => {
    const data = new FormData();
    data.append("data", dnaCtx.searchData);

    console.log(data);
    axios
      .post(BE_URL + "api/search", data, {
        responseType: "json",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("data yg dikirim");
        console.log(data);
        dnaCtx.setLoading(false);
        console.log(res["data"]["result"]);
        dnaCtx.setSearchRes(res["data"]["result"]);
        console.log("dnaCtx.searchRes");
        console.log(dnaCtx.searchRes);
      })
      .catch(() => {
        console.log("Please make sure the query is filled!");
      });
  };
  return (
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
          <Image src={Back} position="absolute" top={0} left={0} w="100%" h="100%" backgroundRepeat={false} objectFit="cover" zIndex={0} transform="auto" scale={1.2} translateX={-mouseX*10+100} translateY={-mouseY*10}/>
          <Image src={Mid} position="absolute" top={0} left={0} w="100%" h="100%" backgroundRepeat={false} objectFit="cover" zIndex={0} transform="auto" scale={1.2} translateX={-mouseX*50+100} translateY={-mouseY*50} />
          <Image src={Front} position="absolute" top={0} left={0} w="100%" h="100%" backgroundRepeat={false} objectFit="cover" zIndex={0} transform="auto" scale={1.2} translateX={-mouseX*100+100} translateY={-mouseY*100}/>
        </Box>
        <Box p={24} pl={48} w="80%" position="relative" align="center">
          <Heading>Search History</Heading>

          <Stack direction="row" justify="center" py="10">
            <Input px="5" w="50%" id="dName" bg="teal.dark" color="main.100" placeholder="Input data..." value={dnaCtx.searchData} onChange={handleSearchData} />
            <Button
              onClick={() => {
                dnaCtx.setLoading(true);
                upload();
              }}
              mt="12"
              bg="accent" color="main.100" _hover={{bg:"teal.light", color:"teal.dark"}}
            >
              Submit
            </Button>
          </Stack>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="teal.mid" fontSize="md">ID Prediksi</Th>
                  <Th color="teal.mid" fontSize="md">Tanggal</Th>
                  <Th color="teal.mid" fontSize="md">Nama</Th>
                  <Th color="teal.mid" fontSize="md">Penyakit</Th>
                  <Th color="teal.mid" fontSize="md">Status</Th>
                  <Th color="teal.mid" fontSize="md">Kesamaan</Th>
                </Tr>
              </Thead>
              {dnaCtx.searchRes != null &&
                dnaCtx.searchRes.map((item) => {
                  return (
                    <Tbody>
                      <Tr>
                        <Th color="teal.dark">{item.idprediksi}</Th>
                        <Th color="teal.dark">{item.tanggal}</Th>
                        <Th color="teal.dark">{item.nama_pasien}</Th>
                        <Th color="teal.dark">{item.penyakit_prediksi}</Th>
                        <Th color="teal.dark">{item.status == 1 ? "Terdeteksi" : "Tidak Terdeteksi"}</Th>
                        <Th color="teal.dark">{item.kesamaan}%</Th>
                      </Tr>
                    </Tbody>
                  );
                })}
            </Table>
            {dnaCtx.searchRes == null && (
              <Text align="center" py="10">
                No result :(
              </Text>
            )}
          </TableContainer>
        </Box>
      </Center>
    </SlideFade>
  );
};
export default Search;

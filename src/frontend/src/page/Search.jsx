import { Box, Heading, Stack, Input, Button, Text, Center, Table, Thead, Tbody, Tr, Th, TableContainer, useDisclosure, SlideFade } from "@chakra-ui/react";

import { useContext, useEffect } from "react";
import { DNAContext } from "../component/Provider";
import axios from "axios";
import { BE_URL } from "../config";

const Search = () => {
  const dnaCtx = useContext(DNAContext);
  const handleSearchData = (event) => dnaCtx.setSearchData(event.target.value);
  const { isOpen, onOpen } = useDisclosure();
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
    <SlideFade in={isOpen} color="main.100">
      <Center>
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

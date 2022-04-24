import { Box, Heading, Stack, Input, Button, Text } from "@chakra-ui/react";

import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";

import { useContext } from "react";
import { DNAContext } from "../component/Provider";
import axios from "axios";
import { BE_URL } from "../config";

const Search = () => {
  const dnaCtx = useContext(DNAContext);
  const handleSearchData = (event) => dnaCtx.setSearchData(event.target.value);

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
        dnaCtx.setLoading(false);
        console.log(res["data"]["result"]);
        dnaCtx.setSearchRes(res["data"]["result"]);
        console.log(dnaCtx.searchRes);
      })
      .catch(() => {
        console.log("Please make sure the query is filled!");
      });
  };
  return (
    <Box p={24} pl={48} w="100%" position="relative" align="center">
      <Heading>Search History</Heading>

      <Stack direction="row" justify="center" py="10">
        <Input px="5" w="50%" id="dName" bg="teal.dark" color="main.100" placeholder="Input data..." value={dnaCtx.searchData} onChange={handleSearchData} />
        <Button
          onClick={() => {
            dnaCtx.setLoading(true);
            upload();
          }}
          mt="12"
        >
          Submit
        </Button>
      </Stack>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID Prediksi</Th>
              <Th>Tanggal</Th>
              <Th>Nama</Th>
              <Th>Penyakit</Th>
              <Th>Status</Th>
              <Th>Kesamaan</Th>
            </Tr>
          </Thead>
          {dnaCtx.searchRes != null &&
            dnaCtx.searchRes.map((item) => {
              return (
                <Tbody>
                  <Tr>
                    <Th>{item.idprediksi}</Th>
                    <Th>{item.tanggal}</Th>
                    <Th>{item.nama_pasien}</Th>
                    <Th>{item.penyakit_prediksi}</Th>
                    <Th>{item.status == 1 ? "Terdeteksi" : "Tidak Terdeteksi"}</Th>
                    <Th>{item.kesamaan}%</Th>
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
  );
};
export default Search;

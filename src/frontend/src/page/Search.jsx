import { 
  Box, 
  Heading,
  Stack,
  Select,
  Input,
  Button,
  Text,
  HStack
} from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

import { useContext } from "react";
import { DNAContext } from "../component/Provider";
import axios from "axios";

const Search = () => {
  const dnaCtx = useContext(DNAContext);
  const handleSearchType = (event) => dnaCtx.setSearchType(event.target.value);
  const handleSearchData = (event) => dnaCtx.setSearchData(event.target.value);

  const upload = () => {
    const data = new FormData();
    data.append("type", dnaCtx.searchType);
    data.append("data", dnaCtx.searchData);

    console.log(data)
    axios
      .post("http://localhost:1323/api/search", data, {
        responseType: "json",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dnaCtx.setLoading(false);
        console.log(res["data"]["result"])
        dnaCtx.setSearchRes(res["data"]["result"])
        console.log(dnaCtx.searchRes)
      });
  };
  return (
      <Box p={24} pl={48} w="100%" position="relative" align = "center">
        <Heading>Search History</Heading>
        
        <Stack direction = "row" justify = "center" py = "10">
          <Select w = "35%" bg="teal.dark" color="main.100"  placeholder = 'Select type...' value = {dnaCtx.searchType} onChange = {handleSearchType}>
            <option style={{ color: 'black' }} value = 'nama_pasien'>Name</option>
            <option style={{ color: 'black' }} value = "tanggal">Date</option>
            <option style={{ color: 'black' }} value = "penyakit_prediksi">Disease</option>
          </Select>
          <Input px = "5" w="35%" id="dName" bg="teal.dark" color="main.100" placeholder="Input data..." value = {dnaCtx.searchData} onChange = {handleSearchData} />
          <Button onClick={() => {
            dnaCtx.setLoading(true);
            upload();
          }} mt="12">Submit</Button>
        </Stack>
        <TableContainer>
          <Table variant = 'simple'>
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
            {dnaCtx.searchRes != null && (dnaCtx.searchRes.map((item) => {
            
            return(
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
            )
          }))}
          </Table>
          {dnaCtx.searchRes == null && <Text align = "center" justify>No result :(</Text>}
        </TableContainer>


      </Box>
  )};
export default Search;

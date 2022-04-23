import { 
  Box, 
  Heading,
  Stack,
  Select,
  Input,
  Button
} from "@chakra-ui/react";
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
        console.log(res)
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
      </Box>
  );
};
export default Search;

import { Box, Center, Flex, Button } from "@chakra-ui/react";
import { DNAContext } from "../component/Provider";
import { clean, canBeCleaned } from "../util/sanitize";
import { useEffect, useContext } from "react";
import Navigation from "../component/navigation";
import axios from 'axios'

const Home = () => {
  const dnaCtx = useContext(DNAContext);

  useEffect(() => {dnaCtx.setCleanable(canBeCleaned(dnaCtx.Text))}, [dnaCtx.Text]);

  const upload = () => {
    const data = new FormData();
    data.append('text', dnaCtx.Text)
    data.append('pattern', dnaCtx.pattern)

    axios.post("http://localhost:1323/api/match", data, {
      responseType: 'json',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      dnaCtx.setLoading(false)
      console.log("YOUR MOM HAS SENT A RESPONSE")
      console.log(res["data"]["found"]);
      console.log("Pattern found at: ", res["data"]["indexes"])
    })
  }

  const parseFile = (ev) => {
    const reader = new FileReader()
    reader.onloadend = (ev) => {
      const pattern_arr = ev.target.result.split("\r\n");
      dnaCtx.setText(pattern_arr[0]);
      dnaCtx.setPattern(pattern_arr[1]);
    }
    reader.readAsText(ev.target.files[0]);
  }

  return (
    <div>
      <Center>Title</Center>
      <Flex border="2px" justify="center">

        {/* left side */}
        <Box border="1px" w="30%">
          <Navigation />
        </Box>
        {/* left side */}

        {/* right side */}
        <Box border="1px" w="50%">
          buat the main thing 
          1. masukan file DNA 
          2. pilih method 
          3. run, tunggu hasil 3. hasilnya
          <input type = "file" accept = ".txt" 
            onChange = {(ev) => {
              parseFile(ev)
            }}/>
          
          {dnaCtx.Text === ""? <></> : !dnaCtx.cleanable ? <div>tidak bisa dibersihkan </div> : <div>bisa dibersihkan. kasih tombol submit</div>}
          <Button
            isLoading = {dnaCtx.isLoading}
            colorScheme = "teal"
            size = "md"
            isDisabled = {dnaCtx.Text === "" || !dnaCtx.cleanable}
            onClick ={() => {
              dnaCtx.setLoading(true);
              upload();
            }}
          >
            Button
          </Button>
          {/* show data */}
          {dnaCtx.data && <div>ini data resultnya.yayyayya</div>}
        </Box>
        {/* right side */}
      </Flex>
    </div>
  );
};

export default Home;

import { DNAContext } from "../component/Provider";
import { canBeCleaned } from "../util/sanitize";
import { useEffect, useContext } from "react";
import Navigation from "../component/navigation";
import axios from "axios";
import { Box, Center, Flex, Button, Input, Stack, Text, RadioGroup, Radio } from "@chakra-ui/react";

const Home = () => {
  const dnaCtx = useContext(DNAContext);

  useEffect(() => {
    dnaCtx.setCleanable(canBeCleaned(dnaCtx.Text));
  }, [dnaCtx.Text]);

  const upload = () => {
    const data = new FormData();
    data.append("username", dnaCtx.Username);
    data.append("disease", dnaCtx.Disease);
    data.append("text", dnaCtx.Text);
    data.append("method", dnaCtx.Method);

    axios
      .post("http://localhost:1323/api/match", data, {
        responseType: "json",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dnaCtx.setLoading(false);
        console.log(res["data"]);
        var response = res["data"];
        dnaCtx.setData(response["time"] + " - " + response["name"] + " - " + response["disease"] + " - " + response["found"] + " - " + response["similarity"] + "%");
        console.log("Pattern found at: ", res["data"]["indexes"]);
      });
  };

  const parseFile = (ev) => {
    const reader = new FileReader();
    reader.onloadend = (ev) => {
      dnaCtx.setText(ev.target.result);
    };
    reader.readAsText(ev.target.files[0]);
  };

  const handleUsername = (event) => dnaCtx.setUsername(event.target.value);
  const handleDisease = (event) => dnaCtx.setDisease(event.target.value);
  // const handleMethod = (event) => dnaCtx.setMethod(event.target.value);
  //tambahin check if backend is dead

  return (
    <div>
      <Center>Title</Center>
      <Box border="1px" px="5" py="5">
        1. Masukkan file berisi string DNA <br />
        2. pilih method <br />
        3. run, tunggu hasilnya <br />
        <Stack spacing={3}>
          <Input placeholder="Nama Pengguna" size="sm" value={dnaCtx.Username} onChange={handleUsername} />
          <Input placeholder="Nama Penyakit" size="sm" value={dnaCtx.Disease} onChange={handleDisease} />
          <RadioGroup value={dnaCtx.Method} onChange={dnaCtx.setMethod}>
            <Stack direction="row">
              <Radio value="BM">Boyer-Moore</Radio>
              <Radio value="KMP">KMP</Radio>
            </Stack>
          </RadioGroup>
          <input
            type="file"
            accept=".txt"
            onChange={(ev) => {
              parseFile(ev);
            }}
          />
        </Stack>
        {dnaCtx.Text === "" ? <></> : !dnaCtx.cleanable ? <div>tidak bisa dibersihkan </div> : <div>bisa dibersihkan. kasih tombol submit</div>}
        <Button
          isLoading={dnaCtx.isLoading}
          colorScheme="teal"
          size="md"
          isDisabled={!dnaCtx.Text || !dnaCtx.cleanable || !dnaCtx.Method || !dnaCtx.Username || !dnaCtx.Disease}
          onClick={() => {
            dnaCtx.setLoading(true);
            upload();
          }}
        >
          Check
        </Button>
        {/* show data */}
        {dnaCtx.data && (
          <div>
            {" "}
            <Text fontSize="sm">{dnaCtx.data}</Text>
          </div>
        )}
        {/* show data */}
      </Box>
      {/* right side */}
    </div>
  );
};

export default Home;

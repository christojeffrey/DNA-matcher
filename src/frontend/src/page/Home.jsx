import { 
  Box, 
  Radio, 
  RadioGroup,
  Heading, 
  Text, Input, 
  Center, 
  Code, 
  Button, 
  Stack,
  Select } from "@chakra-ui/react";
import { FileUploader } from "react-drag-drop-files";
import { useState, useContext, useEffect } from "react";
import { DNAContext } from "../component/Provider";
import axios from "axios";

const Home = () => {

  const dnaCtx = useContext(DNAContext);
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

  useEffect(() => {
    axios.get("http://localhost:1323/api/alldiseases", {
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      .then((res) => {
        console.log(res)
        dnaCtx.setDiseaseList(res["data"]["name"])

      });
  }, [])

  // Drag and drop DNA sequence file
  const fileTypes = ["TXT"];
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const handleChange = (file) => {
    // scrollable = false;
    setFile(file);
    document.getElementById("dName").value = file.name.slice(0,-4);
    var fr = new FileReader();
    fr.readAsText(file);
    fr.onload = function () {
      setText(fr.result);
      dnaCtx.setText(fr.result);
    }
  };

  const uploadRecord = () => {
    const data = new FormData();
    console.log(dnaCtx.Text, dnaCtx.Username, dnaCtx.Disease, dnaCtx.Method)
    if (dnaCtx.Text == null || dnaCtx.Username == null || dnaCtx.Disease == null || dnaCtx.Method == null){
      alert("Please make sure all data is inserted!")
    }
    else{
      dnaCtx.setText(dnaCtx.Text);
      data.append("username", dnaCtx.Username);
      data.append("disease", dnaCtx.Disease);
      data.append("text", dnaCtx.Text);
      data.append("method", dnaCtx.Method);
      console.log(data)
      axios.post("http://localhost:1323/api/match", data, {
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          dnaCtx.setLoading(false);
          console.log(res)
          console.log(res["data"]);
          var response = res["data"];
          dnaCtx.setData(response["time"] + " - " + response["name"] + " - " + response["disease"] + " - " + (response["found"] ? "Terdeteksi" : "Tidak Terdeteksi") + " - " + response["similarity"] + "%");
          console.log("Pattern found at: ", res["data"]["indexes"]);
        }).catch(() => {
          alert("Please make sure your text is valid! (no spaces or characters beside character A, C, G, T)")
          dnaCtx.setData(null)
        });
    }

  };

  const handleUsername = (event) => dnaCtx.setUsername(event.target.value);
  const handleDisease = (event) => dnaCtx.setDisease(event.target.value);
  
  return (
    <>
      {/* CONTENT */}
      <Box p={24} pl={48} w="100%" position="relative" align = "center">
        <Heading>Input New Disease</Heading>
        <Text as="h2" mt="12">DNA sequence</Text>
        <FileUploader
          multiple={false}
          handleChange={handleChange}
          name="dnaSequence"
          types={fileTypes}
        >
          <Box border="2px" borderColor="teal.dark" bg="main.500" rounded="lg" cursor="pointer" p="12" maxH="30vh" overflow={"auto"}>
            {file ? (
              <>
              <Center><Text><b>Drag and drop</b> a file here or <b><u>click</u></b> to change file</Text></Center>
              <Center><Text my="3">Uploaded: <Code color="accent">{file.name}</Code></Text></Center>
              <Center><Text>{text}</Text></Center>
              </>
              ) : (
              <>
              <Center><Text><b>Drag and drop</b> a file here or <b><u>click</u></b> to select a file</Text></Center>
              <Center><Text>Upload a <Code color="accent">.txt</Code> file containing a DNA sequence</Text></Center>
              </>
            )}
          </Box>
        </FileUploader>
        
        <Stack mt="12" w="60%">
          <Text as="h2" w="60">Username</Text>
          <Input w="100%" id="dName" bg="teal.dark" color="main.100" placeholder="Input username" value = {dnaCtx.Username} onChange = {handleUsername} />
          <Text as="h2" w="60">Disease</Text>
          
          <Select bg="teal.dark" color="main.100"  placeholder = 'Select disease' value = {dnaCtx.Disease} onChange = {handleDisease}>
            {/* <option style={{ color: 'black' }} value = 'HIV'>HIV</option>
            <option style={{ color: 'black' }} value = "Alzheimer's">Alzheimer's</option>
            <option style={{ color: 'black' }} value = "Parkinson's">Parkinson's</option> */}
            {dnaCtx.diseaseList != null && dnaCtx.diseaseList.map((disease) => {
              return(
                  <option style={{ color: 'black' }} value = {disease}>{disease}</option>
              )})}
          </Select>
          <RadioGroup value={dnaCtx.Method} onChange={dnaCtx.setMethod}>
            <Stack direction="row">
              <Radio value="BM">Boyer-Moore</Radio>
              <Radio value="KMP">KMP</Radio>
            </Stack>
          </RadioGroup>
        </Stack>

        <Button onClick={() => {
            dnaCtx.setLoading(true);
            uploadRecord();
          }} mt="12">Submit</Button>

        {dnaCtx.data && (
          <div>
            {" "}
            <Text fontSize="xl" py = "3">{dnaCtx.data}</Text>
          </div>
        )}
      </Box>
    </>
  );
};

export default Home;

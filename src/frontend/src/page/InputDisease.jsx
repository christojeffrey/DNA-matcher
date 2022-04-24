import { Box, Flex, Heading, Text, Input, Center, Code, Button } from "@chakra-ui/react";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import axios from "axios";
const InputDisease = () => {
  // Change page on scroll
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

  const upload = () => {
    const data = new FormData();
    console.log(inputtedName, inputtedData)
    if (inputtedName == null ||inputtedData == null){
      alert("Please make sure all data is inserted!")
    }
    else{
      data.append("name", inputtedName);
      data.append("data", inputtedData);
      console.log(data)
      axios.put("http://localhost:1323/api/add", data, {
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          alert("Successfully added new data!")
        }).catch(() => {
          alert("Please make sure your text is valid and disease hasn't existed before!")
        });
    }

  };

  const fileTypes = ["TXT"];
  const [file, setFile] = useState(null);

  const handleChange = (file) => {
    // scrollable = false;
    console.log("epico")
    setFile(file);
    document.getElementById("dName").value = file.name.slice(0,-4);
    var fr = new FileReader();
    fr.readAsText(file);
    fr.onload = function () {
      setInputtedData(fr.result);
    }
  };

  const [inputtedName, setInputtedName] = useState(null)
  const [inputtedData, setInputtedData] = useState(null)
  const handleName = (event) => setInputtedName(event.target.value);
 
  return (
    <Box p={24} pl={48} w="100%" position="relative" >
      <Heading>Input New Disease</Heading>
      <Text as="h2" mt="12">DNA sequence</Text>
          <FileUploader
          multiple={false}
          handleChange={handleChange}
          name="dnaSequence"
          types={fileTypes}
        >
          <Box border="2px" borderColor="teal.dark" bg="main.500" rounded="lg" cursor="pointer" p="12" maxH="30vh" overflowY={"auto"}>
            {file ? (
              <>
              <Center><Text><b>Drag and drop</b> a file here or <b><u>click</u></b> to change file</Text></Center>
              <Center><Text my="3">Uploaded: <Code color="accent">{file.name}</Code></Text></Center>
              <Center><Text width="100%" textAlign="center">{inputtedData}</Text></Center>
              </>
              ) : (
              <>
              <Center><Text><b>Drag and drop</b> a file here or <b><u>click</u></b> to select a file</Text></Center>
              <Center><Text>Upload a <Code color="accent">.txt</Code> file containing a DNA sequence</Text></Center>
              </>
            )}
          </Box>
        </FileUploader>
      <Flex mt="12" w="100%">
        <Text as="h2" w="60" >Disease name</Text>
        <Input value = {inputtedName} onChange = {handleName} w="100%" id="dName" bg="teal.dark" color="main.100" placeholder="Input disease name" />
      </Flex>

      <Button onClick = {upload} mt="12">Submit</Button>
    </Box>
  );
};

export default InputDisease;
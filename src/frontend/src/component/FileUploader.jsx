import { FileUploader } from "react-drag-drop-files";
import { Box, Text, Center, Code } from "@chakra-ui/react";
import { useState } from "react";

const DNAFileUploaderComponent = ({ setDNA, setTitle }) => {
  const fileTypes = ["TXT"];
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  return (
    <FileUploader
      multiple={false}
      handleChange={(file) => {
        setFile(file);
        // document.getElementById("dName").value = file.name.slice(0, -4);
        setTitle(file.name.slice(0, -4));
        var fr = new FileReader();
        fr.readAsText(file);
        fr.onload = function () {
          setText(fr.result);
          console.log("dna");
          console.log(fr.result);
          setDNA(fr.result);
        };
      }}
      name="dnaSequence"
      types={fileTypes}
    >
      <Box border="2px" borderColor="teal.dark" bg="main.500" rounded="lg" cursor="pointer" p="12" maxH="30vh" overflowY={"auto"}>
        {file ? (
          <>
            <Center>
              <Text>
                <b>Drag and drop</b> a file here or{" "}
                <b>
                  <u>click</u>
                </b>{" "}
                to change file
              </Text>
            </Center>
            <Center>
              <Text my="3">
                Uploaded: <Code color="accent">{file.name}</Code>
              </Text>
            </Center>
            <Center>
              <Text width="100%" textAlign="center">
                {text}
              </Text>
            </Center>
          </>
        ) : (
          <>
            <Center>
              <Text>
                <b>Drag and drop</b> a file here or{" "}
                <b>
                  <u>click</u>
                </b>{" "}
                to select a file
              </Text>
            </Center>
            <Center>
              <Text>
                Upload a <Code color="accent">.txt</Code> file containing a DNA sequence
              </Text>
            </Center>
          </>
        )}
      </Box>
    </FileUploader>
  );
};

export default DNAFileUploaderComponent;

import { Box, Center, Flex, Button } from "@chakra-ui/react";
import { clean, canBeCleaned } from "../util/sanitize";
import { useEffect, useState } from "react";
import Navigation from "../component/navigation";
const Home = () => {
  const [DNAString, setDNAString] = useState("");
  const [isCleanable, setIsCleanable] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsCleanable(canBeCleaned(DNAString));
  }, [DNAString]);

  const handleButtonOnClick = () => {
    const url = "https://jsonplaceholder.typicode.com/todos/1"; // temporary
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setError(null);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setData(null);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Center>buat title ato apalah</Center>

      <Flex border="2px" justify="center">
        {/* left side */}
        <Box border="1px" w="30%">
          <Navigation />
        </Box>
        {/* left side */}
        {/* right side */}
        <Box border="1px" w="50%">
          buat the main thing 1. masukan file DNA 2. pilih method 3. run, tunggu hasil 3. hasilnya
          <input
            type="file"
            accept=".txt"
            onChange={(e) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                console.log(e.target.result);
                setDNAString(e.target.result);
              };
              reader.readAsText(e.target.files[0]);
            }}
          />
          {DNAString === "" ? <></> : !isCleanable ? <div>tidak bisa dibersihkan </div> : <div>bisa dibersihkan. kasih tombol submit</div>}
          <Button
            isLoading={isLoading}
            colorScheme="teal"
            size="md"
            isDisabled={DNAString === "" || !isCleanable}
            onClick={() => {
              setIsLoading(true);
              handleButtonOnClick();
            }}
          >
            Button
          </Button>
          {/* show data */}
          {data && <div>ini data resultnya.yayyayya</div>}
        </Box>
        {/* right side */}
      </Flex>
    </div>
  );
};

export default Home;

import AllRoutes from "./AllRoutes";
import Navigation from "./component/navigation";
import { Box, ScaleFade, useDisclosure, ChakraProvider } from "@chakra-ui/react";
import {} from "@chakra-ui/react";
import { defaultTheme, secondaryTheme } from "./theme";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const App = () => {
  const location = useLocation();
  // harusnya pake context, tapi males :v. toh cuman turun sekali, yodah lah
  const [isSecondaryTheme, setSecondaryTheme] = useState(false);
  return (
    <ChakraProvider theme={isSecondaryTheme ? secondaryTheme : defaultTheme}>
      {/* BACKGROUND */}
      <Box bg="main.100" minH="100vh" w="100%" color="teal.dark">
        {/* NAVBAR */}
        <Navigation setSecondaryTheme={setSecondaryTheme} />
        {/* CONTENT */}
        <AllRoutes />
      </Box>
    </ChakraProvider>
  );
};
export default App;

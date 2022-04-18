import React from "react";
import ReactDOM from "react-dom";
import { DNAProvider } from "./component/Provider";
import "./index.css";

import { ChakraProvider } from "@chakra-ui/react";

import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

// import App from "./App";
import Testing from "./page/Testing";
import Home from "./page/Home";
import Search from "./page/Search";
import Algo from "./page/Algo";
import About from "./page/About";
import NotFound from "./page/NotFound";

import Navigation from "./component/navigation";
import { Flex, Box } from "@chakra-ui/react";
ReactDOM.render(
  <React.StrictMode>
    <DNAProvider>
      <BrowserRouter>
        <ChakraProvider>
          <Flex border="2px" justify="center">
            {/* left side */}
            <Box border="1px" w="30%">
              <Navigation />
            </Box>
            {/* left side */}

            {/* right side */}
            <Box border="1px" w="50%" px="5" py="5">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="search" element={<Search />} />
                <Route path="algo" element={<Algo />} />
                <Route path="testing" element={<Testing />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
            {/* right side */}
          </Flex>
        </ChakraProvider>
      </BrowserRouter>
    </DNAProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

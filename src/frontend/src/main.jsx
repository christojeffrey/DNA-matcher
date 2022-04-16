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
import About from "./page/About";
import NotFound from "./page/NotFound";
ReactDOM.render(
  <React.StrictMode>
    <DNAProvider>
      <BrowserRouter>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="testing" element={<Testing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </DNAProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

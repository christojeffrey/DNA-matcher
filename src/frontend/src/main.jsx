import React from "react";
import ReactDOM from "react-dom";
import { DNAProvider } from "./component/Provider";
import "./index.css";

import { ChakraProvider } from "@chakra-ui/react";
//import theme from "./theme";

import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

// import App from "./App";
import Testing from "./page/Testing";
import Home from "./page/Home";
import Search from "./page/Search";
import Algo from "./page/Algo";
import About from "./page/About";
import Input from "./page/InputDisease";
import NotFound from "./page/NotFound";

import Navigation from "./component/navigation";
import { Flex, Box } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    main: {
      100: "#FAFCFB",
      200: "#F5F9FA",
      300: "#F0F6F6",
      400: "#EAF3F2",
      500: "#E4EEEF",
      600: "#C1D9DB",
      700: "#9BBDC2",
      800: "#71A2A7",
      900: "#1E6C76",
    },
    teal: {
      dark: "#005A63",
      mid: "#00ABB2",
      light: "#87E4DA",
    },
    accent: "#E76859",
  },
  fonts: {
    body: "Montserrat, sans-serif",
    heading: "Georgia, sans-serif",
    mono: "Menlo, monospace",
  },
  shadows: {
    navbar: "5px 0px 25px 5px rgba(30, 108, 118, 0.7)",
    md: "10px 10px 0 75px rgba(30, 108, 118, 0.5)",
    xl: "10px 10px 0 250px rgba(30, 108, 118, 0.25)",
  },
})

ReactDOM.render(
  <React.StrictMode>
    <DNAProvider>
      <BrowserRouter>
        <ChakraProvider theme={theme}>

          {/* NAVBAR */}
          <Navigation />

          {/* CONTENT */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="input" element={<Input />} />
            <Route path="search" element={<Search />} />
            <Route path="algo" element={<Algo />} />
            <Route path="testing" element={<Testing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </ChakraProvider>
      </BrowserRouter>
    </DNAProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

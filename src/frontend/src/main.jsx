import React from "react";
import ReactDOM from "react-dom";
import { DNAProvider } from "./component/Provider";
import "./index.css";

import { ChakraProvider } from "@chakra-ui/react";
//import theme from "./theme";

import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Home from "./page/Home";
import InputDisease from "./page/InputDisease";
import Search from "./page/Search";
import About from "./page/About";

import Navigation from "./component/navigation";
import { Box } from "@chakra-ui/react";

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
    heading: "Montserrat, sans-serif",
    mono: "Menlo, monospace",
  },
  styles: {
    global: {
      h1: {
        fontWeight: "700",
        fontSize: "2.5rem",
      },
      h2: {
        fontWeight: "500",
        fontSize: "1.5rem",
      },
    },
  },
  shadows: {
    navbar: "5px 0px 25px 5px rgba(30, 108, 118, 0.7)",
    md: "10px 10px 0 75px rgba(30, 108, 118, 0.5)",
    xl: "10px 10px 0 250px rgba(30, 108, 118, 0.25)",
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 700,
        color: "teal.dark",
        textShadow: "5px 5px 25px rgba(30, 108, 118, 0.3)",
      },
      sizes: {
        // default size is md
        xl: {
          fontSize: "50px",
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <DNAProvider>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <Box bg="main.100" minH="100vh" w="100%" color="teal.dark">
            {/* NAVBAR */}
            <Navigation />

            {/* CONTENT */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="input" element={<InputDisease />} />
              <Route path="search" element={<Search />} />
              {/* <Route path="algo" element={<Algo />} /> */}
              {/* <Route path="testing" element={<Testing />} />
              <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Box>
        </ChakraProvider>
      </BrowserRouter>
    </DNAProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

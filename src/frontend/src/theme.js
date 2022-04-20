// THIS FILE IS UNUSED, CHANGE THEME IN MAIN.JSX

import { extendTheme } from "@chakra-ui/react";

export default theme = extendTheme({
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
    body: "system-ui, sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
  },
  shadows: {
    navbar: "rgba(30, 108, 118, 0.0) 3px 0 15px -250px",
    md: "10px 10px 0 75px rgba(30, 108, 118, 0.5)",
    xl: "10px 10px 0 250px rgba(30, 108, 118, 0.25)",
  },
})
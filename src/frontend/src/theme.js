// THIS FILE IS UNUSED, CHANGE THEME IN MAIN.JSX

import { extendTheme } from "@chakra-ui/react";
// ini theme awal yang ada di file ini
export const prevTheme = extendTheme({
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
});

// ini theme yang awalnya ada di main
export const defaultTheme = extendTheme({
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

export const secondaryTheme = extendTheme({
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
      dark: "#18191A",
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

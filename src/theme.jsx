// theme.js
import { extendTheme, IconButton } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    primary: {
      50: "#f2e8ff",
      100: "#dbb6ff",
      200: "#bf84ff",
      300: "#a351ff",
      400: "#8622ff",
      500: "#6b00e6",
      600: "#5200b4",
      700: "#3a0082",
      800: "#250050",
      900: "#120020",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "primary.800" : "primary.100",
        color: props.colorMode === "dark" ? "white" : "gray.800",
      },
    }),
  },
  components:{
   
  }
});

export default customTheme;

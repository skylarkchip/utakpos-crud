import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

// Lib
import { fonts } from "@/lib/fonts";
import { theme } from "@/lib/theme";

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-manrope: ${fonts.manrope.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

import "../styles/globals.css";
import "../styles/github-markdown-light.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../core/socket";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

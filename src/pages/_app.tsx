import "../styles/globals.css";
import "../styles/github-markdown-light.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { LiveDocProvider } from "../components/contexts/useLive";
import "../core/socket";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <LiveDocProvider>
        <Component {...pageProps} />
      </LiveDocProvider>
    </ChakraProvider>
  );
}

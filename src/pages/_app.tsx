import "../styles/globals.css";
import "../styles/github-markdown-light.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { LiveDocProvider } from "../components/contexts/useLive";
import "../core/socket";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <LiveDocProvider>
        <Head>
          <title>Markdown Editor</title>
        </Head>
        <Component {...pageProps} />
      </LiveDocProvider>
    </ChakraProvider>
  );
}

import { Box, Flex, Spacer, Heading } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Editor from "../components/editor/editor";
import InviteButton from "../components/modals/invite";
import Preview from "../components/preview/preview";

interface Props {
  roomID: string;
}

export default function Application(props: Props) {
  const { roomID } = props;

  return (
    <Box>
      <Head>
        <title>Editor {roomID ? ` - ${roomID}` : ""}</title>
      </Head>
      <Flex
        alignItems="center"
        backgroundColor="#282c34"
        width="100vw"
        height="8vh"
        paddingX="20px"
        zIndex="999"
        gap="10px"
      >
        <Heading color="#F2EFE3">
          <Link href="/">Markdown Editor</Link>
        </Heading>
        <Spacer />
        <Link href="https://www.micahelias.com" target="_blank">
          <Image src="/m-logo.png" alt="M" height="32" width="32" />
        </Link>
        {roomID ? (
          <Box ml={1}>
            <InviteButton roomID={roomID} />
          </Box>
        ) : (
          <></>
        )}
      </Flex>
      <Flex>
        <Box flex="0.5" minH="92vh" maxH="92vh" overflowY="scroll" bg="none">
          <Editor />
        </Box>
        <Box flex="0.5" minH="92vh" maxH="92vh" overflowY="scroll" bg="#F2EFE3">
          <Preview />
        </Box>
      </Flex>
    </Box>
  );
}

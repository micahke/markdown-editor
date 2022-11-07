import {
  Box,
  Flex,
  Spacer,
  Button,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Editor from "../components/editor/editor";
import JoinRoomButton from "../components/modals/join-room";
import Preview from "../components/preview/preview";

interface Props {
  roomID: string;
}

export default function Application(props: Props) {
  const { roomID } = props;

  return (
    <Box>
      <Flex
        alignItems="center"
        backgroundColor="#282c34"
        width="100vw"
        height="8vh"
        paddingX="20px"
        zIndex="999"
        gap="10px"
      >
        <Heading color="#F2EFE3">Markdown Editor</Heading>
        <Spacer />
        {roomID ? (
          <>
            <JoinRoomButton />
            <Button colorScheme="gray" size="sm">
              Invite
            </Button>
          </>
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

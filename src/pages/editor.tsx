import {
  Box,
  Flex,
  Spacer,
  Button,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import Editor from "../components/editor/editor";
import JoinRoomButton from "../components/modals/join-room";
import Preview from "../components/preview/preview";

interface Props {
  roomID: string;
}

export default function Application(props: Props) {
  const { roomID } = props;
  const [doc, setDoc] = useState<string>("# Welcome");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc);
  }, []);

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
          <Editor onChange={handleDocChange} initialDoc={doc} />
        </Box>
        <Box flex="0.5" minH="92vh" maxH="92vh" overflowY="scroll" bg="#F2EFE3">
          <Preview doc={doc} />
        </Box>
      </Flex>
    </Box>
  );
}
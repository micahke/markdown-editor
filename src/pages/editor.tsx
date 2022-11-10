import { Box, Flex, Spacer, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useLive } from "../components/contexts/useLive";
import Editor from "../components/editor/editor";
import InviteButton from "../components/modals/invite";
import Preview from "../components/preview/preview";
import { API_PREFIX } from "../core/socket";

interface Props {
  roomID: string;
}

export default function Application(props: Props) {
  const { roomID } = props;
  const { setDoc } = useLive();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${API_PREFIX}/initial-doc`);
        const newDoc = response.data.initialDoc;
        setDoc(newDoc);
      } catch (error: any) {
        setDoc("# Welcome");
      }
    }
    if (!roomID) getData();
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
            <InviteButton roomID={roomID} />
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

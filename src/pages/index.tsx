import {
  Button,
  useDisclosure,
  Center,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Editor from "../components/editor/editor";
import JoinRoomButton from "../components/modals/invite";
import Preview from "../components/preview/preview";
import { createRoom } from "../core/room";
import { joinRoom } from "../core/socket";

export default function Home() {
  const { push } = useRouter();
  const toast = useToast();

  const navigateToRoom = () => {
    createRoom().then((roomData: any) => {
      console.log("done");
      if (roomData) {
        console.log(roomData);
        const pushLoc = `/editor/${roomData.roomID}`;
        push(
          {
            pathname: pushLoc,
            query: { creator: true },
          },
          pushLoc
        );
      } else {
        toast({
          title: "Error creating document",
          position: "bottom-left",
          status: "error",
          isClosable: true,
        });
      }
    });
  };

  const goToEditor = () => {
    push("/editor");
  };

  return (
    <Center height="100vh" backgroundColor="gray.800">
      <VStack>
        <Button colorScheme="teal" size="lg" onClick={navigateToRoom}>
          Go to app
        </Button>
        <Button colorScheme="gray" size="md" onClick={goToEditor}>
          Just write
        </Button>
      </VStack>
    </Center>
  );
}

import { Button, Center, Spinner, useToast, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLive } from "../components/contexts/useLive";
import { trackEvent } from "../core/analytics";
import { EVENTS } from "../core/events";
import { createRoom } from "../core/room";

export default function Home() {
  const { push } = useRouter();
  const toast = useToast();
  const { setCode, setGotData } = useLive();
  const [loading, setLoading] = useState(false);

  const navigateToRoom = () => {
    setLoading(true);
    createRoom().then((roomData: any) => {
      if (roomData) {
        setCode(roomData.code);
        trackEvent(EVENTS.ROOM_CREATED);
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
        setLoading(false);
      }
    });
  };

  const goToEditor = async () => {
    trackEvent(EVENTS.DOCUMENT_CREATED);
    push("/editor");
  };

  useEffect(() => {
    setGotData(false);
  }, [setGotData]);

  return (
    <Center height="100vh" backgroundColor="gray.800">
      <VStack>
        {!loading ? (
          <Button colorScheme="teal" size="lg" onClick={navigateToRoom}>
            Go to app
          </Button>
        ) : (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal"
            size="xl"
            mb="5"
          />
        )}
        <Button colorScheme="gray" size="md" onClick={goToEditor}>
          Just write
        </Button>
      </VStack>
    </Center>
  );
}

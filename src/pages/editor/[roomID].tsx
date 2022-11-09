import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { joinRoom, socket } from "../../core/socket";
import Application from "../editor";
import { GetServerSideProps, NextPageContext } from "next";
import JoinModal from "../../components/modals/join";
import { Box, useToast } from "@chakra-ui/react";
import { authenticatePasscode } from "../../core/room";

export default function Room() {
  const router = useRouter();
  const [rid, setRoomID] = useState<string>();
  const [validated, setValidated] = useState(false);
  const toast = useToast();

  const attemptValidation = async (name: string, pin: string) => {
    if (await authenticatePasscode(rid as string, pin)) {
      joinRoom(rid as string, name);
      setValidated(true);
    } else {
      toast({
        title: "Error",
        description: "Please enter the correct room code",
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const { roomID, creator } = router.query;
      if (creator) {
        setValidated(true);
        joinRoom(roomID as string, "User 1");
      }
      setRoomID(roomID as string);
    }
  }, [router.isReady, socket]);

  if (!validated) {
    return (
      <Box height="100vh" bg="gray.800">
        <JoinModal validated={validated} validate={attemptValidation} />
      </Box>
    );
  }

  return (
    <>
      <Application roomID={rid as string} />
    </>
  );
}

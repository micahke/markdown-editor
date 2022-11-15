import {
  Button,
  Center,
  Spinner,
  Box,
  Spacer,
  useToast,
  VStack,
  Heading,
  Flex,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLive } from "../components/contexts/useLive";
import { trackEvent } from "../core/analytics";
import { EVENTS } from "../core/events";
import { createRoom } from "../core/room";
import Link from "next/link";

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
    <>
      <Flex
        py={5}
        px={20}
        boxShadow={useColorModeValue("sm", "sm-dark")}
        position={"fixed"}
        width={"100%"}
        alignItems={"center"}
      >
        <Image src={"/logo.svg"} alt={"logo"} height={30} width={300} />
        <Spacer />
        <Link href="https://www.micahelias.com" target={"_blank"}>
          <Image src={"/m-logo2.png"} width={30} height={30} alt="m-logo" />
        </Link>
      </Flex>
      <Flex height={"42rem"} px={20}>
        <Center>
          <VStack>
            <Heading size={"2xl"} mb={3}>
              A collaborative editor for quick note taking.
            </Heading>
            <HStack alignSelf={"flex-start"}>
              <Button size={"lg"} colorScheme={"gray"} onClick={goToEditor}>
                Write solo
              </Button>
              {!loading ? (
                <Button
                  size={"lg"}
                  colorScheme={"teal"}
                  onClick={navigateToRoom}
                >
                  Go to editor
                </Button>
              ) : (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="teal"
                  size="xl"
                />
              )}
            </HStack>
          </VStack>
        </Center>
        <Center mt={80}>
          <Box className="editor-clipped">
            <Image src={"/editor.png"} height={900} width={900} alt="editor" />
          </Box>
        </Center>
      </Flex>
    </>
  );
}

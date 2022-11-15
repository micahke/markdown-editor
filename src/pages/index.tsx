import { Box, useToast, Heading, Flex, SimpleGrid } from "@chakra-ui/react";
import { features } from "../static/features";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLive } from "../components/contexts/useLive";
import { trackEvent } from "../core/analytics";
import { EVENTS } from "../core/events";
import { createRoom } from "../core/room";
import Card from "../components/landing/card";
import Navbar from "../components/landing/navbar";
import Banner from "../components/landing/banner";

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
      <Navbar />
      <Banner
        goToEditor={goToEditor}
        loading={loading}
        navigateToRoom={navigateToRoom}
      />
      <Box
        width={"100%"}
        py={10}
        backgroundColor={"gray.800"}
        px={{ base: 5, md: 20 }}
      >
        <Flex justifyContent={"center"} pb={10}>
          <Heading color="white" alignSelf={"center"}>
            Features
          </Heading>
        </Flex>
        <SimpleGrid minChildWidth={300} spacing={30}>
          {features.map((feature, index) => (
            <Card
              height={40}
              title={feature.title}
              desc={feature.description}
              icon={feature.icon}
              key={index}
            />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

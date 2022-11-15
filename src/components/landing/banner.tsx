import React from "react";
import {
  Flex,
  VStack,
  Heading,
  Center,
  Button,
  Spinner,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";

interface Props {
  goToEditor: () => void;
  loading: boolean;
  navigateToRoom: () => void;
}

export default function Banner({ goToEditor, loading, navigateToRoom }: Props) {
  return (
    <Flex
      height={{
        base: "52rem",
        md: "52rem",
      }}
      px={{
        base: 5,
        md: 20,
      }}
      pt={70}
    >
      <Center>
        <VStack>
          <Heading
            size={{
              base: "xl",
              sm: "2xl",
            }}
            textAlign={{
              base: "center",
              md: "inherit",
            }}
            mb={3}
          >
            A collaborative editor for quick note taking.
          </Heading>
          <Flex
            alignSelf={{
              base: "center",
              md: "flex-start",
            }}
            gap={3}
          >
            <Button size={"lg"} colorScheme={"gray"} onClick={goToEditor}>
              Write solo
            </Button>
            {!loading ? (
              <Button size={"lg"} colorScheme={"teal"} onClick={navigateToRoom}>
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
          </Flex>
        </VStack>
      </Center>
      <Center
        display={{
          base: "none",
          lg: "inherit",
        }}
      >
        <Box className="editor-clipped">
          <Image
            src={"/placeholder.svg"}
            height={900}
            width={900}
            alt="editor"
          />
        </Box>
      </Center>
    </Flex>
  );
}

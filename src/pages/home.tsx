import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Spacer,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
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
        <h1>Micah</h1>
      </Flex>
      <Flex height={"42rem"} px={20} backgroundColor={"teal.500"}>
        <Center>
          <VStack>
            <Heading size={"2xl"} mb={3}>
              A collaborative editor for quick note taking.
            </Heading>
            <HStack alignSelf={"flex-start"}>
              <Button size={"lg"} colorScheme={"gray"}>
                Write solo
              </Button>
              <Button size={"lg"} colorScheme={"teal"}>
                Go to editor
              </Button>
            </HStack>
          </VStack>
        </Center>
        <Center mt={20}>
          <Box className="editor-clipped">
            <Image src={"/editor.png"} height={600} width={1200} alt="editor" />
          </Box>
        </Center>
      </Flex>
    </>
  );
}

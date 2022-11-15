import { Flex, useColorModeValue, Link, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export default function Navbar() {
  return (
    <Flex
      py={5}
      px={{
        base: 5,
        md: 20,
      }}
      boxShadow={useColorModeValue("sm", "sm-dark")}
      position={"fixed"}
      width={"100%"}
      alignItems={"center"}
      backgroundColor={"white"}
      zIndex={999}
    >
      <Image src={"/logo.svg"} alt={"logo"} height={30} width={300} />
      <Spacer />
      <Link href="https://www.micahelias.com" target={"_blank"}>
        <Image src={"/m-logo.svg"} width={30} height={30} alt="m-logo" />
      </Link>
    </Flex>
  );
}

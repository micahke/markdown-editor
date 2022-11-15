import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { BiNetworkChart } from "react-icons/bi";

interface Props {
  title?: string;
  desc?: string;
  height?: number;
  icon?: JSX.Element;
}

export default function Card(props: Props) {
  const { title, desc, height, icon } = props;

  return (
    <Box
      minHeight={height}
      backgroundColor={"white"}
      borderRadius={5}
      boxShadow={"lg"}
      px={8}
      py={7}
      border={"1px solid lightgray"}
    >
      <HStack>
        {icon}
        <Heading size={"md"}>{title}</Heading>
      </HStack>
      <Text pt={3} fontSize={"lg"}>
        {desc}
      </Text>
    </Box>
  );
}

import {
  Box,
  Flex,
  Spacer,
  Heading,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Editor from "../components/editor/editor";
import InviteButton from "../components/modals/invite";
import Preview from "../components/preview/preview";
import { AiFillEye, AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import { trackEvent } from "../core/analytics";
import { EVENTS } from "../core/events";

interface Props {
  roomID: string;
}

export default function Application(props: Props) {
  const { roomID } = props;
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  const flexSize = isLargerThan700 ? 0.5 : 1.0;
  const [previewMode, setPreviewMode] = useState(false);

  const trackReferral = () => {
    trackEvent(EVENTS.WEBSITE_REFERRAL);
  };

  return (
    <Box>
      <Head>
        <title>Editor {roomID ? ` - ${roomID}` : ""}</title>
      </Head>
      <Flex
        alignItems="center"
        backgroundColor="#282c34"
        width="100vw"
        height="8vh"
        paddingX="20px"
        zIndex="999"
        gap="10px"
      >
        <Heading color="#F2EFE3">
          <Link href="/">Markdown Editor</Link>
        </Heading>
        <Spacer />
        <Link
          href="https://www.micahelias.com"
          onClick={trackReferral}
          target="_blank"
        >
          <Image src="/m-logo.png" alt="M" height="32" width="32" />
        </Link>
        <PreviewButton
          isLargerThan700={isLargerThan700}
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
        />
        {roomID ? (
          <Box>
            <InviteButton roomID={roomID} />
          </Box>
        ) : (
          <></>
        )}
      </Flex>
      <Flex>
        {isLargerThan700 || (!isLargerThan700 && !previewMode) ? (
          <Box
            flex={flexSize}
            minH="92vh"
            maxH="92vh"
            overflowY="scroll"
            bg="none"
          >
            <Editor />
          </Box>
        ) : (
          <></>
        )}
        {isLargerThan700 || (!isLargerThan700 && previewMode) ? (
          <Box
            flex={flexSize}
            minH="92vh"
            maxH="92vh"
            overflowY="scroll"
            bg="#F2EFE3"
          >
            <Preview />
          </Box>
        ) : (
          <></>
        )}
      </Flex>
    </Box>
  );
}

interface PreviewProps {
  isLargerThan700: boolean;
  previewMode: boolean;
  setPreviewMode: (mode: boolean) => void;
}

function PreviewButton(props: PreviewProps): JSX.Element {
  const { isLargerThan700, previewMode, setPreviewMode } = props;
  const toggle = () => {
    if (isLargerThan700) {
      setPreviewMode(false);
      return;
    }
    setPreviewMode(!previewMode);
  };

  if (isLargerThan700) return <></>;

  return (
    <IconButton
      colorScheme="gray"
      aria-label="Toggle Preview"
      icon={previewMode ? <AiFillEdit /> : <AiFillEye />}
      size="sm"
      fontSize="lg"
      onClick={toggle}
    />
  );
}

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Center,
  Text,
  Tag,
  VStack,
  Kbd,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  roomID: string;
}

const InviteButton: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { roomID } = props;

  return (
    <>
      <Button colorScheme="gray" size="sm" onClick={onOpen}>
        Invite
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite to Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="initial">
              <Text>Please share the following URL:</Text>
              <Tag size="lg">
                {`https://markdown.micahelias.com/editor/${roomID}`}
              </Tag>
              <Text>Room passcode:</Text>
              <Center>
                <Tag size="lg">OHFshf</Tag>
              </Center>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InviteButton;

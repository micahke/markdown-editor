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
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";

const JoinRoomButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="gray" size="sm" onClick={onOpen}>
        Join
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join a room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Enter the room code and password and join</p>
            <FormControl marginTop="20px">
              <FormLabel>Room Code</FormLabel>
              <Input placeholder="Room code" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Passcode</FormLabel>
              <Input type="password" placeholder="Passcode" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3}>
              Join
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JoinRoomButton;

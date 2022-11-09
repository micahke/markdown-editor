import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
  ModalBody,
  ModalHeader,
  PinInput,
  useDisclosure,
  HStack,
  FormControl,
  FormLabel,
  Input,
  PinInputField,
  Center,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";

interface Props {
  validated: boolean;
  validate: (name: string, pin: string) => void;
}

const JoinModal: React.FC<Props> = (props) => {
  const { validated, validate } = props;
  const { isOpen, onOpen } = useDisclosure();
  const [name, setName] = useState("User 1");
  const [pin, setPin] = useState("");

  const updateName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const tryValidation = () => {
    validate(name, pin);
  };

  return (
    <>
      <Modal
        isOpen={!validated}
        onClose={tryValidation}
        size="lg"
        closeOnEsc={false}
        closeOnOverlayClick={false}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join Document</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={updateName} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Code</FormLabel>
              <Center>
                <HStack>
                  <PinInput size="lg" value={pin} onChange={setPin}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </Center>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" onClick={tryValidation}>
              Join
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JoinModal;

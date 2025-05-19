import { Button, useDisclosure } from "@heroui/react";
import { ModalSignIn } from "../../Modals/ModalSignIn";
import { ModalSignUp } from "../../Modals/ModalSignUp";

export const LoggedOutNavbar = () => {
  const signInModalControl = useDisclosure();
  const signUpModalControl = useDisclosure();
  return (
    <>
      <Button
        color="primary"
        variant="light"
        onPress={() => signInModalControl.onOpen()}
      >
        Sign In
      </Button>
      <Button
        color="primary"
        variant="flat"
        onPress={() => signUpModalControl.onOpen()}
      >
        Sign Up
      </Button>

      <ModalSignIn {...signInModalControl} />
      <ModalSignUp {...signUpModalControl} />
    </>
  );
};

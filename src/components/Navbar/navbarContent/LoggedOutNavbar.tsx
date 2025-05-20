import { ModalControl } from "@/types";
import { Button, NavbarItem } from "@heroui/react";
import { NavbarMenuComponent } from "./NavbarMenuComponent";

interface LoggedOutNavbarProps {
  signInModalControl: ModalControl;
  signUpModalControl: ModalControl;
  isMenuOpen: boolean;
}

export const LoggedOutNavbar = ({
  signInModalControl,
  signUpModalControl,
}: LoggedOutNavbarProps) => {
  return (
    <>
      <NavbarItem className="hidden md:flex">
        <Button
          color="primary"
          variant="light"
          onPress={() => signInModalControl.onOpen()}
        >
          Sign In
        </Button>
      </NavbarItem>

      <NavbarItem className="hidden md:flex">
        <Button
          color="primary"
          variant="flat"
          onPress={() => signUpModalControl.onOpen()}
        >
          Sign Up
        </Button>
      </NavbarItem>

      {/* Mobile Navbar menu */}
      <NavbarItem className="flex md:hidden">
        <NavbarMenuComponent
          signInModalControl={signInModalControl}
          signUpModalControl={signUpModalControl}
        />
      </NavbarItem>
    </>
  );
};

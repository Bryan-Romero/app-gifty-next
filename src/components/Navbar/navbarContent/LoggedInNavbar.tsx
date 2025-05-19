import { logout } from "@/services/apiRes/logout";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export const LoggedInNavbar = (session: Session) => {
  const handleLogout = async () => {
    await signOut({ redirect: false });
    await logout(session.tokens.access_token);
  };

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name={session.user.username}
            size="sm"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
        >
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            textValue={`Signed in as ${session.user.email}`}
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{session.user.email}</p>
          </DropdownItem>
          <DropdownItem
            key="settings"
            textValue="My Settings"
          >
            My Settings
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onClick={handleLogout}
            textValue="Log Out"
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

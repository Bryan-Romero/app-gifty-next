import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { ErrorEnum } from "./error.enum";
import { TokenAccessRes, UserAccessRes } from "../apiRes/accessRes";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    user?: UserAccessRes & AdapterUser;
    tokens?: TokenAccessRes;
    error?: ErrorEnum;
  }

  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user?: UserAccessRes & AdapterUser;
    tokens?: TokenAccessRes;
    error?: ErrorEnum;
  }
}
// The `JWT` interface can be found in the `next-auth/jwt` submodule

declare module "next-auth/jwt" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface JWT {
    user?: UserAccessRes & AdapterUser;
    tokens?: TokenAccessRes;
    error?: ErrorEnum;
  }
}

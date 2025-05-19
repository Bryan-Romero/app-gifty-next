import "next-auth";
import "next-auth/jwt";
import { ErrorEnum } from "./error.enum";
import { AccessRes, TokenAccessRes, UserAccessRes } from "../apiRes/accessRes";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends AccessRes {
    id?: string;
    user?: UserAccessRes;
    tokens?: TokenAccessRes;
    error?: AccessRes["error"];
  }
  interface User {
    id?: string;
    user?: UserAccessRes;
    tokens?: TokenAccessRes;
    error?: AccessRes["error"];
  }
}

declare module "next-auth/jwt" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface JWT {
    id?: string;
    user?: UserAccessRes;
    tokens?: TokenAccessRes;
    error?: AccessRes["error"];
  }
}

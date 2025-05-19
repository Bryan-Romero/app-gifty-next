import { ErrorEnum } from "../common/error.enum";
import { User } from "./user";

export interface AccessRes {
  user: UserAccessRes;
  tokens: TokenAccessRes;
  error?: ErrorEnum;
}

export interface UserAccessRes
  extends Pick<
    User,
    | "_id"
    | "createdAt"
    | "updatedAt"
    | "active"
    | "username"
    | "email"
    | "emailVerified"
    | "roles"
  > {}

export interface TokenAccessRes {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

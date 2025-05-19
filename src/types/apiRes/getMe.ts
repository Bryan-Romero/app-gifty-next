import { User } from "./user";

export interface GetMe
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

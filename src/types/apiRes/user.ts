import { Favorite } from "./favorite";

export interface User {
  _id: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  username: string;
  email: string;
  roles: Array<string>;
  hashRefreshToken: string;
  emailVerified: boolean;
  emailVerifiedToken: string;
  favorites: Array<Favorite>;
}

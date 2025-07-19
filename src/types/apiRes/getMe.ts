import { User } from './user'

export type GetMe = Pick<
  User,
  '_id' | 'createdAt' | 'updatedAt' | 'active' | 'username' | 'email' | 'emailVerified' | 'roles'
>

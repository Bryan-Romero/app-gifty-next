import { AdapterUser } from 'next-auth/adapters'

import { ErrorEnum } from '../common/error.enum'
import { User } from './user'

export interface AccessRes {
  user: UserAccessRes & AdapterUser
  tokens: TokenAccessRes
  error?: ErrorEnum
}

export type UserAccessRes = Pick<
  User,
  '_id' | 'createdAt' | 'updatedAt' | 'active' | 'username' | 'email' | 'emailVerified' | 'roles'
>

export interface TokenAccessRes {
  access_token: string
  expires_in: number
  refresh_token: string
}

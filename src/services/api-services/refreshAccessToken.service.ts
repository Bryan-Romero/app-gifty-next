import { JWT } from 'next-auth/jwt'

import ApiClient from '@/lib/api/axios-client'
import { ErrorEnum } from '@/types'
import { ApiRes } from '@/types/api-types/apiRes'

export async function refreshAccessToken(data: JWT): Promise<JWT | null> {
  try {
    const res = await ApiClient.post<ApiRes<JWT>>(
      'auth/refresh-tokens',
      {},
      { headers: { Authorization: `Bearer ${data.tokens.refresh_token}` } }
    )
    return res.data.data
  } catch {
    return {
      ...data,
      error: ErrorEnum.RefreshAccessTokenError,
    }
  }
}

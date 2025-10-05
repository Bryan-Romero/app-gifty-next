import ApiClient from '@/lib/api/axios-client'
import { Signin } from '@/lib/validations/signin.schema'
import { AccessRes, ErrorEnum } from '@/types'
import { ApiRes } from '@/types/api-types/apiRes'

export async function signin(data: Signin): Promise<AccessRes | null> {
  try {
    const res = await ApiClient.post<ApiRes<AccessRes>>('auth/signin', data)
    return res.data.data
  } catch (error) {
    if (error?.response?.status === 401) {
      throw new Error(ErrorEnum.UnverifiedEmail)
    } else if (error?.response?.status === 403) {
      throw new Error(ErrorEnum.InvalidCredentials)
    } else if (error?.response?.status === 429) {
      throw new Error('Too many attempts, please try again later')
    }

    /** This error is a catch-all for any other error coming from the server that
     * is not specifically a 429 (too many attempts) or other 4xx errors */
    throw new Error('Unknown error, please try again later')
  }
}

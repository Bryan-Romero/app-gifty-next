import ApiClient from '@/lib/api/axios-client'
import { Signup } from '@/lib/validations/signup.schema'
import { ApiRes } from '@/types/api-types/apiRes'
import { MessageRes } from '@/types/api-types/messageRes'

export async function signup(data: Signup): Promise<MessageRes | null> {
  try {
    const res = await ApiClient.post<ApiRes<MessageRes>>('auth/signup', data)
    return res.data.data
  } catch (error) {
    console.log('🚀 ~ signup ~ error:', error?.response?.data)
    if (error?.response?.status === 409 || 400) {
      const errorResponse = error.response?.data?.response
      throw { fieldErrors: errorResponse }
    }

    /** This error is a catch-all for any other error coming from the server */
    throw new Error('Unknown error, please try again later')
  }
}

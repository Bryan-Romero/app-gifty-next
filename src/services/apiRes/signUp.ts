import { AxiosError } from 'axios'

import ApiClient from '@/lib/axios-client'
import { ApiRes } from '@/types/apiRes/apiRes'
import { MessageRes } from '@/types/apiRes/message-res'
import { TSignUpSchema } from '@/types/schemas/signUp'

export async function signUp(data: TSignUpSchema): Promise<MessageRes | null> {
  try {
    const res = await ApiClient.post<ApiRes<MessageRes>>('auth/signup', data)
    return res.data.data
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorResponse = err.response?.data?.response
      throw { fieldErrors: errorResponse }
    }
    throw err
  }
}

import { AxiosError } from 'axios'

import ApiClient from '@/lib/axios-client'
import { ApiRes, MessageRes, TEmailSchema } from '@/types'

export async function getResendEmail(data: TEmailSchema): Promise<MessageRes | null> {
  try {
    const res = await ApiClient.get<ApiRes<MessageRes>>('verification/resend-email', {
      params: data,
    })
    return res.data.data
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorResponse = err.response?.data?.response
      throw { fieldErrors: errorResponse }
    }
    throw err
  }
}

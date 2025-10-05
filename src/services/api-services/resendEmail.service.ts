import ApiClient from '@/lib/api/axios-client'
import { Email } from '@/lib/validations/email.schema'
import { ApiRes, MessageRes } from '@/types'

export async function resendEmail(data: Email): Promise<MessageRes | null> {
  try {
    const res = await ApiClient.get<ApiRes<MessageRes>>('verification/resend-email', {
      params: data,
    })
    return res.data.data
  } catch (error) {
    if (error?.response?.status === 400) {
      const errorResponse = error.response?.data?.response
      throw { fieldErrors: errorResponse }
    }
    /** This error is a catch-all for any other error coming from the server */
    throw new Error('Unknown error, please try again later')
  }
}

import ApiClient from '@/lib/api/axios-client'
import { ApiRes, MessageRes } from '@/types'

export async function getVerificationEmail(token: string): Promise<MessageRes | null> {
  try {
    const res = await ApiClient.get<ApiRes<MessageRes>>('verification/email', {
      params: {
        token,
      },
    })
    return res.data.data
  } catch (error) {
    if (error?.response?.status === 400) {
      throw new Error('Invalid or expired token')
    }
    /** This error is a catch-all for any other error coming from the server that
     * is not specifically a 403 (invalid credentials) or a 429 (too many attempts) */
    throw new Error('Something went wrong')
  }
}

import ApiClient from '@/lib/api/axios-client'
import { ResetPassword } from '@/lib/validations/resetPassword.schema'
import { ApiRes, MessageRes } from '@/types'

export async function resetPassword(data: ResetPassword & { token: string }): Promise<MessageRes | null> {
  try {
    const res = await ApiClient.post<ApiRes<MessageRes>>('user-password/reset', data)
    return res.data.data
  } catch (error) {
    if (error?.response?.status === 400) {
      const errorResponse = error.response?.data?.response
      throw { fieldErrors: errorResponse }
    }
    // Check if at least one errorResponse key is in the resetPasswordKeys
    // const hasSchemaKey = Object.keys(errorResponse).some((field) => resetPasswordKeys.includes(field))

    /** This error is a catch-all for any other error coming from the server */
    throw new Error('Unknown error, please try again later')
  }
}

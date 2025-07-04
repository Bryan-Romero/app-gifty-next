import { AxiosError } from 'axios'

import ApiClient from '@/lib/axios-client'
import { ApiRes, MessageRes, resetPasswordSchemaKeys, TResetPasswordSchema } from '@/types'

export async function resetPassword(data: TResetPasswordSchema & { token: string }): Promise<MessageRes | null> {
  try {
    const res = await ApiClient.post<ApiRes<MessageRes>>('user-password/reset', data)
    return res.data.data
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorResponse = err.response?.data?.response
      // Verifica si al menos una key de errorResponse está en el resetPasswordSchemaKeys
      const hasSchemaKey = Object.keys(errorResponse).some((field) => resetPasswordSchemaKeys.includes(field))
      if (hasSchemaKey) {
        throw { fieldErrors: errorResponse }
      }

      throw new Error('Invalid or expired token')
    }
    throw err
  }
}

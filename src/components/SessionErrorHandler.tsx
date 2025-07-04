'use client'

import { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'

import { ErrorEnum } from '@/types'

export default function SessionErrorHandler() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === ErrorEnum.RefreshAccessTokenError) {
      signOut({ callbackUrl: '/' })
    }
  }, [session?.error])

  return null
}

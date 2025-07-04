import { NextRequest, NextResponse } from 'next/server'

import { auth } from './auth'

// 1. Specify protected and public routes
const protectedRoutes = ['/my']
const publicRoutes = ['/auth']

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((p) => path.startsWith(p))
  const isPublicRoute = publicRoutes.some((p) => path.startsWith(p))

  // 3. Get user session
  const session = await auth()

  // 4. Redirect to / if the user is not authenticated
  if (isProtectedRoute && !session?.user?.id) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  // 5. Redirect to / if the user is authenticated
  if (isPublicRoute && session?.user?.id) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

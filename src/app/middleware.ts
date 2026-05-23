import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
  const isLoginRoute = request.nextUrl.pathname === "/login"

  const isLoggedIn = request.cookies.getAll().some(
    (cookie) => cookie.name.includes("auth-token") && cookie.value
  )

  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isLoginRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
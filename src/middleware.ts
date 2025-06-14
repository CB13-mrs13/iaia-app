
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add paths that require authentication
const protectedPaths = ['/account'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isAccessingProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (isAccessingProtectedPath) {
    // Client-side checks in /app/account/page.tsx will handle redirection
    // if the user is not authenticated. For this iteration, we are simplifying
    // server-side middleware checks.
    // A robust server-side check would involve verifying a session cookie
    // managed by a backend (e.g., Firebase Admin SDK in an API route).
  }

  return NextResponse.next();
}

// Specify which paths the middleware should run on
export const config = {
  matcher: ['/account/:path*'],
};


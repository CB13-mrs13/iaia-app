
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add paths that require authentication
const protectedPaths = ['/account'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the user is trying to access a protected path
  const isAccessingProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (isAccessingProtectedPath) {
    // Firebase auth state is typically managed client-side.
    // For server-side protection with middleware, you'd usually check a session cookie.
    // Firebase Admin SDK can be used to verify ID tokens passed as cookies if you set that up.
    // For this example, we'll assume a simple cookie check.
    // Replace 'firebaseAuthCookie' with the actual name of your auth cookie.
    const sessionCookie = request.cookies.get('firebaseIdToken'); // Placeholder, actual cookie name may vary

    if (!sessionCookie) {
      // Redirect to login page, preserving the intended destination
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect_to', pathname);
      return NextResponse.redirect(loginUrl);
    }
    // If you have a session cookie, you might want to verify it here
    // using Firebase Admin SDK if this middleware runs in a Node.js environment.
    // For Edge middleware, verification might be different or simpler.
  }

  return NextResponse.next();
}

// Specify which paths the middleware should run on
export const config = {
  matcher: ['/account/:path*'],
};

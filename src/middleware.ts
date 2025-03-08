import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/signup' || path.startsWith('/api/auth');
  
  // Get the token from the cookies
  const token = request.cookies.get('auth_token')?.value || '';
  
  // Redirect logic
  if (isPublicPath && token) {
    // If user is on a public path but has a token, redirect to dashboard
    if (path !== '/api/auth/logout') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  if (!isPublicPath && !token) {
    // If user is on a protected path but doesn't have a token, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/dashboard',
    '/api/auth/:path*',
  ],
}; 
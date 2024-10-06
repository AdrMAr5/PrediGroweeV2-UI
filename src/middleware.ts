// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

export async function middleware(request: NextRequest) {
  const sessionId = request.cookies.get('session_id')?.value;

  // Define which paths require authentication
  const authRequiredPaths = ['/startQuiz', '/account', '/quiz'];
  const adminPaths = ['/admin'];

  if (authRequiredPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (!sessionId) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  if (adminPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    // todo: call the auth service to get the user role
    const res = await axios.get('http://localhost');
    if (res.data.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

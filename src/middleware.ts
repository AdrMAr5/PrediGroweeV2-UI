import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_SERVICE_URL } from '@/Envs';

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
    if (!sessionId) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const response = await fetch(AUTH_SERVICE_URL + '/verifySession', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `session_id=${sessionId}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to verify session');
      }
      const data = await response.json();
      console.log(data);

      if (data.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (err) {
      console.error(err);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

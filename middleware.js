import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  console.log('Token:', token); // Optional for debugging

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/profile', '/profile/:path*'],
};

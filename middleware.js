// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.headers.get('tmn-access-token') || '';
  const userAgent = request.headers.get('user-agent') || '';

  const response = NextResponse.next();

  response.cookies.set('accessToken', token);
  response.cookies.set('userAgent', userAgent);

  return response;
}

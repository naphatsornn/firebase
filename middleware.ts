import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.headers.get('tmn-access-token');
  const userAgent = request.headers.get('user-agent');

  console.log("🧠 Token:", token);
  console.log("🧠 User-Agent:", userAgent);

  return NextResponse.next();
}

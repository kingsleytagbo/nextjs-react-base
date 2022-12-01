// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // show how rewrite works in middleware
  if (request.nextUrl.pathname.startsWith('/abc')) {
    return NextResponse.rewrite(new URL('/abc/', request.url));
  }
}

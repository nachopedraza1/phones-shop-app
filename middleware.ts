import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserResponse } from './interfaces/User';


export async function middleware(request: NextRequest) {

    const redirectParameter = request.nextUrl.searchParams.get('p') || '/';

    try {
        await fetch('http://localhost:3000/api/auth/validate-token').then(resp => resp.json());
        return NextResponse.redirect(new URL(redirectParameter, request.url));
    } catch (error) {
        return NextResponse.next();
    }

}

export const config = {
    matcher: '/auth/:path*',
}
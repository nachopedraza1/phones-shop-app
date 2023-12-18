import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {

    const redirectParameter = req.nextUrl.searchParams.get('p') || '/';

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (session) {
        return NextResponse.redirect(new URL(redirectParameter, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/auth/:path*', '/cart'],
}
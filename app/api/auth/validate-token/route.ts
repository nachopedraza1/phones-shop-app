import db from "@/database/connection";
import { IUser } from "@/interfaces/User";
import { isValidToken, signToken } from "@/utils/jwt";
import { searchUserQuery } from "@/utils/querys";
import { ResultSetHeader } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const token = req.nextUrl.searchParams.get('token');

    if (!token) {
        return NextResponse.json({ msg: 'Token de autorización no válido' }, { status: 400 });
    }

    try {
        const email = await isValidToken(token);

        if (!email) return NextResponse.json({ msg: 'Token no válido.' }, { status: 400 });

        const [[user]] = await db.query<ResultSetHeader & IUser[]>(searchUserQuery, [email]);

        if (!user) {
            return NextResponse.json({ msg: 'Usuario no encontrado.' }, { status: 400 });
        }

        const renewToken = signToken(user.id, user.email);

        return NextResponse.json(
            {
                token: renewToken,
                name: user.name,
                email: user.email
            },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ msg: 'Token no válido.' }, { status: 400 });
    }
}
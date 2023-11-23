import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2";
import db from "@/database/connection";

import { isValidToken, signToken } from "@/utils/jwt";
import { searchUserQuery } from "@/utils/querys";

import { IUser } from "@/interfaces/User";

export async function GET(req: NextRequest) {

    const token = req.cookies.get('token');

    if (!token) {
        return NextResponse.json({ msg: 'Token de autorización no válido' }, { status: 400 });
    }

    try {
        const email = await isValidToken(token.value);

        if (!email) return NextResponse.json({ msg: 'Token no válido.' }, { status: 400 });

        const [[user]] = await db.query<ResultSetHeader & IUser[]>(searchUserQuery, [email]);

        if (!user) {
            return NextResponse.json({ msg: 'Usuario no encontrado.' }, { status: 400 });
        }

        const renewToken = signToken(user.id, user.email);

        return NextResponse.json(
            {
                token: renewToken,
                user: {
                    email: user.email,
                    name: user.name,
                    role: 'client'
                }
            },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ msg: 'Token no válido.' }, { status: 400 });
    }
}
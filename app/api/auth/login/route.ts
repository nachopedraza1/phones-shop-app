import { NextRequest, NextResponse } from "next/server";
import db from "@/database/connection";

import { compareSync } from "bcryptjs";
import { ResultSetHeader } from "mysql2";

import { signToken } from "@/utils/jwt";
import { searchUserQuery } from "@/utils/querys";
import { isValidEmail } from "@/utils/validations";

import { IUser } from "@/interfaces/User";


export async function POST(req: NextRequest) {

    const { email = '', password = '' } = await req.json();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !isValidEmail(trimmedEmail) || trimmedEmail.length < 6 || trimmedEmail.length > 30) {
        return NextResponse.json({ msg: 'El email ingresado no es válido.' }, { status: 400 })
    }

    if (!trimmedPassword || trimmedPassword.length < 3 || trimmedPassword.length > 25) {
        return NextResponse.json({ msg: 'El password ingresado no es válido.' }, { status: 400 })
    }

    try {

        const [[user]] = await db.query<ResultSetHeader & IUser[]>(searchUserQuery, [email]);

        if (!user) {
            return NextResponse.json({ msg: 'Usuario no encontrado.' }, { status: 400 });
        }

        if (!compareSync(trimmedPassword, user.password)) {
            return NextResponse.json({ msg: 'Password inválido.' }, { status: 400 });
        }

        const token = await signToken(user.id, user.email);

        return NextResponse.json(
            {
                token,
                user: {
                    email: user.email,
                    name: user.name,
                    role: 'client'
                }
            },
            { status: 200 }
        )

    } catch (error) {

    }



    return NextResponse.json({ name }, { status: 200 })
}


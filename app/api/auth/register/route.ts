import { NextRequest, NextResponse } from "next/server";
import db from "@/database/connection";

import { hashSync } from 'bcryptjs';
import { ResultSetHeader } from "mysql2";

import { isValidEmail } from "@/utils/validations";
import { registerQuery, searchUserQuery } from "@/utils/querys";


export async function POST(req: NextRequest) {

    const { name = '', email = '', password = '' } = await req.json();

    const trimmedName = name.toLowerCase().trim();
    const trimmedEmail = email.toLowerCase().trim();
    const trimmedPassword = password.toLowerCase().trim();

    if (!trimmedName || trimmedName.length < 3 || trimmedName.length > 25) {
        return NextResponse.json({ msg: 'El nombre ingresado no es válido.' }, { status: 400 })
    }

    if (!trimmedEmail || !isValidEmail(trimmedEmail) || trimmedEmail.length < 6 || trimmedEmail.length > 30) {
        return NextResponse.json({ msg: 'El email ingresado no es válido.' }, { status: 400 })
    }

    if (!trimmedPassword || trimmedPassword.length < 3 || trimmedPassword.length > 25) {
        return NextResponse.json({ msg: 'El password ingresado no es válido.' }, { status: 400 })
    }

    try {
        const [userExist] = await db.query<ResultSetHeader[]>(searchUserQuery, [trimmedEmail]);

        if (userExist.length > 0) {
            return NextResponse.json({ msg: 'Ya existe un usuario con este email.' }, { status: 400 });
        }

        const hashPassword = hashSync(trimmedPassword);

        await db.query<ResultSetHeader>(registerQuery, [trimmedName, trimmedEmail, hashPassword]);

        return NextResponse.json(
            {
                user: {
                    email: trimmedEmail,
                    name: trimmedName,
                    role: 'client'
                }
            },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({ msg: 'Algo falló, contactese con un administrador.' }, { status: 400 });
    }

}
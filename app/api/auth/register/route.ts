import { NextRequest, NextResponse } from "next/server";
import db from "@/database/connection";
import { hashSync } from 'bcryptjs';
import { isValidEmail } from "@/utils/validations";
import { registerQuery, searchUserQuery } from "@/utils/querys";
import { ResultSetHeader } from "mysql2";

export async function POST(req: NextRequest) {

    const { name = '', email = '', password = '' } = await req.json();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

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

        const [user] = await db.query<ResultSetHeader>(registerQuery, [trimmedName, trimmedEmail, hashPassword]);

        return NextResponse.json({ msg: 'Usuario Registrado con éxito' }, { status: 200 })

    } catch (error) {

    }

    return NextResponse.json({ msg: name }, { status: 200 });

}
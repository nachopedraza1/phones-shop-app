
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    const { name, email, password } = await req.json();

    if (!name || name.length < 5 || name.length > 20) {
        return NextResponse.json({ msg: 'El nombre ingresado no es válido.' }, { status: 400 });
    }

    return NextResponse.json({ name }, { status: 200 })
}


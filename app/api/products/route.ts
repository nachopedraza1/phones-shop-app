import { NextResponse } from "next/server";

export async function GET(req: Request) {

    try {

        return NextResponse.json({ message: 'OK' })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'ERROR' })
    }
}


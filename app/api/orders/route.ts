import { NextRequest, NextResponse } from "next/server";
import { CartOrder } from "@/interfaces/Cart";


export async function POST(req: NextRequest) {

    const body: CartOrder = await req.json();

    

    return NextResponse.json({ data: 'ok' }, { status: 200 })
}

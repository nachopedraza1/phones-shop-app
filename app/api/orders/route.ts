import { NextRequest, NextResponse } from "next/server";
import { CartOrder } from "@/interfaces/Cart";
import db from "@/database/connection";
import { getOrders, newOrder, newOrderProduct } from "@/utils/querys";
import { ResultSetHeader } from "mysql2";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";


export async function POST(req: NextRequest) {

    const order: CartOrder = await req.json();

    try {
        const [result] = await db.query<ResultSetHeader>(newOrder, [
            order.userId,
            order.subTotal,
            order.city,
            order.country,
            order.zip,
            false,
        ]);

        for (const product of order.products) {
            await db.query(newOrderProduct, [
                product.quantity,
                result.insertId,
                product.id,
            ]);
        }

        return NextResponse.json({ message: 'Orden creada con éxito.' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Algo salio mal.' }, { status: 400 });
    }
}

export async function GET(req: NextRequest) {

    const session: any = await getServerSession(authOptions);
    console.log(session);
    

    if (!session) {
        return NextResponse.json({
            message: 'No hay sessión',
        }, { status: 400 });
    }

    try {
        const [orders] = await db.query(getOrders, session.user.id);

        return NextResponse.json({ message: 'ok', orders }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Algo salio mal.' }, { status: 400 });
    }

}

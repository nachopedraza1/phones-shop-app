import { NextRequest, NextResponse } from "next/server";
import { CartOrder } from "@/interfaces/Cart";
import db from "@/database/connection";
import { newOrder, newOrderProduct } from "@/utils/querys";
import { ResultSetHeader } from "mysql2";


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

        return NextResponse.json({ data: 'ok' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ data: 'error' }, { status: 400 });
    }



}

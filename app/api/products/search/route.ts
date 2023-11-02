import db from "@/database/connection";
import { MySqlProduct } from "@/interfaces/Response";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;

    const id = searchParams.get('id');

    let params = []

    if (!id) {
        return NextResponse.json({ message: 'Ingrese un ID de Búsqueda' }, { status: 400 })
    } else {
        params.push(id)
    }

    const query = `
    SELECT * FROM Products 
    LEFT JOIN Installments ON Products.id = Installments.productId
    LEFT JOIN Rating ON Products.id = Rating.productId
    WHERE Products.meli_id = ?;
    `

    try {

        const [[product]] = await db.query<MySqlProduct[] & RowDataPacket[][]>(query, params)

        return NextResponse.json({
            id: product.id,
            meli_id: product.meli_id,
            name: product.name,
            price: product.price,
            condition: product.condition,
            brand: product.brand,
            thumbnail: product.thumbnail,
            thumbnail_id: product.thumbnail_id,
            totalSold: product.totalSold,
            rating: {
                negative: product.negative,
                neutral: product.neutral,
                positive: product.positive,
            },
            installments: {
                quantity: product.quantity,
                amount: product.amount,
                rate: product.rate,
            }
        }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'ERROR' }, { status: 400 })
    }

}
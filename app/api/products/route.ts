import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import axios from "axios";

import db from "@/database/connection";
import { MeliProducts } from "@/interfaces/MeliProducts";
import { MySqlProduct } from "@/interfaces/Response";

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;

    const limit = parseInt(searchParams.get('limit')!) || 10;
    const category = searchParams.get('category');
    const random = searchParams.get('random');

    let params: (string | number)[] = [];

    if (category) {
        params.push(category);
    }
    params.push(limit);

    try {

        const query = `
        SELECT *
        FROM Products
        LEFT JOIN Rating ON Products.id = Rating.productId
        LEFT JOIN Installments ON Products.id = Installments.productId
        WHERE 1 = 1
        ${category ? 'AND Products.category = ?' : ''}
        ${random ? 'ORDER BY RAND()' : ''}
        LIMIT ?`;

        const [products] = await db.query<MySqlProduct[] & RowDataPacket[][]>(query, params);

        const formattedResponse = products.map(product => ({
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
            },
        }))

        return NextResponse.json(formattedResponse, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'ERROR' }, { status: 400 })
    }
}

export async function POST(req: Request) {

    try {

        const { data } = await axios.get<MeliProducts>('https://api.mercadolibre.com/sites/MLA/search?q=iphone 14&limit=5');

        const products = data.results.map(product => ({
            meli_id: product.id,
            name: product.title,
            price: product.price,
            condition: product.condition,
            thumbnail: product.thumbnail,
            thumbnail_id: product.thumbnail_id,
            totalSold: product.seller.seller_reputation.transactions.completed,
            brand: product.attributes.find(att => att.id === 'BRAND')?.value_name || '',
            category: 'fundas',
            ratings: product.seller.seller_reputation.transactions.ratings,
            installments: product.installments,
        }));

        /*    for (const product of products) {
   
               const [result] = await db.query(`
               INSERT INTO Products(meli_id, name, price, prod_condition, thumbnail, thumbnail_id, totalSold, brand, category)
               VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                   [
                       product.meli_id,
                       product.name,
                       product.price,
                       product.condition,
                       product.thumbnail,
                       product.thumbnail_id,
                       product.totalSold,
                       product.brand,
                       'iphones'
                   ]);
   
               const productId = (result as ResultSetHeader).insertId;
   
               await db.query(`
               INSERT INTO Installments(quantity, amount, rate, productId)
               VALUES(?, ?, ?, ?)`,
                   [
                       product.installments.quantity,
                       product.installments.amount,
                       product.installments.rate,
                       productId
                   ]);
   
               await db.query(`
               INSERT INTO Rating(negative, neutral, positive, productId)
               VALUES(?, ?, ?, ?)`,
                   [
                       product.ratings.negative,
                       product.ratings.neutral,
                       product.ratings.positive,
                       productId
                   ]);
           } */

        return NextResponse.json({})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'ERROR' })
    }
}


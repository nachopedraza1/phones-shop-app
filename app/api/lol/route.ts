import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import axios from "axios";

import db from "@/database/connection";
import { MeliProducts } from "@/interfaces/MeliProducts";

import { generarRatingsAlAzar } from "@/utils/ratings";


export async function POST(req: NextRequest) {

    const params = req.nextUrl.searchParams;

    const productTitle = params.get('productTitle');
    const category = params.get('category');
    const limit = parseInt(params.get('limit')!) || 10;

    const { data } = await axios.get<MeliProducts>(`https://api.mercadolibre.com/sites/MLA/search?q=${productTitle}&limit=${limit}`);

    const products = data.results.map(product => {

        const { ratings } = generarRatingsAlAzar();

        return {
            meli_id: product.id,
            name: product.title,
            price: product.price,
            condition: product.condition,
            thumbnail: product.thumbnail,
            thumbnail_id: product.thumbnail_id,
            totalSold: Math.floor(Math.random() * 501),
            brand: product.attributes.find(att => att.id === 'BRAND')?.value_name || '',
            category,
            ratings,
            installments: product.installments,
        }
    });

    try {

        for (const product of products) {

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
                    product.category
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

        }
        return NextResponse.json({})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'ERROR' })
    }
}


export async function GET(req: NextRequest) {

    const query = `
    SELECT
    Orders.id AS orderID,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'productID', Products.id,
            'name', Products.name,
            'quantity', OrderProducts.quantity
        )
    ) AS products
    FROM Users
    JOIN Orders ON Users.id = Orders.userId
    JOIN OrderProducts ON Orders.id = OrderProducts.orderId
    JOIN Products ON OrderProducts.productId = Products.id
    WHERE Users.id = 7
    GROUP BY Orders.id;`;

    const [result] = await db.query(query);

    console.log(result);

    return NextResponse.json({ result })

}


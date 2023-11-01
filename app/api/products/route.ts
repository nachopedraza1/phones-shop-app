import db from "@/database/connection";
import { MeliResponse } from "@/interfaces/MercadoLibre";
import { MySqlProduct } from "@/interfaces/Response";
import axios from "axios";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;

    const limit = parseInt(searchParams.get('limit')!) || 10;
    const category = searchParams.get('category');
    const random = searchParams.get('random');

    const params: (string | number)[] = [];

    if (category) { params.push(category); }
    params.push(limit);

    try {

        const query = `
        SELECT 
        Products.id AS product_id,
        Products.name AS product_name,
        Products.price AS product_price,
        Products.prod_condition AS product_condition,
        Products.brand AS product_brand,
        Products.thumbnail AS product_thumbnail,
        Products.thumbnail_id AS product_thumbnail_id,
        Products.totalSold AS product_totalSold,
        Rating.negative AS product_rating_negative,
        Rating.neutral AS product_rating_neutral,
        Rating.positive AS product_rating_positive,
        Installments.quantity AS product_installments_quantity,
        Installments.amount AS product_installments_amount,
        Installments.rate AS product_installments_rate
        FROM Products
        LEFT JOIN Rating ON Products.id = Rating.productId
        LEFT JOIN Installments ON Products.id = Installments.productId
        WHERE 1 = 1
        ${category ? 'AND Products.category = ?' : ''}
        ${random ? 'ORDER BY RAND()' : ''}
        LIMIT ?`;

        const [products] = await db.query<MySqlProduct[] & RowDataPacket[][]>(query, params);

        const formattedResponse = products.map(product => ({
            product_id: product.product_id,
            product_name: product.product_name,
            product_price: product.product_price,
            product_condition: product.product_condition,
            product_brand: product.product_brand,
            product_thumbnail: product.product_thumbnail,
            product_thumbnail_id: product.product_thumbnail_id,
            product_totalSold: product.product_totalSold,
            product_rating: {
                negative: product.product_rating_negative,
                neutral: product.product_rating_neutral,
                positive: product.product_rating_positive,
            },
            product_installments: {
                quantity: product.product_installments_quantity,
                amount: product.product_installments_amount,
                rate: product.product_installments_rate,
            },
        }))

        return NextResponse.json(formattedResponse)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'ERROR' })
    }
}

export async function POST(req: Request) {

    try {

        const { data } = await axios.get<MeliResponse>('https://api.mercadolibre.com/sites/MLA/search?q=iphone 14&limit=5');

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


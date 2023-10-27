import db from "@/database/connection";
import { MeliResponse } from "@/interfaces/MercadoLibre";
import axios from "axios";
import { ResultSetHeader } from "mysql2";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    try {
        const [products] = await db.query(`
        SELECT Products.id AS product_id,
        Products.name AS product_name,
        Products.price AS product_price,
        Products.prod_condition as product_condition,
        Products.brand AS product_brand,
        Products.thumbnail AS product_thumbnail,
        Products.totalSold AS product_totalSold,
        Rating.negative AS product_rating_negative,
        Rating.neutral AS product_rating_neutral,
        Rating.positive AS product_rating_positive,
        Installments.quantity AS product_installments_quantity,
        Installments.amount AS product_installments_amount,
        Installments.rate AS product_installments_rate
        FROM Products
        LEFT JOIN Rating ON Products.id = Rating.productId
        LEFT JOIN Installments ON Products.id = Installments.productId;
        `);
        return NextResponse.json(products)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'ERROR' })
    }
}

export async function POST(req: Request) {

    try {

        const { data } = await axios.get<MeliResponse>('https://api.mercadolibre.com/sites/MLA/search?q=fundas iphone ringke&limit=30');

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
                    'fundas'
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


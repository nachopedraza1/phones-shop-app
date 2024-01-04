import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import axios from "axios";

import db from "@/database/connection";
import { MeliProducts } from "@/interfaces/MeliProducts";
import { MySqlProduct } from "@/interfaces/Response";
import { newInstallment, newProduct, newRating } from "@/utils/querys";
import { generarRatingsAlAzar } from "@/utils/ratings";

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
            condition: product.prod_condition,
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

            const [result] = await db.query(newProduct,
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


            await db.query(newInstallment,
                [
                    product.installments.quantity,
                    product.installments.amount,
                    product.installments.rate,
                    productId
                ]);

            await db.query(newRating,
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

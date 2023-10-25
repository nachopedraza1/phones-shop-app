import db from "@/database/connection";
import { MeliResponse } from "@/interfaces/MercadoLibre";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    try {
        const [products] = await db.query('SELECT * FROM Products');
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



        const [result, fields] = await db.execute(`
        INSERT INTO Products(meli_id,name,price,prod_condition,thumbnail,thumbnail_id,totalSold,brand,category)
        VALUES('4f123241','notebook',200,'new','thumb213','thumb213',20,'dasdw','phones')
        `);


        const insertedProductId = result.insertId;

        return NextResponse.json({result,fields})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'ERROR' })
    }
}


/* for (const product of products) {
    await db.query(`
    INSERT INTO Products(meli_id,name,price,prod_condition,thumbnail,thumbnail_id,totalSold,brand,category)
    VALUES(${product.meli_id},
        ${product.name},
        ${product.price},
        ${product.condition},
        ${product.thumbnail},
        ${product.thumbnail_id},
        ${product.totalSold},
        ${product.brand},
        'fundas')
    `);
} */


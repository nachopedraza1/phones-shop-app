import { NextPage } from "next";
import Link from "next/link";
import axios from "axios";

import Main from "@/components/layouts/Main";
import ImagesProduct from "@/components/products/ImagesProduct";
import RatingProduct from "@/components/products/RatingProduct";
import { formatPrice } from "@/utils/formatPrice";

import { MySqlProduct, Products } from "@/interfaces/Response";
import { Attribute } from "@/interfaces/MeliProduct";
import { MeliProduct, Picture } from "@/interfaces/MeliProduct";
import { Breadcrumbs, Grid, Link as MuiLink, Typography } from '@mui/material';
import db from "@/database/connection";
import { RowDataPacket } from "mysql2";

export const generateStaticParams = async () => {
    const products: Products[] = await fetch('http://localhost:3000/api/products').then(resp => resp.json());
    return products.map(prod => ({
        id: prod.meli_id
    }))
}

const getProduct = async (id: string): Promise<Products> => {

    const query = `
    SELECT * FROM Products 
    LEFT JOIN Installments ON Products.id = Installments.productId
    LEFT JOIN Rating ON Products.id = Rating.productId
    WHERE Products.meli_id = ?;
    `

    const [[product]] = await db.query<MySqlProduct[] & RowDataPacket[][]>(query, [id])

    return JSON.parse(JSON.stringify({
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
        }
    }))
}

const getAtributesProduct = async (id: string): Promise<{ attributes: Attribute[], pictures: Picture[] }> => {
    const { data } = await axios.get<MeliProduct[]>(`https://api.mercadolibre.com/items?ids=${id}`);

    return {
        attributes: data[0].body.attributes,
        pictures: data[0].body.pictures,
    }
}

const ProductPage: NextPage<{ params: { id: string } }> = async ({ params }) => {
    const { id } = params;


    const product = await getProduct(id);
    const productProps = await getAtributesProduct(id);

    return (
        <Main>
            <Breadcrumbs aria-label="breadcrumb" separator="›">
                <MuiLink component={Link} underline="hover" color="inherit" href="/">
                    Inicio
                </MuiLink>
                <MuiLink
                    component={Link}
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Productos
                </MuiLink>
                <Typography color="text.primary"> {product.name} </Typography>
            </Breadcrumbs>

            <Grid container mt={2}>
                <ImagesProduct images={productProps.pictures} />

                <Grid item xs={4}>
                    <Typography color="text.secondary" fontSize={15}> {product.condition === 'new' ? 'Nuevo' : 'Usado'} | +{product.totalSold} vendidos </Typography>
                    <Typography variant="h5"> {product.name} </Typography>

                    <RatingProduct rating={product.rating.positive} />

                    <Typography variant="h4" mt={2}> ${formatPrice(product.price)} </Typography>
                    <Typography color="text.secondary">
                        en {product.installments.quantity}x ${formatPrice(product.installments.amount)}
                    </Typography>

                    <Typography></Typography>
                </Grid>
            </Grid>
        </Main>
    )
}

export default ProductPage;
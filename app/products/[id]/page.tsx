import { NextPage } from "next";
import axios from "axios";

import db from "@/database/connection";
import { RowDataPacket } from "mysql2";
import { formatPrice } from "@/utils/formatPrice";

import Main from "@/components/layouts/Main";
import WarrantyList from "@/components/products/WarrantyList";
import RatingProduct from "@/components/products/RatingProduct";
import ImagesProduct from "@/components/products/ImagesProduct";
import StatsProducts from "@/components/products/StatsProducts";
import SelectQuantity from "@/components/products/SelectQuantity";
import CustomBreadcrumbs from "@/components/ui/CustomBreadcrumbs";
import PaymentMethods from "@/components/products/PaymentMethods";
import RelatedProducts from "@/components/products/RelatedProducts";
import { Button, Grid, Typography } from '@mui/material';

import { Attribute } from "@/interfaces/MeliProduct";
import { MySqlProduct, Products } from "@/interfaces/Response";
import { MeliProduct, Picture } from "@/interfaces/MeliProduct";

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
        category: product.category,
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

const getAtributesProduct = async (id: string): Promise<{ attributes: Attribute[], pictures: Picture[], stock: number, warranty: string }> => {
    const { data } = await axios.get<MeliProduct[]>(`https://api.mercadolibre.com/items?ids=${id}`);

    const { body } = data[0];

    return {
        attributes: body.attributes,
        pictures: body.pictures,
        stock: body.initial_quantity,
        warranty: body.warranty,
    }
}

const ProductPage: NextPage<{ params: { id: string } }> = async ({ params }) => {
    const { id } = params;

    const product = await getProduct(id);
    const productProps = await getAtributesProduct(id);

    return (
        <Main bgcolor="white">
            <CustomBreadcrumbs productName={product.name} />

            <Grid container mt={2} justifyContent='space-between' >

                <Grid item xs={5}>
                    <ImagesProduct images={productProps.pictures} />
                </Grid>

                <Grid item xs={3.5}>
                    <Typography color="text.secondary" fontSize={15}> {product.condition === 'new' ? 'Nuevo' : 'Usado'} | +{product.totalSold} vendidos </Typography>
                    <Typography variant="h5"> {product.name} </Typography>

                    <RatingProduct rating={product.rating.positive} />

                    <Typography variant="h4" mt={1}> ${formatPrice(product.price)} </Typography>
                    <Typography color="text.secondary">
                        en {product.installments.quantity}x ${formatPrice(product.installments.amount)}
                    </Typography>

                    {product.installments.rate === 0 &&
                        <Typography color='#00a650'>Mismo precio en {product.installments.quantity} de ${formatPrice(product.installments.amount)} </Typography>
                    }
                    <Typography color='#00a650' fontWeight={600}> Envío gratuito </Typography>

                    <SelectQuantity totalStock={productProps.stock} />

                    <Grid container gap={1} mt={1}>
                        <Grid item xs={5.5}>
                            <Button
                                fullWidth
                                variant="contained"
                            >
                                COMPRAR
                            </Button>
                        </Grid>
                        <Grid item xs={5.5}>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                AGREGAR AL CARRITO
                            </Button>
                        </Grid>
                    </Grid>

                    <WarrantyList warranty={productProps.warranty} />
                </Grid>

                <Grid item xs={3.5} border='1px solid #bfbfbf' borderRadius='10px' padding={2}>
                    <RelatedProducts category={product.category} />
                </Grid>

                <Grid container justifyContent='space-between'>
                    <Grid item xs={8.3}>
                        <StatsProducts attributes={productProps.attributes} />
                    </Grid>
                    <Grid item xs={3.5} mt={5}>
                        <PaymentMethods installments={product.installments} />
                    </Grid>
                </Grid>

            </Grid>
        </Main >
    )
}

export default ProductPage;
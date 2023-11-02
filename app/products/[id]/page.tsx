import { NextPage } from "next";
import Link from "next/link";
import axios from "axios";

import Main from "@/components/layouts/Main";
import ImagesProduct from "@/components/products/ImagesProduct";

import { Products } from "@/interfaces/Response";
import { MeliProduct, Picture } from "@/interfaces/MeliProduct";
import { Breadcrumbs, Grid, Link as MuiLink, Typography } from '@mui/material';
import { Attribute } from "@/interfaces/MeliProduct";

export const generateStaticParams = async () => {
    const products: Products[] = await fetch('http://localhost:3000/api/products').then(resp => resp.json());
    return products.map(prod => ({
        id: prod.meli_id
    }))
}

const getProduct = async (id: string): Promise<Products> => {
    const { data } = await axios.get<Products>(`http://localhost:3000/api/products/search?id=${id}`);
    return data;
}

const getAtributesProduct = async (id: string): Promise<{ attributes: Attribute[], pictures: Picture[] }> => {
    const { data } = await axios.get<MeliProduct[]>(`https://api.mercadolibre.com/items?ids=${id}`);

    return {
        attributes: data[0].body.attributes,
        pictures: data[0].body.pictures
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
                    <Typography> {product.condition === 'new' ? 'Nuevo' : 'Usado'} </Typography>
                    <Typography variant="h5" mb={3}> {product.name} </Typography>
                    <Typography variant="h4"> ${product.price} </Typography>

                </Grid>
            </Grid>
        </Main>
    )
}

export default ProductPage;
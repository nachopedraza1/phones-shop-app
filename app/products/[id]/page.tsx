
import { NextPage } from "next";
import axios from "axios";

import { MeliProductResponse } from "@/interfaces/MeliProduct";

import Main from "@/components/layouts/Main";
import { Typography, Link as MuiLink, Breadcrumbs, Grid } from "@mui/material";
import Link from "next/link";
import ImagesProduct from "@/components/products/ImagesProduct";

const getProduct = async (id: string | string[]): Promise<MeliProductResponse> => {
    const { data } = await axios.get(`https://api.mercadolibre.com/items?ids=${id}`);
    return data[0].body;
}

const ProductPage: NextPage<{ params: { id: string } }> = async ({ params }) => {
    const { id } = params;

    const product = await getProduct(id);

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
                <Typography color="text.primary"> {product.title} </Typography>
            </Breadcrumbs>

            <Grid container>
                <ImagesProduct images={product.pictures} />
            </Grid>
        </Main>
    )
}

export default ProductPage;
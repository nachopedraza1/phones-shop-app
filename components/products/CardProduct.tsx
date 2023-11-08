"use client"
import { useRouter } from "next/navigation";

import RatingProduct from "./RatingProduct";
import { Products } from "@/interfaces/Response";
import { formatPrice } from '@/utils/formatPrice';

import { Favorite } from "@mui/icons-material";
import { Card, CardContent, CardHeader, CardMedia, IconButton, Skeleton, Tooltip, Typography, Grid, Button } from '@mui/material';

const CardProduct: React.FC<{ product: Products }> = ({ product }) => {

    const router = useRouter();

    const navigateProduct = (slug: string) => {
        router.push(`/products/${slug}`)
    }

    return (
        <Card sx={{ maxWidth: "100%" }} className="fadeIn">
            <CardHeader
                title={
                    <Tooltip title={product.name} placement="top" >
                        <Typography fontWeight={600} overflow='hidden' textOverflow={'ellipsis'}>
                            {product.name}
                        </Typography>
                    </Tooltip>
                }
                titleTypographyProps={{ noWrap: true }}
                subheader={<RatingProduct rating={product.rating.positive} />}
                action={
                    <IconButton>
                        <Favorite />
                    </IconButton>
                }
            />

            <CardMedia
                component="img"
                loading="lazy"
                height="194"
                style={{ objectFit: 'contain' }}
                image={`https://http2.mlstatic.com/D_NQ_NP_${product.thumbnail_id}-O.webp`}
                alt="Paella dish"
            />

            <CardContent>
                <Grid container alignItems='center'>
                    <Grid item xs={12} md={12} xl={5}>
                        <Typography variant="h5">
                            ${formatPrice(product.price)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} xl={5}>
                        <Typography color="text.secondary">
                            en {product.installments.quantity}x ${formatPrice(product.installments.amount)}
                        </Typography>
                    </Grid>
                </Grid>

                <Typography color="text.secondary">
                    {product.totalSold} Vendidos últimos 90 días.
                </Typography>

                <Typography color="#00a650" fontWeight={600}>
                    Llega gratis mañana
                </Typography>

                <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={() => navigateProduct(product.meli_id)}>
                    COMPRAR
                </Button>
            </CardContent>

        </Card >
    );
}

export default CardProduct;

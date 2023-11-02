
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Products } from "@/interfaces/Response";
import { formatPrice } from '../../utils/formatPrice';

import { Favorite } from "@mui/icons-material";
import { Card, CardContent, CardHeader, CardMedia, IconButton, Rating, Skeleton, Tooltip, Typography, Grid, Button } from '@mui/material';

const CardProduct: React.FC<{ product: Products }> = ({ product }) => {

    const router = useRouter();

    const [imageLoad, setImageLoad] = useState(false);

    const navigateProduct = (slug: string) => {
        router.push(`/products/${slug}`)
    }

    return (
        <Card sx={{ maxWidth: "100%" }} className="fadeIn">
            <CardHeader
                title={
                    <Tooltip title={imageLoad && product.name} placement="top" >
                        <Typography fontWeight={600} overflow='hidden' textOverflow={'ellipsis'}>
                            {imageLoad ? product.name : <Skeleton height={20} width={'100%'} />}
                        </Typography>
                    </Tooltip>
                }
                titleTypographyProps={{ noWrap: true }}
                subheader={
                    <Rating
                        name="half-rating-read"
                        value={imageLoad ? product.rating.positive * 5 : 0}
                        disabled={imageLoad ? false : true}
                        precision={0.5}
                        readOnly
                    />
                }
                action={
                    <IconButton>
                        <Favorite />
                    </IconButton>
                }
            />

            <CardMedia
                onLoad={() => setImageLoad(true)}
                component="img"
                loading="lazy"
                height="194"
                style={{ objectFit: 'contain' }}
                image={`https://http2.mlstatic.com/D_NQ_NP_${product.thumbnail_id}-O.webp`}
                alt="Paella dish"
            />

            <CardContent>
                {
                    imageLoad ?
                        <>
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
                        </>
                        :
                        <>
                            <Skeleton height={20} width={'100%'} />
                            <Skeleton height={20} width={'100%'} />
                            <Skeleton height={20} width={'100%'} />
                            <Skeleton height={20} width={'100%'} />
                        </>
                }
            </CardContent>

        </Card >
    );
}

export default CardProduct;

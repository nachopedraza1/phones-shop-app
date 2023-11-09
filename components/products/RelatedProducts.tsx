"use client"
import useSWR from "swr";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import { Card, Grid, Skeleton, Typography } from "@mui/material";
import { Products } from "@/interfaces/Response";


interface Props {
    limit?: number,
    title?: string,
    category: string,
    direction?: 'column' | 'row',
    xs?: number,
    md?: number,
    lg?: number,
}


const RelatedProducts: React.FC<Props> = ({ category, title, direction = 'column', limit = 3, xs, md, lg }) => {

    const { data, isLoading } = useSWR<Products[]>(`http://localhost:3000/api/products?category=${category}&limit=${limit}random=true`)

    return (
        <Grid container justifyContent='center' direction={direction} spacing={2} padding={1}>
            <Typography variant="h6"> {title} </Typography>
            {
                data ?
                    data?.map(product => (
                        <Grid item xs={xs} md={md} lg={lg} key={product.id} className="fadeIn">
                            <Card sx={{ display: 'flex', padding: 1, justifyContent: 'space-between', minHeight: 132 }}>
                                <Grid item xs={3} position='relative'>
                                    <Image
                                        src={product.thumbnail}
                                        alt={product.name}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Grid>
                                <Grid item xs={8.5}>
                                    <Typography fontSize={14}
                                        sx={{
                                            overflow: "hidden",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                        }}
                                    > {product.name}
                                    </Typography>
                                    <Typography variant="h6"> ${formatPrice(product.price)} </Typography>
                                    <Typography fontSize={14}> {product.installments.quantity}x de ${formatPrice(product.installments.amount)} </Typography>
                                    <Typography fontSize={14} color='#00a650' fontWeight={600}> Envío gratuito </Typography>
                                </Grid>
                            </Card>
                        </Grid>
                    ))
                    :
                    [...Array(limit)].map((item, index) => (
                        <Grid item xs={xs} md={md} lg={lg} key={index}>
                            <Card sx={{ display: 'flex', padding: 1, justifyContent: 'space-between', minHeight: 132 }}>
                                <Grid item xs={3} position='relative'>
                                    <Skeleton height='100%' />
                                </Grid>
                                <Grid item xs={8.5}>
                                    <Skeleton />
                                    <Skeleton width='90%' />
                                    <Skeleton width='60%' />
                                    <Skeleton width='60%' />
                                </Grid>
                            </Card>
                        </Grid>
                    ))
            }
        </Grid >
    )
}

export default RelatedProducts;
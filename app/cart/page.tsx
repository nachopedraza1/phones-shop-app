'use client';
import { useContext } from "react";
import { Grid, Typography, IconButton } from '@mui/material';
import Main from "@/components/layouts/Main";
import { CartContext } from "@/context/cart";
import Image from "next/image";
import { Add, Remove } from "@mui/icons-material";
import { formatPrice } from "@/utils/formatPrice";

const CartPage: React.FC = () => {

    const { cart, total, subTotal } = useContext(CartContext);

    return (
        <Main>
            <Grid container justifyContent='space-between'>
                <Grid item xs={8.2} display='flex' flexDirection='column' className="bgCard">
                    <Grid item xs={12} p={2} borderBottom='1px solid rgba(0,0,0,.1)'>
                        <Typography fontWeight={600}>Carrito</Typography>
                    </Grid>
                    {cart.map(product => (
                        <Grid container justifyContent='space-between' p={2} alignItems='center' borderBottom='1px solid rgba(0,0,0,.1)'>
                            <Grid item xs={1} position='relative'>
                                <Image src={product.thumbnail} alt={product.name} width={64} height={64} style={{ objectFit: 'contain' }} />
                            </Grid>
                            <Grid item xs={5}>
                                <Typography> {product.name} </Typography>
                            </Grid>
                            <Grid item xs={2} textAlign='center'>
                                <Grid container gap={1} justifyContent='center' alignItems='center' border='1px solid rgba(0,0,0,.1)' borderRadius={1}>
                                    <IconButton color="primary" >
                                        <Remove fontSize="small" />
                                    </IconButton>
                                    <Typography variant="h6">
                                        {product.quantity}
                                    </Typography>
                                    <IconButton color="primary">
                                        <Add fontSize="small" />
                                    </IconButton>
                                </Grid>
                                <Typography color='text.secondary' fontSize={13} mt={1}> {product.totalStock} disponibles </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h5" fontWeight={300}> ${formatPrice(product.price)} </Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={3.5} display='flex' flexDirection='column' className="bgCard">
                    <Grid p={2} borderBottom='1px solid rgba(0,0,0,.1)'>
                        <Typography fontWeight={600}> Resumen de compra </Typography>
                    </Grid>
                    <Grid display='flex' justifyContent='space-between' p={2} >
                        <Typography> {cart.length > 1 ? 'Productos' : 'Producto'} ({cart.length}) </Typography>
                        <Typography>  {subTotal} </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Main >
    )
}

export default CartPage;
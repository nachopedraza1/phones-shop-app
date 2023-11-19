'use client';
import Image from "next/image";
import { useContext } from "react";

import { CartContext } from "@/context/cart";
import { formatPrice } from "@/utils/formatPrice";

import Main from "@/components/layouts/Main";
import ChangueQuantity from "@/components/products/ChangueQuantity";
import { Box, Button, Grid, Typography } from '@mui/material';

import { LocalActivity } from "@mui/icons-material";
import { ICartProduct } from "@/interfaces/Cart";

const CartPage: React.FC = () => {

    const { cart, subTotal, totalProducts, updateQuantityCart } = useContext(CartContext);

    const onUpdateQuantityFromCart = (product: ICartProduct, newQuantity: number) => {
        product.quantity = newQuantity;
        updateQuantityCart(product);
    }

    return (
        <Main>
            <Grid container justifyContent='space-between' alignItems='stretch'>
                <Grid item xs={8.2} display='flex' flexDirection='column' className="bgCard">
                    <Grid p={2} borderBottom='1px solid rgba(0,0,0,.1)'>
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
                                <ChangueQuantity
                                    currentValue={product.quantity}
                                    maxValue={product.totalStock}
                                    onUpdateProduct={(value) => onUpdateQuantityFromCart(product, value)}
                                />
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
                    <Grid container direction='column' p={2} gap={1}>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography> {totalProducts > 1 ? 'Productos' : 'Producto'} ({totalProducts}) </Typography>
                            <Typography>  ${formatPrice(subTotal)} </Typography>
                        </Box>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography> IVA </Typography>
                            <Typography> 21% </Typography>
                        </Box>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography> Envío </Typography>
                            <Typography color='#00a650'> Gratis </Typography>
                        </Box>
                        <Box display='flex'>
                            <Button startIcon={<LocalActivity color="primary" />} disableRipple sx={{ p: 0 }}>
                                Ingresar código de cupón
                            </Button>
                        </Box>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography fontWeight={600} variant="h6"> Total </Typography>
                            <Typography variant="h6"> ${formatPrice(subTotal)} </Typography>
                        </Box>
                        <Button fullWidth variant="contained">
                            Continuar compra
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Main >
    )
}

export default CartPage;
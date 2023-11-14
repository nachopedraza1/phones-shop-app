'use client';
import Image from "next/image";
import { useContext } from "react";

import { CartContext } from "@/context/cart";
import { formatPrice } from "@/utils/formatPrice";

import Main from "@/components/layouts/Main";
import ChangueQuantity from "@/components/products/ChangueQuantity";
import { Grid, Typography } from '@mui/material';
import { ICartProduct } from "@/interfaces/Cart";

const CartPage: React.FC = () => {

    const { cart, total, subTotal, totalProducts, updateQuantityCart } = useContext(CartContext);

    const onUpdateQuantityFromCart = (product: ICartProduct, newQuantity: number) => {
        product.quantity = newQuantity;
        updateQuantityCart(product);
    }

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
                    <Grid display='flex' justifyContent='space-between' p={2} >
                        <Typography> {totalProducts > 1 ? 'Productos' : 'Producto'} ({totalProducts}) </Typography>
                        <Typography>  ${formatPrice(subTotal)} </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Main >
    )
}

export default CartPage;
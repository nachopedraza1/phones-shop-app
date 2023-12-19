import { useContext } from "react";
import Image from "next/image";

import { CartContext } from "@/context/cart";
import { formatPrice } from "@/utils/formatPrice";
import { ICartProduct } from "@/interfaces/Cart";

import ChangueQuantity from "@/components/cart/ChangueQuantity"
import { Grid, Typography, Button } from "@mui/material"

const ProductInCart: React.FC<{ product: ICartProduct, modify?: boolean }> = ({ product, modify = true }) => {

    const { removeProduct, updateQuantityCart } = useContext(CartContext);

    const onUpdateQuantityFromCart = (product: ICartProduct, newQuantity: number) => {
        product.quantity = newQuantity;
        updateQuantityCart(product);
    }

    return (
        <Grid container justifyContent='space-between' p={2} alignItems='center' borderBottom='1px solid rgba(0,0,0,.1)'>
            <Grid item xs={1} position='relative'>
                <Image src={product.thumbnail} alt={product.name} width={64} height={64} style={{ objectFit: 'contain' }} />
            </Grid>
            <Grid item xs={5}>
                <Typography> {product.name} </Typography>
                <Button onClick={() => removeProduct(product.meli_id)} sx={{ display: modify ? '' : 'none' }}>
                    Eliminar
                </Button>
            </Grid>
            <Grid item xs={2} textAlign='center' sx={{ display: modify ? '' : 'none' }}>
                <ChangueQuantity
                    currentValue={product.quantity}
                    maxValue={product.totalStock}
                    onUpdateProduct={(value) => onUpdateQuantityFromCart(product, value)}
                />
            </Grid>
            <Grid item xs={2} textAlign='center' sx={{ display: modify ? 'none' : '' }}>
                <Typography color='text.secondary' fontSize={15}> {product.quantity} {product.quantity > 1 ? 'Unidades' : 'Unidad'} </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h5" fontWeight={300}> ${formatPrice(product.price)} </Typography>
            </Grid>
        </Grid>
    )
}

export default ProductInCart;
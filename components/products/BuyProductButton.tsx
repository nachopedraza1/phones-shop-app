"use client"
import { useContext } from "react";
import { CartContext } from "@/context/cart";
import { Button, Grid, } from "@mui/material";
import { Products } from "@/interfaces/Response";
import { useSession } from "next-auth/react";


const BuyProductButton: React.FC<{ totalStock: number, product: Products }> = ({ totalStock, product }) => {

    const { addCartProduct } = useContext(CartContext);
    const { status } = useSession();

    const handleAddProduct = () => {
        addCartProduct({
            ...product,
            totalStock,
            quantity: 1
        })
    }

    return (
        <>
            <Grid container gap={1} mt={1}>
                <Grid item xs={5.5}>
                    <Button
                        fullWidth
                        onClick={handleAddProduct}
                        href="/cart"
                        disabled={status === 'unauthenticated'}
                        variant="contained"
                    >
                        COMPRAR
                    </Button>
                </Grid>
                <Grid item xs={5.5}>
                    <Button
                        onClick={handleAddProduct}
                        fullWidth
                        variant="outlined"
                        disabled={status === 'unauthenticated'}
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        AGREGAR AL CARRITO
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default BuyProductButton;

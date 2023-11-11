'use client';
import { useContext } from "react";
import { Grid } from "@mui/material";
import Main from "@/components/layouts/Main";
import { CartContext } from "@/context/cart";

const CartPage = () => {

    const { cart } = useContext(CartContext);

    return (
        <Main>
            <Grid container gap={2}>
                {
                    cart.map(prod => (
                        <Grid item xs={3}>
                            {prod.name}
                        </Grid>
                    ))
                }
            </Grid>
        </Main>
    )
}

export default CartPage;
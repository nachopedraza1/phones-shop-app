'use client';
import { useContext } from "react";

import { CartContext } from "@/context/cart";

import { Grid } from "@mui/material";
import Cart from "@/components/cart/Cart";
import Main from "@/components/layouts/Main";
import EmptyCart from "@/components/cart/EmptyCart";

const CartPage: React.FC = () => {

    const { cart } = useContext(CartContext);

    return (
        <Main>
            {
                cart.length < 1
                    ? <EmptyCart />
                    : <Cart />
            }
            <Grid container>

            </Grid>
        </Main>
    )
}

export default CartPage;
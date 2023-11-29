'use client';
import { useContext } from "react";

import { CartContext } from "@/context/cart";

import Cart from "@/components/cart/Cart";
import Main from "@/components/layouts/Main";
import EmptyCart from "@/components/cart/EmptyCart";
import CookiesProducts from "@/components/products/CookiesProducts";

const CartPage: React.FC = () => {

    const { cart } = useContext(CartContext);

    return (
        <Main>
            {
                cart.length < 1
                    ? <EmptyCart />
                    : <Cart />
            }
            <CookiesProducts />
        </Main>
    )
}

export default CartPage;
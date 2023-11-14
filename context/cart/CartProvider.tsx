import { FC, useEffect, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces/Cart';

export interface CartState {
    cart: ICartProduct[];
    iva: number;
    total: number;
    subTotal: number;
    favoritesIds: string[];
}


const CART_INITIAL_STATE: CartState = {
    cart: [],
    iva: 0,
    total: 0,
    subTotal: 0,
    favoritesIds: [],
}


export const CartProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    const addProductFavorite = (id: string) => {
        const updatedFavorites = state.favoritesIds.includes(id)
            ? state.favoritesIds.filter(productId => productId !== id)
            : [...state.favoritesIds, id];

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        dispatch({ type: '[Cart] - toggleFavorite', payload: updatedFavorites });
    }

    const loadCartAndFavorites = () => {
        const favorites = localStorage.getItem('favorites');
        const cart = localStorage.getItem('cart');

        const parsedFavorites = favorites ? JSON.parse(favorites) : [];
        const parsedCart = cart ? JSON.parse(cart) : [];

        dispatch({ type: '[Cart] - toggleFavorite', payload: parsedFavorites });
        dispatch({ type: '[Cart] - updateCart', payload: parsedCart });
    }


    const addCartProduct = (product: ICartProduct) => {
        const productExist = state.cart.some(prodInCart => prodInCart.meli_id === product.meli_id);
        if (!productExist) {
            localStorage.setItem('cart', JSON.stringify([...state.cart, product]));
            return dispatch({ type: '[Cart] - updateCart', payload: [...state.cart, product] });
        }

        localStorage.setItem('cart', JSON.stringify([...state.cart, product]));
        const products = state.cart.map(prodInCart => {
            prodInCart.quantity += product.quantity
            return prodInCart;
        });

        dispatch({ type: '[Cart] - updateCart', payload: products })
    }

    useEffect(() => {
        const subTotal = state.cart.reduce((prev, curr) => curr.price + prev, 0);
        const ivaRate = Number(process.env.NEXT_PUBLIC_IVA_RATE || 21);
        const total = subTotal * (ivaRate + 1);

        dispatch({ type: '[Cart] - updateOrderSummary', payload: { total, subTotal } })
    }, [])

    useEffect(() => {
        loadCartAndFavorites();
    }, [])

    return (
        <CartContext.Provider value={{
            ...state,

            addCartProduct,
            addProductFavorite,
        }}>
            {children}
        </CartContext.Provider>
    )
};
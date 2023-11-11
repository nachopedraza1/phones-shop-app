import { FC, useEffect, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces/Cart';

export interface CartState {
    cart: ICartProduct[];
    favoritesIds: string[];
}


const CART_INITIAL_STATE: CartState = {
    cart: [],
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
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

    const loadFavorites = () => {
        const favorites = localStorage.getItem('favorites');
        const parsedFavorites = favorites ? JSON.parse(favorites) : [];
        dispatch({ type: '[Cart] - toggleFavorite', payload: parsedFavorites });
    }

    useEffect(() => {
        loadFavorites();
    }, [])

    return (
        <CartContext.Provider value={{
            ...state,
            addProductFavorite,
        }}>
            {children}
        </CartContext.Provider>
    )
};
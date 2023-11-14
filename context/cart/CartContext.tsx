import { createContext } from 'react';
import { ICartProduct } from '@/interfaces/Cart';


interface ContextProps {
    cart: ICartProduct[];
    iva: number;
    total: number;
    subTotal: number;
    favoritesIds: string[];

    addProductFavorite: (id: string) => void;
    addCartProduct: (product: ICartProduct) => void;
}


export const CartContext = createContext({} as ContextProps);
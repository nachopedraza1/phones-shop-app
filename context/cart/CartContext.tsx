import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '@/interfaces/Cart';


interface ContextProps {
    cart: ICartProduct[];
    iva: number;
    total: number;
    subTotal: number;
    totalProducts: number;
    favoritesIds: string[];
    shippingAddress: ShippingAddress | undefined;

    removeProduct: (id: string) => void;
    addProductFavorite: (id: string) => void;
    addCartProduct: (product: ICartProduct) => void;
    updateQuantityCart: (product: ICartProduct) => void;
    updateAddress: (data: ShippingAddress) => void;
    generateOrder: () => void;
}


export const CartContext = createContext({} as ContextProps);
import { FC, useEffect, useReducer, useRef } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces/Cart';

export interface CartState {
    cart: ICartProduct[];
    iva: number;
    total: number;
    subTotal: number;
    totalProducts: number;
    favoritesIds: string[];
}


const CART_INITIAL_STATE: CartState = {
    cart: [],
    iva: 0,
    total: 0,
    subTotal: 0,
    totalProducts: 0,
    favoritesIds: [],
}


export const CartProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    const addProductFavorite = (id: string) => {
        const updatedFavorites = state.favoritesIds.includes(id)
            ? state.favoritesIds.filter(productId => productId !== id)
            : [...state.favoritesIds, id];

        dispatch({ type: '[Cart] - toggleFavorite', payload: updatedFavorites });
    }

    let firstTimeLoad = useRef(true);

    const loadCartAndFavorites = async () => {
        try {
            const cart = localStorage.getItem('cart');
            const parsedCart = cart ? JSON.parse(cart) : [];

            /* seguir con favoritos */
            const favorites = localStorage.getItem('favorites');
            const parsedFavorites = favorites ? JSON.parse(favorites) : [];

            await dispatch({ type: '[Cart] - LoadCart from localStorage', payload: parsedCart });
            await dispatch({ type: '[Cart] - toggleFavorite', payload: parsedCart });
        } catch (error) {
            await dispatch({ type: '[Cart] - LoadCart from localStorage', payload: [] });
        } finally {
            firstTimeLoad.current = false;
        }
    }

    const saveCartToLocalStorage = () => {
        if (!firstTimeLoad.current) {
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    };


    const addCartProduct = (product: ICartProduct) => {
        const productExist = state.cart.some(prodInCart => prodInCart.meli_id === product.meli_id);
        if (!productExist) {
            return dispatch({ type: '[Cart] - updateCart', payload: [...state.cart, product] });
        }

        const products = state.cart.map(prodInCart => {
            if (prodInCart.meli_id != product.meli_id) return prodInCart;
            if (prodInCart.quantity >= prodInCart.totalStock) {
                prodInCart.quantity = prodInCart.totalStock;
                return prodInCart;
            }
            prodInCart.quantity += product.quantity;
            return prodInCart;
        });


        dispatch({ type: '[Cart] - updateCart', payload: products });
    }

    const updateQuantityCart = (product: ICartProduct) => {
        const updatedCart = state.cart.map(prod => {
            if (prod.meli_id !== product.meli_id) return prod;
            prod.quantity = product.quantity;
            return prod;
        });
        dispatch({ type: '[Cart] - updateCart', payload: updatedCart })
    }

    useEffect(() => {
        const totalProducts = state.cart.reduce((prev, curr) => curr.quantity + prev, 0)
        const subTotal = state.cart.reduce((prev, curr) => (curr.price * curr.quantity) + prev, 0);
        const ivaRate = Number(process.env.NEXT_PUBLIC_IVA_RATE || 21);
        const total = subTotal * (ivaRate + 1);

        dispatch({ type: '[Cart] - updateOrderSummary', payload: { total, subTotal, totalProducts } });
    }, [state.cart])

    useEffect(() => {
        loadCartAndFavorites();
    }, [])

    useEffect(() => {
        if (firstTimeLoad.current) return;
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state.cart])


    return (
        <CartContext.Provider value={{
            ...state,

            addCartProduct,
            updateQuantityCart,
            addProductFavorite,
        }}>
            {children}
        </CartContext.Provider>
    )
};
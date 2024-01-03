import { FC, useContext, useEffect, useReducer, useRef } from 'react';
import { CartContext, cartReducer } from '@/context/cart';
import { AuthContext } from '@/context/auth';

import { ShippingAddress, ICartProduct, CartOrder } from '@/interfaces/Cart';

import phonecting from '@/api/phonecting';
import Cookie from 'js-cookie';

export interface CartState {
    cart: ICartProduct[];
    iva: number;
    total: number;
    subTotal: number;
    totalProducts: number;
    favoritesIds: string[];
    shippingAddress: ShippingAddress | undefined;
}


const CART_INITIAL_STATE: CartState = {
    cart: [],
    iva: 0,
    total: 0,
    subTotal: 0,
    totalProducts: 0,
    favoritesIds: [],
    shippingAddress: undefined,
}


export const CartProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    const { user } = useContext(AuthContext);
    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    let firstTimeLoad = useRef(true);

    const loadCartAndFavorites = async () => {
        try {
            const cart = Cookie.get('cart')
            const parsedCart = cart ? JSON.parse(cart) : [];

            const favorites = Cookie.get('favorites');
            const parsedFavorites = favorites ? JSON.parse(favorites) : [];

            await dispatch({ type: '[Cart] - LoadCart from Cookies', payload: parsedCart });
            await dispatch({ type: '[Cart] - toggleFavorite', payload: parsedFavorites });
        } catch (error) {
            await dispatch({ type: '[Cart] - LoadCart from Cookies', payload: [] });
            await dispatch({ type: '[Cart] - toggleFavorite', payload: [] });
        } finally {
            firstTimeLoad.current = false;
        }
    }

    const saveToLocalStorage = () => {
        if (!firstTimeLoad.current) {
            Cookie.set('cart', JSON.stringify(state.cart));
            Cookie.set('favorites', JSON.stringify(state.favoritesIds));
        }
    };

    const addProductFavorite = (id: string) => {
        const updatedFavorites = state.favoritesIds.includes(id)
            ? state.favoritesIds.filter(productId => productId !== id)
            : [...state.favoritesIds, id];

        dispatch({ type: '[Cart] - toggleFavorite', payload: updatedFavorites });
    }

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
        dispatch({ type: '[Cart] - updateCart', payload: updatedCart });
    }

    const removeProduct = (id: string) => {
        const products = state.cart.filter(prod => prod.meli_id !== id);
        dispatch({ type: '[Cart] - updateCart', payload: products });
    }

    const updateAddress = (data: ShippingAddress) => {
        dispatch({ type: '[Cart] - Update Address', payload: data })
    }

    const generateOrder = async () => {

        const order: CartOrder = {
            userId: user!.id,
            subTotal: state.subTotal,
            city: state.shippingAddress!.city,
            country: state.shippingAddress!.country,
            zip: state.shippingAddress!.zip,
            products: state.cart,
        }

        const { data } = await phonecting.post('/orders', order);
    }

    useEffect(() => {
        const totalProducts = state.cart.reduce((prev, curr) => curr.quantity + prev, 0);
        const subTotal = state.cart.reduce((prev, curr) => (curr.price * curr.quantity) + prev, 0);
        /* const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 5);
        const total = subTotal + ((subTotal * taxRate) / 100); */
        dispatch({ type: '[Cart] - updateOrderSummary', payload: { subTotal, totalProducts } });
    }, [state.cart]);


    useEffect(() => {
        loadCartAndFavorites();
    }, []);

    useEffect(() => {
        saveToLocalStorage();
    }, [state.cart, state.favoritesIds]);


    return (
        <CartContext.Provider value={{
            ...state,
            removeProduct,
            addCartProduct,
            updateQuantityCart,
            addProductFavorite,
            generateOrder,
            updateAddress,
        }}>
            {children}
        </CartContext.Provider>
    )
};
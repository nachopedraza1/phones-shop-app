import { CartState } from './';
import { ICartProduct } from '@/interfaces/Cart';


type CartActionType =
    | { type: '[Cart] - LoadCart from Cookies', payload: ICartProduct[] }
    | { type: '[Cart] - toggleFavorite', payload: string[] }
    | { type: '[Cart] - updateCart', payload: ICartProduct[] }
    | { type: '[Cart] - updateOrderSummary', payload: { subTotal: number, totalProducts: number } }


export const cartReducer = (state: CartState, action: CartActionType): CartState => {

    switch (action.type) {
        case '[Cart] - LoadCart from Cookies':
            return {
                ...state,
                cart: action.payload,
            }

        case '[Cart] - toggleFavorite':
            return {
                ...state,
                favoritesIds: action.payload
            }

        case '[Cart] - updateCart':
            return {
                ...state,
                cart: action.payload
            }

        case '[Cart] - updateOrderSummary':
            return {
                ...state,
                subTotal: action.payload.subTotal,
                totalProducts: action.payload.totalProducts,
            }

        default:
            return state;
    }

}
import { CartState } from './';
import { ICartProduct, ShippingAddress } from '@/interfaces/Cart';


type CartActionType =
    | { type: '[Cart] - LoadCart from Cookies', payload: ICartProduct[] }
    | { type: '[Cart] - toggleFavorite', payload: string[] }
    | { type: '[Cart] - updateCart', payload: ICartProduct[] }
    | { type: '[Cart] - updateOrderSummary', payload: { subTotal: number, totalProducts: number } }
    | { type: '[Cart] - Update Address', payload: ShippingAddress }

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
        case '[Cart] - Update Address':
            return {
                ...state,
                shippingAddress: action.payload
            }

        default:
            return state;
    }

}
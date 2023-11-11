import { CartState } from './';
import { ICartProduct } from '@/interfaces/Cart';


type CartActionType =
    | { type: '[Cart] - toggleFavorite', payload: string[] }
    | { type: '[Cart] - updateCart', payload: ICartProduct[] }


export const cartReducer = (state: CartState, action: CartActionType): CartState => {

    switch (action.type) {
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

        default:
            return state;
    }

}
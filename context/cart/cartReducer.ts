import { CartState } from './';


type CartActionType =
    | { type: '[Cart] - toggleFavorite', payload: string[] }


export const cartReducer = (state: CartState, action: CartActionType): CartState => {

    switch (action.type) {
        case '[Cart] - toggleFavorite':
            return {
                ...state,
                favoritesIds: action.payload
            }

        default:
            return state;
    }

}
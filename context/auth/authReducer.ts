import { AuthState } from './';


type CartActionType =
    | { type: '[Cart] - toggleFavorite', payload: string[] }



export const authReducer = (state: AuthState, action: CartActionType): AuthState => {

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
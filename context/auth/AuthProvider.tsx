import { FC, useReducer } from 'react';
import { AuthContext, authReducer } from './';

export interface AuthState {

}


const AUTH_INITIAL_STATE: AuthState = {

}


export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);


    return (
        <AuthContext.Provider value={{
            ...state,
        }}>
            {children}
        </AuthContext.Provider>
    )
};
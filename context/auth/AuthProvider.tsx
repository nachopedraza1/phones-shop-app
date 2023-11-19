import { FC, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces/User';

export interface AuthState {
    IsLoggedIn: boolean;
    user?: IUser;
}


const AUTH_INITIAL_STATE: AuthState = {
    IsLoggedIn: false,
    user: undefined,
}


export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    const onLoginAccount = () => {

    }

    const onLoginRegister = () => {

    }

    return (
        <AuthContext.Provider value={{
            ...state,
        }}>
            {children}
        </AuthContext.Provider>
    )
};
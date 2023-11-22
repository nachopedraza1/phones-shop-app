import { FC, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces/User';
import phonecting from '@/api/phonecting';

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

    const loginAccount = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await phonecting.post<{ user: IUser, token: string }>('/api/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            dispatch({ type: '[Auth] - Login', payload: data.user });
            return true;

        } catch (error) {
            return false;
        }

    }

    const registerAccount = async (name: string, email: string, password: string) => {
        try {
            const { data } = await phonecting.post('/api/auth/register', { name, email, password });
        } catch (error) {

        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            loginAccount,
            registerAccount
        }}>
            {children}
        </AuthContext.Provider>
    )
};
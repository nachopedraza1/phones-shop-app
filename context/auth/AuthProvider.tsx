import { FC, useEffect, useReducer, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { AuthContext, authReducer } from './';

import phonecting from '@/api/phonecting';
import { IUser, UserResponse } from '@/interfaces/User';

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

    const router = useRouter();
    const searchParams = useSearchParams()

    const [loading, setLoading] = useState(false);

    const loginAccount = async (email: string, password: string) => {
        try {
            setLoading(true);
            const { data } = await phonecting.post<UserResponse>('/api/auth/login', { email, password });
            setLoading(false);

            localStorage.setItem('token', data.token);
            dispatch({ type: '[Auth] - Login', payload: data.user });
            router.replace(searchParams.get('p') || '/');
        } catch (error) {
            setLoading(false);
        }
    }

    const registerAccount = async (name: string, email: string, password: string) => {
        try {
            setLoading(true);
            const { data } = await phonecting.post<UserResponse>('/api/auth/register', { name, email, password });
            setLoading(false);
            
            localStorage.setItem('token', data.token);
            dispatch({ type: '[Auth] - Login', payload: data.user });
            router.replace(searchParams.get('p') || '/');
        } catch (error) {
            setLoading(false);
        }
    }

    const checkToken = async () => {
        const token = localStorage.getItem('token');
        try {
            const { data } = await phonecting.get<UserResponse>(`/api/auth/validate-token?token=${token}`);
            dispatch({ type: '[Auth] - Login', payload: data.user });
        } catch (error) {
            localStorage.removeItem('token');
            dispatch({ type: '[Auth] - Logout' });
        }
    }

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{
            ...state,
            loading,
            loginAccount,
            registerAccount
        }}>
            {children}
        </AuthContext.Provider>
    )
};
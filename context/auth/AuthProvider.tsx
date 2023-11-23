import { FC, useEffect, useReducer, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import Cookie from 'js-cookie';

import { AuthContext, authReducer } from './';

import phonecting from '@/api/phonecting';
import { IUser, UserResponse } from '@/interfaces/User';
import { errorAlert, successAlert } from '@/utils/alerts';


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

    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const loginAccount = async (email: string, password: string) => {
        try {
            setLoading(true);
            const { data } = await phonecting.post<UserResponse>('/api/auth/login', { email, password });
            setLoading(false);

            Cookie.set('token', data.token);
            router.replace(searchParams.get('p') || '/');

            dispatch({ type: '[Auth] - Login', payload: data.user });
            successAlert(data.user.name);
        } catch (error) {
            setLoading(false);
            if (isAxiosError(error)) {
                errorAlert(error.response?.data.msg);
            }
        }
    }

    const registerAccount = async (name: string, email: string, password: string) => {
        try {
            setLoading(true);
            const { data } = await phonecting.post<UserResponse>('/api/auth/register', { name, email, password });
            setLoading(false);
            
            Cookie.set('token', data.token);
            router.replace(searchParams.get('p') || '/');

            dispatch({ type: '[Auth] - Login', payload: data.user });
            successAlert(data.user.name);
        } catch (error) {
            setLoading(false);
            if (isAxiosError(error)) {
                errorAlert(error.response?.data.msg);
            }
        }
    }

    const checkToken = async () => {
        const token = Cookie.get('token');

        if (!token) return;
        try {
            const { data } = await phonecting.get<UserResponse>('/api/auth/validate-token');
            Cookie.set('token', data.token);
            dispatch({ type: '[Auth] - Login', payload: data.user });
            successAlert(data.user.name);
        } catch (error) {
            errorAlert('La sesión expiró, vuelva a iniciar sesión.')
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
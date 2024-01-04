import { FC, useEffect, useReducer, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { isAxiosError } from 'axios';
import Cookie from 'js-cookie';

import { AuthContext, authReducer } from '@/context/auth';
import { errorAlert, welcomeAlert } from '@/utils/alerts';
import { IUser, UserResponse } from '@/interfaces/User';
import phonecting from '@/api/phonecting';


export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const [loading, setLoading] = useState(false);

    const { status, data } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (status === 'authenticated') {
            dispatch({ type: '[Auth] - Login', payload: data.user! as IUser });

            const alertWelcome = Cookie.get('welcomeAlert');
            if (!alertWelcome) {
                setTimeout(() => {
                    welcomeAlert(data.user?.name!);
                }, 1500);
                Cookie.set('welcomeAlert', 'true');
            }
        }
    }, [status]);

    const loginAccount = async (email: string, password: string) => {
        setLoading(true);
        try {
            const resp = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });
            if (resp?.error) {
                errorAlert('Usuario o contraseña incorrectos');
            } else {
                router.replace(searchParams.get('p') || '/');
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            errorAlert('Error del servidor, comunicarse con un administrador.');
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
            welcomeAlert(data.user.name);
        } catch (error) {
            setLoading(false);
            if (isAxiosError(error)) {
                errorAlert(error.response?.data.msg);
            }
        }
    }

    const logoutAccount = async () => {
        await signOut();
        dispatch({ type: '[Auth] - Logout' });
        Cookie.remove('welcomeAlert')
    }


    return (
        <AuthContext.Provider value={{
            ...state,
            loading,
            loginAccount,
            logoutAccount,
            registerAccount
        }}>
            {children}
        </AuthContext.Provider>
    )
};
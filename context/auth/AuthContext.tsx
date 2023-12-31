import { createContext } from 'react';
import { IUser } from '@/interfaces/User';


interface ContextProps {
    isLoggedIn: boolean;
    loading: boolean;
    user?: IUser;

    logoutAccount: () => void;
    loginAccount: (email: string, password: string) => Promise<void>
    registerAccount: (name: string, email: string, password: string) => Promise<void>
}


export const AuthContext = createContext({} as ContextProps);
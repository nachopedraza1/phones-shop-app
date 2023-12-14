import { Data } from '@/interfaces/Cart';
import { createContext } from 'react';


interface ContextProps {
    step: number;

    nextStep: (step: number) => void;
    backStep: (step: number) => void;
    setShippingAddress: (data: Data) => void;
}


export const UiContext = createContext({} as ContextProps);
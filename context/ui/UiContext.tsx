
import { createContext } from 'react';


interface ContextProps {
    step: number;

    nextStep: (step: number) => void;
    backStep: (step: number) => void;
}


export const UiContext = createContext({} as ContextProps);
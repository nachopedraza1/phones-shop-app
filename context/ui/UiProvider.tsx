import { FC, useReducer } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
    step: number;
}


const UI_INITIAL_STATE: UiState = {
    step: 0,
}


export const UiProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const nextStep = (step: number) => {
        if (step > 3) return;
        dispatch({ type: '[Ui] - ChangeStep', payload: step + 1 });
    }

    const backStep = (step: number) => {
        if (step === 0) return;
        dispatch({ type: '[Ui] - ChangeStep', payload: step - 1 });
    }

    return (
        <UiContext.Provider value={{
            ...state,
            nextStep,
            backStep,
        }}>
            {children}
        </UiContext.Provider>
    )
};
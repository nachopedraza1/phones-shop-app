import { UiState } from './';


type UiActionType =
    | { type: '[Ui] - ChangeStep', payload: number }


export const uiReducer = (state: UiState, action: UiActionType): UiState => {

    switch (action.type) {
        case '[Ui] - ChangeStep':
            return {
                ...state,
                step: action.payload
            }

        default:
            return state;
    }

}
import { enqueueSnackbar } from 'notistack'

export const successAlert = (name: string) => {
    enqueueSnackbar(`Bienvenido ${name}`, {
        variant: 'success',
        style: { textTransform: 'capitalize' }
    });
}

export const errorAlert = (message: string) => {
    enqueueSnackbar(message, {
        variant: 'error',
    });
}
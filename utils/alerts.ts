import { enqueueSnackbar } from 'notistack'

export const welcomeAlert = (name: string) => {
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


export const successAlert = (message: string) => {
    enqueueSnackbar(message, {
        variant: 'success'
    })
}
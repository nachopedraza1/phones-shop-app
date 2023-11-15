import { NextPage } from 'next';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';

const RegisterPage: NextPage = () => {
    return (
        <Grid container justifyContent='center' alignItems='center' minHeight='100vh'>
            <Grid
                item
                xs={3.5}
                gap={2}
                padding={3}
                display='flex'
                flexDirection='column'
                className='bgCard'
            >
                <Typography variant='h5'>Registro</Typography>

                <TextField
                    fullWidth
                    variant='outlined'
                    placeholder='Nombre'
                    label='Nombre'
                />
                <TextField
                    fullWidth
                    variant='outlined'
                    placeholder='Email'
                    label='Email'
                />
                <TextField
                    fullWidth
                    variant='outlined'
                    placeholder='Contraseña'
                    label='Contraseña'
                />
                <Button variant='contained'>
                    INGRESAR
                </Button>
                <Typography textAlign='end'>
                    Ya tienes cuenta?
                    <Link href='/auth/login'
                        ml={0.5}
                        color='primary.main'
                    >
                        Ingresa
                    </Link>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default RegisterPage;
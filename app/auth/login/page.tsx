import { NextPage } from 'next';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';

const LoginPage: NextPage = () => {
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
                <Typography variant='h5'> Ingresar </Typography>
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
                    No tienes cuenta?
                    <Link href='/auth/register'
                        ml={0.5}
                        color='primary.main'
                    >
                        Registrate
                    </Link>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default LoginPage;
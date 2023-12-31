'use client';
import { useContext } from 'react';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { AuthContext } from '@/context/auth';
import { isEmail } from '@/utils/validations';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';

interface FormData {
    email: string,
    password: string
}

const LoginPage: NextPage = () => {

    const searchParams = useSearchParams();
    const param = searchParams.get('p');

    const { loginAccount, loading } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const startLogin = async ({ email, password }: FormData) => {
        await loginAccount(email, password);
    }

    return (
        <Grid container justifyContent='center' alignItems='center' minHeight='100vh' component='form' onSubmit={handleSubmit(startLogin)}>
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
                    type='text'
                    variant='outlined'
                    placeholder='Email'
                    label='Email'
                    {...register('email', {
                        required: 'Este campo es requerido',
                        validate: isEmail
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    fullWidth
                    type='password'
                    variant='outlined'
                    placeholder='Contraseña'
                    label='Contraseña'
                    {...register('password', {
                        required: 'Este campo es requerido',
                        minLength: { message: 'Mínimo 3 caracteres.', value: 3 },
                        maxLength: { message: 'Máximo 25 caracteres.', value: 25 },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Button variant='contained' fullWidth type='submit' disabled={loading}>
                    INGRESAR
                </Button>
                <Typography textAlign='end'>
                    No tienes cuenta?
                    <Link href={param ? `/auth/register?p=${param}` : '/auth/register'}
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
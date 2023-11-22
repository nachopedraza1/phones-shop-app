'use client';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { isEmail } from '@/utils/validations';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';

interface FormData {
    name: string,
    email: string,
    password: string
}

const RegisterPage: NextPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const startRegister = () => {

    }

    return (
        <Grid container justifyContent='center' alignItems='center' minHeight='100vh' component='form' onSubmit={handleSubmit(startRegister)}>
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
                    type='text'
                    variant='outlined'
                    placeholder='Nombre'
                    label='Nombre'
                    {...register('name', {
                        required: 'Este campo es requerido',
                        minLength: { message: 'Mínimo 3 caracteres.', value: 3 },
                        maxLength: { message: 'Máximo 25 caracteres.', value: 25 },
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
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
                <Button variant='contained' fullWidth type='submit'>
                    REGISTRARME
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
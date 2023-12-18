import { useContext } from 'react';
import { provincias } from '@/utils';
import { Grid, TextField, MenuItem, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ShippingAddress } from '@/interfaces/Cart';
import { CartContext } from '@/context/cart';
import { UiContext } from '@/context/ui';

const FormShipping: React.FC = () => {

    const { updateAddress } = useContext(CartContext);
    const { nextStep, step } = useContext(UiContext);

    const { register, handleSubmit } = useForm<ShippingAddress>();

    const setData = (data: ShippingAddress) => {
        updateAddress(data);
        nextStep(step);
    }

    return (
        <Grid component={'form'} container spacing={2} onSubmit={handleSubmit(setData)}>
            <Grid item xs={6}>
                <TextField
                    required
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="País"
                    select
                    {...register('country', {
                        required: 'Este campo es requerido'
                    })}
                >
                    <MenuItem value={'Argentina'}>
                        Argentina
                    </MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    required
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Ciudad"
                    select
                    {...register('city', {
                        required: 'Este campo es requerido'
                    })}
                >
                    {
                        provincias.map((prov) => (
                            <MenuItem key={prov} value={prov}>
                                {prov}
                            </MenuItem>
                        ))
                    }
                </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    required
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Dirección"
                    {...register('address', {
                        required: 'Este campo es requerido'
                    })}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    required
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Código postal"
                    {...register('zip', {
                        required: 'Este campo es requerido'
                    })}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Teléfono"
                    {...register('phone', {
                        required: 'Este campo es requerido'
                    })}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Informacion adicional"
                />
            </Grid>
            <Grid item xs={12} textAlign='end'>
                <Button variant='contained' type='submit'>
                    Guardar y continuar
                </Button>
            </Grid>
        </Grid>
    )
}

export default FormShipping;
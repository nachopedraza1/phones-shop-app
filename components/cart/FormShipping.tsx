import { useContext } from 'react';
import { provincias } from '@/utils';
import { Grid, TextField, MenuItem, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Data } from '@/interfaces/Cart';
import { UiContext } from '@/context/ui';

const FormShipping: React.FC = () => {

    const { setShippingAddress } = useContext(UiContext);

    const { register, handleSubmit, formState } = useForm<Data>();

    const setData = (data: Data) => {
        setShippingAddress(data)
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
                    {...register('country')}
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
                    {...register('city')}
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
                    {...register('address')}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    required
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Código postal"
                    {...register('zip')}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Teléfono"
                    {...register('phone')}
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
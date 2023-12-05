import { provincias } from '@/utils';
import { Grid, TextField, MenuItem, Button } from '@mui/material';

const FormShipping: React.FC = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    required
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="País"
                    select
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
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    required
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Código postal"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Teléfono"
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
        </Grid>
    )
}

export default FormShipping;
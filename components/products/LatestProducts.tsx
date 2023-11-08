import { Products } from '@/interfaces/Response';

import CardProduct from './CardProduct';
import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';

const getLatestsProducts = async (category: string): Promise<Products[]> => {
    const { data } = await axios.get<Products[]>(`http://localhost:3000/api/products?limit=4&category=${category}`);
    return data;
}

const LatestProducts: React.FC = async () => {

    const latestsIphones = await getLatestsProducts('iphones');
    const latestsIMacbooks = await getLatestsProducts('macbooks');

    return (
        <Grid container mt={3}>
            <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between' mb={2}>
                <Typography variant="h6" fontWeight={600}>ÚLTIMOS INGRESOS EN IPHONES </Typography>
                <Box width='70%' height={2} bgcolor='#e6e9e8'></Box>
            </Grid>

            <Grid container justifyContent='space-between'>
                {
                    latestsIphones.map(product => (
                        <Grid item xs={12} sm={5.9} md={2.9} key={product.name}>
                            <CardProduct product={product} />
                        </Grid>
                    ))
                }
            </Grid>

            <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between' mb={2} mt={2}>
                <Typography variant="h6" fontWeight={600}>ÚLTIMOS INGRESOS EN MACBOOKS </Typography>
                <Box width='70%' height={2} bgcolor='#e6e9e8'></Box>
            </Grid>

            <Grid container justifyContent='space-between'>
                {
                    latestsIMacbooks.map(product => (
                        <Grid item xs={12} sm={5.9} md={2.9} key={product.name}>
                            <CardProduct product={product} />
                        </Grid>
                    ))
                }
            </Grid>
        </Grid >
    )
}

export default LatestProducts;

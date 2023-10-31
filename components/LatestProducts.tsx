"use client"
import useSWR from 'swr';
import { Box, Grid, Typography } from '@mui/material';

import CardProduct from './CardProduct';

import { Products } from '@/interfaces/Response';


const LatestProducts: React.FC = () => {

    const { data, isLoading } = useSWR<Products[]>('http://localhost:3000/api/products?limit=2&category=fundas', {
        revalidateOnFocus: false,
        revalidateOnMount: false,
        revalidateOnReconnect: false
    });

    return (
        <Grid container mt={3}>
            <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between' mb={2}>
                <Typography variant="h6" fontWeight={600}>ÚLTIMOS PRODUCTOS </Typography>
                <Box width='80%' height={2} bgcolor='#e6e9e8'></Box>
            </Grid>

            {
                !isLoading &&
                data?.map(product => (
                    <CardProduct product={product} />
                ))
            }
        </Grid>
    )
}

export default LatestProducts;

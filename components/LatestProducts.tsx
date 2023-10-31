"use client"
import { Products } from '@/interfaces/Response';
import { Box, Grid, Typography } from '@mui/material';
import useSWR from 'swr';
import { CardProduct } from '.';


const LatestProducts: React.FC = () => {

    const { data } = useSWR<Products[]>('http://localhost:3000/api/products?limit=2&category=fundas');


    return (
        <Grid container mt={3}>
            <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between' mb={2}>
                <Typography variant="h6" fontWeight={600}>ÚLTIMOS PRODUCTOS </Typography>
                <Box width='80%' height={2} bgcolor='#e6e9e8'></Box>
            </Grid>

            {
                data?.map(item => (
                    <CardProduct />
                ))
            }
        </Grid>
    )
}

export default LatestProducts;

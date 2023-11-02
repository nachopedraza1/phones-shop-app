"use client"
import useSWR from 'swr';
import { Products } from '@/interfaces/Response';

import CardProduct from './CardProduct';
import CardProductLoading from './CardProductLoading';
import { Box, Grid, Typography } from '@mui/material';


const LatestProducts: React.FC = () => {

    const { data, isLoading } = useSWR<Products[]>('http://localhost:3000/api/products?limit=4&category=iphones&random=true', {
        revalidateOnFocus: false,
    });


    return (
        <Grid container mt={3}>
            <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between' mb={2}>
                <Typography variant="h6" fontWeight={600}>ÚLTIMOS PRODUCTOS </Typography>
                <Box width='80%' height={2} bgcolor='#e6e9e8'></Box>
            </Grid>

            <Grid container justifyContent='space-between'>
                {
                    isLoading ?
                        [...Array(4)].map(item => (
                            <Grid item xs={12} sm={5.9} md={2.9} key={item} >
                                <CardProductLoading />
                            </Grid>
                        ))
                        :
                        data?.map(product => (
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

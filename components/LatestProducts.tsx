'use client'
import { CardProduct } from '@/components';
import { Products } from '@/interfaces/Response';
import { Box, Grid, Typography } from '@mui/material';


export const LatestProducts: React.FC = () => {

    return (
        <Grid container mt={3}>
            <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between' mb={2}>
                <Typography variant="h6" fontWeight={600}>ÚLTIMOS PRODUCTOS </Typography>
                <Box width='80%' height={2} bgcolor='#e6e9e8'></Box>
            </Grid>

            <CardProduct />
        </Grid>
    )
}

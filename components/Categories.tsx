import Image from 'next/image';
import { categories } from '@/utils/constants';
import { Box, Grid, Typography } from '@mui/material';

const Categories: React.FC = () => {
    return (
        <Grid container mt={3}>
            <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between' mb={2}>
                <Typography variant="h6" fontWeight={600}> SHOP BY CATEGORY </Typography>
                <Box width='83%' height={2} bgcolor='#e6e9e8'></Box>
            </Grid>
            {
                categories.map(category => (
                    <Grid item xs={2} textAlign='center' key={category.name} pt={2} pb={2}>
                        <Image src={category.image}
                            alt={category.alt}
                            height={category.height}
                            width={category.width}
                        />
                        <Typography variant="h6" fontWeight={600} mb={1}> iPhones </Typography>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default Categories;
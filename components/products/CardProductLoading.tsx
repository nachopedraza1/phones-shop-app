import React from 'react'
import { formatPrice } from '@/utils/formatPrice'
import { Favorite } from '@mui/icons-material'
import { Card, CardHeader, Tooltip, Typography, IconButton, CardMedia, CardContent, Grid, Button, Skeleton } from '@mui/material'
import RatingProduct from './RatingProduct'

const CardProductLoading = () => {
    return (
        <Card sx={{ maxWidth: "100%" }} className="fadeIn">
            <CardHeader
                title={
                    <Typography>
                        <Skeleton width='95%' />
                    </Typography>
                }
                subheader={<Skeleton width='90%' />}
                action={
                    <IconButton disabled>
                        <Favorite />
                    </IconButton>
                }
            />

            <Skeleton variant='rectangular' height={194} />

            <CardContent>

                <Skeleton width='100%' />
                <Skeleton width='100%' />
                <Skeleton width='100%' />
                <Skeleton width='100%' />

                <Button variant="contained" fullWidth sx={{ mt: 1 }} disabled>
                    COMPRAR
                </Button>
            </CardContent>

        </Card >
    )
}

export default CardProductLoading
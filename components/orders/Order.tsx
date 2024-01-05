import { Order } from '@/interfaces/Orders'
import { formatPrice } from '@/utils/formatPrice'
import { Grid, Typography, Button } from '@mui/material'
import Image from 'next/image'

const UserOrder: React.FC<{ order: Order }> = ({ order }) => {
    return (
        <Grid container justifyContent='space-between' p={2} alignItems='center' borderBottom='1px solid rgba(0,0,0,.1)'>
            <Grid item xs={1} position='relative'>
                {/* <Image src={order.products[0].image} alt={order.products[0].name} width={64} height={64} style={{ objectFit: 'contain' }} /> */}
            </Grid>
            <Grid item xs={5}>
                <Typography> {order.userId} </Typography>
            </Grid>

        </Grid>
    )
}

export default UserOrder;
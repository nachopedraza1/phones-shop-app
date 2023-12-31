import { Order } from '@/interfaces/Orders'
import { formatPrice } from '@/utils/formatPrice'
import { Grid, Typography, Button, AvatarGroup, Avatar, Tooltip } from '@mui/material'
import Image from 'next/image'

const UserOrder: React.FC<{ order: Order }> = ({ order }) => {

    return (
        <Grid container justifyContent='space-between' p={2} alignItems='center' borderBottom='1px solid rgba(0,0,0,.1)'>
            <Grid item xs={2} position='relative'>
                <AvatarGroup max={3} sx={{ justifyContent: 'start' }}>
                    {
                        order.products.map(prod => {

                            if (order.products.length === 1) {
                                return <Image src={order.products[0].image} alt={order.products[0].name} width={64} height={64} style={{ objectFit: 'contain' }} />
                            }

                            return (
                                <Tooltip title={prod.name}>
                                    <Avatar src={prod.image} key={prod.name} sx={{ border: '1px solid red' }} />
                                </Tooltip>
                            )
                        })
                    }
                </AvatarGroup>
            </Grid>
            <Grid item xs={5}>
                <Typography> {order.userId} </Typography>
            </Grid>

        </Grid>
    )
}

export default UserOrder;
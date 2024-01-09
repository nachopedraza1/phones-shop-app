import { Order } from '@/interfaces/Orders'
import { formatPrice } from '@/utils/formatPrice'
import { Grid, Typography, AvatarGroup, Avatar, Tooltip, Chip, Button } from '@mui/material'
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
            <Grid item xs={2}>
                <Typography variant='h6' fontWeight={600}> ${formatPrice(order.total)} </Typography>
            </Grid>

            <Grid item xs={2}>
                <Chip
                    variant='outlined'
                    color={order.isPaid >= 1 ? 'success' : 'error'}
                    label={order.isPaid >= 1 ? 'Pagada' : 'No pagada'}
                />
            </Grid>

            <Grid item xs={2}>
                    <Button variant='contained'>
                        Ver detalle
                    </Button>
            </Grid>

        </Grid>
    )
}

export default UserOrder;
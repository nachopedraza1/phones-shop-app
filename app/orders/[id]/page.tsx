
import { formatPrice } from "@/utils/formatPrice";
import { LocalActivity } from "@mui/icons-material";
import { Grid, Typography, Box, Button, Divider } from "@mui/material";
import { Order } from "@/interfaces/Orders";
import Image from "next/image";
import db from "@/database/connection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { RowDataPacket } from "mysql2";
import { getOrderDetail } from "@/utils/querys";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import Main from "@/components/layouts/Main";

const getOrderDetails = async (id: string): Promise<Order | null> => {
    const session: any = await getServerSession(authOptions);
    if (!session) return null;
    const [[order]] = await db.query<RowDataPacket[][] & Order[]>(getOrderDetail, [session.user.id, id]);
    return order;
}

const PayOrder: NextPage<{ params: { id: string } }> = async ({ params }) => {

    const order = await getOrderDetails(params.id);
    if (!order) return redirect('/');

    return (
        <Main>
            <Grid container justifyContent='space-between' alignItems='stretch' minHeight='70vh'>
                <Grid item xs={8.2} display='flex' flexDirection='column' className="bgCard" maxHeight='70vh'>
                    <Grid p={2} borderBottom='1px solid rgba(0,0,0,.1)'>
                        <Typography fontWeight={600}> Order N: 1234 </Typography>
                    </Grid>
                    <Grid maxHeight='70vh' sx={{ overflowY: 'scroll' }}>
                        {
                            order.products.map(product => (
                                <Grid container justifyContent='space-between' p={2} alignItems='center' borderBottom='1px solid rgba(0,0,0,.1)'>
                                    <Grid item xs={1} position='relative'>
                                        {/* <Image src={product.image} alt={product.name} width={64} height={64} style={{ objectFit: 'contain' }} /> */}
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography> {product.name} </Typography>
                                    </Grid>
                                    <Grid item xs={2} textAlign='center'>
                                        <Typography color='text.secondary' fontSize={15}> {product.quantity} {product.quantity > 1 ? 'Unidades' : 'Unidad'} </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="h5" fontWeight={300}> ${product.price} </Typography>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid item xs={3.5} display='flex' flexDirection='column' className="bgCard">
                    <Grid p={2} borderBottom='1px solid rgba(0,0,0,.1)'>
                        <Typography fontWeight={600}> Resumen de compra </Typography>
                    </Grid>
                    <Grid container direction='column' p={2} gap={1}>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography> {order.products.length > 1 ? 'Productos' : 'Producto'} ({order.products.length}) </Typography>
                            <Typography>  ${order.total} </Typography>
                        </Box>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography> IVA </Typography>
                            <Typography> 21% </Typography>
                        </Box>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography> Envío </Typography>
                            <Typography color='#00a650'> Gratis </Typography>
                        </Box>
                        <Box display='flex'>
                            <Button startIcon={<LocalActivity color="primary" />} disableRipple sx={{ p: 0 }}>
                                Ingresar código de cupón
                            </Button>
                        </Box>
                        <Divider />
                        <Box display='flex' justifyContent='space-between'>
                            <Typography> Pais </Typography>
                            <Typography> {order.country} </Typography>
                        </Box>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography> Ciudad </Typography>
                            <Typography> {order.city}, {order.zip} </Typography>
                        </Box>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography> Teléfono </Typography>
                            <Typography> phone </Typography>
                        </Box>
                        <Divider />
                        <Box display='flex' justifyContent='space-between'>
                            <Typography fontWeight={600} variant="h6"> Total </Typography>
                            <Typography variant="h6"> ${order.total} </Typography>
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                        >
                            Pagar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Main>
    )
}

export default PayOrder;
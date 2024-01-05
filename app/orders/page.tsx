import { NextPage } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import db from "@/database/connection";
import Main from "@/components/layouts/Main";

import { authOptions } from "@/utils/authOptions";
import { getOrders } from "@/utils/querys";
import { Order } from "@/interfaces/Orders";
import { RowDataPacket } from "mysql2";
import { Grid, Typography } from "@mui/material";
import UserOrder from "@/components/orders/Order";

const getUserOrders = async (): Promise<Order[] | null> => {
    const session: any = await getServerSession(authOptions);
    if (!session) return null;
    const [orders] = await db.query<RowDataPacket[][] & Order[]>(getOrders, session.user.id);
    return orders;
}

const OrdersPage: NextPage = async () => {

    const orders = await getUserOrders();
    if (!orders) return redirect('/');

    return (
        <Main>
            <Grid container justifyContent='space-between' alignItems='stretch' minHeight='70vh'>
                <Grid item xs={8.2} display='flex' flexDirection='column' className="bgCard" maxHeight='70vh'>
                    <Grid p={2} borderBottom='1px solid rgba(0,0,0,.1)'>
                        <Typography fontWeight={600}> Ordenes </Typography>
                    </Grid>
                    <Grid maxHeight='70vh' sx={{ overflowY: 'scroll' }}>
                        {
                            orders.map(order => (
                                <UserOrder order={order} />
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid item xs={3.5} display='flex' flexDirection='column' className="bgCard">
                    <Grid p={2} borderBottom='1px solid rgba(0,0,0,.1)'>
                        <Typography fontWeight={600}> Detalles de la orden </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Main>
    )
}

export default OrdersPage;
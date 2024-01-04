import { NextPage } from "next";
import Main from "@/components/layouts/Main";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";


const getUserOrders = async () => {

    const session: any = await getServerSession(authOptions);
    console.log(session);

    const orders = await fetch('http://localhost:3000/api/orders').then(data => data.json())
    console.log(orders);

    return orders;
}


const OrdersPage: NextPage = async () => {

    const orders = await getUserOrders();
    console.log(orders);
    

    return (
        <Main>
            page
        </Main>
    )
}

export default OrdersPage;
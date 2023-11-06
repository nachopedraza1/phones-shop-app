import Image from "next/image";

import { RowDataPacket } from "mysql2";
import db from "@/database/connection";
import { formatPrice } from "@/utils/formatPrice";

import { Grid, Typography } from "@mui/material";

import { MySqlProduct } from "@/interfaces/Response";


const getRelatedProducts = async (category: string): Promise<MySqlProduct[]> => {

    const query = `
    SELECT * FROM Products 
    LEFT JOIN Installments ON Products.id = Installments.ProductId
    WHERE Products.category = ?
    LIMIT 3`;

    const [products] = await db.query<MySqlProduct[] & RowDataPacket[][]>(query, [category])

    return JSON.parse(JSON.stringify(products))
}

const RelatedProducts: React.FC<{ category: string }> = async ({ category }) => {

    const products = await getRelatedProducts(category);

    return (
        <Grid container gap={2}>
            <Typography variant="h6" > Productos relacionados </Typography>
            {
                products.map(product => (
                    <Grid item xs={12} display='flex' key={product.id} p={1} justifyContent='space-between' boxShadow='0 1px 1px 0 rgba(0,0,0,.1)'>
                        <Grid item xs={3} position='relative'>
                            <Image
                                src={product.thumbnail}
                                alt={product.name}
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </Grid>
                        <Grid item xs={8.5}>
                            <Typography fontSize={14}> {product.name} </Typography>
                            <Typography variant="h6"> ${formatPrice(product.price)} </Typography>
                            <Typography fontSize={14}> {product.quantity}x de ${formatPrice(product.amount)} </Typography>
                            <Typography fontSize={14} color='#00a650' fontWeight={600}> Envío gratuito </Typography>
                        </Grid>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default RelatedProducts;
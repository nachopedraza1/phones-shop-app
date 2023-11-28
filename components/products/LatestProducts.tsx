
import db from '@/database/connection';
import { RowDataPacket } from 'mysql2';
import { Box, Grid, Typography } from '@mui/material';
import { MySqlProduct, Products } from '@/interfaces/Response';
import CardProduct from '@/components/products/CardProduct';

const getLatestsProducts = async (category: string): Promise<Products[]> => {

    const query = `
    SELECT * FROM Products 
    LEFT JOIN Installments ON Products.id = Installments.productId
    LEFT JOIN Rating ON Products.id = Rating.productId
    WHERE category = ?
    LIMIT 4;
    `

    const [products] = await db.query<MySqlProduct[] & RowDataPacket[][]>(query, [category]);

    const latestProducts = products.map(product => ({
        id: product.id,
        meli_id: product.meli_id,
        name: product.name,
        price: product.price,
        category: product.category,
        condition: product.prod_condition,
        brand: product.brand,
        thumbnail: product.thumbnail,
        thumbnail_id: product.thumbnail_id,
        totalSold: product.totalSold,
        rating: {
            negative: product.negative,
            neutral: product.neutral,
            positive: product.positive,
        },
        installments: {
            quantity: product.quantity,
            amount: product.amount,
            rate: product.rate,
        }
    }))

    return latestProducts;
}

const LatestProducts: React.FC<{ title?: string, category: string }> = async ({ title, category }) => {

    const latestProducts = await getLatestsProducts(category);

    return (
        <Grid container mt={3}>
            <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between' mb={2}>
                <Typography variant="h6" fontWeight={600}> {title} </Typography>
                <Box width='70%' height={2} bgcolor='#e6e9e8'></Box>
            </Grid>

            <Grid container justifyContent='space-between'>
                {
                    latestProducts.map(product => (
                        <Grid item xs={12} sm={5.9} md={2.9} key={product.name}>
                            <CardProduct product={product} />
                        </Grid>
                    ))
                }
            </Grid>
        </Grid >
    )
}

export default LatestProducts;

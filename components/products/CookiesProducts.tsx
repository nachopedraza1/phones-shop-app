import { Grid, Skeleton } from "@mui/material";
import { Products } from "@/interfaces/Response";
import useSWR from "swr";
import CardProduct from "./CardProduct";

const CookiesProducts: React.FC = () => {

    const { data } = useSWR<Products[]>('http://localhost:3000/api/products?random=true&limit=4');

    return (
        <Grid container mt={3}>
            <Grid container justifyContent='space-between'>
                {
                    data ?
                        data.map(product => (
                            <Grid item xs={12} sm={5.9} md={2.9} key={product.name}>
                                <CardProduct product={product} />
                            </Grid>
                        ))
                        :
                        [...Array(4)].map((item, index) => (
                            <Grid item xs={4} key={index}>
                                <Grid container direction='column' padding={1} gap={1}>
                                    <Grid item xs={3} position='relative'>
                                        <Skeleton height='100%' />
                                    </Grid>
                                    <Grid item xs={8.5}>
                                        <Skeleton />
                                        <Skeleton width='90%' />
                                        <Skeleton width='60%' />
                                        <Skeleton width='60%' />
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))
                }
            </Grid>
        </Grid >
    )
}

export default CookiesProducts
import { Grid, Skeleton } from "@mui/material";
import { Products } from "@/interfaces/Response";
import useSWR from "swr";
import CardProduct from "./CardProduct";
import CardProductLoading from "./CardProductLoading";

const CookiesProducts: React.FC = () => {

    const { data } = useSWR<Products[]>('http://localhost:3000/api/products?random=true&limit=4', {
        revalidateOnFocus: false,
    });

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
                            <Grid item xs={12} sm={5.9} md={2.9} key={index}>
                                <CardProductLoading />
                            </Grid>
                        ))
                }
            </Grid>
        </Grid >
    )
}

export default CookiesProducts;
import { Attribute } from "@/interfaces/MeliProduct"
import { Grid, Typography } from "@mui/material";

const StatsProducts: React.FC<{ attributes: Attribute[] }> = ({ attributes }) => {
    console.log({ attributes });

    const productName = attributes.find(item => item.id === "MODEL")?.value_name;

    return (
        <Grid >
            <Typography variant="h5"> Características de {productName} </Typography>
            {
                attributes.map(atr => (
                    <Typography> {productName} </Typography>
                ))
            }
        </Grid>
    )
}

export default StatsProducts;
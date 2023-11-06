import { Attribute } from "@/interfaces/MeliProduct";
import TableStats from "@/components/tables/TableStats";
import { Grid, Typography } from "@mui/material";

const StatsProducts: React.FC<{ attributes: Attribute[] }> = ({ attributes }) => {

    const productName = attributes.find(item => item.id === "MODEL")?.value_name;

    const generalAtributes = attributes.filter(atr =>
        atr.id === 'BRAND' ||
        atr.id === 'LINE' ||
        atr.id === 'MODEL' ||
        atr.id === 'MAIN_COLOR'
    );

    const memoryAtributes = attributes.filter(atr =>
        atr.id === 'RAM' ||
        atr.id === 'MEMORY_CARD_MAX_CAPACITY' || 
        atr.id === 'INTERNAL_MEMORY' || 
        atr.id === 'WITH_MEMORY_CARD_SLOT'
    );

    const procesadorAtributes = attributes.filter(atr =>
        atr.id === 'PROCESSOR_MODEL' ||
        atr.id === 'GPU_MODEL'
    );

    const sistemAtributes = attributes.filter(atr =>
        atr.id === 'OPERATING_SYSTEM_NAME' ||
        atr.id === 'GPU_MODEL'
    );

    return (
        <Grid>
            <Typography variant="h5"> Características de {productName} </Typography>
            <Grid container gap={4}>
                <Grid item xs={4}>
                    <TableStats attributes={generalAtributes} title='Características generales' />
                </Grid>
                <Grid item xs={4}>
                    <TableStats attributes={memoryAtributes} title='Memoria' />
                </Grid>
                <Grid item xs={4}>
                    <TableStats attributes={procesadorAtributes} title='Procesador' />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StatsProducts;
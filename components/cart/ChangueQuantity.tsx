import { Remove, Add } from "@mui/icons-material"
import { Grid, IconButton, Typography } from "@mui/material"

interface Props {
    maxValue: number,
    currentValue: number,
    onUpdateProduct: (quantity: number) => void;
}

const ChangueQuantity: React.FC<Props> = ({ maxValue, currentValue, onUpdateProduct }) => {

    const onAddQuantity = () => {
        onUpdateProduct(currentValue + 1);
    }

    const onDecQuantity = () => {
        onUpdateProduct(currentValue - 1);
    }

    return (
        <>
            <Grid container gap={1} justifyContent='center' alignItems='center' border='1px solid rgba(0,0,0,.1)' borderRadius={1}>
                <IconButton color="primary" onClick={onDecQuantity} disabled={currentValue === 1}>
                    <Remove fontSize="small" />
                </IconButton>
                <Typography variant="h6">
                    {currentValue}
                </Typography>
                <IconButton color="primary" onClick={onAddQuantity} disabled={currentValue >= maxValue}>
                    <Add fontSize="small" />
                </IconButton>
            </Grid>
            <Typography color='text.secondary' fontSize={13} mt={1}> {maxValue} disponibles </Typography>
        </>
    )
}

export default ChangueQuantity;
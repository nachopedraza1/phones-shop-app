import { useContext } from "react";

import { CartContext } from "@/context/cart";
import { formatPrice } from "@/utils/formatPrice";

import StepperCart from "@/components/ui/StepperCart";
import ProductInCart from "@/components/cart/ProductInCart";
import { LocalActivity } from "@mui/icons-material";
import { Grid, Typography, Box, Button } from "@mui/material";

const Cart: React.FC = () => {

    const { cart, subTotal, totalProducts } = useContext(CartContext);

    return (
        <Grid container justifyContent='space-between' alignItems='stretch' minHeight='70vh'>
            <Grid item xs={8.2} display='flex' flexDirection='column' className="bgCard" maxHeight='70vh'>
                <Grid p={2} borderBottom='1px solid rgba(0,0,0,.1)'>
                    <StepperCart />
                </Grid>
                <Grid maxHeight='70vh' sx={{ overflowY: 'scroll' }}>
                    {
                        cart.map(product => (
                            <ProductInCart product={product} />
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
                        <Typography> {totalProducts > 1 ? 'Productos' : 'Producto'} ({totalProducts}) </Typography>
                        <Typography>  ${formatPrice(subTotal)} </Typography>
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
                    <Box display='flex' justifyContent='space-between'>
                        <Typography fontWeight={600} variant="h6"> Total </Typography>
                        <Typography variant="h6"> ${formatPrice(subTotal)} </Typography>
                    </Box>
                    <Button fullWidth variant="contained">
                        Continuar compra
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Cart;
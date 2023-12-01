import { Stepper, Step, StepLabel, Grid, Typography } from "@mui/material";

const steps = [
    'Carrito',
    'Envío',
    'Pago',
];

const StepperCart: React.FC = () => {
    return (
        <Grid container justifyContent='start' alignItems='center'>
            {/* <Grid item xs={?}>
            <Typography fontWeight={600}>Carrito</Typography> 
            </Grid> */}
            <Grid item xs={12}>
                <Stepper activeStep={0}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Grid>
        </Grid>
    )
}

export default StepperCart;
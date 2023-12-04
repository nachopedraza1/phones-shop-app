import { useContext } from "react";
import { UiContext } from "@/context/ui";
import { Stepper, Step, StepLabel, Grid } from "@mui/material";

const steps = [
    'Carrito',
    'Envío',
    'Pago',
];

const StepperCart: React.FC = () => {

    const { step } = useContext(UiContext);

    return (
        <Grid container justifyContent='start' alignItems='center'>
            {/* <Grid item xs={?}>
            <Typography fontWeight={600}>Carrito</Typography> 
            </Grid> */}
            <Grid item xs={12}>
                <Stepper activeStep={step}>
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
import React, { useContext } from "react";
import { CartContext } from "@/context/cart";
import { Box, Typography } from "@mui/material";
import ProductInCart from "@/components/cart/ProductInCart";
import FormShipping from "./FormShipping";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


const StepsCart: React.FC<{ step: number }> = ({ step }) => {

    const { cart } = useContext(CartContext);

    return (
        <>
            <CustomTabPanel value={step} index={0}>
                {
                    cart.map(product => (
                        <ProductInCart product={product} />
                    ))
                }
            </CustomTabPanel>
            <CustomTabPanel value={step} index={1}>
                <FormShipping />
            </CustomTabPanel>
            <CustomTabPanel value={step} index={2}>
                Item Three
            </CustomTabPanel>
        </>
    );
}

export default StepsCart;
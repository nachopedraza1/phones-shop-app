import React, { useContext } from "react";
import { CartContext } from "@/context/cart";
import { Box, Grid, Typography } from "@mui/material";
import FormShipping from "@/components/cart/FormShipping";
import ProductInCart from "@/components/cart/ProductInCart";

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
                    {children}
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
                        <ProductInCart
                            key={product.meli_id}
                            product={product}
                        />
                    ))
                }
            </CustomTabPanel>
            <CustomTabPanel value={step} index={1}>
                <FormShipping />
            </CustomTabPanel>
            <CustomTabPanel value={step} index={2}>
                {
                    cart.map(product => (
                        <ProductInCart
                            key={product.meli_id}
                            product={product}
                            modify={false}
                        />
                    ))
                }
            </CustomTabPanel>
        </>
    );
}

export default StepsCart;
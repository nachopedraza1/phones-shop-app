"use client"
import { useContext, useState } from "react";
import { CartContext } from "@/context/cart";
import { ExpandMore } from "@mui/icons-material";
import { Button, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { Products } from "@/interfaces/Response";


const BuyProductButton: React.FC<{ totalStock: number, product: Products }> = ({ totalStock, product }) => {

    const { addCartProduct } = useContext(CartContext);

    const [quantity, setQuantity] = useState(1);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null)
    };

    const changueQuantity = (quantitySelected: number) => {
        setQuantity(quantitySelected);
        handleClose();
    }

    const handleAddProduct = () => {
        addCartProduct({
            meli_id: product.meli_id,
            name: product.name,
            price: product.price,
            thumbnail: product.thumbnail,
            installments: product.installments,
            quantity
        })
    }


    return (
        <>
            <Typography
                onClick={handleClick}
                component='span'
                display={'flex'}
                flexWrap='nowrap'
                gap={1}
                mt={2}
                style={{ cursor: 'pointer' }}
            >
                Cantidad:
                <Typography component='span' fontWeight={600} noWrap> {quantity} {quantity > 1 ? 'unidades' : 'unidad'}  </Typography>
                <ExpandMore color='primary' />
                <Typography component='span' color='text.secondary' noWrap> ({totalStock} disponibles)</Typography>
            </Typography>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                style={{ maxHeight: 48 * 4.5 }}
            >
                {
                    [...Array(totalStock)].map((_, index) => (
                        <MenuItem onClick={() => changueQuantity(index + 1)} key={index}>
                            {index + 1} {index + 1 > 1 ? 'unidades' : 'unidad'}
                        </MenuItem>
                    ))
                }
            </Menu>

            <Grid container gap={1} mt={1}>
                <Grid item xs={5.5}>
                    <Button
                        fullWidth
                        variant="contained"
                    >
                        COMPRAR
                    </Button>
                </Grid>
                <Grid item xs={5.5}>
                    <Button
                        onClick={handleAddProduct}
                        fullWidth
                        variant="outlined"
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        AGREGAR AL CARRITO
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default BuyProductButton;
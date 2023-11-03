"use client"
import { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";


const SelectQuantity: React.FC<{ totalStock: number }> = ({ totalStock }) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <Typography
                onClick={handleClick}
                component='span'
                display={'flex'}
                gap={1}
                mt={2}
                style={{ cursor: 'pointer' }}
            >
                Cantidad:
                <Typography component='span' fontWeight={600}> 1 unidad </Typography>
                <ExpandMore />
                <Typography component='span' color='text.secondary'> ({totalStock} disponibles)</Typography>
            </Typography>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                style={{ maxHeight: 48 * 4.5 }}
            >
                {
                    [...Array(totalStock)].map((_, index) => (
                        <MenuItem onClick={handleClose}>
                            {index + 1} {index + 1 > 1 ? 'unidades' : 'unidad'}
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    )
}

export default SelectQuantity

'use client';
import { useState, MouseEvent, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Button, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { AuthContext } from '@/context/auth';
import { AccountCircle, HowToReg, LoginOutlined, LogoutOutlined, Receipt, ShoppingCart, SupportAgent } from '@mui/icons-material';


const AccountButton: React.FC = () => {

    const { isLoggedIn, logoutAccount } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateTo = (route: string) => {
        router.push(route);
        handleClose();
    }

    const onLogout = () => {
        logoutAccount();
        handleClose();
    }

    return (
        <div>
            <Button
                color="secondary"
                disableRipple
                onClick={handleClick}
                startIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20, marginRight: 3 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                }
                endIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 17, height: 17, marginLeft: 3 }} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                }
            >
                Account
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {!isLoggedIn ? (
                    [
                        <MenuItem key="login" onClick={() => navigateTo(pathname !== '/' ? `/auth/login?p=${pathname}` : '/auth/login')}>
                            <ListItemIcon>
                                <LoginOutlined />
                            </ListItemIcon>
                            Ingresar
                        </MenuItem>,
                        <MenuItem key="register" onClick={() => navigateTo(pathname !== '/' ? `/auth/login?p=${pathname}` : '/auth/login')}>
                            <ListItemIcon>
                                <HowToReg />
                            </ListItemIcon>
                            Registrate
                        </MenuItem>
                    ]
                ) : (
                    [
                        <MenuItem key="account" onClick={handleClose} disabled>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            Mi cuenta
                        </MenuItem>,
                        <MenuItem key="cart" onClick={handleClose}>
                            <ListItemIcon>
                                <ShoppingCart />
                            </ListItemIcon>
                            Carrito
                        </MenuItem>,
                        <MenuItem key="account" onClick={handleClose}>
                            <ListItemIcon>
                                <Receipt />
                            </ListItemIcon>
                            Mis ordenes
                        </MenuItem>,
                        <Divider key="divider" />,
                        <MenuItem key="logout" onClick={onLogout}>
                            <ListItemIcon>
                                <LogoutOutlined />
                            </ListItemIcon>
                            Cerrar sesión
                        </MenuItem>
                    ]
                )}
            </Menu>
        </div >
    );
}


export default AccountButton;

"use client";
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';
import { SWRConfig } from 'swr'

import { appTheme } from '@/theme/theme';
import { AuthProvider } from '@/context/auth';
import { CartProvider } from '@/context/cart';
import { ThemeProvider, CssBaseline } from '@mui/material'

interface Props {
    children: React.ReactNode;
}

export const Providers = (Props: Props) => {
    return (
        <SessionProvider>
            <SWRConfig
                value={{
                    fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
                }}
            >
                <ThemeProvider theme={appTheme}>
                    <CssBaseline />
                    <AuthProvider>
                        <CartProvider>
                            <SnackbarProvider
                                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                                preventDuplicate={true}
                                autoHideDuration={2500}
                            >
                                {Props.children}
                            </SnackbarProvider>
                        </CartProvider>
                    </AuthProvider>
                </ThemeProvider>
            </SWRConfig >
        </SessionProvider>
    )
}

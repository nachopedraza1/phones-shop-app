"use client";
import { SWRConfig } from 'swr'
import { CartProvider } from '@/context/cart';
import { appTheme } from '@/theme/theme';
import { ThemeProvider, CssBaseline } from '@mui/material'

interface Props {
    children: React.ReactNode;
}

export const Providers = (Props: Props) => {
    return (
        <SWRConfig
            value={{
                fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
            }}
        >
            <ThemeProvider theme={appTheme}>
                <CssBaseline />
                <CartProvider>
                    {Props.children}
                </CartProvider>
            </ThemeProvider>
        </SWRConfig>
    )
}

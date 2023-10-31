"use client";
import { appTheme } from '@/theme/theme';
import { ThemeProvider, CssBaseline } from '@mui/material'
import { SWRConfig } from 'swr'

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
                {Props.children}
            </ThemeProvider>
        </SWRConfig>
    )
}

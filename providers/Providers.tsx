
import { appTheme } from '@/theme/theme';
import { ThemeProvider, CssBaseline } from '@mui/material'

interface Props {
    children: React.ReactNode;
}

export const Providers = (Props: Props) => {
    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            {Props.children}
        </ThemeProvider>
    )
}

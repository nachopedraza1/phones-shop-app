import { Container, Grid } from '@mui/material'

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Grid container>
                <Grid item height={20}>

                </Grid>

            </Grid>

            <Container>
                {children}
            </Container>
        </>
    )
}

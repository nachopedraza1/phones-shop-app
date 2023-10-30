import { Navbar } from '../navbar';
import { Container } from '@mui/material';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Navbar />

            <Container maxWidth='xl'>
                {children}
            </Container>
        </>
    )
}

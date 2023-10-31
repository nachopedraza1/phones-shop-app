
import { Container } from '@mui/material';
import Navbar from '../navbar/Navbar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Navbar />

            <Container maxWidth='xl'>
                {children}
            </Container>
        </>
    )
}

export default MainLayout;

import Navbar from '@/components/navbar/Navbar';
import { Container } from '@mui/material';

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Navbar />

            <Container maxWidth='xl'>
                {children}
            </Container>
        </>
    )
}

export default Main;

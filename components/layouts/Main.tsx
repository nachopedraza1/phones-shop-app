import Navbar from '@/components/navbar/Navbar';
import { Container } from '@mui/material';

const Main: React.FC<{ children: React.ReactNode, bgcolor?: string }> = ({ children, bgcolor }) => {
    return (
        <div style={{ backgroundColor: bgcolor }}>
            <Navbar />

            <Container maxWidth='xl'>
                {children}
            </Container>
        </div>
    )
}

export default Main;

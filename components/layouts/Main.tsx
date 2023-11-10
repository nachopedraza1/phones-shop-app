import Navbar from '@/components/navbar/Navbar';
import { Container } from '@mui/material';

const Main: React.FC<{ children: React.ReactNode, bgcolor?: string }> = ({ children, bgcolor }) => {
    return (
        <div style={{ backgroundColor: bgcolor }}>
            <Navbar />

            <Container maxWidth='xl'>
                <div>{children}</div>
            </Container>
        </div>
    )
}

export default Main;

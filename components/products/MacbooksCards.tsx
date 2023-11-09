import Image from "next/image";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import RelatedProducts from "./RelatedProducts";

const cards = [
    {
        title: 'MacBook Air de 13”',
        subtitle: 'Chip M1',
        description: 'La laptop Mac más accesible, para hacer de todo en todos lados.',
        image: '/mac1.png',
        color: ['#7d7e80', '#e3e4e5', '#f9d4c2']
    },
    {
        title: 'MacBook Air de 13” y 15”',
        subtitle: 'Chip M1',
        description: 'Increíblemente delgada y rápida, para trabajar, jugar y crear en cualquier lugar.',
        image: '/mac2.png',
        color: ['#7d7e80', '#e3e4e5', '#f9d4c2']
    },
    {
        title: 'MacBook Pro de 14” y 16”',
        subtitle: 'Chip M3, M3 Pro o M3 Max',
        description: 'La laptop Mac más avanzada, para flujos de trabajo muy exigentes.',
        image: '/mac3.png',
        color: ['#7d7e80', '#e3e4e5', '#f9d4c2']
    }
];

const MacbooksCards: React.FC = () => {

    return (
        <Grid container justifyContent='center' alignItems='start' gap={3} mt={5}>
            <Grid item xs={12}>
                <Divider>
                    <Typography variant="h4"> Conoce a la familia </Typography>
                </Divider>
            </Grid>
            {
                cards.map(card => (
                    <Grid
                        item
                        xs={3.5}
                        display='flex'
                        flexDirection='column'
                        textAlign='center'
                        alignItems='center'
                        gap={2}
                        padding={2}
                        key={card.title}
                    >
                        <Box width={350} height={190} position='relative'>
                            <Image src={card.image} alt="MacBook" fill style={{ objectFit: 'contain' }} />
                        </Box>
                        <Box display='flex' gap={1}>
                            {card.color.map(color => (<Box width={11} height={11} bgcolor={color} borderRadius={5} />))}
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight={600}> {card.title} </Typography>
                            <Typography variant="h6" fontWeight={600}> {card.subtitle} </Typography>
                        </Box>
                        <Typography> {card.description} </Typography>
                        <Button variant="contained" sx={{ borderRadius: 10 }}>
                            MÁS INFORMACIÓN
                        </Button>
                    </Grid>
                ))
            }

            <Grid container>
                <RelatedProducts category='macbooks' direction="row" xs={3.8} />
            </Grid>
        </Grid>
    )
}

export default MacbooksCards;
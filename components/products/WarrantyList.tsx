import { EmojiEvents, SyncRounded, VerifiedUser } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

const warrantyes = [
    {
        icon: <SyncRounded sx={{ color: 'text.secondary' }} />,
        title: 'Devolución gratis.',
        description: 'Tenés 30 días desde que lo recibís.'
    },
    {
        icon: <VerifiedUser sx={{ color: 'text.secondary' }} />,
        title: 'Compra Protegida.',
        description: ' Recibí el producto que esperabas o te devolvemos tu dinero.'
    }
];

const WarrantyList: React.FC<{ warranty: string }> = ({ warranty }) => {
    return (
        <Grid container direction='column' mt={2} gap={1}>
            {
                warrantyes.map(item => (
                    <Grid display='flex' gap={1} key={item.title}>
                        {item.icon}
                        <Grid>
                            <Typography color='primary.main'>{item.title}</Typography>
                            <Typography>{item.description} </Typography>
                        </Grid>
                    </Grid>
                ))
            }
            <Grid display='flex' gap={1}>
                <EmojiEvents sx={{ color: 'text.secondary' }} />
                <Grid>
                    <Typography color='primary.main'>{warranty}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default WarrantyList
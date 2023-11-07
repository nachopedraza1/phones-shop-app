import { Box, Typography, Rating } from '@mui/material';

const RatingProduct: React.FC<{ rating: number, showRate?: boolean }> = ({ rating, showRate = false }) => {

    const starts = parseFloat((rating * 5).toFixed(2));

    return (
        <Box display='flex' alignItems='center'>
            <Rating
                sx={{ color: 'primary.main' }}
                value={starts}
                precision={0.5}
                readOnly
            />
            <Typography color="text.secondary" display={showRate ? 'none' : ''} sx={{ mt: 0.3, ml: 0.5 }}>{starts} </Typography>
        </Box>
    )
}

export default RatingProduct;
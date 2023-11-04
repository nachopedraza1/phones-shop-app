import { Box, Typography, Rating } from '@mui/material';

const RatingProduct: React.FC<{ rating: number, showRate?: boolean }> = ({ rating, showRate = false }) => {
    return (
        <Box display='flex' alignItems='center'>
            <Rating
                sx={{ color: 'primary.main'}}
                value={rating * 5}
                precision={0.5}
                readOnly
            />
            <Typography color="text.secondary" display={showRate ? 'none' : ''} sx={{ mt: 0.3, ml: 0.5 }}>{rating * 5} </Typography>
        </Box>
    )
}

export default RatingProduct;
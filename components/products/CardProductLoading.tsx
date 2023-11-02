import { Share, Favorite, MoreVert } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardHeader, IconButton, Rating, Skeleton, Typography } from "@mui/material";

const CardProductLoading: React.FC = () => {


    return (
        <Card sx={{ maxWidth: "100%" }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings" disabled>
                        <MoreVert />
                    </IconButton>
                }
                title={
                    <Typography fontWeight={600} maxWidth={280} whiteSpace={'nowrap'} overflow='hidden' textOverflow={'ellipsis'}>
                        <Skeleton height={20} width={'100%'} />
                    </Typography>
                }
                subheader={<Rating name="half-rating-read" value={0} precision={0.5} readOnly disabled />}
            />
            <Skeleton variant="rectangular" width='100%' height={194} />
            <CardContent>
                <Skeleton height={20} width={'100%'} />
                <Skeleton height={20} width={'100%'} />
                <Skeleton height={20} width={'100%'} />
                <Skeleton height={70} width={'100%'} />
            </CardContent>
        </Card >
    );
}

export default CardProductLoading;
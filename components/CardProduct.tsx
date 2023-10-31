import { Products } from "@/interfaces/Response";
import { Share, Favorite, MoreVert } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";

const CardProduct: React.FC<{ product: Products }> = ({ product }) => {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={
                    <Tooltip title={product.product_name} placement="top" >
                        <Typography fontWeight={600} maxWidth={280} whiteSpace={'nowrap'} overflow='hidden' textOverflow={'ellipsis'}>
                            {product.product_name}
                        </Typography>
                    </Tooltip>
                }
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                style={{ objectFit: 'contain' }}
                image={`https://http2.mlstatic.com/D_NQ_NP_749551-MLA46975166598_082021-O.webp`}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Favorite />
                </IconButton>
                <IconButton aria-label="share">
                    <Share />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default CardProduct;

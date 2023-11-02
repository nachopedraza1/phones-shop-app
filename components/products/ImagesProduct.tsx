
import Image from "next/image";
import { Grid } from "@mui/material";
import { Picture } from "@/interfaces/MeliProduct";

const ImagesProduct: React.FC<{ images: Picture[] }> = ({ images }) => {
    return (
        <>
            <Grid item xs={1} display='flex' flexDirection='column' gap={2}>
                {
                    images.slice(0, 5).map(img => (
                        <Grid key={img.id} width={60} height={60} sx={{ border: '1px solid black', borderRadius: '5px' }}>
                            <Image src={img.url} alt={'Phonecting'} width={50} height={50} style={{ objectFit: 'contain' }} />
                        </Grid>
                    ))
                }
            </Grid>
            <Grid item xs={4} position={'relative'}>
                <Image src={images[0].url} alt={'Phonecting'} fill style={{ objectFit: 'contain' }} />
            </Grid>
        </>
    )
}

export default ImagesProduct;
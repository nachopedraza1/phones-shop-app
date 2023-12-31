'use client';
import { useState } from "react";
import Image from "next/image";
import { Grid } from "@mui/material";
import { Picture } from "@/interfaces/MeliProduct";

const ImagesProduct: React.FC<{ images: Picture[] }> = ({ images }) => {

    const [imageActive, setImageActive] = useState(images[0].url);

    return (
        <Grid container>
            <Grid item xs={2} display='flex' flexDirection='column' gap={2} minHeight={364}>
                {
                    images.slice(0, 5).map(img => (
                        <Grid key={img.id}
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            width={60}
                            height={60}
                            sx={{ border: `2px solid ${imageActive === img.url ? '#3483fa' : '#bfbfbf'}`, borderRadius: '5px', cursor: 'pointer' }}
                        >
                            <Image
                                src={img.url}
                                alt={'Phonecting'}
                                width={55}
                                height={55}
                                style={{ objectFit: 'contain' }}
                                onMouseEnter={() => setImageActive(img.url)}
                            />
                        </Grid>
                    ))
                }
            </Grid>
            <Grid item xs={10} position={'relative'}>
                <Image
                    loading="lazy"
                    src={imageActive}
                    alt={'Phonecting'}
                    fill
                    style={{ objectFit: 'contain' }} />
            </Grid>
        </Grid>
    )
}

export default ImagesProduct; 
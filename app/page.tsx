import Image from "next/image";
import { Metadata, NextPage } from "next";

import Main from "@/components/layouts/Main";
import Categories from "@/components/Categories";
import LatestProducts from "@/components/LatestProducts";

import { carrousel } from "@/utils";
import { Grid, Typography } from '@mui/material';

export const metadata: Metadata = {
  title: 'Home'
}

const HomePage: NextPage = () => {

  return (
    <Main>
      <Grid container justifyContent='space-between' pt={20}>
        <Typography fontWeight={600}> Phonecting Online Shop </Typography>
        <Grid item display='flex'>
          <img src="/delivery2.svg" />
          <Typography color='#008257' fontWeight={600} mx={1}>Free fast delivery</Typography>
          <Typography>on orders over £20</Typography>
        </Grid>
        <Grid item display='flex'>
          <img src="/delivery.svg" />
          <Typography color='#df1a1a' fontWeight={600} mx={1}>Same day dispatch</Typography>
          <Typography>is by 6:30pm</Typography>
        </Grid>
        <Grid item display='flex'>
          <img src="/delivery3.svg" />
          <Typography fontWeight={600} mx={1}>Members earn loyalty</Typography>
          <Typography>points on every product</Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent='space-between' mt={2} rowGap={2}>
        {
          carrousel.map(item => (
            <Grid item xs={item.width} position={'relative'} height={item.height} key={item.image}>
              <Image src={item.image}
                alt={item.alt}
                style={{ borderRadius: '10px', objectFit: "cover" }}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
              />
            </Grid>
          ))
        }
      </Grid>

      <Categories />

      <LatestProducts />

    </Main >
  )
}

export default HomePage;
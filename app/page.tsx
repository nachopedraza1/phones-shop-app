import Image from "next/image";
import { NextPage } from "next";

import Main from "@/components/layouts/Main";
import Categories from "@/components/products/Categories";
import LatestProducts from "@/components/products/LatestProducts";
import MacbooksCards from "@/components/products/MacbooksCards";

import { carrousel } from "@/utils";
import { Grid, Typography } from '@mui/material';

const HomePage: NextPage = () => {

  return (
    <Main>
      <Grid container justifyContent='space-between'>
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

      <LatestProducts title="ÚLTIMOS INGRESOS EN IPHONES" category='iphones' />

      <LatestProducts title="ÚLTIMOS INGRESOS EN IPADS" category='ipads' />

      <MacbooksCards />

    </Main >
  )
}

export default HomePage;
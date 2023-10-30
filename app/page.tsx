"use client";

import Image from "next/image";
import { NextPage } from "next";
import { Container, Grid, Typography } from '@mui/material';
import { MainLayout } from "@/components/layouts";

const HomePage: NextPage = () => {

  return (
    <MainLayout>
      <Grid container justifyContent='space-between'>
        <Typography fontWeight={600}> E-liquids UK Online Shop </Typography>
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

      <Grid container justifyContent='space-between' mt={2} rowGap={2} >
        <Grid item xs={5.9} position={'relative'} height={250}>
          <Image src='https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/34b5bf180145769.6505ae7623131.jpg'
            alt="Your Image Description"
            style={{ borderRadius: '10px', objectFit: "cover" }}
            fill
          />
        </Grid>
        <Grid item xs={5.9} position={'relative'} height={250}>
          <Image src='https://www.gizmochina.com/wp-content/uploads/2021/10/macbook-pro-2021-renders-3-1024x576.jpg'
            alt="Your Image Description"
            style={{ borderRadius: '10px', objectFit: "cover" }}
            fill
          />
        </Grid>
        <Grid item xs={2.9} position={'relative'} height={120}>
          <Image src='https://i.pinimg.com/564x/16/cb/95/16cb9581bebe2365ee88d0b5c81c992b.jpg'
            alt="Your Image Description"
            style={{ borderRadius: '10px', objectFit: "cover" }}
            fill
          />
        </Grid>
        <Grid item xs={2.9} position={'relative'} height={120}>
          <Image src='https://i.pinimg.com/564x/36/9b/c3/369bc3be09b8f8bf7039225b3029fc69.jpg'
            alt="Your Image Description"
            style={{ borderRadius: '10px', objectFit: "cover" }}
            fill
          />
        </Grid>
        <Grid item xs={2.9} position={'relative'} height={120}>
          <Image src='https://i.pinimg.com/564x/d7/99/5c/d7995c04fdee19527327cd8e80bf9815.jpg'
            alt="Your Image Description"
            style={{ borderRadius: '10px', objectFit: "cover" }}
            fill
          />
        </Grid>
        <Grid item xs={2.9} position={'relative'} height={120}>
          <Image src='https://i.pinimg.com/564x/93/2d/e1/932de1b5674511802ab2c6067eccffba.jpg'
            alt="Your Image Description"
            style={{ borderRadius: '10px', objectFit: "cover" }}
            fill
          />
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default HomePage;
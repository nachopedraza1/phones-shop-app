"use client";

import { NextPage } from "next";
import { Container, Grid, Typography } from '@mui/material';
import { Navbar } from "@/components/navbar";
import Image from "next/image";

const HomePage: NextPage = () => {

  return (
    <>
      <Navbar />

      <Container maxWidth='xl'>
        <Grid container justifyContent='space-around' mt={21} gap={10}>
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
        </Grid>

        <Grid container justifyContent='space-between' mt={2}>
          <Grid item xs={5.9} position={'relative'} height={300}>
            <Image src='https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/34b5bf180145769.6505ae7623131.jpg'
              alt="Your Image Description"
              style={{ borderRadius: '10px', objectFit: "cover" }}
              fill
            />
          </Grid>
          <Grid item xs={5.9} position={'relative'} height={300}>
            <Image src='https://www.gizmochina.com/wp-content/uploads/2021/10/macbook-pro-2021-renders-3-1024x576.jpg'
              alt="Your Image Description"
              style={{ borderRadius: '10px', objectFit: "cover" }}
              fill
            />
          </Grid>
        </Grid>
      </Container >
    </>
  )
}

export default HomePage;
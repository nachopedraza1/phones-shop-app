"use client";

import Image from "next/image";
import { NextPage } from "next";
import { Box, Grid, Typography } from '@mui/material';
import { MainLayout } from "@/components/layouts";
import { carrousel, categories } from "@/utils/constants";

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
        {
          carrousel.map(item => (
            <Grid item xs={item.width} position={'relative'} height={item.height}>
              <Image src={item.image}
                alt={item.alt}
                style={{ borderRadius: '10px', objectFit: "cover" }}
                fill
              />
            </Grid>
          ))
        }
      </Grid>
      
      <Grid container justifyContent='space-between' mt={2} rowGap={2} >
        {
          carrousel.map(item => (
            <Grid item xs={item.width} position={'relative'} height={item.height}>
              <Image src={item.image}
                alt={item.alt}
                style={{ borderRadius: '10px', objectFit: "cover" }}
                fill
              />
            </Grid>
          ))
        }
      </Grid>
      

      <Grid container mt={3}>
        <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between' mb={2}>
          <Typography variant="h6" fontWeight={600}> SHOP BY CATEGORY </Typography>
          <Box width='83%' height={2} bgcolor='#e6e9e8'></Box>
        </Grid>
        {
          categories.map(category => (
            <Grid item xs={2} textAlign='center'>
              <Image src={category.image}
                alt={category.alt}
                height={category.height}
                width={category.width}
              />
              <Typography variant="h6" fontWeight={600} mb={1}> iPhones </Typography>
            </Grid>
          ))
        }
      </Grid>
    </MainLayout >
  )
}

export default HomePage;
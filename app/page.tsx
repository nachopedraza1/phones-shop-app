import Image from "next/image";
import { NextPage } from "next";

import Main from "@/components/layouts/Main";
import Categories from "@/components/products/Categories";
import LatestProducts from "@/components/products/LatestProducts";

import { carrousel } from "@/utils";
import { Box, Grid, Typography } from '@mui/material';

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

      <LatestProducts />

      <Grid container justifyContent='center' alignItems='start' gap={2} mt={3}>
        <Grid item xs={3.5} display='flex' flexDirection='column' textAlign='center' alignItems='center' gap={2}>
          <Box width={350} height={190} position='relative'>
            <Image src='/mac1.png' alt="MacBook" fill style={{ objectFit: 'contain' }} />
          </Box>
          <Box display='flex' gap={1}>
            <Box width={11} height={11} bgcolor='#7d7e80' borderRadius={5} />
            <Box width={11} height={11} bgcolor='#e3e4e5' borderRadius={5} />
            <Box width={11} height={11} bgcolor='#f9d4c2' borderRadius={5} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={600}>MacBook Air de 13”</Typography>
            <Typography variant="h6" fontWeight={600}>Chip M1</Typography>
          </Box>
          <Typography>
            La laptop Mac más accesible,
            para hacer de todo en todos lados.
          </Typography>
        </Grid>
        <Grid item xs={3.5} display='flex' flexDirection='column' textAlign='center' alignItems='center' gap={2}>
          <Box width={350} height={190} position='relative'>
            <Image src='/mac2.png' alt="MacBook" fill style={{ objectFit: 'contain' }} />
          </Box>
          <Box display='flex' gap={1}>
            <Box width={11} height={11} bgcolor='#7d7e80' borderRadius={5} />
            <Box width={11} height={11} bgcolor='#e3e4e5' borderRadius={5} />
            <Box width={11} height={11} bgcolor='#f9d4c2' borderRadius={5} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={600}>MacBook Air de 13” y 15”</Typography>
            <Typography variant="h6" fontWeight={600}>Chip M2</Typography>
          </Box>
          <Typography>
            Increíblemente delgada y rápida, para
            trabajar, jugar y crear en cualquier lugar.
          </Typography>
        </Grid>
        <Grid item xs={3.5} display='flex' flexDirection='column' textAlign='center' alignItems='center' gap={2}>
          <Box width={350} height={190} position='relative'>
            <Image src='/mac3.png' alt="MacBook" fill style={{ objectFit: 'contain' }} />
          </Box>
          <Box display='flex' gap={1}>
            <Box width={11} height={11} bgcolor='#7d7e80' borderRadius={5} />
            <Box width={11} height={11} bgcolor='#e3e4e5' borderRadius={5} />
            <Box width={11} height={11} bgcolor='#f9d4c2' borderRadius={5} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={600}>MacBook Pro de 14” y 16”</Typography>
            <Typography variant="h6" fontWeight={600}>Chip M3, M3 Pro o M3 Max</Typography>
          </Box>
          <Typography>
            La laptop Mac más avanzada,
            para flujos de trabajo muy exigentes.
          </Typography>
        </Grid>
      </Grid>

    </Main >
  )
}

export default HomePage;
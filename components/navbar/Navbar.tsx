"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Container, Grid, TextField, Typography, Button, Divider, IconButton, Link as MuiLink, AppBar } from '@mui/material';
import { Megamenu, megamenu } from "@/utils/constants";

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

export const Navbar: React.FC = () => {

    const [openMegamenu, setOpenMegamenu] = useState<boolean>(false);
    const [resultsMenu, setResultsMenu] = useState<Megamenu>();

    const handleOpenMega = (typeMenu: string) => {
        setOpenMegamenu(true)
        const resultsMenu = megamenu.find(item => item.type === typeMenu);
        setResultsMenu(resultsMenu);
    }

    return (
        <Grid position='relative'>
            <AppBar>
                <Grid bgcolor='#21003d'>
                    <Container maxWidth='xl'>
                        <Grid container justifyContent='space-between' alignItems='center' padding={0.7}>
                            <Typography fontSize={15} color='white'>
                                info@e-liquids.com | 0121 272 2900
                            </Typography>
                            <Image src='./trustpilot-logo.svg' alt="trustpilot" width={180} height={21} />
                        </Grid>
                    </Container>
                </Grid>

                <Container maxWidth='xl'>
                    <Grid container justifyContent='space-between' alignItems='center' paddingTop={2} paddingBottom={2}>
                        <Grid item display='flex' alignItems='center' xs={2}>
                            <Image src='/logo.png' alt="trustpilot" width={60} height={50} />
                            <Typography variant="h6" fontWeight={600} ml={1} color={'black'}> Phonecting </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                placeholder="Buscar"
                                InputProps={{
                                    endAdornment:
                                        <IconButton>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 25, height: 25 }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                            </svg>
                                        </IconButton>
                                }}
                            />
                        </Grid>

                        <Grid item>
                            <Grid container justifyContent='end' gap={1}>

                                <Button
                                    disableRipple
                                    startIcon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 25, height: 25 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                        </svg>

                                    }
                                >
                                    Support
                                </Button>

                                <Divider flexItem variant="middle" orientation="vertical" />

                                <Button
                                    disableRipple
                                    startIcon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" style={{ width: 20, height: 20, marginRight: 3 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    }
                                >
                                    Favorites
                                </Button>

                                <Divider flexItem variant="middle" orientation="vertical" />

                                <Button
                                    disableRipple
                                    startIcon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20, marginRight: 3 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    }
                                    endIcon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 17, height: 17, marginLeft: 3 }} >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    }
                                >
                                    Account
                                </Button>

                                <Divider flexItem variant="middle" orientation="vertical" />

                                <IconButton>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#21003d" style={{ width: 25, height: 25, marginRight: 3 }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container alignItems='center' bgcolor='#f9f9f9' paddingTop={1} paddingBottom={1}>
                        <Grid item xs={8}>
                            <Grid container gap={4}>
                                <MuiLink component={Link} href='/' fontWeight={600} onMouseEnter={() => handleOpenMega('iPhones')}>
                                    iPhones
                                </MuiLink>
                                <MuiLink component={Link} href='/' fontWeight={600} onMouseEnter={() => handleOpenMega('iPads')}>
                                    iPads
                                </MuiLink>
                                <MuiLink component={Link} href='/' fontWeight={600} onMouseEnter={() => handleOpenMega('MacBooks')}>
                                    MacBooks
                                </MuiLink>
                                <MuiLink component={Link} href='/' fontWeight={600} onMouseEnter={() => handleOpenMega('AppleWatch')}>
                                    AppleWatch
                                </MuiLink>
                                <MuiLink component={Link} href='/' fontWeight={600} onMouseEnter={() => handleOpenMega('HomePod')}>
                                    HomePods
                                </MuiLink>
                                <MuiLink component={Link} href='/' fontWeight={600} onMouseEnter={() => setOpenMegamenu(false)}>
                                    Accesorios
                                </MuiLink>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} textAlign='end'>
                            <Button variant="contained" size="small">
                                Offers
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>


            <Grid container bgcolor='#f9f9f9' paddingTop={1} paddingBottom={1} position='relative'>

                <Grid
                    className={`megamenu ${openMegamenu && 'open-mega'}`}
                    onMouseLeave={() => setOpenMegamenu(false)}
                >

                    <Grid item textAlign='center'>
                        <Image src={resultsMenu?.image.url!} width={resultsMenu?.image.width} height={resultsMenu?.image.height} alt={resultsMenu?.type!} />
                        <Typography variant="h5">
                            {resultsMenu?.type}
                        </Typography>
                    </Grid>

                    <Divider flexItem variant="middle" orientation="vertical" />

                    <Grid item xs={7} display='flex' flexDirection='column' flexWrap='wrap' justifyContent='center' height='200px'>
                        <Typography fontWeight={600}>Productos</Typography>
                        <Divider sx={{ maxWidth: 150 }} />
                        {
                            resultsMenu?.models.map(item => (
                                <Grid item key={item}>
                                    <MuiLink component={Link} href='/' sx={{ color: 'black', '&:hover': { color: '#00c8ff' } }}>
                                        {item}
                                    </MuiLink>
                                </Grid>
                            ))
                        }
                        <MuiLink component={Link} href='/' sx={{ fontWeight: 600, color: 'black', '&:hover': { color: '#00c8ff' } }}>
                            Ver todos
                        </MuiLink>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}

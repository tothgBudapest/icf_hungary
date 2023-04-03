import Head from 'next/head';
import { Container, Stack, Grid, Typography, Paper } from '@mui/material';
import MonaLisaIcon from '@/components/MonaLisaIcon';
import SearchArtwork from '@/components/searchArtwork';

export default function Home() {
    return (
        <>
            <Head>
                <title>ICF ARTWORK Test application</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Container maxWidth="lg">
                <Stack my={5} spacing={4} direction="column" justifyContent="center" alignItems="center">
                    <Grid container alignItems="center" justifyContent="center" spacing={2}>
                        <Grid item>
                            <Typography
                                sx={{
                                    fontFamily: 'Cellofy'
                                }}
                                variant="h1">
                                Find Your Art
                            </Typography>
                        </Grid>
                        <Grid item>
                            <MonaLisaIcon size={150} />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justifyContent="center" spacing={2}>
                        <SearchArtwork />
                    </Grid>
                </Stack>
            </Container>
        </>
    );
}

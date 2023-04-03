import { Button, Container, Grid, Stack } from '@mui/material';
import ArtworkCard from '@/components/artworkCard';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectFavourites } from '@/redux/favouritesSlice';

const FavouritesPage: NextPage = () => {
    const router = useRouter();
    const favoriteArtworks = useSelector(selectFavourites);

    const goBack = () => {
        router.push({
            pathname: '/'
        });
    };

    const openDetailsPage = (id: number) => {
        router.push({
            pathname: '/artwork/[id]',
            query: { id }
        });
    };

    return (
        <Container maxWidth="lg">
            <Stack mt={5} spacing={2} direction="column" justifyContent="center" alignItems="center">
                <Button onClick={() => goBack()}>Go back</Button>
                <Grid container mt={3} spacing={4} direction="row" justifyContent="center" alignItems="center">
                    {favoriteArtworks.map((artwork: any) => (
                        <Grid key={'artwork_' + artwork?.id} item>
                            <ArtworkCard callback={openDetailsPage} artwork={artwork} />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Container>
    );
};

export default FavouritesPage;

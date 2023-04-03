import { Container, Stack, Button, Box, Chip, Link, CircularProgress, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { fetchArtworkById, makeSelectArtworkById, selectArtworkStatus, toggleFavorite } from '@/redux/artworkSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { Artwork, FetchArtworkRequest } from '@/types/artwork.types';
import { useDispatch, useSelector } from 'react-redux';
import { getImageIdLink } from '@/utils/image';
import { RootState } from '@/redux/store';
import { addFavourite, removeFavourite, selectIsFavourite } from '@/redux/favouritesSlice';

const ArtworkPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const selectArtworkById = useMemo(makeSelectArtworkById, []);
    const artwork = useSelector((state: RootState) => selectArtworkById(state, Number.parseInt(id as string)));
    const status = useSelector(selectArtworkStatus);
    const isFavourite = useSelector(selectIsFavourite(artwork?.id));

    const goBack = () => {
        router.push({
            pathname: '/'
        });
    };

    const handleToggleFavourites = (artwork: Artwork | undefined) => {
        if (artwork) {
            if (isFavourite) {
                dispatch(removeFavourite(artwork.id));
            } else {
                dispatch(addFavourite(artwork));
            }
        }
    };

    useEffect(() => {
        if (id && !artwork) {
            const thunkAction = fetchArtworkById({ artworkId: id } as FetchArtworkRequest);
            // @ts-ignore
            dispatch(thunkAction)
                .then(unwrapResult)
                .then(() => console.log('Artwork fetched successfully!'))
                .catch((error: any) => console.log('Error fetching artwork:', error));
        }
    }, [dispatch, id]);

    // @ts-ignore
    return (
        <Container maxWidth="lg">
            <Stack mt={5} spacing={2} direction="column" justifyContent="center" alignItems="center">
                <Box>{status === 'loading' && <CircularProgress size="3rem" />}</Box>
                {status !== 'loading' && (
                    <Grid
                        container
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignContent={'center'}
                        spacing={4}>
                        <Grid mb={5} container justifyContent={'center'} alignItems={'center'} item>
                            <Button onClick={() => goBack()}>Go back</Button>
                            <Button variant={'outlined'} onClick={() => handleToggleFavourites(artwork)}>
                                {isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                            </Button>
                        </Grid>
                        <Grid container justifyContent={'center'} alignItems={'center'} item>
                            <img src={getImageIdLink(artwork?.image_id)} />
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h2" component="div">
                                        {artwork?.title}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {artwork?.artist_display}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {artwork?.dimensions}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {artwork?.medium_display}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Stack>
        </Container>
    );
};

export default ArtworkPage;

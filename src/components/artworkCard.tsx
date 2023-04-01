import {
    Button,
    Box,
    Grid,
    Grow,
    Card,
    CardContent,
    Chip,
    Fab,
    Typography,
    CardMedia,
    CardActionArea,
    IconButton
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import styled from 'styled-components';

interface Genre {
    name: string;
}

interface ComponentProps {
    artwork: {
        id: string;
        title: string;
        image_id: string;
    };
    callback?: Function;
}

const Overlay = styled.div`
    position: absolute;
    height: 50px;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    color: white;
    opacity: 0;
`;

const StyledCard = styled(Card)`
    min-width: 185px;
    max-width: 185px;
    position: relative;

    & img,
    & ${Overlay} {
        transition: all 200ms ease-out;
    }

    &:hover img {
        scale: 1.3;
        filter: brightness(50%);
    }

    &:hover ${Overlay} {
        opacity: 1;
    }
`;

export default function ArtworkCard({ artwork, callback }: ComponentProps) {
    const getImageId = (id: string) => {
        const BASE_URL = 'https://www.artic.edu/iiif/2';
        return `${BASE_URL}/${id}/full/843,/0/default.jpg`;
    };

    return (
        <Grow in={!!artwork}>
            <StyledCard sx={{ minWidth: 185, maxWidth: 185, position: 'relative' }}>
                <CardMedia component="img" height="278" width="185" image={getImageId(artwork.image_id)} />
                <Overlay>
                    <Typography variant="body1" mb={1}>
                        {artwork.title}
                    </Typography>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid alignSelf="flex-end" item>
                            <IconButton sx={{ color: '#FFF' }} aria-label="add to favorites">
                                <FavoriteBorderRounded />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Overlay>
            </StyledCard>
        </Grow>
    );
}

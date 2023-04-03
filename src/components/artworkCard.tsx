import { Button, Grow, Card, Typography, CardMedia, CardActionArea, IconButton } from '@mui/material';
import { getImageIdLink } from '@/utils/image';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Artwork } from '@/types/artwork.types';
import { addFavourite, removeFavourite, selectIsFavourite } from '@/redux/favouritesSlice';

interface ComponentProps {
    artwork: Artwork;
    callback: Function;
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

const StyledIconButton = styled(IconButton)`
    position: absolute;
    bottom: 5px;
    right: 5px;
    color: #fff;
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

    &:hover ${Overlay}, &:hover ${StyledIconButton} {
        opacity: 1;
    }
`;

export default function ArtworkCard({ artwork, callback }: ComponentProps) {
    const dispatch = useDispatch();
    const isFavourite = useSelector(selectIsFavourite(artwork?.id));

    const handleToggleFavourites = (artwork: Artwork | undefined) => {
        if (artwork) {
            if (isFavourite) {
                dispatch(removeFavourite(artwork.id));
            } else {
                dispatch(addFavourite(artwork));
            }
        }
    };
    return (
        <Grow in={!!artwork}>
            <StyledCard sx={{ minWidth: 185, maxWidth: 185, position: 'relative' }}>
                <CardActionArea component={Button} onClick={() => callback(artwork.id)}>
                    <CardMedia component="img" height="278" width="185" image={getImageIdLink(artwork?.image_id)} />
                    <Overlay>
                        <Typography variant="body1" mb={1}>
                            {artwork.title}
                        </Typography>
                    </Overlay>
                </CardActionArea>
                <StyledIconButton onClick={() => handleToggleFavourites(artwork)} aria-label="add to favorites">
                    {isFavourite ? <FavoriteIcon /> : <FavoriteBorderRounded />}
                </StyledIconButton>
            </StyledCard>
        </Grow>
    );
}

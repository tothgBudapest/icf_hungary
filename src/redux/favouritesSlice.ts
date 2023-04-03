import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Artwork } from '@/types/artwork.types';
import { RootState } from '@/redux/store';

interface FavouritesState {
    artworks: Artwork[];
}

const initialState: FavouritesState = {
    artworks: []
};

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addFavourite: (state, action: PayloadAction<Artwork>) => {
            state.artworks.push(action.payload);
        },
        removeFavourite: (state, action: PayloadAction<number>) => {
            state.artworks = state.artworks.filter((artwork) => artwork.id !== action.payload);
        }
    }
});

export const selectFavourites = (state: RootState) => state.favourites.artworks;

export const selectIsFavourite = (artworkId: string | number | undefined) => (state: RootState) =>
    artworkId
        ? state.favourites.artworks.some((artwork) => artwork.id === Number.parseInt(artworkId.toString()))
        : false;

export const { addFavourite, removeFavourite } = favouritesSlice.actions;

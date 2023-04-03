import { createAction, createAsyncThunk, createSelector, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import {
    Artwork,
    FetchArtworksResponse,
    ArtworkState,
    FetchArtworksRequest,
    FetchArtworkRequest,
    FetchArtworkResponse
} from '@/types/artwork.types';
import { RootState } from '@/redux/store';
import { ARTWORK_API_BASE_URL, ARTWORK_API_SEARCH_URL } from '@/constants/app-url.constant';
import axios from 'axios';

const initialState: ArtworkState = {
    data: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 0,
    pageSize: 25 // default
};

export const toggleFavorite = createAction<number>('artworks/toggleFavorite');

export const searchArtworks = createAsyncThunk<FetchArtworksResponse, FetchArtworksRequest, { state: RootState }>(
    'artworks/search',
    async ({ searchQuery, currentPage }, { getState }) => {
        const limit = getState().artwork.pageSize;
        const response = await axios.get(ARTWORK_API_SEARCH_URL, {
            params: {
                fields: 'id,title,image_id, artist_display, dimensions, medium_display',
                limit,
                page: currentPage,
                q: searchQuery
            }
        });

        if (response.status !== 200) {
            throw new Error('Failed to fetch artworks.');
        }

        return {
            data: response.data.data,
            totalPages: response.data.pagination.total_pages
        };
    }
);

export const fetchArtworkById = createAsyncThunk<FetchArtworkResponse, FetchArtworkRequest, { state: RootState }>(
    'artworks/fetchById',
    async ({ artworkId }, { getState }) => {
        const response = await axios.get(`${ARTWORK_API_BASE_URL}/${artworkId}`);

        if (response.status !== 200) {
            throw new Error('Failed to fetch artwork.');
        }

        return {
            data: response.data.data
        };
    }
);

export const artworkSlice = createSlice({
    name: 'artwork',
    initialState,
    reducers: {
        setPageSize(state, action: PayloadAction<number>) {
            state.pageSize = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchArtworks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchArtworks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload.data;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(searchArtworks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to search artworks.';
            })
            .addCase(fetchArtworkById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchArtworkById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = [...state.data, action.payload.data];
                state.totalPages = 1;
            })
            .addCase(fetchArtworkById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to fetch artwork.';
            });
    }
});

export const selectArtworkData = (state: RootState) => state.artwork.data;
export const selectArtworkStatus = (state: RootState) => state.artwork.status;
export const selectArtworkCurrentPage = (state: RootState) => state.artwork.currentPage;
export const selectArtworkTotalPages = (state: RootState) => state.artwork.totalPages;
export const selectArtworkPageSize = (state: RootState) => state.artwork.pageSize;

export const makeSelectArtworkById = () =>
    createSelector(
        selectArtworkData,
        (__: RootState, artworkId: number) => artworkId,
        (artworkData: Artwork[], artworkId: number) => artworkData.find((artwork: Artwork) => artwork.id === artworkId)
    );

export const { setPageSize, setCurrentPage } = artworkSlice.actions;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArtworkApiResponse, FetchArtworksResponse, ArtworkState, FetchArtworksRequest } from '@/types/artwork.types';
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

export const searchArtworks = createAsyncThunk<FetchArtworksResponse, FetchArtworksRequest, { state: RootState }>(
    'artworks/search',
    async ({ searchQuery, currentPage }, { getState }) => {
        const limit = getState().artwork.pageSize;
        const response = await axios.get(ARTWORK_API_SEARCH_URL, {
            params: {
                fields: 'id,title,image_id',
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

export const artworkSlice = createSlice({
    name: 'artwork',
    initialState,
    reducers: {
        nextPage: (state) => {
            if (state.currentPage < state.totalPages) {
                state.currentPage++;
            }
        },
        prevPage: (state) => {
            if (state.currentPage > 1) {
                state.currentPage--;
            }
        },
        setPageSize(state, action: PayloadAction<number>) {
            state.pageSize = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtworks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchArtworks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload.data;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchArtworks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to fetch artworks.';
            })
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
            });
    }
});

export const selectArtworkData = (state: RootState) => state.artwork.data;
export const selectArtworkStatus = (state: RootState) => state.artwork.status;
export const selectArtworkCurrentPage = (state: RootState) => state.artwork.currentPage;
export const selectArtworkTotalPages = (state: RootState) => state.artwork.totalPages;
export const selectArtworkPageSize = (state: RootState) => state.artwork.pageSize;

export const { nextPage, prevPage, setPageSize, setCurrentPage } = artworkSlice.actions;

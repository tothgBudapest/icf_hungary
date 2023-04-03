import { configureStore } from '@reduxjs/toolkit';
import { artworkSlice } from './artworkSlice';
import { favouritesSlice } from '@/redux/favouritesSlice';

export const store = configureStore({
    reducer: {
        artwork: artworkSlice.reducer,
        favourites: favouritesSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

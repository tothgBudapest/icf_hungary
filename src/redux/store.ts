import { configureStore } from '@reduxjs/toolkit';
import { artworkSlice } from './artworkSlice';

export const store = configureStore({
    reducer: {
        artwork: artworkSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

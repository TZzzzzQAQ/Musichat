import {configureStore} from '@reduxjs/toolkit';
import musicReducer from '@/store/features/musicSlice';
import themeReducer from '@/store/features/themeSlice';

export const store = configureStore({
    reducer: {
        music: musicReducer,
        theme: themeReducer,
    },
});
